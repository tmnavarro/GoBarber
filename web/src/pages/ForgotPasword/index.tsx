import React, { useCallback, useRef, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import {
  Container,
  Content,
  Background,
  AnimationContainer,
} from './styles';

import { useToast } from '../../hooks/Toast';
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImg from '../../assets/images/logo.svg';

interface ForgotPaswordFormData {
  email: string;
}

const ForgotPasword: React.FC = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSumit = useCallback(
    async (data: ForgotPaswordFormData) => {
      setLoading(true);
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/password/forgot', { email: data.email });
        addToast({
          type: 'success',
          title: 'Recuperação de senha realizada',
          description: 'Verifique seu email para resetar sua senha',
        });
        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const erros = getValidationErrors(error);
          formRef.current?.setErrors(erros);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao recuperar sua senha',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSumit}>
            <h1>Recuperar senha</h1>
            <Input
              icon={FiMail}
              name="email"
              type="email"
              placeholder="Email"
            />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>

          <Link to="/">
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPasword;

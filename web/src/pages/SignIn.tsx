import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { Container, Content, Background } from './styles';

import Button from '../components/Button';
import Input from '../components/Input';

import logoImg from '../assets/images/logo.svg';

const SingIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Faça seu login</h1>
        <Input icon={FiMail} name="email" type="email" placeholder="Email" />
        <Input icon={FiLock} name="password" type="password" placeholder="Senha" />

        <Button type="submit">Entrar</Button>

        <a href="">Esqueci minha senha</a>
      </form>

      <a href="">
        <FiLogIn />
        Criar conta
      </a>
    </Content>
    <Background></Background>
  </Container>
);

export default SingIn;

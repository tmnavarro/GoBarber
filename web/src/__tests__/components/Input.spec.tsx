import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Input from '../../components/Input';

jest.mock('@unform/core', () => ({
  useField() {
    return {
      fieldName: 'email',
      defaultValue: '',
      error: '',
      registerField: jest.fn(),
    };
  },
}));

describe('Input Compoment', () => {
  it('Should be able to render an input', async () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('Should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />
    );
    const inputElment = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');
    fireEvent.focus(inputElment);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('border-color: #ff9000');
      expect(containerElement).toHaveStyle('color: #ff9000');
    });
  });

  it('Should remove highlight on input blur', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />
    );
    const inputElment = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');
    fireEvent.blur(inputElment);

    await waitFor(() => {
      expect(containerElement).not.toHaveStyle(
        'border-color: #ff9000'
      );
      expect(containerElement).not.toHaveStyle('color: #ff9000');
    });
  });

  it('Should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />
    );
    const inputElment = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');
    fireEvent.blur(inputElment);

    await waitFor(() => {
      expect(containerElement).not.toHaveStyle(
        'border-color: #ff9000'
      );
      expect(containerElement).not.toHaveStyle('color: #ff9000');
    });
  });

  it('Should keep input border highlight when input filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />
    );
    const inputElment = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    fireEvent.change(inputElment, {
      target: { value: 'user@server.com.br' },
    });

    fireEvent.blur(inputElment);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('color: #ff9000');
    });
  });
});

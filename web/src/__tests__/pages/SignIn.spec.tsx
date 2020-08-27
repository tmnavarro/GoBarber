import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import SignIn from '../../pages/Signin';

const mockHistoryPush = jest.fn();
const mockSingIn = jest.fn();
const mockAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  };
});

jest.mock('../../hooks/Auth', () => ({
  useAuth: () => ({
    signIn: mockSingIn,
  }),
}));

jest.mock('../../hooks/Toast', () => ({
  useToast: () => ({
    addToast: mockAddToast,
  }),
}));

describe('SignIn Page', () => {
  beforeEach(() => {
    mockHistoryPush.mockClear();
  });

  it('Should be able to sing in', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const password = getByPlaceholderText('Senha');
    const btnElement = getByText('Entrar');

    fireEvent.change(emailField, {
      target: { value: 'user@server.com' },
    });
    fireEvent.change(password, {
      target: { value: '444555' },
    });

    fireEvent.click(btnElement);

    await waitFor(() =>
      expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard')
    );
  });

  it('Should not be able to sing in with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const password = getByPlaceholderText('Senha');
    const btnElement = getByText('Entrar');

    fireEvent.change(emailField, {
      target: { value: 'not-valid-email' },
    });
    fireEvent.change(password, {
      target: { value: '444555' },
    });

    fireEvent.click(btnElement);

    await waitFor(() =>
      expect(mockHistoryPush).not.toHaveBeenCalled()
    );
  });

  it('Should display error if login fails', async () => {
    mockSingIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const password = getByPlaceholderText('Senha');
    const btnElement = getByText('Entrar');

    fireEvent.change(emailField, {
      target: { value: 'user@server.com' },
    });
    fireEvent.change(password, {
      target: { value: '444555' },
    });

    fireEvent.click(btnElement);
    await waitFor(() =>
      expect(mockAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        })
      )
    );
  });
});

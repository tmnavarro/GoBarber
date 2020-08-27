import { renderHook, act } from '@testing-library/react-hooks';
import MockAdpter from 'axios-mock-adapter';

import { useAuth, AuthProvider } from '../../hooks/Auth';
import api from '../../services/api';

const apiMock = new MockAdpter(api);

describe('Auth Hook', () => {
  it('Should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: 'userID',
        name: 'UserName',
        email: 'user@server.com.br',
      },
      token: 'token123',
    };

    apiMock.onPost('sessions').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(
      () => useAuth(),
      {
        wrapper: AuthProvider,
      }
    );

    result.current.signIn({
      email: 'user@server.com.br',
      password: '123123',
    });
    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      'token123'
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user)
    );
    expect(result.current.user.email).toEqual('user@server.com.br');
  });

  it('shoul be restore saved data storage with auth', () => {
    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation((key) => {
        switch (key) {
          case '@GoBarber:token':
            return 'token123';

          case '@GoBarber:user':
            return JSON.stringify({
              id: 'userID',
              name: 'UserName',
              email: 'user@server.com.br',
            });
          default:
            return null;
        }
      });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('user@server.com.br');
  });

  it('shoul be able sign out', async () => {
    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation((key) => {
        switch (key) {
          case '@GoBarber:token':
            return 'token123';

          case '@GoBarber:user':
            return JSON.stringify({
              id: 'userID',
              name: 'UserName',
              email: 'user@server.com.br',
            });
          default:
            return null;
        }
      });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toBeCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('shoul be able updade data', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    const user = {
      id: 'userID',
      name: 'UserName',
      email: 'user@server.com.br',
      avatar_url: 'avarlink',
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user)
    );

    expect(result.current.user).toEqual(user);
  });
});

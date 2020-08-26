import React from 'react';
import { render } from '@testing-library/react';

import SignIn from '../../pages/Signin';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
    useHistory: jest.fn(),
  };
});

describe('SignIn Page', () => {
  it('Should be able to sing in', () => {
    const { debug } = render(<SignIn />);

    debug();
  });
});

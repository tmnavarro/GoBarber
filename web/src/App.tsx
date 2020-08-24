import React from 'react';

import GlocalStyle from './styles/global';

import { AuthProvider } from './context/AuthContext';

import Signin from './pages/Signin';
import Signup from './pages/Signup';

const App: React.FC = () => {
  return (
    <>
      <GlocalStyle />
      <AuthProvider>
        <Signin />
      </AuthProvider>
    </>
  );
};

export default App;

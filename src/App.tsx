import React from 'react';
import { WelcomeWindow } from './WelcomeWindow';

export const App = () => {
  return (
    <blessed-box
      style={{
        bg: '#078651',
      }}
    >
      <WelcomeWindow />
    </blessed-box>
  );
};

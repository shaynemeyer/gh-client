import React from 'react';

type TextProps = {
  children: string;
} & any;

export const Text = ({ children, ...rest }: TextProps) => {
  return (
    <blessed-text
      width={children.length}
      content={children}
      style={{
        bg: 'white',
        fg: 'black',
      }}
      {...rest}
    />
  );
};

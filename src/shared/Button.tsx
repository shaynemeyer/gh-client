import React from 'react';

type ButtonProps = {
  children: string;
} & any;

export const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <blessed-button
      content={`< ${children} >`}
      mouse
      focused
      height={1}
      width={children.length + 4}
      align="center"
      left="center"
      bottom={1}
      bg="blue"
      fg="white"
      {...rest}
    />
  );
};

import React from 'react';
import { FC } from 'react';
import { TextBox } from './TextBox';
import { Text } from './Text';

type FieldProps = {
  label: string;
  top?: number | string;
  onSubmit(): void;
};

export const Field: FC<FieldProps> = ({ label, top, onSubmit }) => {
  return (
    <>
      <Text top={top}>{label}</Text>
      <TextBox top={top} left={label.length} onSubmit={onSubmit} />
    </>
  );
};

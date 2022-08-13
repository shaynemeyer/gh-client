import React, { useRef, useEffect } from 'react';
import { Panel } from './Panel';
import { Text } from './Text';
import { Button } from './Button';

type NewEntityErrorProps = {
  onClose(): void;
  error: Error;
};

export const NewEntityError = ({ onClose, error }: NewEntityErrorProps) => {
  const ref = useRef<any>();

  useEffect(() => {
    ref.current.key('enter', onClose);
    return () => {
      ref.current.unkey('enter', onClose);
    };
  }, []);

  return (
    <Panel ref={ref} top="25%" left="center" height={10}>
      <Text left="center">An error occured</Text>
      <Text left="center" top={3}>
        {error.message}
      </Text>

      <Button left="center" bottom={1} onPress={onClose}>
        Enter:OK
      </Button>
    </Panel>
  );
};

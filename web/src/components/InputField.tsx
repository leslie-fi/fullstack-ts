import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLElement> & {
  label: string;
  placeholder: string;
  name: string;
  type: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);
  return (
    <FormControl isInvalid={!!error && touched}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} />
      {touched && error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

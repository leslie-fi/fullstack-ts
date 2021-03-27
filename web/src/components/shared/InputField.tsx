import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  ComponentWithAs,
  InputProps,
  TextareaProps,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLElement> & {
  label?: string;
  name: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
};

let InputOrTextarea:
  | ComponentWithAs<'input', InputProps>
  | ComponentWithAs<'textarea', TextareaProps> = Input;

  export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  if (textarea) InputOrTextarea = Textarea;
  const [field, { error, touched }] = useField(props);
  return (
    <FormControl isInvalid={!!error} id={props.id}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} />
      {touched && error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

import { Button, Box } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React from 'react';
import { useMutation } from 'urql';
import { InputField, Wrapper } from '../components/shared';

interface registerProps {}

const REGISTER_MUT = `
  mutation Register($username: String!, $password: String!){
    register(options: {username: $username, password: $password}) {
      errors {
        field
        message
      }
      user {
        id
        username
      }
    }
  }
`;

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(REGISTER_MUT);
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          return register(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form data-form-id='register'>
            <InputField
              id='register.username'
              name='username'
              placeholder='username'
              label='Username'
              type='text'
              aria-autocomplete='both'
              aria-required='true'
            />
            <Box mt={4}>
              {' '}
              <InputField
                id='register.password'
                name='password'
                placeholder='password'
                label='Password'
                type='password'
                autoComplete='current-password'
                aria-required='true'
              />
            </Box>
            <Button
              mt={4}
              type='submit'
              isLoading={isSubmitting}
              colorScheme='teal'
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;

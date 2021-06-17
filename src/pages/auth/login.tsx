import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@material-ui/core';

import { useAuth } from '../../providers/AuthProvider';
import { CPF } from '../../components/fields/masks';
import dpge_acesso_api from '../../services/DpgeAcessoApi';
import WithoutAuthBase from '../../components/layout/withoutAuthBase';
import WithoutAuth from '../../components/auth/withoutAuth';

const Login: React.FC = () => {
  const [disabled, setDisabled] = useState(false);
  const [cpf, setCpf] = useState('');
  const [cpfMessage, setCpfMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const { setAuthenticated } = useAuth();

  const clearState = () => {
    setDisabled(false);
    setCpfMessage('');
    setPasswordMessage('');
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setCpfMessage('');
    setPasswordMessage('');

    if (cpf && password) {
      setDisabled(true);

      dpge_acesso_api
        .post('authenticate', {
          cpf: cpf.replace(/[^\d]+/g, ''),
          password: password,
        })
        .then(response => {
          if (response.data) {
            localStorage.setItem('current-user', JSON.stringify(response.data));
            localStorage.setItem('current-user-last-check', `${Date.now()}`);
            setAuthenticated(true);
          } else {
            setDisabled(false);
            setCpfMessage('Usuário respectivo não tem permissão de acesso.');
          }
        })
        .catch(error => {
          clearState();

          let field = error.response.data[0].field;

          if (field == 'cpf') {
            setCpfMessage('Não existe usuário respectivo a esse CPF.');
          }

          if (field == 'password') {
            setPasswordMessage('Senha incorreta.');
          }
        });
    }
  };

  return (
    <WithoutAuthBase
      link={
        <Typography>
          <Link color="primary" href="/auth/password/recover">
            Esqueceu sua senha?
          </Link>
        </Typography>
      }
    >
      <form onSubmit={handleSubmit}>
        <TextField
          disabled={disabled}
          required
          autoFocus
          fullWidth
          variant="outlined"
          id="cpf"
          label="CPF"
          name="cpf"
          autoComplete="cpf"
          InputProps={{
            inputComponent: CPF,
          }}
          onChange={e => {
            setCpf(e.target.value);
          }}
          error={cpfMessage !== ''}
          helperText={cpfMessage}
        />
        <TextField
          disabled={disabled}
          required
          fullWidth
          variant="outlined"
          margin="normal"
          name="password"
          label="Senha"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={e => {
            setPassword(e.target.value);
          }}
          error={passwordMessage !== ''}
          helperText={passwordMessage}
        />
        <Box mt={2}>
          <Button disabled={disabled} fullWidth type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </form>
    </WithoutAuthBase>
  );
};

export default WithoutAuth(Login);

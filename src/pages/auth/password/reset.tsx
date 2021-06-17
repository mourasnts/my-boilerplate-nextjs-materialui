import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import dpge_acesso_api from '../../../services/DpgeAcessoApi';
import withoutAuth from '../../../components/auth/withoutAuth';
import WithoutAuthBase from '../../../components/layout/withoutAuthBase';
import { Token } from '../../../interfaces/Models';

interface Props {
  token: Token;
  not_found: boolean;
}

const AuthPasswordReset: React.FC<Props> = ({ token, not_found }) => {
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [formError, setFormError] = useState('');
  const [message, setMessage] = useState('');
  const [textToBack, setTextToBack] = useState('Lembrei da minha senha');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setDisabled(true);

    dpge_acesso_api
      .post('reset', {
        token: token.token,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then(() => {
        setSuccess(true);
        setMessage('Nova senha definida com sucesso, prossiga para tela de login e tente utilizar a sua nova senha');
        setTextToBack('Ir para página de Login');
      })
      .catch(error => {
        setSuccess(false);
        setDisabled(false);
        if (error.response.data) {
          setFormError(error.response.data[0].message);
        }
      });
  };

  useEffect(() => {
    if (not_found || token.is_revoked) {
      setMessage('Link expirado');
    }
  }, []);

  return (
    <WithoutAuthBase
      link={
        <Link href="/auth/login">
          <a>&larr; {textToBack}</a>
        </Link>
      }
    >
      <Box display={message ? 'block' : 'none'}>
        <Alert style={{ marginBottom: 0 }} variant="filled" severity={success ? 'success' : 'error'}>
          {message}
        </Alert>
      </Box>

      <Box display={message ? 'none' : 'block'}>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <Typography align="justify">
              Olá <strong>{token ? token.user.nome : ''}</strong>,<br />
              Nos informe a sua nova senha e confirme-a.
            </Typography>
          </Box>
          <TextField
            required
            fullWidth
            style={{ marginBottom: 15 }}
            disabled={disabled}
            type="password"
            id="password"
            name="password"
            label="Nova Senha"
            variant="outlined"
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <TextField
            required
            fullWidth
            disabled={disabled}
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            label="Nova Senha Confirmação"
            variant="outlined"
            error={formError !== ''}
            helperText={formError}
            onChange={e => {
              setPasswordConfirmation(e.target.value);
            }}
          />
          <Box mt={2}>
            <Button disabled={disabled} fullWidth type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </Box>
        </form>
      </Box>
    </WithoutAuthBase>
  );
};

export async function getServerSideProps(context: any) {
  const { t } = context.query;

  let response;
  try {
    response = await dpge_acesso_api.get(`/token?t=${t}`);
  } catch (e) {}

  let values: object = { not_found: true };

  if (response) {
    values = { token: response.data, not_found: false };
  }

  return {
    props: { ...values },
  };
}

export default withoutAuth(AuthPasswordReset);

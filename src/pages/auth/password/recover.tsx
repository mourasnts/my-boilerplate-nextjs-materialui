import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import WithoutAuthBase from '../../../components/layout/withoutAuthBase';
import dpge_acesso_api from '../../../services/DpgeAcessoApi';
import withoutAuth from '../../../components/auth/withoutAuth';
import { CPF } from '../../../components/fields/masks';

const AuthPasswordRecover: React.FC = () => {
  const [textToBack, setTextToBack] = useState('Lembrei da minha senha');
  const [hiddenForm, setHiddenForm] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [cpf, setCpf] = useState('');
  const [cpfMessage, setCpfMessage] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setDisabled(true);

    dpge_acesso_api
      .post('recover', {
        cpf: cpf.replace(/[^\d]+/g, ''),
      })
      .then(() => {
        setHiddenForm(true);
        setTextToBack('Voltar');
      })
      .catch(error => {
        setDisabled(false);

        if (error.response.data) {
          if (error.response.data.error.status === 500) {
            setCpfMessage(error.response.data.error.message);
          }

          if (error.response.data.error.status === 404) {
            setCpfMessage('Não existe usuário respectivo ao CPF informado.');
          }
        }
      });
  };

  return (
    <WithoutAuthBase
      link={
        <Typography>
          <Link color="primary" href="/auth/login">
            &larr; {textToBack}
          </Link>
        </Typography>
      }
    >
      <Box display={hiddenForm ? 'block' : 'none'}>
        <Alert style={{ marginBottom: 0 }} variant="filled" severity="success">
          Em instantes, chegará um e-mail contendo as informações necessárias para recuperação da sua senha
        </Alert>
      </Box>

      <Box display={hiddenForm ? 'none' : 'block'}>
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <Typography align="justify">Identifique-se para recuperarmos o seu usuário</Typography>
          </Box>
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

export default withoutAuth(AuthPasswordRecover);

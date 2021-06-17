import { createMuiTheme } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';

// Create a theme instance.
const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: '#003521',
        contrastText: '#fff',
      },
      secondary: {
        main: '#00825e',
        contrastText: '#fff',
      },
      error: {
        main: '#f44336 ',
        contrastText: '#fff',
      },
      background: {
        default: '#EEE',
      },
    },
    overrides: {},
  },
  ptBR,
);

export default theme;

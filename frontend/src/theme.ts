import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#008DC7',
    },
    // secondary: {
    //   main: '#19857b',
    // },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
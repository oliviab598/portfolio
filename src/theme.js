import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#03a9f4",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#F2F3F5",
      secondary: "#A4A4A4",
    },
    card: {
      main: "#1e1e1e",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "'Inter', 'Arial', sans-serif",
    body1: {
      color: "#F2F3F5",
    },
  },
});

export default theme;

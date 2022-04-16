import {
  AppBar,
  Alert,
  Box,
  Button,
  Container,
  FormGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";

import init, { program } from "miden-wasm";
import "./App.css";

function App() {
  const [code, setCode] = React.useState(
    `begin
  push.1
  push.2
  add
end`
  );

  const [output, setOutput] = React.useState({
    init: false,
    success: true,
    text: "",
  });

  const [numOfOutputs, setNumOfOutputs] = React.useState(1);

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Miden Assembly Playground
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <FormGroup row={true}>
            <FormControl variant="outlined" sx={{ minWidth: 120 }} size="small">
              <InputLabel>Outputs</InputLabel>
              <Select
                value={numOfOutputs}
                onChange={(e) => setNumOfOutputs(Number(e.target.value))}
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
          <FormGroup row={true}></FormGroup>
        </Box>
        <Box sx={{ my: 4 }}>
          <CodeMirror
            value={code}
            height="100%"
            theme={oneDark}
            onChange={(value) => setCode(value)}
          />
        </Box>
        <Box sx={{ my: 4 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              init().then(() => {
                try {
                  let resp = program(code, new BigUint64Array(0), numOfOutputs);
                  console.log(resp);
                  setOutput({
                    init: true,
                    success: true,
                    text: resp.join(" "),
                  });
                } catch (error) {
                  setOutput({
                    init: true,
                    success: false,
                    text: "Error: Check the developer console for details.",
                  });
                }
              });
            }}
            endIcon={<SendIcon />}
          >
            Execute
          </Button>
        </Box>
        <Box sx={{ my: 4 }}>
          {output.init ? (
            <Alert
              variant="outlined"
              severity={output.success ? "success" : "error"}
            >
              <Typography color="inherit" component="div">
                <b>{output.text}</b>
              </Typography>
            </Alert>
          ) : (
            <></>
          )}
        </Box>
      </Container>
    </>
  );
}

export default App;

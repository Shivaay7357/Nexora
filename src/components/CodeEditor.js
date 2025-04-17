import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

function CodeEditor() {
  const [code, setCode] = useState('// Write your code here');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleRun = () => {
    // TODO: Implement code execution using Judge0 API
    setOutput('Running code...');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '70vh' }}>
            <Box sx={{ mb: 2 }}>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Language</InputLabel>
                <Select
                  value={language}
                  label="Language"
                  onChange={handleLanguageChange}
                >
                  <MenuItem value="javascript">JavaScript</MenuItem>
                  <MenuItem value="python">Python</MenuItem>
                  <MenuItem value="java">Java</MenuItem>
                  <MenuItem value="cpp">C++</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Editor
              height="calc(70vh - 100px)"
              defaultLanguage={language}
              defaultValue={code}
              onChange={handleEditorChange}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '70vh' }}>
            <Typography variant="h6" gutterBottom>
              Output
            </Typography>
            <Box
              sx={{
                height: 'calc(70vh - 100px)',
                bgcolor: 'background.paper',
                p: 2,
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
              }}
            >
              {output}
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRun}
              sx={{ mt: 2 }}
            >
              Run Code
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CodeEditor; 
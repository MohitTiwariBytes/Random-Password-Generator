import React, { useState } from 'react';
import { Button, TextField, Slider, Checkbox, FormControlLabel, Typography, Container, Box } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './PasswordGenerator.css';

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
    
    let characters = lowerCase;
    if (includeUppercase) characters += upperCase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      generatedPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setPassword(generatedPassword);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  return (
    <Container maxWidth="sm">
      <Box className="password-generator-container" sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom> Password Generator </Typography>
        <Box className="password-display" sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TextField
            variant="outlined"
            value={password}
            readOnly
            fullWidth
          />
          <Button onClick={handleCopy} variant="contained" sx={{ ml: 2 }}>
            <ContentCopyIcon />
          </Button>
        </Box>
        <Box className="controls">
          <Typography gutterBottom>Password Length: {length}</Typography>
          <Slider
            value={length}
            onChange={(e, val) => setLength(val)}
            aria-labelledby="password-length-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={6}
            max={20}
          />
          <FormControlLabel
            control={<Checkbox checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} />}
            label="Include Uppercase Letters"
          />
          <FormControlLabel
            control={<Checkbox checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />}
            label="Include Numbers"
          />
          <FormControlLabel
            control={<Checkbox checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />}
            label="Include Symbols"
          />
        </Box>
        <Button onClick={generatePassword} variant="contained" color="primary" sx={{ mt: 2 }}>
          Generate Password
        </Button>
      </Box>
    </Container>
  );
};

export default PasswordGenerator;

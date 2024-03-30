import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const SignIn = ({ onSignIn, isAuthenticated }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://tiny-jade-ostrich-tux.cyclic.cloud/signin', {
        username,
        password,
      });
      if (response.data && response.data.token) {
        onSignIn(username);
        navigate('/');
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.errorMessage || "Error signing in. Please try again.");
      console.error("Error signing in", error.response?.data || error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Sign In
        </Typography>
        {errorMsg && (
          <Typography variant="body1" color="error" align="center" gutterBottom>
            {errorMsg}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
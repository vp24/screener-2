import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://tiny-jade-ostrich-tux.cyclic.cloud/signup', {
        username,
        password,
      });
      
      if (response.data && response.data.message) {
        console.log(`User ${username} signed up with message: ${response.data.message}`);
        alert('Successfully signed up! Redirecting to Sign In page...');
        setError('');
        navigate('/signin');
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.error || 'Sign up failed. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Sign Up
        </Typography>
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
          {error && (
            <Typography variant="body1" color="error" align="center" gutterBottom>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
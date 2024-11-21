// client/src/components/Login.tsx

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

const LoginContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  padding: 20px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AuthService.login(username, password);
      navigate('/transactions');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Balansi Login
          </Typography>
          <LoginForm onSubmit={handleLogin}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CardActions>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </CardActions>
          </LoginForm>
        </CardContent>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;

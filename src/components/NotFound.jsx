import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const NotFound = () => {

  const navigate = useNavigate()

  const theme = useTheme()

  return (
    <Box
      sx={{
        textAlign: 'center',
        display: 'flex',
        minHeight: '80vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2">{"404"}</Typography>
      <Typography variant="h6">{"Page not found"}</Typography>
      <Button
        onClick={() => navigate('/')}
        sx={{
          color: theme.palette.mode === 'dark' ? 'white' : 'black',
          border: theme.palette.mode === 'dark' ? '1px solid white' : '1px solid black',
          marginTop: '15px'
        }}
      >
        {"Back to Home"}
      </Button>
    </Box>
  )
}

export default NotFound;

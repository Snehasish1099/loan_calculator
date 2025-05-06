import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Header from './components/Header';
import NotFound from './components/NotFound';
import HomePage from './components/HomePage';

import { useTheme } from '@mui/material/styles';
import CurrencyTable from './components/CurrencyTable';

const App = () => {

  const theme = useTheme();

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exchange_rates" element={<CurrencyTable />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </>

  );
};

export default App;
import React, { useEffect, useState } from 'react';
import {
  Paper, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, CircularProgress, TablePagination, Box
} from '@mui/material';
import { LoanHooks } from '../container/Hooks';
import { useCurrency } from '../context/CurrencyContext';
import NotFound from './NotFound';

const CurrencyTable = () => {
  const { exchangeRates, loading, error, getExchangeRatesApiCall } = LoanHooks();

  const { currency } = useCurrency()

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const rateEntries = Object.entries(exchangeRates || {});

  useEffect(() => {
    getExchangeRatesApiCall(currency);
  }, []);




  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 3 }}>
        <Typography color="error" align="center">{error}</Typography>
        <NotFound />
      </Box>
    );
  }

  return (
    <Paper sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" gutterBottom>Currency Exchange Rates ({currency})</Typography>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: 'background.paper', fontWeight: 'bold' }}>Currency</TableCell>
              <TableCell sx={{ backgroundColor: 'background.paper', fontWeight: 'bold' }}>Rate ({currency})</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rateEntries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(([currency, value]) => (
                <TableRow key={currency} hover>
                  <TableCell>{currency}</TableCell>
                  <TableCell>{value.toFixed(2)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rateEntries.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10]}
      />
    </Paper>
  );
};

export default CurrencyTable;

import React from 'react';
import { MenuItem, Select, FormControl, InputLabel, Container, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';

const AmortizationTableWithCurrency = ({ currency, onCurrencyChange, emi, schedule, onReset }) => {

  const currencyArr = [
    { name: "INR", value: "INR" },
    { name: "USD", value: "USD" },
    { name: "EUR", value: "EUR" },
  ]

  if (schedule.length === 0) return null;

  return (
    <Container sx={{ mt: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">
          Monthly EMI: {currency} {emi.toFixed(2)}
        </Typography>
      </Box>

      <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Currency</InputLabel>
            <Select value={currency} label="Currency" onChange={onCurrencyChange}>
              {currencyArr.map((item, idx) => (
                <MenuItem key={idx} value={item.value}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm="auto">
          <Button
            fullWidth
            onClick={onReset}
            sx={{
              color: 'purple',
              border: '1px solid purple',
              ":hover": { color: 'cyan', border: '1px solid cyan' }
            }}
          >
            Reset Table
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>Principal</TableCell>
              <TableCell>Interest</TableCell>
              <TableCell>Remaining Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.month}</TableCell>
                <TableCell>{row.principal.toFixed(2)} {currency}</TableCell>
                <TableCell>{row.interest.toFixed(2)} {currency}</TableCell>
                <TableCell>{row.balance.toFixed(2)} {currency}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AmortizationTableWithCurrency;

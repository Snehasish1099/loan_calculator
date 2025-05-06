import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import LoanForm from './LoanForm';
import AmortizationTableWithCurrency from './AmortizationTableWithCurrency';
import { LoanHooks } from '../container/Hooks';
import { useCurrency } from '../context/CurrencyContext';

const HomePage = () => {
  const { currency, setCurrency } = useCurrency()
  const { emi, schedule, calculateEMI, setSchedule, exchangeRates, getExchangeRatesApiCall } = LoanHooks();

  useEffect(() => {
    getExchangeRatesApiCall(currency)
  }, [])

  const currentRate = exchangeRates[currency] || 1

  const resetSchedule = () => setSchedule([]);

  return (
    <Container>
      <Typography variant="h4" align="start" sx={{ px: { xs: 2, sm: 3 }, mt: { xs: 3, sm: 4 } }}>
        Loan Calculator Dashboard
      </Typography>
      <LoanForm calculateEMI={calculateEMI} />
      <AmortizationTableWithCurrency currency={currency} onCurrencyChange={(e) => setCurrency(e.target.value)} emi={emi} schedule={schedule} onReset={resetSchedule} rate={currentRate}/>
    </Container>
  );
};

export default HomePage;

import { useState } from "react";
import axios from 'axios';

export const LoanHooks = () => {

    const [emi, setEMI] = useState(0);
    const [schedule, setSchedule] = useState([]);

    const calculateEMI = (P, R, Y) => {
        const N = Y * 12;
        const r = R / (12 * 100);
        const emiVal = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
        setEMI(emiVal);

        let balance = P;
        const amortization = [];

        for (let i = 1; i <= N; i++) {
            const interest = balance * r;
            const principal = emiVal - interest;
            balance -= principal;

            amortization.push({
                month: i,
                principal: Math.max(principal, 0),
                interest: Math.max(interest, 0),
                balance: Math.max(balance, 0),
            });

            if (balance <= 0.01) break;
        }

        setSchedule(amortization);
    };


    const [exchangeRates, setExchangeRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getExchangeRatesApiCall = async (currency) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://v6.exchangerate-api.com/v6/49857832993a5fd3cc76f057/latest/${currency}`
            );

            setExchangeRates(response?.data?.conversion_rates);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        calculateEMI,
        emi,
        schedule,
        setSchedule,

        getExchangeRatesApiCall,
        exchangeRates,
        loading,
        error
    }
}
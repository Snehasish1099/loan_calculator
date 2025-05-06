import React, { useState } from 'react';
import { TextField, Button, Container, Box, Grid } from '@mui/material';

const LoanForm = ({ calculateEMI }) => {
  const [inputs, setInputs] = useState({ principal: '', rate: '', duration: '' });
  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      if (e.target.value.trim() === '' || isNaN(e.target.value) || Number(e.target.value) <= 0) {
        newErrors[e.target.name] = `Enter a valid ${e.target.name}`;
      } else {
        delete newErrors[e.target.name];
      }

      return newErrors;
    });
  };

  const handleSubmit = () => {
    if (validate()) {
      calculateEMI(Number(inputs.principal), Number(inputs.rate), Number(inputs.duration));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!inputs.principal || isNaN(inputs.principal) || Number(inputs.principal) <= 0) {
      newErrors.principal = 'Enter a valid loan amount';
    }
    if (!inputs.rate || isNaN(inputs.rate) || Number(inputs.rate) <= 0) {
      newErrors.rate = 'Enter a valid interest rate';
    }
    if (!inputs.duration || isNaN(inputs.duration) || Number(inputs.duration) <= 0) {
      newErrors.duration = 'Enter a valid duration';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Container sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          flexWrap: 'wrap',
          mb: 2,
        }}
      >
        <TextField
          label="Loan Amount"
          name="principal"
          fullWidth
          value={inputs.principal}
          onChange={handleChange}
          error={!!errors.principal}
          helperText={errors.principal}
          sx={{ flex: 1 }}
        />
        <TextField
          label="Interest Rate (%)"
          name="rate"
          fullWidth
          value={inputs.rate}
          onChange={handleChange}
          error={!!errors.rate}
          helperText={errors.rate}
          sx={{ flex: 1 }}
        />
        <TextField
          label="Duration (in years)"
          name="duration"
          fullWidth
          value={inputs.duration}
          onChange={handleChange}
          error={!!errors.duration}
          helperText={errors.duration}
          sx={{ flex: 1 }}
        />
      </Box>

      {/* Submit Button */}
      <Button variant="contained" onClick={handleSubmit}>
        {"Calculate EMI"}
      </Button>
    </Container>

  );
};

export default LoanForm;

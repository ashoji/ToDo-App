import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: '#e0f7fa', position: 'fixed', bottom: 0, width: '100%' }}>
      <Typography variant="body1" align="center">
        © 2024 Contoso, Ltd.
      </Typography>
    </Box>
  );
};

export default Footer;
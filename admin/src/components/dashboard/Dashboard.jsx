import React from "react";
import {Button,Box} from '@mui/material';

const Dashboard = (props ) => {
  return (
    <Box 
    m={1}
    display="flex"
    justifyContent="center"
    alignItems="center"
    sx={{
      marginTop: 50
    }}
    >
    <a style={{outline:'none', border:'none', textDecoration:'none'}} href="https://analytics.google.com/analytics/web/#/p345404977/reports/intelligenthome?params=_u..nav%3Dmaui">
    <Button variant="contained">
              Google Analytic
    </Button>
    </a>
    </Box>
  );
};
export default Dashboard;

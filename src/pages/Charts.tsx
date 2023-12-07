import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ChartA from '../components/charts/ChartA';
import ChartB from '../components/charts/ChartB';
import ChartC from '../components/charts/ChartC';
import ChartD from '../components/charts/ChartD';

const DashboardContainer = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Charts = () => {
  return (
    <DashboardContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <StyledPaper>
            {/* Replace with your actual chart component */}
            <ChartA />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <StyledPaper>
            {/* Replace with your actual chart component */}
            <ChartB />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <StyledPaper>
            {/* Replace with your actual chart component */}
            <ChartC />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <StyledPaper>
            {/* Replace with your actual chart component */}
            <ChartD />
          </StyledPaper>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default Charts;

import React, { useState } from 'react';
import axios from 'axios';
import { Container, Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchForm from './components/SearchForm';
import DataDisplay from './components/DataDisplay';
import Financials from './components/Financials';
import YahooDataComponent from './components/YahooDataComponent';
import CombinedChart from './components/CombinedChart';
import StockName from './components/StockName';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Loading from './components/Loading';

const theme = createTheme({
  // Customize your theme here
});

const App = () => {
  const [data, setData] = useState(null);
  const [yahooData, setYahooData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scrapedLink, setScrapedLink] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const fetchData = async (query = '') => {
    try {
      setLoading(true);
      setError(null);
      const response = query
        ? await axios.post("https://tiny-jade-ostrich-tux.cyclic.cloud/search/", { query })
        : await axios.get('https://tiny-jade-ostrich-tux.cyclic.cloud/api/scrape');
      const scrapeResponse = await axios.get(`https://tiny-jade-ostrich-tux.cyclic.cloud/api/scrape?query=${response.data.result || ''}`);
      setData(scrapeResponse.data);
      setScrapedLink(response.data.result);

      const yahooResponse = await axios.get(`https://tiny-jade-ostrich-tux.cyclic.cloud/api/yahoo?query=${query}`);
      setYahooData(yahooResponse.data);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Error fetching data');
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container maxWidth="lg">
          <Box my={4}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Typography variant="h4" component="h1">
                InfoWolf
              </Typography>

              {isAuthenticated ? (
                <>
                  <Typography variant="body1">Welcome, {username}!</Typography>
                  <Button variant="contained" onClick={() => setIsAuthenticated(false)}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <Box>
                  <Button component={Link} to="/signin" variant="outlined" style={{ marginRight: '10px' }}>
                    Sign In
                  </Button>
                  <Button component={Link} to="/signup" variant="contained">
                    Sign Up
                  </Button>
                </Box>
              )}
            </Box>

            <Routes>
              <Route path="/" element={
                isAuthenticated ? (
                  <>
                    <SearchForm onSearch={fetchData} />
                    {loading ? (
                      <Loading />
                    ) : error ? (
                      <Alert severity="error">{error}</Alert>
                    ) : (
                      <>
                        {scrapedLink && (
                          <Box textAlign="center" mb={4}>
                            <StockName url={scrapedLink} />
                          </Box>
                        )}
                        {data && <Financials data={data} scrapedLink={scrapedLink} />}
                        {data && <DataDisplay data={data} />}
                        {data && <CombinedChart data={data} />}
                        {yahooData && <YahooDataComponent yahooData={yahooData} />}
                      </>
                    )}
                    <Typography variant="body2" align="center">
                      This site is for educational use only. Commercial use is not allowed.
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body1" align="center">
                    Please sign in to access the application.
                  </Typography>
                )
              } />
              <Route path="/signin" element={<SignIn onSignIn={(user) => {
                setIsAuthenticated(true);
                setUsername(user);
              }} isAuthenticated={isAuthenticated} />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
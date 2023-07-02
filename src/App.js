import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import SearchForm from './components/SearchForm';
import Loading from './components/Loading';
import DataDisplay from './components/DataDisplay';
import Financials from './components/Financials';
import YahooDataComponent from './components/YahooDataComponent';
import CombinedChart from './components/CombinedChart';
import StockName from './components/StockName';
import { Box } from '@mui/material';

const App = () => {
  const [data, setData] = useState(null);
  const [yahooData, setYahooData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scrapedLink, setScrapedLink] = useState('');

  const url = 'https://screener-api.onrender.com/';

  const fetchData = async (query = '') => {
    try {
      setLoading(true);
      setError(null);
      const response = query
        ? await axios.post("https://screener-api.onrender.com/search/", { query })
        : await axios.get('https://screener-api.onrender.com/api/scrape');
      const scrapeResponse = await axios.get(`https://screener-api.onrender.com/api/scrape?query=${response.data.result || ''}`);
      setData(scrapeResponse.data);
      setScrapedLink(response.data.result); // Set the selected link here

      // Fetch Yahoo data
      const yahooResponse = await axios.get(`https://screener-api.onrender.com/api/yahoo?query=${query}`);
      setYahooData(yahooResponse.data);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Error fetching data');
      setLoading(false);
    }
  };

  return (
    <Box className="container" style={{ overflowX: 'auto' }}>
      <h1>MarketSleeper</h1>
      <SearchForm onSearch={fetchData} />
      {loading ? (
        <Loading />
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          {scrapedLink && (
            <>
              <p>Selected Link: {scrapedLink}</p>
              <StockName url={scrapedLink} />
            </>
          )}
          {data && <Financials data={data} scrapedLink={scrapedLink} />}
          {data && <DataDisplay data={data} />}
          {data && <CombinedChart data={data} />}
          {yahooData && <YahooDataComponent yahooData={yahooData} />}
        </>
      )}
    </Box>
  );
};

export default App;

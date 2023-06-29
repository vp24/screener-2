  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import './App.css';
  import SearchForm from './components/SearchForm';
  import Loading from './components/Loading';
  import DataDisplay from './components/DataDisplay';
  import Pr10TextsDisplay from './components/Pr10TextsDisplay';
  import Financials from './components/Financials';
  import YahooDataComponent from './components/YahooDataComponent';
  import CombinedChart from './components/CombinedChart';
  import StockName from './components/StockName';



  const App = () => {
    const [data, setData] = useState([]);
    const [yahooData, setYahooData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [scrapedLink, setScrapedLink] = useState('');


    // useEffect(() => {
    //   fetchData();
    // }, []);

    const fetchData = async (query = '') => {
      try {
        setLoading(true);
        setError(null);
        const response = query
          ? await axios.post('http://localhost:3001/search', { query })
          : await axios.get('http://localhost:3001/api/scrape');
        const scrapeResponse = await axios.get(`http://localhost:3001/api/scrape?query=${response.data.result || ''}`);
        setData(scrapeResponse.data);
        setScrapedLink(response.data.result); // Set the selected link here
    
        // Fetch Yahoo data
        const yahooResponse = await axios.get(`http://localhost:3001/api/yahoo?query=${query}`);
        setYahooData(yahooResponse.data);
    
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    
    
    

    return (
      <div className="container">
        <h1>Scraper</h1>
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
            {/* <Pr10TextsDisplay pr10Texts={data.map(({ pr10Text }) => pr10Text)} /> */}
            <Financials data={data} scrapedLink={scrapedLink} />
            <DataDisplay data={data} />
            <CombinedChart data={data} />
            <YahooDataComponent yahooData={yahooData} />
          </>
        )}
      </div>
    );
  };

  export default App;

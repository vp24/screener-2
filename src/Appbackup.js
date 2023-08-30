// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';
// import SearchForm from './components/SearchForm';
// import Loading from './components/Loading';
// import DataDisplay from './components/DataDisplay';
// import Financials from './components/Financials';
// import YahooDataComponent from './components/YahooDataComponent';
// import CombinedChart from './components/CombinedChart';
// import StockName from './components/StockName';
// import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import { Box } from '@mui/material';

// const App = () => {
//   const [data, setData] = useState(null);
//   const [yahooData, setYahooData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [scrapedLink, setScrapedLink] = useState('');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [username, setUsername] = useState('');

//   const fetchData = async (query = '') => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = query
//         ? await axios.post("https://screener-api.onrender.com/search/", { query })
//         : await axios.get('https://screener-api.onrender.com/api/scrape');
//       const scrapeResponse = await axios.get(`https://screener-api.onrender.com/api/scrape?query=${response.data.result || ''}`);
//       setData(scrapeResponse.data);
//       setScrapedLink(response.data.result);

//       const yahooResponse = await axios.get(`https://screener-api.onrender.com/api/yahoo?query=${query}`);
//       setYahooData(yahooResponse.data);

//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setError('Error fetching data');
//       setLoading(false);
//     }
//   };

//   return (
//     <Router>
//       <Box className="container">
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//           <h1>InfoWolf</h1>

//           {isAuthenticated ? (
//             <>
//               <span>Welcome, {username}!</span>
//               <button onClick={() => setIsAuthenticated(false)}>Sign Out</button>
//             </>
//           ) : (
//             <div>
//               <Link to="/signin" style={{ marginRight: '10px' }}>Sign In</Link>
//               <Link to="/signup">Sign Up</Link>
//             </div>
//           )}
//         </div>

//         <Routes>
//           <Route path="/" element={
//             isAuthenticated ? (
//               <>
//                 <SearchForm onSearch={fetchData} />
//                 {loading ? (
//                   <Loading />
//                 ) : error ? (
//                   <p className="error">{error}</p>
//                 ) : (
//                   <>
//                     {scrapedLink && (
//                       <Box className="stock-name-container">
//                         <StockName url={scrapedLink} />
//                       </Box>
//                     )}
//                     {data && <Financials data={data} scrapedLink={scrapedLink} />}
//                     {data && <DataDisplay data={data} />}
//                     {data && <CombinedChart data={data} />}
//                     {yahooData && <YahooDataComponent yahooData={yahooData} />}
//                   </>
//                 )}
//                 <p className="small-text">
//                   This site is for educational use only. Commercial use is not allowed.
//                 </p>
//               </>
//             ) : (
//               <Navigate to="/signin" replace />
//             )
//           } />
//           <Route path="/signin" element={<SignIn onSignIn={(user) => {
//             setIsAuthenticated(true);
//             setUsername(user);
//           }} isAuthenticated={isAuthenticated} />} />
//           <Route path="/signup" element={<SignUp />} />
//         </Routes>
//       </Box>
//     </Router>
//   );
// }

// export default App;

const StockName = ({ url }) => {
    const getStockNameFromURL = (url) => {
      const urlSegments = url.split('/');
      const lastSegmentIndex = urlSegments.indexOf('finances') - 1;
      
      let stockName = urlSegments[lastSegmentIndex];
      const lastDashIndex = stockName.lastIndexOf('-');
      
      // Remove everything after the last '-'
      if (lastDashIndex > 0) {
        stockName = stockName.substring(0, lastDashIndex);
      }
      
      return stockName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  
    return (
      <>
        {url && <h2>Stock: {getStockNameFromURL(url)}</h2>}
      </>
    )
  }
  
  export default StockName;
  
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [stocks, setStocks] = useState([]);
  const [crypto, setCrypto] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data when component mounts
    const fetchData = async () => {
      try {
        // Fetch stocks data
        const stocksResponse = await axios.get('/api/markets/stocks');
        setStocks(stocksResponse.data.stocks);

        // Fetch crypto data
        const cryptoResponse = await axios.get('/api/markets/crypto');
        setCrypto(cryptoResponse.data.crypto);

        // Fetch news
        const newsResponse = await axios.get('/api/news');
        setNews(newsResponse.data.news);

        setLoading(false);
      } catch (err) {
        setError('Error fetching data. Please try again later.');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  // Format number with 2 decimal places and add + for positive numbers
  const formatNumber = (num) => {
    const number = parseFloat(num);
    return number > 0 ? `+${number.toFixed(2)}` : number.toFixed(2);
  };

  // Get color class based on value (green for positive, red for negative)
  const getChangeClass = (value) => {
    return value >= 0 ? 'positive' : 'negative';
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Invest Smart</h1>
      </header>

      <main className="main-content">
        <section className="market-section">
          <h2>Stock Market</h2>
          <div className="market-grid">
            {stocks.map((stock, index) => (
              <div key={`stock-${index}`} className="market-card">
                <div className="market-card-header">
                  <h3>{stock.symbol}</h3>
                  <span className="stock-name">{stock.name}</span>
                </div>
                <div className="market-card-body">
                  <div className="price">${stock.price.toFixed(2)}</div>
                  <div className={`change ${getChangeClass(stock.change)}`}>
                    {formatNumber(stock.change)} ({formatNumber(stock.change_percent)}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="market-section">
          <h2>Cryptocurrency</h2>
          <div className="market-grid">
            {crypto.map((currency, index) => (
              <div key={`crypto-${index}`} className="market-card">
                <div className="market-card-header">
                  <h3>{currency.symbol}</h3>
                  <span className="stock-name">{currency.name}</span>
                </div>
                <div className="market-card-body">
                  <div className="price">${currency.price.toLocaleString()}</div>
                  <div className={`change ${getChangeClass(currency.change)}`}>
                    {formatNumber(currency.change)} ({formatNumber(currency.change_percent)}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="news-section">
          <h2>Latest Financial News</h2>
          <div className="news-grid">
            {news.map((item, index) => (
              <a key={`news-${index}`} href={item.url} className="news-card" target="_blank" rel="noopener noreferrer">
                <h3>{item.title}</h3>
                <div className="news-meta">
                  <span className="news-source">{item.source}</span>
                  <span className="news-date">{item.date}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Invest Smart. All data is for demonstration purposes only.</p>
      </footer>
    </div>
  );
}

export default App;

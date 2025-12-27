from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample data for demonstration
SAMPLE_STOCKS = [
    {"symbol": "AAPL", "name": "Apple Inc.", "price": 175.34, "change": 1.23, "change_percent": 0.71},
    {"symbol": "MSFT", "name": "Microsoft", "price": 330.12, "change": -2.34, "change_percent": -0.70},
    {"symbol": "GOOGL", "name": "Alphabet Inc.", "price": 138.56, "change": 0.78, "change_percent": 0.57},
]

SAMPLE_CRYPTO = [
    {"symbol": "BTC", "name": "Bitcoin", "price": 42000.50, "change": 1200.45, "change_percent": 2.94},
    {"symbol": "ETH", "name": "Ethereum", "price": 2200.30, "change": -45.20, "change_percent": -2.01},
    {"symbol": "SOL", "name": "Solana", "price": 105.67, "change": 5.23, "change_percent": 5.21},
]

SAMPLE_NEWS = [
    {"title": "Market Update: Tech Stocks Rally", "source": "Financial Times", "date": "2023-12-19", "url": "#"},
    {"title": "Bitcoin Surpasses $42,000", "source": "CoinDesk", "date": "2023-12-19", "url": "#"},
    {"title": "Federal Reserve Holds Interest Rates Steady", "source": "Wall Street Journal", "date": "2023-12-19", "url": "#"},
]

@app.route('/api/markets/stocks', methods=['GET'])
def get_stocks():
    """Endpoint to get stock market data"""
    return jsonify({"stocks": SAMPLE_STOCKS})

@app.route('/api/markets/crypto', methods=['GET'])
def get_crypto():
    """Endpoint to get cryptocurrency data"""
    return jsonify({"crypto": SAMPLE_CRYPTO})

@app.route('/api/news', methods=['GET'])
def get_news():
    """Endpoint to get financial news"""
    return jsonify({"news": SAMPLE_NEWS})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)

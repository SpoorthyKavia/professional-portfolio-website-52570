const path = require('path');
const JsonStore = require('./jsonStore');

const portfolioPath = path.join(__dirname, '..', 'data', 'portfolio.json');
const store = new JsonStore(portfolioPath);

class PortfolioService {
  getPortfolio() {
    return store.readJson(null);
  }
}

module.exports = new PortfolioService();

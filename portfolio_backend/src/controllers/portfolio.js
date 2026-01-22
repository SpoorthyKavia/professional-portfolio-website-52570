const portfolioService = require('../services/portfolio');

class PortfolioController {
  getPortfolio(req, res) {
    const data = portfolioService.getPortfolio();
    if (!data) {
      return res.status(500).json({
        status: 'error',
        message: 'Portfolio data is missing.'
      });
    }
    return res.status(200).json(data);
  }
}

module.exports = new PortfolioController();

const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const expectedKey = process.env.API_KEY || 'dev-api-key';

  if (!apiKey) {
    return res.status(401).json({ error: 'API key required. Send X-API-Key header.' });
  }
  if (apiKey !== expectedKey) {
    return res.status(403).json({ error: 'Invalid API key.' });
  }
  next();
};

module.exports = apiKeyAuth;

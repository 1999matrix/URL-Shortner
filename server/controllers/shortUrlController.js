// controllers/shortUrlController.js
const ShortUrl = require('../models/ShortUrl');

exports.generate = async (req, res) => {
    const fullUrl = req.body.fullUrl;
    const userId = req.user._id;
  
    try {
      const url = await ShortUrl.findOne({ full: fullUrl });
  
      if (url) {
        res.status(200).json({ shortUrl: url.short });
      } else {
        const shortCode = Math.random().toString(36).substring(2, 7);
        const shortUrl = `http://${req.headers.host}/${shortCode}`;
  
        const newUrl = new ShortUrl({ full: fullUrl, short: shortCode, userId });
        await newUrl.save();
  
        res.status(201).json({ shortUrl });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.redirect = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await ShortUrl.findOne({ short: shortUrl });

    if (url) {
      url.clicks++;
      await url.save();
      res.redirect(url.full);
    } else {
      res.status(404).json({ message: 'URL not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
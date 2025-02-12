const express = require('express');
const cors = require('cors');
const scrapeInstagram = require('./scraper.cjs');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/scrape/:username', async (req, res) => {
    try {
        const { username } = req.params;
        console.log(`📡 Request received for: ${username}`);

        const data = await scrapeInstagram(username);

        if (data.error) {
            console.error('❌ Scraping failed:', data.error);
            return res.status(400).json({ error: data.error });
        }

        res.json(data);
    } catch (error) {
        console.error('🚨 Server Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

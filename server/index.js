const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/scrape', async (req, res) => {
    const { url } = req.query;

    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const content = $('article').html(); 

        res.json({ content });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while scraping the website');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

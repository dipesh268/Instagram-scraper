const puppeteer = require('puppeteer');

async function scrapeInstagram(username) {
    try {
        console.log(`🚀 Scraping Instagram profile: ${username}`);

        // Launch Puppeteer
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();
        await page.goto(`https://www.instagram.com/${username}/`, {
            waitUntil: 'networkidle2',
        });

        // Wait for profile data to load
        await page.waitForSelector('header section', { timeout: 5000 });

        // Extract profile data
        const data = await page.evaluate(() => {
            function getText(selector) {
                const el = document.querySelector(selector);
                return el ? el.innerText.trim() : 'N/A';
            }

            function getStats() {
                const stats = document.querySelectorAll('ul li span span');
                return {
                    posts: stats[0] ? stats[0].innerText.trim() : 'N/A',
                    followers: stats[1] ? stats[1].innerText.trim() : 'N/A',
                };
            }

            return {
                username: getText('header section h2, header section h1'),
                ...getStats(),
            };
        });

        console.log('✅ Data Scraped:', data);
        await browser.close();

        if (data.username === 'N/A') {
            return { error: 'Could not fetch data, profile may be private or unavailable' };
        }

        return data;
    } catch (error) {
        console.error('🚨 Puppeteer Error:', error.message);
        return { error: 'Failed to scrape data' };
    }
}

module.exports = scrapeInstagram;

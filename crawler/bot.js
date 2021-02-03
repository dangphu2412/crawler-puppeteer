const puppeteer = require('puppeteer');
const fs = require('fs');
const lazyScript = require('./lazy');

module.exports = async function runCrawl(
    {
        url,
        saveDataPath,
        crawlingScript,
        initWait = {
            state: true,
            time: 5000
        },
        lazy = {
            state: true,
            lazyScript
        },
    }
) {
    if (!url || !saveDataPath) {
        throw new Error("url and saveDataPath are required");
    }

    if (!crawlingScript instanceof Promise) {
        throw new Error("crawlingScript must be promise");
    }

    /**
     * Init bot
     */
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        await page.goto(url);

        if (lazy.state) {
            await lazy.lazyScript(page);
        }

        // Wait state when access page
        if (initWait.state) {
            await page.waitFor(initWait.time);
        }

        const data = await crawlingScript(page);

        fs.writeFileSync(saveDataPath, JSON.stringify(data));

    } catch (error) {
        console.log(error);
    }
    finally {
        browser.close();
    }
}

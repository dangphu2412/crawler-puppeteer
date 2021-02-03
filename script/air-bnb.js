function run(page) {
    return page.evaluate(() => {
        const products = document.querySelectorAll("._8ssblpx");
        const data = [];

        products.forEach((product) => {
            const element = product.querySelector("._gjfol0");
            const name = element.getAttribute("aria-label");
            const linkToDetail = element.getAttribute("href");
            const thumbnail = product.querySelector("._15tommw").getAttribute("href");
            data.push({
                viName: name,
                enName: name,
                thumbnail,
                linkToDetail,
            });
        });
        return data;
    });
}

function processCrawl(page) {
    return new Promise(async (resolve, reject) => {
        try {
            let value = [];

            let currentPage = 1;

            while (currentPage < 2) {
                await page.waitFor(10000);
                const currData = await run(page);

                currentPage += 1;
                await page.waitFor(2000);
                const selectorClick = "._za9j7e";
                await page.click(selectorClick);

                value = [...value, ...currData];
            }

            resolve(value);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = processCrawl;

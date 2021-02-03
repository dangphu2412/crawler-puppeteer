module.exports = function autoScroll(page) {
    return page.evaluate(async () => {
        let totalHeight = 0;
        const timer = setInterval(() => {
            const { scrollHeight } = document.body;
            window.scrollBy(0, 300);
            totalHeight += 300;

            if (totalHeight >= scrollHeight) {
                clearInterval(timer);
            }
        }, 500);
    });
};
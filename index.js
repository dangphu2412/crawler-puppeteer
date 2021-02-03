const bot = require('./crawler/bot');
const crawlingScript = require('./script/air-bnb');

(async () => {
    const url = 'https://www.airbnb.com/s/Hu%E1%BA%BF--Th%E1%BB%ABa-Thi%C3%AAn~Hu%E1%BA%BF--Vietnam/homes?refinement_paths%5B%5D=%2Fhomes&search_type=section_navigation';
    const saveDataPath = './data/test.json';

    await bot({
        url,
        saveDataPath,
        crawlingScript
    });
})()
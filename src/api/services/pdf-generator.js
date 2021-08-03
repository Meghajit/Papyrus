const puppeteer = require('puppeteer');
const scrollToEndOfPage = require('../utils/scroller');

const generate = async (webURL, fileName) => {
    let executionResult;
    const browser = await puppeteer.launch();
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    try {
        await page.goto(webURL,
            {
               waitUntil: 'networkidle2',
            });
        await page.emulateMediaType('screen');
        await scrollToEndOfPage(page);
        await page.pdf({path: fileName, format: 'a4', preferCSSPageSize: true, landscape: true});
        executionResult =  Promise.resolve("PDF generated as " + fileName);
        } catch(e) {
            executionResult = Promise.reject(e.stack);
        } finally {
            await browser.close();
            return executionResult;
        }
    };

exports.generate = generate;
const puppeteer = require('puppeteer');

async function scrollToEndOfPage(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeightScrolled = 0;
            var distanceToScrollPerIteration = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distanceToScrollPerIteration);
                totalHeightScrolled += distanceToScrollPerIteration;

                if(totalHeightScrolled >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 10);
        });
    });
}

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

const generateFromHTML = async (htmlContent, fileName) => {
    let executionResult;
    const browser = await puppeteer.launch();
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    
    try {
        await page.setContent(htmlContent);
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
exports.generateFromHTML = generateFromHTML;
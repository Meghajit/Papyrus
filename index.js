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

(async () => {
  const browser = await puppeteer.launch();
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  await page.goto('https://en.wikipedia.org/wiki/Papyrus', {
    waitUntil: 'networkidle2',
  });
  await page.emulateMediaType('screen');
  await scrollToEndOfPage(page);
  await page.pdf({path: 'webpage.pdf', format: 'a4', preferCSSPageSize: true, landscape: true});
  await browser.close();
  })();
export default async function scrollToEndOfPage(page){
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
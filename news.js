const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log('Получаю новости...\n');

  await page.goto('https://meduza.io', { waitUntil: 'networkidle2' });

  const titles = await page.evaluate(() => {
    return [...document.querySelectorAll('.BlockTitle-first')].map(el => el.innerText);
  });

  console.log(titles.join('\n'));

  await browser.close();
})();

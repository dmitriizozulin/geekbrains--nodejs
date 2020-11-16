const puppeteer = require('puppeteer');

const scrapeNews = async (url, className) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const data = await page.evaluate(className => {
    return [...document.querySelectorAll(`.${className}`)].map(el => el.textContent);
  }, className);

  await browser.close();

  return data;
};

module.exports = {
  scrapeNews,
};

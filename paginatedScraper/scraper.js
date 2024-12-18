const cheerio = require("cheerio");
const requestPromise = require("request-promise");
const objectsToCsv = require("objects-to-csv");
const fs = require("fs");
const exp = require("constants");
async function initScraper(url) {
  let scrapedDataFromSite = [];
  //has 20 paginated pages
  for (let i = 1; i <= 20; i++) {
    console.log(`Scraping page ${i}`);
    const paginatedURL = `${url}page=${i}`;
    const htmlSite = await requestPromise(paginatedURL);
    const $ = cheerio.load(htmlSite);
    let pageData = $(".product-wrapper")
      .map((index, item) => {
        const title = $(item).find(".title").attr("title");
        const price = $(item).find(".price").text();
        const productDescription = $(item).find(".description").text();
        const productImage = $(item).find("img").attr("src");
        const ratings = $(item).find(".ratings").find(".review-count").text();
        return { title, price, productDescription, productImage, ratings };
      })
      .get();

    scrapedDataFromSite.push(pageData);
  }
  return scrapedDataFromSite;
}
async function main() {
  let dataToCSV = [];
  const data = await initScraper(
    "https://webscraper.io/test-sites/e-commerce/static/computers/laptops?"
  );
  console.log(data.length);
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  data.forEach((page) => {
    page.forEach((item) => {
      dataToCSV.push(item);
    });
  });
  let csv = new objectsToCsv(dataToCSV);
  await csv.toDisk("./data.csv");
}
main();

exports.initScraper = initScraper;
module.exports = { initScraper, main };

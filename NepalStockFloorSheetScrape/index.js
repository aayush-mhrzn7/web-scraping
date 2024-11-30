const cheerio = require("cheerio");
const request = require("request-promise");
// this works but cheerio doesnt work with https
async function main() {
  const response = await request.get({
    uri: "https://www.nepalstock.com.np/floor-sheet",
    rejectUnauthorized: false,
  });
  const $ = cheerio.load(response);
  const data = [];
  const tableHeadings = [];
  $(
    "body > app-root > div > main > div > app-floor-sheet > div > div.table-responsive > table > thead > tr"
  ).each((index, item) => {
    const ths = $(item).find("th");
    ths.each((index, item) => {
      tableHeadings.push($(item).text());
    });
  });
  $(
    "body > app-root > div > main > div > app-floor-sheet > div > div.table-responsive > table > tbody > tr"
  ).each((index, item) => {
    const tds = $(item).find("td");
    const tableRow = {};
    tds.each((index, item) => {
      tableRow[tableHeadings[index]] = $(item).text();
    });
    data.push(tableRow);
    console.log(tableRow);
  });
}
main();
9823058309;

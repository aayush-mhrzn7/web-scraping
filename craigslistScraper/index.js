const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const sleep = (ms) => {
  new Promise((r) => setTimeout(r, ms));
};
async function getFromIndex() {
  const data = [];
  for (let i = 1; i <= 14; i++) {
    const response = await axios.get(
      `https://braigslist.vercel.app/jobs/${i}/`
    );
    const $ = cheerio.load(response.data);
    $(".title-blob > a").each((index, item) => {
      const url = $(item).attr("href");
      const title = $(item).text();
      data.push({ title, url });
    });
  }
  console.log(data.length);
  return data;
}
async function getDescriptions(allJobs) {
  const allJobsWithDescriptionPromises = allJobs.map(async (job) => {
    const descriptions = await axios.get(
      `https://braigslist.vercel.app/` + job.url
    );
    await sleep(4000);
    const $ = cheerio.load(descriptions.data);
    const description = $("div").text();
    job.description = description;
    return job;
  });
  const jobListComplete = await Promise.all(allJobsWithDescriptionPromises);
  console.log(jobListComplete);
  fs.writeFileSync("jobs.json", JSON.stringify(jobListComplete));
}
async function getDescriptionsForVersion(allJobs) {
  const allDescriptions = [];
  for (const job of allJobs) {
    const descriptions = await axios.get(
      `https://braigslist.vercel.app/` + job.url
    );
    const $ = cheerio.load(descriptions.data);
    const description = $("div").text();
    job.description = description;
    allDescriptions.push(job);
  }
  fs.writeFileSync("jobs.json", JSON.stringify(jobListComplete));
}
async function getDescriptionsForSleepVersion(allJobs) {
  const allDescriptions = [];
  for (const job of allJobs) {
    const descriptions = await axios.get(
      `https://braigslist.vercel.app/` + job.url
    );
    console.log("rifred");
    await sleep(1000);
    const $ = cheerio.load(descriptions.data);
    const description = $("div").text();
    job.description = description;
    allDescriptions.push(job);
  }
  fs.writeFileSync("jobs.json", JSON.stringify(jobListComplete));
}
async function main() {
  const allJobs = await getFromIndex();
  //   getDescriptions(allJobs);
  getDescriptionsForSleepVersion(allJobs);
  console.log(allJobs);
}
main();

const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

async function main() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://vritjobssuperadmin.netlify.app/login");
    const emailSelector = `input[name="email"]`;
    await page.waitForSelector(emailSelector);
    await page.type(emailSelector, "admin@gmail.com", { delay: 100 });
    const passwordSelector = `input[name="password"]`;
    await page.waitForSelector(passwordSelector);
    await page.type(passwordSelector, "admin", { delay: 100 });
    const submitButtonSelector = `button[type="submit"]`;
    await page.waitForSelector(submitButtonSelector);
    await page.click(submitButtonSelector);
    await page.waitForNavigation();
    await page.goto("https://vritjobssuperadmin.netlify.app/register-managers");
    const firstname = `input[name="first_name"]`;
    const lastname = `input[name="last_name"]`;
    const email = `input[name="email"]`;
    const password = `input[name="password"]`;
    const confirmPassword = `input[name="confirm_password"]`;
    await page.waitForSelector(firstname);
    await page.waitForSelector(lastname);
    await page.waitForSelector(email);
    await page.waitForSelector(password);
    await page.waitForSelector(confirmPassword);
    await page.type(firstname, "johnhikbib", { delay: 50 });
    await page.type(lastname, "donone", { delay: 50 });
    await page.type(email, "johnbanegadon@gmail.com", { delay: 50 });
    await page.type(password, "JohnDoe123@", { delay: 50 });
    await page.type(confirmPassword, "JohnDoe123@", { delay: 50 });
    const registerButton = `.apply-text`;
    await page.waitForSelector(registerButton);
    await page.click(registerButton);
  } catch (error) {
    console.log("Some error occurred:", error);
  }
}

main();

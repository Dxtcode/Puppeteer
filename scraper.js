const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // Set to true for headless mode
  });

  const page = await browser.newPage();

  try {
    await page.goto('https://www.whatismyip.com/');
    
    // Wait for the IP address to load on the page
    await page.waitForSelector('.ip');

    // Extract the public IP address
    const ipAddress = await page.$eval('.ip', (element) => element.textContent.trim());

    const output = {
      my_ip_address: ipAddress,
    };

    console.log(JSON.stringify(output, null, 2));
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
})();

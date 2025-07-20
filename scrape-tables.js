const { chromium } = require('playwright');

async function scrapeAndSum(url) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);
  
  let total = 0;
  const tables = await page.$$('table');
  
  for (const table of tables) {
    const cells = await table.$$('td, th');
    for (const cell of cells) {
      const text = await cell.textContent();
      const number = parseFloat(text.replace(/[^\d.-]/g, ''));
      if (!isNaN(number)) {
        total += number;
      }
    }
  }
  
  await browser.close();
  return total;
}

async function main() {
  const urls = [
    'https://sanand0.github.io/tdsdata/js_table/?seed=76', // Replace with actual URLs
    'https://sanand0.github.io/tdsdata/js_table/?seed=77',
    'https://sanand0.github.io/tdsdata/js_table/?seed=78',
    'https://sanand0.github.io/tdsdata/js_table/?seed=79',
    'https://sanand0.github.io/tdsdata/js_table/?seed=80',
    'https://sanand0.github.io/tdsdata/js_table/?seed=81',
    'https://sanand0.github.io/tdsdata/js_table/?seed=82',
    'https://sanand0.github.io/tdsdata/js_table/?seed=83',
    'https://sanand0.github.io/tdsdata/js_table/?seed=84',
    'https://sanand0.github.io/tdsdata/js_table/?seed=85'
    
    // Add all other URLs here
  ];
  
  let grandTotal = 0;
  
  for (const url of urls) {
    const sum = await scrapeAndSum(url);
    console.log(`Sum for ${url}: ${sum}`);
    grandTotal += sum;
  }
  
  console.log(`GRAND TOTAL: ${grandTotal}`);
}

main().catch(console.error);

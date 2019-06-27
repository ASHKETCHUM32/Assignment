/**
 * @name Google search
 * @desc Searches Google.com for a term and checks if the first link matches. This check should fail.
 */

const assert = require('assert')
const puppeteer = require('puppeteer')
let browser
let page

const opts = {
    headless: false,
    slowMo: 100,
    timeout: 0,
    args: ['--start-maximized', '--window-size=1920,1040'] 
}

before(async () => {
  browser = await puppeteer.launch(opts)
  page = await browser.newPage()
})

describe('Check Google Homepage', () => {
  it('has title "Google"', async () => {
    await page.goto('https://google.com', { waitUntil: 'networkidle0' })
    const title = await page.title()
    assert.equal(title, 'Google')
  }).timeout(3000)

  it('Third search result is my link', async () => {
    await page.type('input[name=q]', 'puppeteer')
    await page.click('input[type="submit"]')
    await page.waitForSelector('a h3')
    const links = await page.$$eval('a h3', anchors => { return anchors.map(a => { return a.textContent }) })
    await page.waitFor(90000)
    assert.equal('Puppeteer - Google Developers', links[3])
    await page.waitFor(90000)
  })
})

after(async () => {
  await page.screenshot({ path: './example.png'})
  await page.close()
  await browser.close()
  
})

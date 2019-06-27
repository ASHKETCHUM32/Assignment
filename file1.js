const puppeteer = require('puppeteer')
const expect = require('chai').expect



let browser 
let page

const opts = {
    headless: false,
    slowMo: 100,
    timeout: 0,
    args: ['--start-maximized', '--window-size=1920,1040'] 
}

before(async ()=>{
  
  browser = await puppeteer.launch(opts);
  page = await browser.newPage();
 
})

after(async ()=>{
	await page.close()
	await browser.close()
})


describe('Shutterstock Login Test', ()=>{

 it('Verify the Login button is shown', async ()=>{
      await page.goto('https://www.shutterstock.com/');

		await page.waitForSelector("[data-automation*='log-in_button']")
	  await page.click("[data-automation*='log-in_button']")
    await page.waitForSelector("[class='o_dialog_theme_dialogContent']", {timeout : 6000})
    
  })

  it('Verify that login popup is shown', async ()=>{
    await page.type('[data-automation*="AuthModal"] input[name="email"]', 'gsingh+test9@shutterstock.com')
    await page.type('[data-automation*="AuthModal"] input[name="password"]','Testing123')
    await page.click('[data-automation*="AuthModal"] .e_c_b>button')
  })

  it('Verify that user is logged in to the site', async ()=>{
    await page.waitForSelector('.dropdown-toggle.navbar-link.hidden-xs',{timeout: 50000})

  })

  it('Verify logged out of the site', async ()=>{
    await page.click('.dropdown-toggle.navbar-link.hidden-xs')
    await page.waitForSelector("a[href*='base/logout']",{timeout: 6000})
    await page.click("a[href*='base/logout']")    
  })
})

/*describe('Shutterstock Sign up Test', ()=>{

it('Verify the Sign up button is shown', async ()=>{
    
    await page.waitForSelector("[data-automation*='SecondaryItems_sign-up_button']")
    await page.click("[data-automation*='SecondaryItems_sign-up_button']")
    await page.waitForSelector("[class*='o_dialog']", {timeout : 6000})
    
  })

  it('Verify that sign up popup is shown', async ()=>{
    await page.type('[class*="o_dialog"] [data-automation*="email"]', 'gsingh+test1259@shutterstock.com')
    await page.type('[class*="o_dialog"] [data-automation*="password"]','Testing123')
    await page.click('[class*="o_dialog"] [data-automation*="submit"]')
  })

  it('Verify that user is logged in to the site', async ()=>{
    await page.waitForSelector('.dropdown-toggle.navbar-link.hidden-xs',{timeout: 50000})

  })

  it('Verify logged out of the site', async ()=>{
    await page.click('.dropdown-toggle.navbar-link.hidden-xs')
    await page.waitForSelector("a[href*='base/logout']",{timeout: 6000})
    await page.click("a[href*='base/logout']")    
  })

})*/

describe('Search functionality Test', ()=>{

  it('Verify Search bar', async ()=>{
    await page.waitForSelector("[data-automation='Searchbar_searchInput_input']")
    
    var string1 = "dragon"
    await page.click("[data-automation='Searchbar_searchInput_input']")
    await page.type("[data-automation='Searchbar_searchInput_input']",string1)
    await page.waitForSelector("[data-automation='SearchBar_search_iconButton']", {timeout : 6000})
    await page.click("[data-automation='SearchBar_search_iconButton']")
    await page.waitFor(4000)
    expect(page.url()).to.equal('https://www.shutterstock.com/search/'+string1)
  })

})




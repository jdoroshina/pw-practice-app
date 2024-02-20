import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
  await page.goto('http:/uitestingplayground.com/ajax')
  await page.getByText('Button Triggering AJAX Request').click()
})

test('Auto waiting', async({page}) => {
  const successButton = page.locator('.bg-success')

  // await successButton.click() //will work

  // const text = await successButton.textContent() //will work

  await successButton.waitFor({state: "attached"}) //creating additional wait for the methods like .allTextContents() which do not have implemented auto wait logic.
  const text = await successButton.allTextContents()  //do not have implemented auto wait logic., so it will be an error
  expect(text).toContain('Data loaded with AJAX get request.')

  await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000}) //default await waiting time is 5 sec
})

test('alternative waits', async({page}) => {
  const successButton = page.locator('.bg-success')

  //___ wait for element
  // await page.waitForSelector('.bg-success')

  //___ wait for particlular response
  await page.waitForResponse('http://uitestingplayground.com/ajaxdata') //url is from network -> ajaxdate -> general

  //___ wait for network calls to be completed (NOT RECOMMENDED)
  await page.waitForLoadState('networkidle')

  const text = await successButton.allTextContents()
  expect(text).toContain('Data loaded with AJAX get request.')

})

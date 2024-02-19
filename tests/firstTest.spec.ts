import {test} from '@playwright/test'

test.beforeEach( async ({page}) => {
  await page.goto('http://localhost:4200/')
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async({page}) => {
  //by Tag name
  page.locator('input')

  //by ID
  await page.locator('#inputEmail1').click()

  //by Class value
  page.locator('.shape-rectangle')

  //by attribute
  page.locator('[placeholder="Email"]')

  //by entire Class value (full)
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

  //combine different selectors
  page.locator('input[placeholder="Email"].shape-rectangle')

  //by Xpath (Not recommended)
  page.locator('//*[@id="inputEmail1"]')

  //partial text match
  page.locator(':text("Using")')

  //by exact text match
  page.locator(':text-is("Using the Grid")')
})
import {test, expect} from '@playwright/test'
import { using } from 'rxjs'

test.beforeEach(async({page}) => {
  await page.goto('http://localhost:4200/')
})

test.describe('Form Layouts page', () => {
  test.beforeEach(async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
  })

  test('input fields', async({page}) => {
    const usingTheGridEmailInput = page.locator('nb-card', {hasText: "USing the Grid"}).getByRole('textbox', {name: "Email"})

    await usingTheGridEmailInput.fill('test@test.com')
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 500}) //method simulate the keystrokes. & can to simulate like slower typing into the input field

    //generic assertion
    const inputValue = await usingTheGridEmailInput.inputValue()
    expect(inputValue).toEqual('test2@test.com')

    //locator assertion
    await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
  })

  test('radio buttons', async ({page}) => {
    const usingTheGridForm = page.locator('nb-card', {hasText: "USing the Grid"})

    // await usingTheGridEmailInput.getByLabel('Option 1').check({force: true}) //in order to bypass this validation of the availability (element is visually-hidden), we need to pass the parameter force.
    await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).check({force: true}) //to select the radio button, the most recommended way is to use Get By role radio and provide the name of the radio button. & To select a radio button use method .check()
    const radioStatus = await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()
    expect(radioStatus).toBeTruthy()
    await expect(usingTheGridForm.getByRole('radio', {name: 'Option 1'})).toBeChecked()

    await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force: true})
    expect(await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy()
    expect(await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy()
  })
})

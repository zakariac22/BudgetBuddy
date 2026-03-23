const { test, expect } = require('@playwright/test')

test('user can log in with real credentials', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Log in' })).toBeVisible()

  // Fill in the form with test credentials
  await page.getByLabel('Email').fill('test@gmail.com')
  await page.getByLabel('Password').fill('Test123!')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page).toHaveURL('/login')
  await expect(page.getByText('Logged in successfully.')).toBeVisible()
})

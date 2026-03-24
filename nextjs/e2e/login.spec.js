const { test, expect } = require('@playwright/test')

test('user can log in and sees success message', async ({ page }) => {
  // Mock the login API response so this test runs in CI without real credentials
  await page.route('/api/login', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        access_token: 'fake-token',
        user: { id: 'test-uid', email: 'test@example.com' },
      }),
    })
  })

  await page.goto('/login')

  await expect(page.getByRole('heading', { name: 'Log in' })).toBeVisible()

  await page.getByLabel('Email').fill('test@example.com')
  await page.getByLabel('Password').fill('password123')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText('Logged in successfully.')).toBeVisible()
})

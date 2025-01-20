// @ts-check
const { test, expect } = require('@playwright/test');

test('Layout 1 | Source Manual', async ({ page }) => {
  // Navigate to the page
  await page.goto('/paypal/layout-1/');
  await expect(page.getByRole('heading', { name: 'Payment Source: Manual' })).toBeVisible();
  await expect(page.locator('#better-payment-form-8a72986').getByRole('img', { name: 'PayPal' })).toBeVisible();
  await page.locator('#better-payment-form-8a72986').getByPlaceholder('First Name').fill('John');
  await page.locator('#better-payment-form-8a72986').getByPlaceholder('Last Name').fill('Doe');
  await page.locator('#better-payment-form-8a72986').getByPlaceholder('Email Address *').fill('john@mailinator.com');
  await page.getByRole('spinbutton').fill('14');
  await page.locator('#better-payment-form-8a72986').getByRole('button', { name: 'Pay with PayPal' }).click();

  // Fill the PayPal form
  await expect(page.getByRole('heading', { name: 'Pay with PayPal' })).toBeVisible();
  await expect(page.getByPlaceholder('Email or mobile number')).toBeVisible();
  await page.getByPlaceholder('Email or mobile number').click();
  await page.getByPlaceholder('Email or mobile number').fill(`${process.env.PAYPAL_PERSONAL_EMAIL}`);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(`${process.env.PAYPAL_PASSWORD}`);
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Log In' }).click();

  // Submit the payment
  await expect(page.getByTestId('merchant-name')).toBeVisible();
  await page.getByTestId('submit-button-initial').click();
  await expect(page.getByTestId('donepage-header-container')).toBeVisible();
  await page.getByTestId('donepage-return-to-merchant-button').click();

  // Check the success page
  await expect(page.getByRole('heading', { name: 'Manual Payment Successful' })).toBeVisible();
  await expect(page.getByText('Transaction Number :')).toBeVisible();
  await expect(page.getByText('Thank you for your payment')).toBeVisible();
});
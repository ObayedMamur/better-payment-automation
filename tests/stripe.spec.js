// @ts-check
const { test, expect } = require('@playwright/test');

test('Layout 1 | Source Manual', async ({ page }) => {
  // Navigate to the page
await page.goto('/stripe/layout-1/');

// Fill the form
await page.locator('#better-payment-form-999f59a').getByPlaceholder('First Name').fill('John');
await page.locator('#better-payment-form-999f59a').getByPlaceholder('Last Name').fill('Doe');
await page.locator('#better-payment-form-999f59a').getByPlaceholder('Email Address *').fill('testerbhai+john@protonmail.com');
await page.getByRole('spinbutton').fill('15');
await page.locator('#better-payment-form-999f59a').getByRole('button', { name: 'Proceed to Payment' }).click();
await page.waitForTimeout(1000);

// Fill the Stripe payment form
await page.getByPlaceholder('1234 1234 1234').fill('4242 4242 4242 4242');
await page.getByPlaceholder('MM / YY').fill('01 / 29');
await page.getByPlaceholder('CVC').fill('235');
await page.getByPlaceholder('Full name on card').fill('John Doe');
await page.getByPlaceholder('Address line 1').fill('Mirpur');
await page.getByPlaceholder('City').fill('Dhaka');
await page.getByPlaceholder('Postal code').fill('1216');
await page.getByTestId('hosted-payment-submit-button').click();
await page.waitForURL('**/stripe/layout-1/**');

// Check the success message
await expect(page.getByRole('heading', { name: 'Payment Successful' })).toBeVisible();
await expect(page.getByText('Transaction Number :')).toBeVisible();
await expect(page.getByText('Thank you for your payment')).toBeVisible();
});
// @ts-check
const { test, expect } = require('@playwright/test');

test('Layout 1 | Source Manual', async ({ page }) => {
  // Navigate to the page
  await page.goto('/paystack/layout-1/');

  // Fill the form
  await page.locator('#better-payment-form-5038c0e').getByPlaceholder('First Name').fill('John');
  await page.locator('#better-payment-form-5038c0e').getByPlaceholder('Last Name').fill('Doe');
  await page.locator('#better-payment-form-5038c0e').getByPlaceholder('Email Address *').fill('testerbhai+john@protonmail.com');
  await page.getByRole('spinbutton').fill('20');
  await page.locator('#better-payment-form-5038c0e').getByRole('button', { name: 'Proceed to Payment' }).click();

  // Wait for the checkout page to load
  await page.waitForURL('**/checkout.paystack.com/**');

  // Fill the checkout form
  await expect(page.getByTestId('customer-info')).toBeVisible();
  await expect(page.getByTestId('transaction-amount')).toBeVisible();
  await expect(page.getByTestId('testBadge')).toBeVisible();
  await expect(page.getByText('Use any of the options below')).toBeVisible();
  await expect(page.getByText('Success')).toBeVisible();
  await page.getByTestId('testCard-0').click();
  await page.getByTestId('testCardsPaymentButton').click();
  await page.waitForURL('**/paystack/layout-1/**');
  await expect(page.getByRole('img', { name: 'Success image' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Payment Successful' })).toBeVisible();
  await expect(page.getByText('Transaction Number :')).toBeVisible();
  await expect(page.getByText('Thank you for your payment')).toBeVisible();
});
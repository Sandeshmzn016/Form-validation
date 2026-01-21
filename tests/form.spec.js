import { test, expect } from '@playwright/test';
import { RegistrationPage } from './RegistrationPage';
require('dotenv').config();

let registrationPage;
test.beforeEach(async ({ page }) => {
  await page.goto(process.env.URL);
  registrationPage = new RegistrationPage(page);

});
test('Form submit successfully with valid data', async ({ page }) => {
  await registrationPage.fillDetail(
    process.env.NAME,
    process.env.PASSWORD,
    process.env.CREDIT_CARD, 
    process.env.TELEPHONE 
  );
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Form submitted successfully!');
    await page.waitForTimeout(2000);
    await dialog.accept();
  });
  await registrationPage.submit();
});

test('Validation message is displayed when the username field is left empty', async ({ page }) => {
  await registrationPage.fillDetail(
    '',
    process.env.PASSWORD,
    process.env.CREDIT_CARD, 
    process.env.TELEPHONE 
  );
  await registrationPage.submit();
  const usernameInput = page.locator('#username');
  await page.waitForTimeout(2000);
  const isValid = await usernameInput.evaluate(el => el.checkValidity());
  expect(isValid).toBe(false);
});

test('Username validation fails for short username', async ({ page }) => {
  await registrationPage.fillDetail(
    'san',
    process.env.PASSWORD,
    process.env.CREDIT_CARD,
    process.env.TELEPHONE
  );
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe(
      'Username must be alphanumeric and between 5 to 15 characters.'
    );
    await page.waitForTimeout(2000);
    await dialog.accept();
  });
  await registrationPage.submit();
});

test('Password validation fails when uppercase letter is missing', async ({ page }) => {
  await registrationPage.fillDetail(
    process.env.NAME,
    'password@123',
    process.env.CREDIT_CARD,
    process.env.TELEPHONE
  );
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe(
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    );
    await page.waitForTimeout(2000);
    await dialog.accept();
  });
  await registrationPage.submit();
});

test('Password validation fails when lowercase letter is missing', async ({ page }) => {
  await registrationPage.fillDetail(
    process.env.NAME,
    'sandesh@123',
    process.env.CREDIT_CARD,
    process.env.TELEPHONE
  );

  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe(
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    );
    await page.waitForTimeout(2000);
    await dialog.accept();
  });

  await registrationPage.submit();
  });
test('Password validation fails when number is missing', async ({ page }) => {
  await registrationPage.fillDetail(
    process.env.NAME,
    'Sandesh@mzn',
    process.env.CREDIT_CARD,
    process.env.TELEPHONE
  );
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe(
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    );
    await page.waitForTimeout(2000);
    await dialog.accept();
  });
  await registrationPage.submit();
  });

test('Password validation fails when length is less than 8 characters', async ({ page }) => {
  await registrationPage.fillDetail(
    process.env.NAME,
    'Sa@1', 
    process.env.CREDIT_CARD,
    process.env.TELEPHONE
  );
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe(
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    );
    await page.waitForTimeout(2000);
    await dialog.accept();
  });
  await registrationPage.submit();
  });

test('Password validation fails when special character is missing', async ({ page }) => {
  await registrationPage.fillDetail(
    process.env.NAME,
    'Sandesh123',
    process.env.CREDIT_CARD,
    process.env.TELEPHONE
  );
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe(
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    );
    await page.waitForTimeout(2000);
    await dialog.accept();
  });

  await registrationPage.submit();
});

test('Credit card validation fails for invalid card number', async ({ page }) => {
  await registrationPage.fillDetail(
    process.env.NAME,
    process.env.PASSWORD,
    '123456',
    process.env.TELEPHONE
  );
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe(
      'Enter a valid credit card number.'
    );
    await page.waitForTimeout(2000);
    await dialog.accept();
  });
  await registrationPage.submit();
});

test('Telephone number validation fails for incorrect format', async ({ page }) => {
  await registrationPage.fillDetail(
    process.env.NAME,
    process.env.PASSWORD,
    process.env.CREDIT_CARD,
    '9841385818'
  );
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe(
      'Telephone number must follow the format (XXX) XXX-XXXX.'
    );
    await page.waitForTimeout(2000);
    await dialog.accept();
  });
  await registrationPage.submit();
});

test('Form resets when page is reloaded', async ({ page }) => {
  await registrationPage.fillDetail(
    process.env.NAME,
    process.env.PASSWORD,
    process.env.CREDIT_CARD,
    process.env.TELEPHONE
  );
  await page.reload();
  await expect(registrationPage.username).toHaveValue('');
  await expect(registrationPage.password).toHaveValue('');
  await expect(registrationPage.creditCard).toHaveValue('');
  await expect(registrationPage.telephone).toHaveValue('');
});


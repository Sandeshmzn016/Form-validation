# Form Validation Automation

This project contains automated tests for validating form fields using Playwright.

## What is this project?
This automation checks whether a form behaves correctly when:
- All valid data is entered
- Required fields (like Username) are left empty

## Tools Used
- Playwright
- JavaScript
- Node.js

## How to Run This Project (Step by Step)

1. Install Node.js on your system
2. Open terminal in the project folder
3. Install dependencies:
   npm install
4. Run the tests:
   npx playwright test

## What is Tested?
- Successful form submission with valid data
- Required field validation for empty username

## Notes
- Browser’s built-in validation is used
- Test data is managed using environment variables

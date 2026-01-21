export class RegistrationPage {
  constructor(page) { 
    this.page = page;
    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.creditCard = page.locator('#creditCard');
    this.telephone = page.locator('#telephone');
    this.submitButton = page.locator('button[type="submit"]');
  }
  async fillDetail(username, password, creditCard, telephone) {
  await this.username.fill(username);
  await this.password.fill(password);
  await this.creditCard.fill(creditCard);
  await this.telephone.fill(telephone);
  }

  async submit() {
    await this.submitButton.click();
  }
}
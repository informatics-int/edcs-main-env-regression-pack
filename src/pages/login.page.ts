import { Page, Locator } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) { }

  async navigateToLoginPage() {
    await this.page.goto("");
  }

  async login(username: string, password: string) {
    await this.page.fill("#root_email", username);
    await this.page.fill("#root_password", password);
    await this.page.getByRole("button", { name: "Sign In" }).click();
  }

  async getErrorMessage(): Promise<string> {
    return (
      (await this.page.locator('//h3[@data-test="error"]').textContent()) ?? ""
    );
  }
}

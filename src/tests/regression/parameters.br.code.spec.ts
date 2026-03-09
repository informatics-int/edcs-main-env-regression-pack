import { test, expect } from "@playwright/test"
import { LoginPage } from "../../pages/login.page";
import { ParametersBranchCodePage } from "../../pages/parameters.br.code.page";
import { credentials } from "../resources/credentials";

test.describe("Parameter Branch Code testing", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    const parameterBranchCode = new ParametersBranchCodePage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.login(credentials.username, credentials.password);

    //wait till sidebar loads
    await page.waitForSelector('div:has-text("Parameters")',
      { state: "visible", timeout: 30000 });

    //testcase 1
    await parameterBranchCode.openParametersMenu();
    await parameterBranchCode.navigateToBranchCode();
    await parameterBranchCode.verifyNavigationToBranchCode();

    // wait for table rows
    await page.locator("tbody tr").first().waitFor({ state: "visible" });
  });

  test('Branch code grid', async ({ page }) => {
    const parameterBranchCode = new ParametersBranchCodePage(page);
    //testcase 2
    await test.step("Verify branch code grid columns", async () => {
      await parameterBranchCode.verifyBranchCodeGridColumns();
    });
  });

  test('Verify 10 rows per page', async ({ page }) => {
    const parameterBranchCode = new ParametersBranchCodePage(page);
    //testcase 3
    //10 rows
    await test.step("Click on 10 rows per page dropdown", async () => {
      await parameterBranchCode.selectRowsPerPage("10");
    });
    await parameterBranchCode.verifyRowsCount(10);
  });

  test('Verify 25 rows per page', async ({ page }) => {
    const parameterBranchCode = new ParametersBranchCodePage(page);
    //25 rows
    await test.step("Click on 25 rows per page dropdown", async () => {
      await parameterBranchCode.selectRowsPerPage("25");
    });
    await parameterBranchCode.verifyRowsCount(25);
  });

  test('Verify 100 rows per page', async ({ page }) => {
    const parameterBranchCode = new ParametersBranchCodePage(page);
    //100 rows
    await test.step("Click on 100 rows per page dropdown", async () => {
      await parameterBranchCode.selectRowsPerPage("100");
    });
    await parameterBranchCode.verifyRowsCount(100);

  });

  test('Verify view button', async ({ page }) => {
    const parameterBranchCode = new ParametersBranchCodePage(page);
    //testcase 4
    await test.step("Click view button", async () => {
      await parameterBranchCode.viewOption()
    });
  });

  test('Verify edit button', async ({ page }) => {
    const parameterBranchCode = new ParametersBranchCodePage(page);
    //testcase 5
    await test.step("Click edit button", async () => {
      await parameterBranchCode.editOption()
    });
  });

  /*test('Verify add new button navigation',async ({page}) => {
    const parameterBranchCode = new ParametersBranchCodePage(page);
    //testcase 7
    await test.step("Click add new button",async () =>{
      await parameterBranchCode.addNew()
    });

  });*/

  /*test('Verify delete button', async ({ page }) => {
    const parameterBranchCode = new ParametersBranchCodePage(page);
    //testcase 6
    await test.step("Click delete button", async () => {
      await parameterBranchCode.deleteOption()
    });
  }); */
});


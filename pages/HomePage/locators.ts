import { Page } from '@playwright/test';

export class HomePageLocators {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Filtro
  sizeXXL = () => this.page.locator('input[value="XXL"]');

  // Produtos
  slimBlackTshirt = () =>
    this.page
      .locator('div[alt="Slim black T-shirt"]')
      .locator('xpath=ancestor::div[@tabindex="1"]');

  croppedGroovy = () =>
    this.page
      .locator('div[alt="Cropped Stay Groovy off white"]')
      .locator('xpath=ancestor::div[@tabindex="1"]');

  // Carrinho
  cartCounter = () => this.page.locator('.sc-1h98xa9-3.VLMSP');
  cartItems = () => this.page.locator('.sc-11uohgb-0.hDmOrM');
  totalPrice = () => this.page.locator('.sc-1h98xa9-9');

  quantityTexts = () =>
    this.page.locator('p:has-text("Quantity:")');

  checkoutButton = () =>
    this.page.getByRole('button', { name: 'Checkout' });
}

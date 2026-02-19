import { Page, expect } from '@playwright/test';
import { HomePageLocators } from './locators';

export class HomePage {
  readonly page: Page;
  readonly locators: HomePageLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new HomePageLocators(page);
  }

  async navigate() { // Navega para a página inicial
    await this.page.goto('https://react-shopping-cart-67954.firebaseapp.com/');
  }

  async selectSizeXXL() { //   Seleciona o filtro de tamanho XXL
    await this.locators.sizeXXL().click({ force: true });
  }

  async addToCart() { // Adiciona os produtos ao carrinho
    await this.locators.slimBlackTshirt().locator('button').click();
    await this.locators.croppedGroovy().locator('button').click({ clickCount: 3 });
  }

  async verifyCartCount() { // Verifica se a quantidade de itens no carrinho corresponde à soma das quantidades dos produtos
    const numero = parseInt(
      await this.locators.cartCounter().innerText(),
      10
    );

    const soma = (
      await this.locators.quantityTexts().allTextContents()
    )
      .map(text => parseInt(text.match(/\d+/)?.[0] || '0', 10))
      .reduce((acc, value) => acc + value, 0);

    await expect(numero).toBe(soma);
  }

  async verifyPriceCount() { // Verifica se o preço total no carrinho corresponde à soma dos preços multiplicados pelas quantidades dos produtos
    const items = this.locators.cartItems();
    const count = await items.count();

    let soma = 0;

    for (let i = 0; i < count; i++) {
      const item = items.nth(i);

      const priceText = await item.locator('.sc-11uohgb-4 p').textContent();
      const price = parseFloat(priceText!.replace('$', '').trim());

      const quantityText = await item.locator('p:has-text("Quantity")').textContent();
      const quantity = parseInt(quantityText!.match(/\d+/)?.[0] || '1');

      soma += price * quantity;
    }

    const totalText = await this.locators.totalPrice().textContent();
    const numero = parseFloat(totalText!.replace('$', '').trim());

    await expect(numero).toBeCloseTo(soma, 2);
  }

  async checkOut() { // Clica no botão de checkout
    await this.locators.checkoutButton().click();
  }
}

import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('Fluxo completo de compra', async ({ page }) => {
  const home = new HomePage(page);

  await home.navigate();
  await home.selectSizeXXL();
  await home.addToCart();
  await home.verifyCartCount();
  await home.verifyPriceCount();
  await home.checkOut();
});

import { test as base } from '@playwright/test';
import { HomePage, Header, CartPage, PetDetailsPage } from '@poms';

interface PageFixtures {
    homePage: HomePage;
    cartPage: CartPage;
    petDetailsPage: PetDetailsPage;
    header: Header;
}

const base2 = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    petDetailsPage: async ({ page }, use) => {
        await use(new PetDetailsPage(page));
    },
    header: async ({ page }, use) => {
        await use(new Header(page));
    }
});

export const test = base2;


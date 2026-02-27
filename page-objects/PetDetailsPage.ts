import { Page, Locator } from '@playwright/test';
import { BasePage, Header } from '@poms';
import { Environment } from '@enums';
/**
 * UI not yet implemented, this is a placeholder to get a headstart when the frontend is ready to test.
 */
export default class PetDetailsPage extends BasePage {
    //Page declarations
    header: Header;
    petName: Locator;
    petPrice: Locator;
    addToCartBtn: Locator;

    readonly petDetailsPageLocators = {
        petName: {
            [Environment.Prod]: 'TBD',
            [Environment.Staging]: 'TBD',
        },
        petPrice: this.page.locator('TBD'),
        addToCartBtn: this.page.getByText(/Add to cart/i),
    };

    constructor(page: Page) {
        super(page);
        this.header = new Header(page);
        this.petName = this.getLocator(this.petDetailsPageLocators.petName).describe('Pet name');
        this.petPrice = this.petDetailsPageLocators.petPrice.describe('Pet price');
        this.addToCartBtn = this.petDetailsPageLocators.addToCartBtn.describe('Add to cart button');

    }

}
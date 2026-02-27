import { Page, Locator } from '@playwright/test';
import { BasePage, Header } from '@poms';
import { Environment } from '@enums';
/**
 * UI not yet implemented, this is a placeholder to get a headstart when the frontend is ready to test.
 */
export default class HomePage extends BasePage {
    //Page declarations
    header: Header;


    /**
     * Locator that targets every product title currently displayed on PLP.
     * Must be used with .nth() due to Playwright's strict mode restrictions.
     */
    productNameList: Locator;
    /**
     * Locator that targets every product price currently displayed on PLP.
     * Must be used with .nth() due to Playwright's strict mode restrictions.
     */
    productPriceList: Locator;
    nextPageBtn: Locator;
    previousPageBtn: Locator;

    readonly homePageLocators = {
        productNameList: {
            [Environment.Prod]: '.card-title a',
            [Environment.Staging]: '.card-title a',
        },
        productPriceList: this.page.locator('.card-block h5'),
        nextPageBtn: this.page.locator('[id=next2]'),
        previousPageBtn: this.page.locator('[id=prev2]'),
    };

    constructor(page: Page) {
        super(page);
        this.header = new Header(page);
        //Locators initialization
        this.productNameList = this.getLocator(this.homePageLocators.productNameList).describe('Product Name List');
        this.productPriceList = this.getLocator(this.homePageLocators.productPriceList).describe('Product Price List');
        this.nextPageBtn = this.getLocator(this.homePageLocators.nextPageBtn).describe('Next Page Button');
        this.previousPageBtn = this.getLocator(this.homePageLocators.previousPageBtn).describe('Previous Page Button');
    }

    async selectNextBtn(): Promise<void> {
        await this.nextPageBtn.isVisible();
        await this.nextPageBtn.click();
    }

    async selectPreviousBtn(): Promise<void> {
        await this.previousPageBtn.isVisible();
        await this.previousPageBtn.click();
    }

    async getProductLink(index: number): Promise<string> {
        const productLink = this.getBaseUrl() + await this.productNameList.nth(index).getAttribute('href');
        if (!productLink) {
            throw new Error(`Product link not found for index ${index}`);
        }
        return productLink;
    }

    async getProductPrice(index: number): Promise<number> {
        const productPrice = await this.productPriceList.nth(index).innerText();
        if (!productPrice) {
            throw new Error(`Product price not found for index ${index}`);
        }
        const productPriceNumber = parseInt(productPrice.replace('$', ''));
        return productPriceNumber;
    }

    async getProductName(index: number): Promise<string> {
        const productName = await this.productNameList.nth(index).innerText();
        if (!productName) {
            throw new Error(`Product title not found for index ${index}`);
        }
        return productName;
    }

    async fillProductDataArrayFromCurrentPage(productDataArray: { name: string; price: number; link: string }[]): Promise<{ name: string; price: number; link: string }[]> {
        const productCount = await this.productNameList.count();

        for (let i = 0; i < productCount; i++) {
            const name = await this.getProductName(i);
            const price = await this.getProductPrice(i);
            const link = await this.getProductLink(i);
            productDataArray.push({ name, price, link });
        }
        return productDataArray;
    }

}
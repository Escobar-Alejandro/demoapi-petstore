import { Page, Locator } from '@playwright/test';
import { BasePage } from '@poms';
import { Environment } from '@enums';
/**
 * UI not yet implemented, this is a placeholder to get a headstart when the frontend is ready to test.
 */
export default class CartPage extends BasePage {

    placeOrderBtn: Locator;
    deleteBtn: Locator;
    productContainerList: Locator;
    nameField: Locator;
    countryField: Locator;
    cityField: Locator;
    creditCardField: Locator;
    monthField: Locator;
    yearField: Locator;
    purchaseBtn: Locator;
    closeBtn: Locator;
    orderConfirmationMessage: Locator;

    readonly cartPageLocators = {
        placeOrderBtn: {
            [Environment.Prod]: this.page.getByRole('button', { name: 'Place Order' }),
            [Environment.Staging]: 'new-locator-for-staging',
        },
        deleteBtn: this.page.locator('a', { hasText: 'Delete' }),
        productContainerList: this.page.locator('#tbodyid'),
        nameField: this.page.locator('input[id="name"]'),
        countryField: this.page.locator('input[id="country"]'),
        cityField: this.page.locator('input[id="city"]'),
        creditCardField: this.page.locator('input[id="card"]'),
        monthField: this.page.locator('input[id="month"]'),
        yearField: this.page.locator('input[id="year"]'),
        purchaseBtn: this.page.getByRole('button', { name: 'Purchase' }),
        closeBtn: this.page.getByRole('button', { name: 'Close' }),
        orderConfirmationMessage: this.page.getByText('Thank you for your purchase!'),
    };

    constructor(page: Page) {
        super(page);
        this.placeOrderBtn = this.getLocator(this.cartPageLocators.placeOrderBtn).describe('Place Order button');
        this.deleteBtn = this.getLocator(this.cartPageLocators.deleteBtn).describe('Delete button');
        this.productContainerList = this.getLocator(this.cartPageLocators.productContainerList).describe('Product Container list');
        this.nameField = this.getLocator(this.cartPageLocators.nameField).describe('Name field');
        this.countryField = this.getLocator(this.cartPageLocators.countryField).describe('Country field');
        this.cityField = this.getLocator(this.cartPageLocators.cityField).describe('City field');
        this.creditCardField = this.getLocator(this.cartPageLocators.creditCardField).describe('Credit Card field');
        this.monthField = this.getLocator(this.cartPageLocators.monthField).describe('Month field');
        this.yearField = this.getLocator(this.cartPageLocators.yearField).describe('Year field');
        this.purchaseBtn = this.getLocator(this.cartPageLocators.purchaseBtn).describe('Purchase button');
        this.closeBtn = this.getLocator(this.cartPageLocators.closeBtn).describe('Close button');
        this.orderConfirmationMessage = this.getLocator(this.cartPageLocators.orderConfirmationMessage).describe('Order Confirmation Message');
    }

}
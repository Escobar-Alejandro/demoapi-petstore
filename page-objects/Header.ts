import { Page, Locator } from '@playwright/test';
import { BasePage } from '@poms';
import { Environment } from '@enums';
/**
 * UI not yet implemented, this is a placeholder to get a headstart when the frontend is ready to test.
 */
export default class Header extends BasePage {

    cartBtn: Locator;
    contactBtn: Locator;
    logInBtn: Locator;
    signUpBtn: Locator;
    signUpUserField: Locator;
    signUpPasswordField: Locator;
    signUpBtnInModal: Locator;
    logInUserField: Locator;
    logInPasswordField: Locator;
    logInBtnInModal: Locator;
    closeBtnInModal: Locator;
    nameOfLoggedUser: Locator;

    readonly headerLocators = {
        cartBtn: {
            [Environment.Prod]: this.page.locator('a[id="cartur"]'),
            [Environment.Staging]: 'new-locator-for-staging',
        },
        contactBtn: this.page.locator('a.nav-link', { hasText: /Contact/i }),
        logInBtn: this.page.locator('a[id="login2"]'),
        signUpBtn: this.page.locator('a[id="signin2"]'),
        signUpUserField: this.page.locator('input[id="sign-username"]'),
        signUpPasswordField: this.page.locator('input[id="sign-password"]'),
        signUpBtnInModal: this.page.getByRole('button', { name: 'Sign up' }),
        closeBtnInModal: this.page.getByRole('button', { name: 'Close' }).first(),
        logInUserField: this.page.locator('input[id="loginusername"]'),
        logInPasswordField: this.page.locator('input[id="loginpassword"]'),
        logInBtnInModal: this.page.locator('button[onclick="logIn()"]'),
        nameOfLoggedUser: this.page.locator('a[id="nameofuser"]'),
    };

    constructor(page: Page) {
        super(page);
        this.cartBtn = this.getLocator(this.headerLocators.cartBtn).describe('Cart button');
        this.contactBtn = this.getLocator(this.headerLocators.contactBtn).describe('Contact button');
        this.logInBtn = this.getLocator(this.headerLocators.logInBtn).describe('Log In button');
        this.signUpBtn = this.getLocator(this.headerLocators.signUpBtn).describe('Sign Up button');
        this.signUpUserField = this.getLocator(this.headerLocators.signUpUserField).describe('Sign Up username field');
        this.signUpPasswordField = this.getLocator(this.headerLocators.signUpPasswordField).describe('Sign Up password field');
        this.signUpBtnInModal = this.getLocator(this.headerLocators.signUpBtnInModal).describe('Sign Up button in Modal');
        this.closeBtnInModal = this.getLocator(this.headerLocators.closeBtnInModal).describe('Close button in Modal');
        this.logInUserField = this.getLocator(this.headerLocators.logInUserField).describe('Log In username field');
        this.logInPasswordField = this.getLocator(this.headerLocators.logInPasswordField).describe('Log In password field');
        this.logInBtnInModal = this.getLocator(this.headerLocators.logInBtnInModal).describe('Log In button in Modal');
        this.nameOfLoggedUser = this.getLocator(this.headerLocators.nameOfLoggedUser).describe('Name of logged user');
    }

}
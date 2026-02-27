import { Page, Locator } from '@playwright/test';
import { Environment, TIMEOUTS } from '@models/enums';
const { ENVIRONMENT, BASE_URL } = process.env;

export default abstract class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getPage(): Page {
        return this.page;
    }

    getBaseUrl(): string {
        if (!BASE_URL) {
            throw new Error('BASE_URL environment variable is not defined.');
        }
        return BASE_URL;
    }

    async navigateTo(path = '' ): Promise<void> {
        const url = `${this.getBaseUrl()}${path}`;
        await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: TIMEOUTS.Default });
    }

    /**
 * Checks if given object is a Playwright locator.
 * @param locator - The object to check.
 * @returns true if object has an 'evaluate' function, false otherwise.
 */
    private isLocator(locator): boolean {
        return typeof locator.evaluate === 'function';
    }

    /**
 * Checks if given object is a string.
 * @param locator - The object to check.
 * @returns true if object is a string, false otherwise.
 */
    private isString(locator): boolean {
        return typeof locator === 'string';
    }

    private isObject(locator): boolean {
        return typeof locator === 'object' && locator !== null;
    }

    private determineLocatorType(locator): 'locator' | 'string' | 'object' | 'undefined' {
        if (this.isLocator(locator)) {
            return 'locator';
        } else if (this.isString(locator)) {
            return 'string';
        } else if (this.isObject(locator)) {
            return 'object';
        }
        return 'undefined';
    }

    private getLocatorFromSelector(selector: string): Locator {
        return this.page.locator(selector);
    }

    /**
 * Checks if locator is valid and resolves it if possible.
 * @param locator - The locator to validate.
 * @returns The resolved locator if valid, or undefined if not.
 */
    private validateLocator(locator: string | Locator): Locator | undefined {
        switch (true) {
            case this.isLocator(locator):
                return locator as Locator;
            case this.isString(locator):
                return this.getLocatorFromSelector(locator as string);
            default:
                return undefined;
        }
    }

    /**
 * Looks for a locator within a given object based on current environment.
 * DEFAULT VALUES:
 * - Environment: "prod"
 * - Depth: 0
 * @param locatorObj - The object that contains the locators.
 * @param environment - The environment in which to look for the locator.
 */
    findLocatorInObject(locatorObj: object, environment: string): Locator {
        if (!locatorObj || Object.keys(locatorObj).length === 0) {
            throw new Error(`Locator object is empty or undefined for environment "${environment}"`);
        }

        const locator = locatorObj[environment] || locatorObj[Environment.Prod];

        const valid = this.validateLocator(locator);
        if (valid) {
            return valid;
        }

        throw new Error(`Locator for environment "${environment}" is invalid.`);
    }


    protected getLocator(locator: object | string | Locator): Locator {
        const locatorType = this.determineLocatorType(locator);

        try {
            switch (locatorType) {
                case 'locator':
                    return locator as Locator;
                case 'string':
                    return this.getLocatorFromSelector(locator as string);
                case 'object':
                    return this.findLocatorInObject(locator as object, ENVIRONMENT || Environment.Prod);
                default:
                    throw new Error(`Unsupported locator type: ${locatorType}`);
            }

        } catch (error) {
            throw new Error(`Failed to get locator`, { cause: error });
        }
    }

    async tryWaitForElementToBeHidden(locator: Locator, timeout = TIMEOUTS.Short): Promise<boolean> {
        try {
            await locator.waitFor({ state: 'hidden', timeout });
            return true;
        } catch (e) {
            console.warn(`Element did not become hidden within ${timeout} ms`, { cause: e });
            return false;
        }
    }


}
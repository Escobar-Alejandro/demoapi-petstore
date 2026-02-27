import { test as base } from '@playwright/test';
import { PetController, StoreController, UserController } from '@api';

interface ControllerFixtures {
    petController: PetController;
    storeController: StoreController;
    userController: UserController;
}

const selectedBaseUrl = process.env.BASE_URL;

if (!selectedBaseUrl) {
    throw new Error('BASE_URL is not defined. Set ENVIRONMENT to prod, staging, or dev.');
}

const test = base.extend<ControllerFixtures>({
    petController: async ({ request }, use) => {
        await use(new PetController(request, selectedBaseUrl));
    },
    storeController: async ({ request }, use) => {
        await use(new StoreController(request, selectedBaseUrl));
    },
    userController: async ({ request }, use) => {
        await use(new UserController(request, selectedBaseUrl));
    },
});

export { test };
export { expect } from '@playwright/test';
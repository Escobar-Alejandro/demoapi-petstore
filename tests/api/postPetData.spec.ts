import { expect, test } from '@fixtures/controllerManager.fixture';
import { buildPetsByStatus } from '@tests/test-data/petstoreDataBuilder';

test('PD-1 | Create new pet data to API',
    { tag: ['@PD-1', '@smoke', '@regression', '@api'] },
    async ({ petController }) => {
        const expectedStatusCount = [
            { status: 'available', count: 5 },
            { status: 'pending', count: 4 },
            { status: 'sold', count: 1 },
        ] as const;

        const petsToCreate = buildPetsByStatus({
            baseId: Date.now(),
            distribution: [...expectedStatusCount],
        });
        const soldPet = petsToCreate.find((pet) => pet.status === 'sold');

        expect(soldPet).toBeDefined();
        if (!soldPet) {
            throw new Error('No sold pet was generated for the test data set.');
        }

        await test.step('Create new pet data to API', async () => {
            for (const pet of petsToCreate) {
                const response = await petController.createPet(pet);
                expect(response.ok()).toBeTruthy();
            }

            console.log('Created pets payload:');
            console.table(
                petsToCreate.map((pet) => ({
                    id: pet.id,
                    name: pet.name,
                    status: pet.status,
                }))
            );
            console.log('Created pets full data:', petsToCreate);
        });

        await test.step('Validate that the number of pets by status matches the expected amount', async () => {
            const statusCount = petsToCreate.reduce<Record<string, number>>((accumulator, pet) => {
                const statusKey = pet.status ?? 'unknown';
                accumulator[statusKey] = (accumulator[statusKey] ?? 0) + 1;
                return accumulator;
            }, {});

            expect(statusCount.available).toBe(expectedStatusCount[0].count);
            expect(statusCount.pending).toBe(expectedStatusCount[1].count);
            expect(statusCount.sold).toBe(expectedStatusCount[2].count);
        });

        await test.step('Get the details of pets in "sold" status', async () => {
            const soldPets = await petController.findPetsByStatus('sold');

            expect(soldPets.response.ok()).toBeTruthy();
            expect(Array.isArray(soldPets.body)).toBeTruthy();

            const createdSoldPetInList = soldPets.body.find((pet) => pet.id === soldPet.id);
            expect(createdSoldPetInList).toBeDefined();
            expect(createdSoldPetInList?.status).toBe('sold');

            const soldPetDetails = await petController.getPetById(soldPet.id);
            expect(soldPetDetails.response.ok()).toBeTruthy();
            expect(soldPetDetails.body.id).toBe(soldPet.id);
            expect(soldPetDetails.body.status).toBe('sold');

            console.log('Created sold pet status:', {
                id: soldPetDetails.body.id,
                name: soldPetDetails.body.name,
                status: soldPetDetails.body.status,
            });
        });

    });
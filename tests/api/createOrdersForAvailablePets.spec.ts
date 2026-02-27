import { expect, test } from '@fixtures/controllerManager.fixture';
import { buildOrderFromPet } from '@tests/test-data/petstoreDataBuilder';

test('PD-2 | List available pets and create one order per pet',
    { tag: ['@PD-2', '@smoke', '@regression', '@api'] },
    async ({ petController, storeController }) => {
        await test.step('List available pets and save 5 in memory', async () => {
            const availablePets = await petController.findPetsByStatus('available');

            expect(availablePets.response.ok()).toBeTruthy();
            expect(availablePets.body.length).toBeGreaterThanOrEqual(5);

            const selectedPets = availablePets.body.slice(0, 5);
            expect(selectedPets).toHaveLength(5);

            console.log('Selected available pets for order creation:');
            console.table(
                selectedPets.map((pet) => ({
                    id: pet.id,
                    name: pet.name,
                    status: pet.status,
                }))
            );

            await test.step('Create one order for each selected pet', async () => {
                const createdOrdersSummary: { orderId: number; petId: number; status: string }[] = [];

                for (let index = 0; index < selectedPets.length; index++) {
                    const pet = selectedPets[index];
                    const orderPayload = buildOrderFromPet(pet.id, Date.now() + index);
                    const createdOrder = await storeController.createOrder(orderPayload);

                    expect(createdOrder.response.ok()).toBeTruthy();
                    expect(createdOrder.body.petId).toBe(pet.id);
                    expect(createdOrder.body.status).toBe('placed');

                    console.log(`Order payload for pet ${pet.id}:`, orderPayload);

                    createdOrdersSummary.push({
                        orderId: createdOrder.body.id,
                        petId: createdOrder.body.petId,
                        status: createdOrder.body.status,
                    });
                }

                console.log('Created orders summary:');
                console.table(createdOrdersSummary);
            });
        });
    });

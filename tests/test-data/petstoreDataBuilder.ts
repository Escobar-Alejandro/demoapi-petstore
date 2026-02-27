import { Order, Pet, PetStatus } from '@models/api/petStore';

export interface PetStatusDistributionItem {
    status: PetStatus;
    count: number;
}

export interface BuildPetsByStatusOptions {
    baseId?: number;
    distribution?: PetStatusDistributionItem[];
}

const defaultDistribution: PetStatusDistributionItem[] = [
    { status: 'available', count: 5 },
    { status: 'pending', count: 4 },
    { status: 'sold', count: 1 },
];

export function buildPetsByStatus(options: BuildPetsByStatusOptions = {}): Pet[] {
    const distribution = options.distribution ?? defaultDistribution;

    const pets: Pet[] = [];
    let idCursor = options.baseId ?? Date.now();

    for (const item of distribution) {
        for (let index = 0; index < item.count; index++) {
            const petId = idCursor++;
            pets.push({
                id: petId,
                name: `pet-${item.status}-${petId}`,
                photoUrls: [`https://petstore.test/photos/${petId}`],
                status: item.status,
                category: { id: 1, name: 'animals' },
                tags: [{ id: 1, name: item.status }],
            });
        }
    }

    return pets;
}

export function buildOrderFromPet(petId: number, orderId: number): Order {
    return {
        id: orderId,
        petId,
        quantity: 1,
        shipDate: new Date().toISOString(),
        status: 'placed',
        complete: true,
    };
}
import { APIRequestContext } from '@playwright/test';
import { ApiResponse, Pet, PetStatus } from '@models/api/petStore';

export default class PetController {
    private readonly baseUrl: string;

    constructor(private readonly request: APIRequestContext, baseUrl: string) {
        this.baseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    }

    private endpoint(path: string): string {
        return `${this.baseUrl}${path}`;
    }

    async addPet(payload: Pet) {
        return this.request.post(this.endpoint('pet'), {
            data: payload,
        });
    }

    async createPet(payload: Pet) {
        return this.addPet(payload);
    }

    async updatePet(payload: Pet) {
        return this.request.put(this.endpoint('pet'), {
            data: payload,
        });
    }

    async findPetsByStatus(status: PetStatus) {
        const response = await this.request.get(this.endpoint('pet/findByStatus'), {
            params: { status },
        });
        const body = await response.json() as Pet[];

        return {
            response,
            body,
        };
    }

    async findPetsByTags(tags: string[]) {
        const response = await this.request.get(this.endpoint('pet/findByTags'), {
            params: { tags: tags.join(',') },
        });
        const body = await response.json() as Pet[];

        return {
            response,
            body,
        };
    }

    async getPetById(petId: number) {
        const response = await this.request.get(this.endpoint(`pet/${petId}`));
        const body = await response.json() as Pet;

        return {
            response,
            body,
        };
    }

    async updatePetWithFormData(petId: number, name?: string, status?: PetStatus) {
        const form: Record<string, string> = {};

        if (name) {
            form.name = name;
        }

        if (status) {
            form.status = status;
        }

        const response = await this.request.post(this.endpoint(`pet/${petId}`), {
            form,
        });
        const body = await response.json() as ApiResponse;

        return {
            response,
            body,
        };
    }

    async deletePet(petId: number, apiKey?: string) {
        const response = await this.request.delete(this.endpoint(`pet/${petId}`), {
            headers: apiKey ? { api_key: apiKey } : undefined,
        });
        const body = await response.json() as ApiResponse;

        return {
            response,
            body,
        };
    }

    async uploadImage(petId: number, additionalMetadata?: string, filePath?: string) {
        const multipart: Record<string, string | { name: string; mimeType: string; buffer: Buffer }> = {};

        if (additionalMetadata) {
            multipart.additionalMetadata = additionalMetadata;
        }

        if (filePath) {
            const path = await import('path');
            const fs = await import('fs/promises');
            const fileName = path.basename(filePath);
            const fileBuffer = await fs.readFile(filePath);
            multipart.file = {
                name: fileName,
                mimeType: 'application/octet-stream',
                buffer: fileBuffer,
            };
        }

        const response = await this.request.post(this.endpoint(`pet/${petId}/uploadImage`), {
            multipart,
        });
        const body = await response.json() as ApiResponse;

        return {
            response,
            body,
        };
    }
}

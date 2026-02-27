import { APIRequestContext } from '@playwright/test';
import { ApiResponse, User } from '@models/api/petStore';

export default class UserController {
    private readonly baseUrl: string;

    constructor(private readonly request: APIRequestContext, baseUrl: string) {
        this.baseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    }

    private endpoint(path: string): string {
        return `${this.baseUrl}${path}`;
    }

    async createUser(payload: User) {
        const response = await this.request.post(this.endpoint('user'), {
            data: payload,
        });
        const body = await response.json() as ApiResponse;

        return {
            response,
            body,
        };
    }

    async createUsersWithArray(payload: User[]) {
        const response = await this.request.post(this.endpoint('user/createWithArray'), {
            data: payload,
        });
        const body = await response.json() as ApiResponse;

        return {
            response,
            body,
        };
    }

    async createUsersWithList(payload: User[]) {
        const response = await this.request.post(this.endpoint('user/createWithList'), {
            data: payload,
        });
        const body = await response.json() as ApiResponse;

        return {
            response,
            body,
        };
    }

    async getUserByUsername(username: string) {
        const response = await this.request.get(this.endpoint(`user/${username}`));
        const body = await response.json() as User;

        return {
            response,
            body,
        };
    }

    async updateUser(username: string, payload: User) {
        const response = await this.request.put(this.endpoint(`user/${username}`), {
            data: payload,
        });
        const body = await response.json() as ApiResponse;

        return {
            response,
            body,
        };
    }

    async deleteUser(username: string) {
        const response = await this.request.delete(this.endpoint(`user/${username}`));
        const body = await response.json() as ApiResponse;

        return {
            response,
            body,
        };
    }

    async login(username: string, password: string) {
        const response = await this.request.get(this.endpoint('user/login'), {
            params: { username, password },
        });
        const body = await response.text();

        return {
            response,
            body,
        };
    }

    async logout() {
        const response = await this.request.get(this.endpoint('user/logout'));
        const body = await response.text();

        return {
            response,
            body,
        };
    }
}

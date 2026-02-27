import { APIRequestContext } from '@playwright/test';
import { ApiResponse, InventoryByStatus, Order } from '@models/api/petStore';

export default class StoreController {
    private readonly baseUrl: string;

    constructor(private readonly request: APIRequestContext, baseUrl: string) {
        this.baseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    }

    private endpoint(path: string): string {
        return `${this.baseUrl}${path}`;
    }

    async createOrder(payload: Order) {
        const response = await this.request.post(this.endpoint('store/order'), {
            data: payload,
        });
        const body = await response.json() as Order;

        return {
            response,
            body,
        };
    }

    async getOrderById(orderId: number) {
        const response = await this.request.get(this.endpoint(`store/order/${orderId}`));
        const body = await response.json() as Order;

        return {
            response,
            body,
        };
    }

    async deleteOrder(orderId: number) {
        const response = await this.request.delete(this.endpoint(`store/order/${orderId}`));
        const body = await response.json() as ApiResponse;

        return {
            response,
            body,
        };
    }

    async getInventory() {
        const response = await this.request.get(this.endpoint('store/inventory'));
        const body = await response.json() as InventoryByStatus;

        return {
            response,
            body,
        };
    }
}

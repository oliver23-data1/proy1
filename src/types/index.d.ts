interface Item {
    id: number;
    name: string;
    description: string;
}

interface CreateItemRequest {
    name: string;
    description: string;
}

interface UpdateItemRequest {
    id: number;
    name?: string;
    description?: string;
}

interface DeleteItemRequest {
    id: number;
}

export { Item, CreateItemRequest, UpdateItemRequest, DeleteItemRequest };
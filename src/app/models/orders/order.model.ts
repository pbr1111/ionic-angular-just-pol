import { OrderProduct } from "./order-product.model";

export enum OrderStatus {
    Created,
    Accepted,
    Preparing,
    InDelivery,
    Delivered,
    Received
}

export interface Order {
    orderDate: string;
    products: OrderProduct[];
    state: OrderStatus;
}
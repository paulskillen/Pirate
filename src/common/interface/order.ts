import { OrderPaymentStatus, PaymentMethod } from "./payment";
import { IBundle } from "./bundle";
import { ICustomer } from "./customer";
import { ProviderName } from "./provider";

export enum OrderType {
    TOP_UP = "TOP_UP",
    BUY_NEW = "BUY_NEW",
}

export enum OrderStatus {
    PENDING_PAYMENT = "PENDING_PAYMENT",
    PARTIALLY_PAID = "PARTIALLY_PAID",
    ORDER_PROCESSING = "ORDER_PROCESSING",
    ORDER_GENERATED = "ORDER_GENERATED",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
    REFUNDED = "REFUNDED",
}

export interface IOrderPayment {
    paymentData: JSON;
    updatedAt: Date;
    createdAt: Date;
    method: PaymentMethod;
    status: OrderPaymentStatus;
}

export interface IOrderProduct {
    product: IBundle;
    quantity: number;
}

export interface IOrder {
    id: string;
    updatedAt: Date;
    createdAt: Date;
    orderNo: string;
    orderType: OrderType;
    status: OrderStatus;
    customer: ICustomer;
    products?: IOrderProduct[];
    payment?: IOrderPayment[];
    expiryDate: Date;
    remark: string;
    total: number;
    subTotal: number;
    provider: ProviderName;
    refOrder: string;
    providerOrder?: any;
    eSimData?: { eSimId?: string; [key: string]: any };
}

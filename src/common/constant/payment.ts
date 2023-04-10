export enum PaymentMethod {
    PAYPAL = "PAYPAL",
    BANK_TRANSFER = "BANK_TRANSFER",
}

export enum OrderPaymentStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    ERROR = "ERROR",
}

export const PAYMENT_METHODS = [
    // {
    //     id: PaymentMethod.BANK_TRANSFER,
    //     label: "bankTransfer",
    //     icon: "credit-card",
    // },
    {
        id: PaymentMethod.PAYPAL,
        label: "PayPal",
        icon: "paypal",
    },
];

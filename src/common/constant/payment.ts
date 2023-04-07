export enum PaymentMethod {
    PAY_PAL = "PAY_PAl",
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
        id: PaymentMethod.PAY_PAL,
        label: "PayPal",
        icon: "paypal",
    },
];

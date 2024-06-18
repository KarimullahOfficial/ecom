export enum PaymentStatus {
    paid = 'paid',
    pending = 'pending',
    failed = 'failed'
}

export const PAYMENT_ARRAY = [PaymentStatus.failed, PaymentStatus.paid, PaymentStatus.pending]
export type User = {
    id?: number | null,
    phoneNumber: number,
    firstName: string,
    lastName: string,
    middleName?: string,
    shippingAddress?: string
}
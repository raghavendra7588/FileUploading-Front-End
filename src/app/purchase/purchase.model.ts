import { NumberValueAccessor } from '@angular/forms';

export class Vendor {
    sellerId?: string;
    code?: string;
    name?: string;
    underLedger?: string;
    contactPerson?: string;
    category?: string;
    printName?: string;
    subCategory?: string;
    brand?: string;
    gst?: string;
    gstCategory?: string;
    pan?: string;
    distance?: string;
    fileUpload?: any;
    cin?: number;
    registrationDate?: Date;
    ifscCode?: number;
    accountNumber?: number;
    bankName?: string;
    branch?: string;
    paymentTerm?: string;
    priceCategory?: string;
    transporter?: string;
    creditLimit?: number;
    agentBroker?: string;
    Address?: string;
    City?: string;
    PinCode?: string;
    Country?: string;
    State?: string;
    Phone?: string;
    Email?: string;
}

export class Test {
    userId: number;
    firstName: string;
}


export class Address {
    id?: string;
    sellerId?: number;
    sellerName?: string;
    billing_address?: string;
    billing_city?: string;
    billing_pinCode?: number;
    billing_country?: string;
    billing_state?: string;
    billing_phone?: number;
    billing_email?: string;
    shipping_address?: string;
    shipping_country?: string;
    shipping_state?: string;
    shipping_city?: string;
    shipping_pinCode?: number;
    shipping_phone?: number;
    shipping_email?: string;
    billingName?: string;
    shippingName?: string;
}

export class PurchaseOrder {
    gstType?: string;
    vendor?: string;
    email?: string;
    orderNo?: number;
    orderDate?: Date;
    deliveryDate?: Date;
    referenceNo?: number;
    referenceDate?: Date;
    agent?: string;
    tax?: string;
    remarks?: string;
    advanceLedger?: string;
    advanceAmount?: number;
    itemValue?: number;
    taxable?: number;
    taxAmount?: number;
    cessAmount?: number;
    docAmount?: number;
    paymentTerms: string;
}


export class PriceList {
    priceListId?: number;
    sellerId?: number;
    productId?: number;
    categoryId?: number;
    subCategoryId?: number;
    brandId?: number;
    buyingPrice?: number;
    finalPrice?: number;
    ReferenceId?: number;
    discount?: number;
    availableQuantity?: number;
    quantity?: number;
    ProductVarientId?: number;
}
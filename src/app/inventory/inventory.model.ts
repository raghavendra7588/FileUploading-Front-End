export class PurchaseReport {
    categoryId: string;
    subCategoryId: string;
    brandId: string;
    startDate: string;
    endDate: string;
}

export class SalesReport {
    categoryId: string;
    subCategoryId: string;
    brandId: string;
    startDate: string;
    endDate: string;
}

export class ItemMaster {
    itemMasterId?: number;
    productName?: string;
    underGroup?: string;
    barCode?: any;
    categoryId?: string;
    subCategoryId?: string;
    brandId?: string;
    gstClassification?: string;
    activeStatus?: string;
    purchaseDescription?: string;
    purchaseMeasureMentUnit?: string;
    purchaseVarient?: string;
    purchasePrice?: number;
    purchaseDiscount?: number;
    finalPurchasePrice?: number;
    sellingDescription?: string;
    sellingMeasurementUnit?: string;
    sellingVarient?: string;
    sellingPrice?: number;
    sellingDiscount?: number;
    finalSellingPrice?: number;
    itemType?: string;
    minimumLevel?: string;
    serialTracking?: string;
    sellerId?: string;
}
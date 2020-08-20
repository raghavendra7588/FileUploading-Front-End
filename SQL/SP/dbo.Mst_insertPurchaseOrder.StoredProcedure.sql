USE [inventory]
GO
/****** Object:  StoredProcedure [dbo].[Mst_insertPurchaseOrder]    Script Date: 20-08-2020 10:50:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_insertPurchaseOrder](
@VendorId VARCHAR(255),
@OrderNo VARCHAR(255),
@OrderDate VARCHAR(255),
@DeliveryDate VARCHAR(255),
@ReferenceNo VARCHAR(255),
@BillingId VARCHAR(255),
@ShippingId VARCHAR(255),
@Remarks VARCHAR(255),
@ItemValue VARCHAR(255),
@TaxAmount VARCHAR(255),
@Taxable VARCHAR(255), 
@CESSAmount VARCHAR(255),
@DocAmount VARCHAR(255),
@AdvanceAmount VARCHAR(255),
@AdvanceLedger VARCHAR(255),
@SellerId int,
@id int output)
AS
BEGIN

	insert into Mst_PurchaseOrder(VendorId,OrderNo,OrderDate,DeliveryDate,ReferenceNo,BillingId,ShippingId,Remarks,ItemValue,TaxAmount,Taxable,CESSAmount,
	DocAmount,AdvanceAmount,AdvanceLedger,SellerId) VALUES(@VendorId,@OrderNo,@OrderDate,@DeliveryDate,
	@ReferenceNo,@BillingId,@ShippingId,@Remarks,@ItemValue,@TaxAmount,
	@Taxable,@CESSAmount,@DocAmount,@AdvanceAmount,@AdvanceLedger,@SellerId)
	SET @id=SCOPE_IDENTITY()
    RETURN  @id

END
GO

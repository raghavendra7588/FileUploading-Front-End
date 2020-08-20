USE [inventory]
GO
/****** Object:  StoredProcedure [dbo].[Mst_insertPurchaseOrderItem]    Script Date: 20-08-2020 10:50:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_insertPurchaseOrderItem](
@PurchaseOrderId int,
@SellerId int,
@ProductId int,
@SubCategoryId int,
@BrandId int,
@BuyingPrice int,
@FinalPrice int,
@ReferenceId int,
@Discount int,
@Quantity VARCHAR(255),
@ProductVarientId int,
@PurchaseQuantity int)
AS
BEGIN

	insert into Mst_PurchaseOrderItem(PurchaseOrderId,SellerId,ProductId,SubCategoryId,BrandId,BuyingPrice,FinalPrice,ReferenceId,Discount,Quantity,ProductVarientId,CreatedAt,PurchaseQuantity) VALUES
	(@PurchaseOrderId,@SellerId,@ProductId,@SubCategoryId,@BrandId,@BuyingPrice,
	@FinalPrice,@ReferenceId,@Discount,@Quantity,@ProductVarientId,GETDATE(),@PurchaseQuantity)
END
GO

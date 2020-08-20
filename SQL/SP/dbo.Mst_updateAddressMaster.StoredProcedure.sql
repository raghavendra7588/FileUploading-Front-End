USE [inventory]
GO
/****** Object:  StoredProcedure [dbo].[Mst_updateAddressMaster]    Script Date: 20-08-2020 10:50:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_updateAddressMaster](
	@id INT,
	@sellerId INT,
	@billing_address varchar(255) ,
	@billing_city varchar(255) ,
	@billing_pinCode varchar(255) ,
	@billing_country varchar(255) ,
	@billing_state varchar(255) ,
	@billing_phone varchar(255) ,
	@billing_email varchar(255) ,
	@shipping_address varchar(255) ,
	@shipping_city varchar(255) ,
	@shipping_pinCode varchar(255) ,
	@shipping_country varchar(255) ,
	@shipping_state varchar(255) ,
	@shipping_phone varchar(255) ,
	@shipping_email varchar(255) ,
	@sellerName varchar(255) ,
	@billingName varchar(255),
	@shippingName varchar(255)
) AS
BEGIN
UPDATE [dbo].[Mst_Address]
   SET [sellerId]=@sellerId,
	[billing_address]=@billing_address,
	[billing_city]=@billing_city,
	[billing_pinCode]=@billing_pinCode,
	[billing_country]=@billing_country,
	[billing_state]=@billing_state,
	[billing_phone]=@billing_phone,
	[billing_email]=@billing_email,
	[shipping_address]=@shipping_address,
	[shipping_city]=@shipping_city,
	[shipping_pinCode]=@shipping_pinCode,
	[shipping_country]=@shipping_country,
	[shipping_state]=@shipping_state,
	[shipping_phone]=@shipping_phone,
	[shipping_email]=@shipping_email,
	[sellerName]=@sellerName,
	[billingName]=@billingName,
	[shippingName]=@shippingName
 WHERE id=@id;

END 
GO

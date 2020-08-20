USE [inventory]
GO
/****** Object:  StoredProcedure [dbo].[Mst_insertAddress]    Script Date: 20-08-2020 10:50:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_insertAddress](
@sellerName VARCHAR(255),
@sellerId int,
@billing_address VARCHAR(255),
@billing_city VARCHAR(255),
@billing_pinCode VARCHAR(255),
@billing_country VARCHAR(255),
@billing_state VARCHAR(255),
@billing_phone VARCHAR(255),
@billing_email VARCHAR(255),
@shipping_address VARCHAR(255),
@shipping_city VARCHAR(255),
@shipping_pinCode VARCHAR(255), 
@shipping_country VARCHAR(255),
@shipping_state VARCHAR(255),
@shipping_phone VARCHAR(255),
@shipping_email VARCHAR(255),
@billingName VARCHAR(255),
@shippingName VARCHAR(255))
AS
BEGIN

	insert into Mst_Address(sellerName,sellerId,billing_address,billing_city,billing_pinCode,billing_country,billing_state,billing_phone,billing_email,shipping_address,shipping_city,shipping_pinCode,shipping_country,
	shipping_state,shipping_phone,shipping_email,billingName,shippingName) VALUES(@sellerName,@sellerId,@billing_address,@billing_city,@billing_pinCode,
	@billing_country,@billing_state,@billing_phone,@billing_email,@shipping_address,@shipping_city,
	@shipping_pinCode,@shipping_country,@shipping_state,@shipping_phone,@shipping_email,@billingName,@shippingName);

END

GO

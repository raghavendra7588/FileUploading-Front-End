USE [inventory]
GO
/****** Object:  StoredProcedure [dbo].[getAllPriceListData]    Script Date: 20-08-2020 10:50:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getAllPriceListData](@SellerId int) AS
BEGIN
Select * from Mst_PriceList where SellerId=@SellerId;
END 
GO

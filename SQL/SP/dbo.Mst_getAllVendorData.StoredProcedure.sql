USE [inventory]
GO
/****** Object:  StoredProcedure [dbo].[Mst_getAllVendorData]    Script Date: 20-08-2020 10:50:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_getAllVendorData] (@SellerId varchar(55)) AS
BEGIN
Select * from Mst_Vendor where SellerId=@SellerId;
END 
GO

USE [inventory]
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetAddressData]    Script Date: 20-08-2020 10:50:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetAddressData] (@sellerId int)
AS
BEGIN
 select * from Mst_Address where sellerId=@sellerId;
END
GO

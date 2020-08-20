USE [inventory]
GO
/****** Object:  StoredProcedure [dbo].[getVendorById]    Script Date: 20-08-2020 10:50:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[getVendorById](
	 @vendorId varchar(50)
) AS
BEGIN
	SELECT * 
 	FROM Mst_Vendor
	WHERE vendorId = @vendorId;
END 


GO

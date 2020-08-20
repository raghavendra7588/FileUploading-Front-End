USE [inventory]
GO
/****** Object:  StoredProcedure [dbo].[Mst_updateVendorMaster]    Script Date: 20-08-2020 10:50:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_updateVendorMaster](
@code VARCHAR(255),
@name VARCHAR(255),
@underLedger VARCHAR(255),
@contactPerson VARCHAR(255),
@printName VARCHAR(255),
@category VARCHAR(255),
@subCategory VARCHAR(255),
@brand VARCHAR(255),
@fileUpload VARCHAR(255),
@gst VARCHAR(255),
@gstCategory VARCHAR(255),
@pan VARCHAR(255),
@registrationDate VARCHAR(255),
@distance VARCHAR(255),
@cin VARCHAR(255),
@paymentTeam VARCHAR(255),
@priceCategory VARCHAR(255),
@agentBroker VARCHAR(255),
@transporter VARCHAR(255),
@creditLimit VARCHAR(255),
@ifscCode VARCHAR(255),
@accountNumber VARCHAR(255),
@bankName VARCHAR(255),
@branch VARCHAR(255),
@vendorId INT,
@sellerId VARCHAR(50),
@address VARCHAR(255),
@city VARCHAR(255),
@pinCode VARCHAR(255),
@state VARCHAR(255),
@country VARCHAR(255),
@phone VARCHAR(255),
@email VARCHAR(255)
) AS
BEGIN
UPDATE [dbo].[Mst_Vendor]
   SET [code] = @code,
      [name] = @name,
      [underLedger] = @underLedger,
      [contactPerson] = @contactPerson,
      [printName] = @printName,
      [category] = @category,
      [subCategory] = @subCategory,
      [brand] = @brand,
      [fileUpload] = @fileUpload,
      [gst] = @gst,
      [gstCategory] = @gstCategory,
      [pan] = @pan,
      [registrationDate] = @registrationDate,
      [distance] = @distance,
      [cin] = @cin,  
      [paymentTeam] = @paymentTeam,
      [priceCategory] = @priceCategory,
      [agentBroker] = @agentBroker,
      [transporter] = @transporter,
      [creditLimit] = @creditLimit,
      [ifscCode] = @ifscCode,
      [accountNumber] = @accountNumber,
      [bankName] = @bankName,
      [branch] = @branch,
	  [sellerId] =@sellerId,
	  [address]=@address,
	  [city]=@city,
	  [pinCode]=@pinCode,
	  [state]=@state,
	  [country]=@country,
	  [phone]=@phone,
	  [email]=@email
 WHERE vendorId=@vendorId;

END 



GO

USE [fileUploading]
GO
/****** Object:  StoredProcedure [dbo].[getRecordById]    Script Date: 09-07-2020 10:25:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getRecordById](@userId INT) AS
BEGIN
		SELECT * FROM dbo.files where userId=@userId;
END
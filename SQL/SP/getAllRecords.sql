USE [fileUploading]
GO
/****** Object:  StoredProcedure [dbo].[getAllRecords]    Script Date: 09-07-2020 10:24:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getAllRecords] AS
BEGIN
		SELECT * FROM dbo.files;
END;

USE [fileUploading]
GO
/****** Object:  StoredProcedure [dbo].[insertDocument]    Script Date: 09-07-2020 10:26:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[insertDocument](@filePath varchar(150),@fileType varchar(30),@createdBy varchar(100),@userId int) AS
BEGIN
		INSERT INTO files (filePath, fileType,createdOn,createdBy,userId) VALUES(@filePath, @fileType,getDATE(),@createdBy,@userId);
END 
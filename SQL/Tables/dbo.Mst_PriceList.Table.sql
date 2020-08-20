USE [inventory]
GO
/****** Object:  Table [dbo].[Mst_PriceList]    Script Date: 20-08-2020 10:50:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Mst_PriceList](
	[PriceListId] [int] IDENTITY(1,1) NOT NULL,
	[SellerId] [int] NULL,
	[ProductId] [int] NULL,
	[SubCategoryId] [int] NULL,
	[BrandId] [int] NULL,
	[BuyingPrice] [int] NULL,
	[FinalPrice] [int] NULL,
	[ReferenceId] [int] NULL,
	[Discount] [int] NULL,
	[AvailableQuantity] [varchar](255) NULL,
	[Quantity] [varchar](255) NULL,
	[ProductVarientId] [int] NULL,
	[CreatedAt] [datetime] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO

using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace inventory.Models
{
    public class PurchaseReportInventory
    {
        public string[] CategoryId { get; set; }
        public string[] SubcategoryId { get; set; }
        public string[] BrandId { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }
        public string sellerId { get; set; }
    }

    public class PurchaseReportInventoryBL
    {
        string strConn = ConfigurationManager.ConnectionStrings["sqlConnection"].ToString();

        public DataTable getData(int id)
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "getPurchaseReportById";
            command.Parameters.AddWithValue("@PurchaseOrderId", id);
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;
        }


        public DataTable postAllData(PurchaseReportInventory purchaseReportInventory)
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            string sql = "select Mst_PurchaseOrderItem.PurchaseOrderId,Mst_PurchaseOrderItem.ProductId,Mst_PurchaseOrderItem.FinalPrice,Mst_PurchaseOrderItem.Discount, Mst_PurchaseOrderItem.PurchaseQuantity from Mst_PurchaseOrderItem,Mst_PurchaseOrder where Mst_PurchaseOrderItem.SellerId = 2 AND Mst_PurchaseOrderItem.SubCategoryId IN(73,79,85) AND Mst_PurchaseOrderItem.BrandId IN(126,157,155) AND Mst_PurchaseOrder.PurchaseOrderId = Mst_PurchaseOrderItem.PurchaseOrderId order by Mst_PurchaseOrderItem.ProductVarientId ASC";
                //"select * from Mst_PurchaseOrderItem,Mst_PurchaseOrder where Mst_PurchaseOrderItem.SellerId = 2 AND Mst_PurchaseOrderItem.SubCategoryId IN(73,79,85)  AND Mst_PurchaseOrderItem.BrandId IN(126,157,155) AND Mst_PurchaseOrder.PurchaseOrderId = Mst_PurchaseOrderItem.PurchaseOrderId order by Mst_PurchaseOrderItem.ProductVarientId ASC";
               // BuildQuery(purchaseReportInventory.CategoryId, purchaseReportInventory.SubcategoryId, purchaseReportInventory.BrandId, purchaseReportInventory.startDate, purchaseReportInventory.endDate);
            command.Connection = conn;
            command.CommandType = CommandType.Text;
            command.CommandText = sql;



            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;
        }

        public DataTable createReportData(DataTable dt)
        {
            DataTable table = new DataTable();
            table.Columns.Add("ProductName", typeof(string));
            table.Columns.Add("Brand", typeof(string));
            table.Columns.Add("Varient", typeof(string));
            table.Columns.Add("Quantity", typeof(int));
            table.Columns.Add("FinalPrice", typeof(int));


            for (int i=0;i<dt.Rows.Count;i++)
            {
                string strFinalPrice = dt.Rows[i]["FinalPrice"].ToString();
                string strProductVarientId = dt.Rows[i]["ProductVarientId"].ToString();

                int totalQuantity = 0;
                int totalFinalPrice = 0;
         
                for (int j=0;j<dt.Rows.Count; j++)
                {
                    if (strProductVarientId == dt.Rows[j]["ProductVarientId"].ToString())
                    {
                        totalQuantity += Convert.ToInt32(dt.Rows[j]["PurchaseQuantity"].ToString());
                        totalFinalPrice += Convert.ToInt32(dt.Rows[j]["FinalPrice"].ToString());
                    }
                }
                table.Rows.Add("dummmyProductName", "dummmyBrand", "dummmyVarientName", totalQuantity, totalFinalPrice);
            }
          

            return dt;
        }
  
    }
}
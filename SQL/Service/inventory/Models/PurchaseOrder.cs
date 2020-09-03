using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace inventory.Models
{
    public class PurchaseOrder
    {

        public int PurchaseOrderId { get; set; }
        public int SellerId { get; set; }
        public string VendorId { get; set; }
        public string vendorName { get; set; }
        public string OrderNo { get; set; }
        public string OrderDate { get; set; }
        public string DeliveryDate { get; set; }
        public string ReferenceNo { get; set; }
        public string BillingId { get; set; }
        public string ShippingId { get; set; }
        public string Remarks { get; set; }
        public string ItemValue { get; set; }
        public string TaxAmount { get; set; }
        public string Taxable { get; set; }
        public string CESSAmount { get; set; }
        public string DocAmount { get; set; }
        public string AdvanceAmount { get; set; }
        public string AdvanceLedger { get; set; }      
        public string BatchNumber { get; set; }
        public string paymentTerms { get; set; }
        public List<PurchaseOrderItem> items { get; set; }
    }


    public class PurchaseOrderBL
    {
        string strConn = ConfigurationManager.ConnectionStrings["sqlConnection"].ToString();

        
        public PurchaseOrder postPurchaseOrderToDb(PurchaseOrder purchaseOrderData)
        {
            PurchaseOrder objResultReturn = new PurchaseOrder();
            PurchaseOrderItemBL ObjPurchaseOrderItemBL = new PurchaseOrderItemBL();
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_insertPurchaseOrder", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@SellerId", purchaseOrderData.SellerId);
            cmd.Parameters.AddWithValue("@VendorId", purchaseOrderData.VendorId);
            cmd.Parameters.AddWithValue("@OrderNo", purchaseOrderData.OrderNo);
            cmd.Parameters.AddWithValue("@OrderDate", purchaseOrderData.OrderDate);
            cmd.Parameters.AddWithValue("@DeliveryDate", purchaseOrderData.DeliveryDate);
            cmd.Parameters.AddWithValue("@ReferenceNo", purchaseOrderData.ReferenceNo);
            cmd.Parameters.AddWithValue("@BillingId", purchaseOrderData.BillingId);
            cmd.Parameters.AddWithValue("@ShippingId", purchaseOrderData.ShippingId);
            cmd.Parameters.AddWithValue("@Remarks", purchaseOrderData.Remarks);

            cmd.Parameters.AddWithValue("@ItemValue", purchaseOrderData.ItemValue);
            cmd.Parameters.AddWithValue("@TaxAmount", purchaseOrderData.TaxAmount);
            cmd.Parameters.AddWithValue("@Taxable", purchaseOrderData.Taxable);
            cmd.Parameters.AddWithValue("@CESSAmount", purchaseOrderData.CESSAmount);
            cmd.Parameters.AddWithValue("@DocAmount", purchaseOrderData.DocAmount);
            cmd.Parameters.AddWithValue("@AdvanceAmount", purchaseOrderData.AdvanceAmount);
            cmd.Parameters.AddWithValue("@AdvanceLedger", purchaseOrderData.AdvanceLedger);
            cmd.Parameters.AddWithValue("@BatchNumber", purchaseOrderData.BatchNumber);
            cmd.Parameters.AddWithValue("@paymentTerms", purchaseOrderData.paymentTerms);
            cmd.Parameters.Add("@id", SqlDbType.Int).Direction = ParameterDirection.Output;

            cmd.ExecuteNonQuery();
            conn.Close();
            int id = (int)cmd.Parameters["@id"].Value;
            objResultReturn.PurchaseOrderId = id;
            objResultReturn.OrderNo = purchaseOrderData.OrderNo;
            objResultReturn.vendorName = purchaseOrderData.vendorName;
            ObjPurchaseOrderItemBL. postPurchaseOrderItemToDb(purchaseOrderData.items, id);
            return objResultReturn;
        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using inventory.Models;

namespace inventory.Controllers
{
    public class PurchaseOrderController : ApiController
    {
        PurchaseOrderBL purchaseOrderBL = new PurchaseOrderBL();

        [HttpPost]
        public PurchaseOrder Post(PurchaseOrder purchaseOrderData)
        {
            PurchaseOrder ObjPurchaseOrder = new PurchaseOrder();
            int intId = ObjPurchaseOrder.PurchaseOrderId;
            try
            {
                if (intId == 0)
                {
                    ObjPurchaseOrder= purchaseOrderBL.postPurchaseOrderToDb(purchaseOrderData);
                }

                return ObjPurchaseOrder;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}

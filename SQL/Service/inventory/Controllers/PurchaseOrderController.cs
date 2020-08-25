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
        public HttpResponseMessage Post(PurchaseOrder purchaseOrderData)
        {
            PurchaseOrder purchaseOrder = new PurchaseOrder();
            int intId = purchaseOrder.PurchaseOrderId;
            try
            {
                if (intId == 0)
                {
                    purchaseOrderBL.postPurchaseOrderToDb(purchaseOrderData);
                }

                return Request.CreateResponse(HttpStatusCode.Created);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}

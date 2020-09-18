using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using inventory.Models;

namespace inventory.Controllers
{
    public class MinimumPurchaseReportInventoryController : ApiController
    {
        MinimumPurchaseReportInventoryBL objMinimumPurchaseReportInventoryBL = new MinimumPurchaseReportInventoryBL();
        [HttpGet]
        public HttpResponseMessage getall(int id)
        {
            try
            {
                DataTable dt = objMinimumPurchaseReportInventoryBL.getData(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

        [HttpPost]
        public HttpResponseMessage postall(MinimumPurchaseReportInventory objMinimumPurchaseReport)
        {
            try
            {
                DataTable dt = objMinimumPurchaseReportInventoryBL.postAllData(objMinimumPurchaseReport);
                DataTable reportData = objMinimumPurchaseReportInventoryBL.createReportData(dt);
                return Request.CreateResponse(HttpStatusCode.OK, reportData);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}

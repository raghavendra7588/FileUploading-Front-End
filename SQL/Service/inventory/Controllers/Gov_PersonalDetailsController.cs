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
    public class Gov_PersonalDetailsController : ApiController
    {
        Gov_PersonalDetailsBL objGov_PersonalDetailsBL = new Gov_PersonalDetailsBL();

        [HttpGet]
        public HttpResponseMessage getall()
        {
            try
            {
                DataTable dt = objGov_PersonalDetailsBL.getAllData();
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }



        
        [HttpPost]
        public HttpResponseMessage Post(Gov_PersonalDetails objGov_PersonalDetails)
        {
            string strId = objGov_PersonalDetails.id;
            try
            {


                if (Convert.ToInt32(strId) == 0)
                {
                    objGov_PersonalDetailsBL.PostGovPersonalDetails(objGov_PersonalDetails);
                }
                else
                {
                    objGov_PersonalDetailsBL.updateAddressToDb(objGov_PersonalDetails, Convert.ToInt32(strId));
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

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminApiController : BaseApiController
    {
        private IAdminService _service = null;
        private IAuthenticationService<int> _authService = null;

        public AdminApiController(IAdminService service, IAuthenticationService<int> authService, ILogger<AdminApiController> logger) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet("analytics/data")]
        public ActionResult<ItemResponse<AdminDashboardAnalytics>> GetAdminAnalytics(DateTime dateStart, DateTime dateEnd, int filterBy)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                AdminDashboardAnalytics analytics = _service.GetAnalytics(dateStart, dateEnd, filterBy);

                if (analytics.KitchenCount == null && 
                    analytics.ChefCount == null && 
                    analytics.UserCount == null && 
                    analytics.ListingCount == null &&
                    analytics.OrderAmounts == null &&
                    analytics.Sales == null)
                {
                    code = 404;
                    response = new ErrorResponse("No data found");
                }
                else
                {
                    response = new ItemResponse<AdminDashboardAnalytics> { Item = analytics };
                }
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }
       
    }
}

using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IAdminService
    {
        AdminDashboardAnalytics GetAnalytics(DateTime dateStart, DateTime dateEnd, int filterBy);
    }
}

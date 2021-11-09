using Sabio.Models.Domain.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class AdminDashboardAnalytics
    {
        public List<AnalyticsTracker> KitchenCount { get; set; }
        public List<AnalyticsTracker> ChefCount { get; set; }
        public List<AnalyticsTracker> UserCount { get; set; }
        public List<AnalyticsTracker> ListingCount { get; set; }
        public List<AnalyticsTracker> OrderAmounts { get; set; }
        public List<AnalyticsTracker> Sales { get; set; }
    }
}

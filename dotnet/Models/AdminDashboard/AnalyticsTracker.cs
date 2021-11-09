using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Admin
{   // This class will be used for keeping track of chefs, kitchens, users, listings.
    // for sales and orders this will be used as a base
    public class AnalyticsTracker
    {
        public int Count { get; set; }
        //Date will track by week, month, year
        public int Date { get; set; }
        public int SalesTotal { get; set; }
        public int SalesTransfer { get; set; }
        public decimal OrderTotal { get; set; }
    }
}

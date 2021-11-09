using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Admin;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class AdminService: IAdminService
    {
        IDataProvider _data = null;

        public AdminService(IDataProvider data)
        {
            _data = data;
        }

        public AdminDashboardAnalytics GetAnalytics(DateTime dateStart, DateTime dateEnd, int filterBy)
        {
            string procName = "[dbo].[AdminAnalytics_SelectByDate]";

            AdminDashboardAnalytics adminAnalytics = new AdminDashboardAnalytics();

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection paramCol)
            {
                paramCol.AddWithValue("@DateRangeStart", dateStart);
                paramCol.AddWithValue("@DateRangeEnd", dateEnd);
                paramCol.AddWithValue("@filterBy", filterBy);
            }, delegate (IDataReader reader, short set)
            {
                MapAnalytics(reader, set, adminAnalytics);
            });

            return adminAnalytics; 
        }

        private static void AddAnalytics(IDataReader reader, short set, AdminDashboardAnalytics analytics)
        {
            int index = 0;
            if ( set == 0)
            {
                AnalyticsTracker kitchen = new AnalyticsTracker();
                kitchen.Date = reader.GetSafeInt32(index++);
                kitchen.Count = reader.GetSafeInt32(index);
                analytics.KitchenCount.Add(kitchen);
            }
            else if (set == 1)
            {
                AnalyticsTracker chef = new AnalyticsTracker();
                chef.Date = reader.GetSafeInt32(index++);
                chef.Count = reader.GetSafeInt32(index);
                analytics.ChefCount.Add(chef);
            }
            else if (set == 2)
            {
                AnalyticsTracker user = new AnalyticsTracker();
                user.Date = reader.GetSafeInt32(index++);
                user.Count = reader.GetSafeInt32(index);
                analytics.UserCount.Add(user);
            }
            else if (set == 3)
            {
                AnalyticsTracker listing = new AnalyticsTracker();
                listing.Date = reader.GetSafeInt32(index++);
                listing.Count = reader.GetSafeInt32(index);
                analytics.ListingCount.Add(listing);
            }
            else if (set == 4)
            {
                AnalyticsTracker order = new AnalyticsTracker();
                order.Date = reader.GetSafeInt32(index++);
                order.Count = reader.GetSafeInt32(index++);
                order.OrderTotal = reader.GetSafeDecimal(index);
                analytics.OrderAmounts.Add(order);
            }
            else if (set == 5)
            {
                AnalyticsTracker sale = new AnalyticsTracker();
                sale.Date = reader.GetSafeInt32(index++);
                sale.Count = reader.GetSafeInt32(index++);
                sale.SalesTotal = reader.GetSafeInt32(index++);
                sale.SalesTransfer = reader.GetSafeInt32(index);
                analytics.Sales.Add(sale);
            }
        }

        private static void MapAnalytics(IDataReader reader, short set, AdminDashboardAnalytics analytics)
        {
            if (set == 0)
            {
                if(analytics.KitchenCount == null)
                {
                    analytics.KitchenCount = new List<AnalyticsTracker>();
                }
                AddAnalytics(reader, set, analytics);
            }
            else if (set == 1)
            {
                if(analytics.ChefCount == null)
                {
                    analytics.ChefCount = new List<AnalyticsTracker>();
                }
                AddAnalytics(reader, set, analytics);
            }
            else if (set == 2)
            {
                if(analytics.UserCount == null)
                {
                    analytics.UserCount = new List<AnalyticsTracker>();
                }
                    AddAnalytics(reader, set, analytics);
            }
            else if (set == 3)
            {
                if(analytics.ListingCount == null)
                {
                    analytics.ListingCount = new List<AnalyticsTracker>();
                }
                AddAnalytics(reader, set, analytics);
            }
            else if (set == 4)
            {
                if (analytics.OrderAmounts == null)
                {
                    analytics.OrderAmounts = new List<AnalyticsTracker>();
                }
                AddAnalytics(reader, set, analytics);
            }
            else if (set == 5)
            {
                if (analytics.Sales == null)
                {
                    analytics.Sales = new List<AnalyticsTracker>();
                }
                AddAnalytics(reader, set, analytics);
            }
        }

    }
}

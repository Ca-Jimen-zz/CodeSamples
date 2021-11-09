import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import Trend from "react-trend";
import { Grid, Card } from "@material-ui/core";
import PropTypes from "prop-types";
import AdminAnalyticsDetailButton from "./AdminAnalyticsDetailButton";
import ArrowDirection from "./adminCards/ArrowDirection";
import PercentageDisplay from "./adminCards/PercentageDisplay";

import debug from "sabio-debug";
const _logger = debug.extend("AdminAnalyticsGraphs");

function AdminAnalyticsGraphs(props) {
  const [renderPage, setRenderPage] = useState(false);
  useEffect(() => {
    if (
      props.item.chefCount &&
      props.item.userCount &&
      props.item.kitchenCount &&
      props.item.listingCount &&
      props.item.sales &&
      props.item.orderAmounts
    ) {
      _logger("Props that were passed down: ", props.item);
      setRenderPage(true);
    }
  }, [props]);

  return (
    <>
      {renderPage && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={6} lg={4}>
                <Card className="card-box mb-4">
                  <div className="card-header-alt px-4 pt-4 pb-0 d-flex align-items-start justify-content-between">
                    <div>
                      <h3 className="font-weight-bold display-4 mb-0 text-black">
                        <ArrowDirection
                          percent={
                            props.item.percents
                              ? props.item.percents.salesPercentage
                              : 0
                          }
                        />
                        $
                        <CountUp
                          start={0}
                          end={
                            props.item.sales ? props.item.sales[0].revenue : 0
                          }
                          duration={2}
                          deplay={2}
                          separator=","
                          decimals={0}
                          decimal=","
                          redraw={true}
                        />
                      </h3>
                      <p className="font-size-lg text-black-50 mb-0">
                        Sales for {props.date}
                      </p>
                    </div>
                    <AdminAnalyticsDetailButton
                      name={"Sales"}
                      itemData={props.item.sales}
                      year={props.year}
                      date={props.date}
                    />
                  </div>
                  <div className="pr-5 pb-3">
                    <Trend
                      data={
                        props.item.sales && props.item.sales.length > 1
                          ? props.item.sales.map((x) => x.revenue).reverse()
                          : [0, 0, 0, 0, 0, 0, 0, 0, 0]
                      }
                      autoDraw
                      autoDrawDuration={2000}
                      autoDrawEasing="ease-in"
                      height={120}
                      radius={15}
                      smooth
                      stroke="var(--success)"
                      strokeLinecap="round"
                      strokeWidth={4}
                    />
                  </div>
                  <div className="text-black text-center opacity-6 pb-1">
                    <PercentageDisplay
                      percent={
                        props.item.percents
                          ? props.item.percents.salesPercentage
                          : 0
                      }
                      selectBy={props.date}
                    />
                  </div>
                </Card>
                <Card className="card-box bg-primary mb-4">
                  <div className="card-header-alt px-4 pt-4 pb-0 d-flex align-items-start justify-content-between">
                    <div>
                      <h3 className="font-weight-bold display-4 mb-0 text-white">
                        <ArrowDirection
                          percent={
                            props.item.percents
                              ? props.item.percents.listingPercentage
                              : 0
                          }
                        />
                        <CountUp
                          start={0}
                          end={
                            props.item.listingCount
                              ? props.item.listingCount[0].count
                              : 0
                          }
                          duration={2}
                          deplay={2}
                          separator=","
                          decimals={0}
                          decimal=","
                        />
                      </h3>
                      <p className="font-size-lg text-white-50 mb-0">
                        Listings for {props.date}
                      </p>
                    </div>
                    <AdminAnalyticsDetailButton
                      name={"Listings"}
                      itemData={props.item.listingCount}
                      year={props.year}
                      date={props.date}
                    />
                  </div>
                  <div className="pr-5 pb-3">
                    <Trend
                      data={
                        props.item.listingCount &&
                        props.item.listingCount.length > 1
                          ? props.item.listingCount
                              .map((x) => x.count)
                              .reverse()
                          : [0, 0, 0, 0, 0, 0, 0, 0, 0]
                      }
                      autoDraw
                      autoDrawDuration={2000}
                      autoDrawEasing="ease-in"
                      height={120}
                      radius={15}
                      smooth
                      stroke="var(--white)"
                      strokeLinecap="round"
                      strokeWidth={4}
                    />
                  </div>
                  <div className="text-white text-center opacity-6 pb-1">
                    <PercentageDisplay
                      percent={
                        props.item.percents
                          ? props.item.percents.listingPercentage
                          : 0
                      }
                      selectBy={props.date}
                    />
                  </div>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Card className="card-box mb-4">
                  <div className="card-header-alt px-4 pt-4 pb-0 d-flex align-items-start justify-content-between">
                    <div>
                      <h3 className="font-weight-bold display-4 mb-0 text-black">
                        <ArrowDirection
                          percent={
                            props.item.percents
                              ? props.item.percents.orderPercentage
                              : 0
                          }
                        />
                        $
                        <CountUp
                          start={0}
                          end={
                            props.item.orderAmounts
                              ? props.item.orderAmounts[0].orderTotal
                              : 0
                          }
                          duration={2}
                          deplay={2}
                          separator=","
                          decimals={0}
                          decimal=","
                        />
                      </h3>
                      <p className="font-size-lg text-black-50 mb-0">
                        Orders for {props.date}
                      </p>
                    </div>
                    <AdminAnalyticsDetailButton
                      name={"Orders"}
                      itemData={props.item.orderAmounts}
                      year={props.year}
                      date={props.date}
                    />
                  </div>
                  <div className="pr-5 pb-3">
                    <Trend
                      data={
                        props.item.orderAmounts &&
                        props.item.orderAmounts.length > 1
                          ? props.item.orderAmounts
                              .map((x) => x.orderTotal)
                              .reverse()
                          : [0, 0, 0, 0, 0, 0, 0, 0, 0]
                      }
                      autoDraw
                      autoDrawDuration={2000}
                      autoDrawEasing="ease-in"
                      height={120}
                      radius={15}
                      smooth
                      stroke="var(--first)"
                      strokeLinecap="round"
                      strokeWidth={4}
                    />
                  </div>
                  <div className="text-black text-center opacity-6 pb-1">
                    <PercentageDisplay
                      percent={
                        props.item.percents
                          ? props.item.percents.orderPercentage
                          : 0
                      }
                      selectBy={props.date}
                    />
                  </div>
                </Card>
                <Card className="card-box bg-warning mb-4">
                  <div className="card-header-alt px-4 pt-4 pb-0 d-flex align-items-start justify-content-between">
                    <div>
                      <h3 className="font-weight-bold display-4 mb-0 text-white">
                        <ArrowDirection
                          percent={
                            props.item.percents
                              ? props.item.percents.usersPercentage
                              : 0
                          }
                        />
                        <CountUp
                          start={0}
                          end={
                            props.item.userCount
                              ? props.item.userCount[0].count
                              : 0
                          }
                          duration={2}
                          deplay={2}
                          separator=","
                          decimals={0}
                          decimal=","
                        />
                      </h3>
                      <p className="font-size-lg text-white-50 mb-0">
                        Users for {props.date}
                      </p>
                    </div>
                    <AdminAnalyticsDetailButton
                      name={"Users"}
                      itemData={props.item.userCount}
                      year={props.year}
                      date={props.date}
                    />
                  </div>
                  <div className="pr-5 pb-3">
                    <Trend
                      data={
                        props.item.userCount && props.item.userCount.length > 1
                          ? props.item.userCount.map((x) => x.count).reverse()
                          : [0, 0, 0, 0, 0, 0, 0, 0, 0]
                      }
                      autoDraw
                      autoDrawDuration={2000}
                      autoDrawEasing="ease-in"
                      height={120}
                      radius={15}
                      smooth
                      stroke="var(--white)"
                      strokeLinecap="round"
                      strokeWidth={4}
                    />
                  </div>
                  <div className="text-white text-center opacity-6 pb-1">
                    <PercentageDisplay
                      percent={
                        props.item.percents
                          ? props.item.percents.userPercentage
                          : 0
                      }
                      selectBy={props.date}
                    />
                  </div>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Card className="card-box mb-4">
                  <div className="card-header-alt px-4 pt-4 pb-0 d-flex align-items-start justify-content-between">
                    <div>
                      <h3 className="font-weight-bold display-4 mb-0 text-black">
                        <ArrowDirection
                          percent={
                            props.item.percents
                              ? props.item.percents.kitchenPercentage
                              : 0
                          }
                        />
                        <CountUp
                          start={0}
                          end={
                            props.item.kitchenCount
                              ? props.item.kitchenCount[0].count
                              : 0
                          }
                          duration={2}
                          deplay={2}
                          separator=","
                          decimals={0}
                          decimal=","
                        />
                      </h3>
                      <p className="font-size-lg text-black-50 mb-0">
                        Kitchens for {props.date}
                      </p>
                    </div>
                    <AdminAnalyticsDetailButton
                      name={"Kitchen"}
                      itemData={props.item.kitchenCount}
                      year={props.year}
                      date={props.date}
                    />
                  </div>
                  <div className="pr-5 pb-3">
                    <Trend
                      data={
                        props.item.kitchenCount &&
                        props.item.kitchenCount.length > 1
                          ? props.item.kitchenCount
                              .map((x) => x.count)
                              .reverse()
                          : [0, 0, 0, 0, 0, 0, 0, 0, 0]
                      }
                      autoDraw
                      autoDrawDuration={2000}
                      autoDrawEasing="ease-in"
                      height={120}
                      radius={15}
                      smooth
                      stroke="var(--dark)"
                      strokeLinecap="round"
                      strokeWidth={4}
                    />
                  </div>
                  <div className="text-black text-center opacity-6 pb-1">
                    <PercentageDisplay
                      percent={
                        props.item.percents
                          ? props.item.percents.kitchenPercentage
                          : 0
                      }
                      selectBy={props.date}
                    />
                  </div>
                </Card>
                <Card className="card-box bg-danger mb-4">
                  <div className="card-header-alt px-4 pt-4 pb-0 d-flex align-items-start justify-content-between">
                    <div>
                      <h3 className="font-weight-bold display-4 mb-0 text-white">
                        <ArrowDirection
                          percent={
                            props.item.percents
                              ? props.item.percents.chefPercentage
                              : 0
                          }
                        />
                        <CountUp
                          start={0}
                          end={
                            props.item.chefCount
                              ? props.item.chefCount[0].count
                              : 0
                          }
                          duration={2}
                          deplay={2}
                          separator=","
                          decimals={0}
                          decimal=","
                        />
                      </h3>
                      <p className="font-size-lg text-white-50 mb-0">
                        Chefs for {props.date}
                      </p>
                    </div>
                    <AdminAnalyticsDetailButton
                      name={"Chefs"}
                      itemData={props.item.chefCount}
                      year={props.year}
                      date={props.date}
                    />
                  </div>
                  <div className="pr-5 pb-3">
                    <Trend
                      data={
                        props.item.chefCount && props.item.chefCount.length > 1
                          ? props.item.chefCount.map((x) => x.count).reverse()
                          : [0, 0, 0, 0, 0, 0, 0, 0, 0]
                      }
                      autoDraw
                      autoDrawDuration={2000}
                      autoDrawEasing="ease-in"
                      height={120}
                      radius={15}
                      smooth
                      stroke="var(--white)"
                      strokeLinecap="round"
                      strokeWidth={4}
                    />
                  </div>
                  <div className="text-white text-center opacity-6">
                    <PercentageDisplay
                      percent={
                        props.item.percents
                          ? props.item.percents.chefPercentage
                          : 0
                      }
                      selectBy={props.date}
                    />
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}

AdminAnalyticsGraphs.propTypes = {
  item: PropTypes.shape({
    chefCount: PropTypes.arrayOf(PropTypes.object),
    kitchenCount: PropTypes.arrayOf(PropTypes.object),
    listingCount: PropTypes.arrayOf(PropTypes.object),
    userCount: PropTypes.arrayOf(PropTypes.object),
    orderAmounts: PropTypes.arrayOf(PropTypes.object),
    sales: PropTypes.arrayOf(PropTypes.object),
    percents: PropTypes.objectOf(PropTypes.number),
  }),
  year: PropTypes.string,
  date: PropTypes.string,
};

export default AdminAnalyticsGraphs;

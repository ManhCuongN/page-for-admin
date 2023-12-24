/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "context/product.context";

function Dashboard() {
  const {statisticsOrderTypeOrderByShop, statisticsSales} = useContext(ProductContext)
  const [statisticsOrderShop, setStatisticOrderShop] = useState(null)
  const [statisticsTotalSalesShop, setStatisticTotalSalesShop] = useState([])

  const shopId = localStorage.getItem("shopId")
  useEffect(() => {
    const fetchData = async() => {
      const data = {
        shopId
      }
      const result = await statisticsOrderTypeOrderByShop(data)
      const totalSales = await statisticsSales(data)
      setStatisticTotalSalesShop(totalSales)
      setStatisticOrderShop(result.metadata)
    }
    fetchData()
  },[])
  console.log("Sá", statisticsTotalSalesShop);
  const labels = statisticsTotalSalesShop.map(item => `${item.month}`);
  const data = statisticsTotalSalesShop.map(item => item.totalSales);
   const sales = {
    labels,
    datasets: { label: "Total Sales", data: data },
  }
  const totalOrders = {
    labels: statisticsTotalSalesShop.map(item => `${item.month}`),
    datasets: { label: "Total Order", data: statisticsTotalSalesShop.map(item => item.totalOrders)}
  }
  
  const { tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Tổng Đơn Hàng"
                count={statisticsOrderShop?.totalOrders}
                percentage={{
                  color: "success",
                  amount: `+${statisticsOrderShop?.totalOrders}`,
                  label: "Tổng Đơn Hàng",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Đơn Hàng COD"
                count={statisticsOrderShop?.totalCODOrders}
                percentage={{
                  color: "success",
                  amount:`+${statisticsOrderShop?.totalCODOrders}`,
                  label: "Đơn Hàng COD",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Đơn Hàng VNPAY"
                count={statisticsOrderShop?.totalVNPAYOrders}
                percentage={{
                  color: "success",
                  amount: `+${statisticsOrderShop?.totalVNPAYOrders}`,
                  label: "Đơn Hàng VNPAY",
                }}
              />
            </MDBox>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid> */}
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Thống Kê Tổng Số Đơn Hàng"
                  // description="Last Campaign Performance"
                  // date="campaign sent 2 days ago"
                  chart={totalOrders}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Thống Kê Doanh Thu"
                  // description={
                  //   <>
                  //     (<strong>+15%</strong>) increase in today sales.
                  //   </>
                  // }
                  // date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid> */}
          </Grid>
        </MDBox>
        <MDBox>
          {/* <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid> */}
        </MDBox>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;

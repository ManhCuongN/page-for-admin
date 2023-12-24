

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

const inputData = [
  { month: '2023-04', totalOrders: 2, totalSales: 500000 },
  { month: '2023-05', totalOrders: 5, totalSales: 800000 },
  { month: '2023-06', totalOrders: 3, totalSales: 600000 },
  // Add more data as needed
];

const labels = inputData.map(item => `${item.month}`);
const data = inputData.map(item => item.totalSales);

export default {
  sales: {
    labels,
    datasets: { label: "Mobile apps", data: data },
  },
  tasks: {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: { label: "Desktop apps", data: [50, 40, 300, 220, 500, 250, 400, 230, 500] },
  },
};

   
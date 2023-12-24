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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Users from "layouts/user";

import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import CreateDisCountComponent from "layouts/discount/create";
import ConfirmShop from "layouts/confirm-shop";
import ListOrdered from "layouts/order/list-order"
import ChatBox from "layouts/chat/ChatBox"



// @mui icons
import Icon from "@mui/material/Icon";
import ModalCreate from "layouts/tables/create.modal";
import TestFr from "layouts/tables/data/testFormm";
import Cover from "layouts/authentication/reset-password/cover";

const routes = [
  {
    type: "collapse",
    name: "Thống Kê",
    key: "Thống Kê",
    icon: <Icon fontSize="small">Thống Kê</Icon>,
    route: "/Thong-Ke",
    role: "01",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Tạo Sản Phẩm",
    key: "creates",
    role: "01",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/Tao/San-Pham-Moi",
    component: <ModalCreate />,
  },
  {
    type: "collapse",
    name: "Tạo Discount",
    key: "discount",
    role: "01",
    icon: <Icon fontSize="small">Discount</Icon>,
    route: "/create/discount",
    component: <CreateDisCountComponent />,
   
  },
  {
    type: "collapse",
    name: "Danh Sách Sản Phẩm",
    key: "tables",
    role: "01",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/Danh-Sach-San-Pham",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Danh Sách Discount",
    key: "billing",
    role: "01",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Danh-Sach-Discount",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Trò Chuyện",
    key: "rtl",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/Chat",
    role: "01",
    component: <ChatBox />,
  },
  {
    type: "collapse",
    name: "Danh Sách Người Dùng",
    key: "notifications",
    role: "00",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/Nguoi-Dung",
    component: <Users />,
  },
  {
    type: "collapse",
    name: "Hồ Sơ",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/Ho-So",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Đăng Nhập",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  
  {
    type: "collapse",
    name: "Quên Mật Khẩu",
    key: "ForGot",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/forget-pass",
    component: <Cover />,
  },
  {
    type: "collapse",
    name: "Xác Nhận Shop",
    role: "00",
    key: "confirm-shop",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/confirm-shop",
    component: <ConfirmShop />,
  },
  {
    type: "collapse",
    name: "Danh Sách Đặt Hàng",
    key: "list-shop",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Danh-Sach-Dat-Hang",
    component: <ListOrdered />,
  },
];

export default routes;

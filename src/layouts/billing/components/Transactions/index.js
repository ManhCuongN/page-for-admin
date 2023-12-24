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
import { Dropdown, Space } from 'antd';
// @mui material components
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { ProductContext } from "context/product.context";
// import MDButton from "components/MDButton";

// Billing page components
import Transaction from "layouts/billing/components/Transaction";
import { useContext, useState } from "react";

function Transactions() {

  const { productState: { discount } } = useContext(ProductContext)
  const [discountProductIds, setItems] = useState(discount?.discount_product_ids || [])
  const items = discountProductIds.map((id, index) => ({
    label: <p>{`${id}`}</p>,
    key: `${index}`,
  }));

  return (

    <Card sx={{ height: "100%" }}>
      {discount ? <> <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Chi Tiết&apos;s
        </MDTypography>
        <MDBox display="flex" alignItems="flex-start">
          <MDBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </MDBox>
          <MDTypography variant="button" color="text" fontWeight="regular">
            {new Date(discount.discount_start_date).toISOString().split('T')[0]
            } - {new Date(discount.discount_end_date).toISOString().split('T')[0]}
          </MDTypography>
        </MDBox>
      </MDBox>
        <MDBox pt={3} pb={2} px={2}>
          <MDBox mb={2}>
            <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
              {/* newest */}
            </MDTypography>
          </MDBox>
          <MDBox
            component="ul"
            display="flex"
            flexDirection="column"
            p={0}
            m={0}
            sx={{ listStyle: "none" }}
          >
            <Transaction
              color="success"
              icon="expand_more"
              name="Gía Trị Mã"
              description={`${new Date(discount.discount_start_date).toISOString().split('T')[0]
                } - ${new Date(discount.discount_end_date).toISOString().split('T')[0]
                }`}
              value={discount.discount_max_value}
            />
            <Transaction
              color="success"
              icon="expand_less"
              name="Số Lượng Mã"
              description={`${new Date(discount.discount_start_date).toISOString().split('T')[0]
                } - ${new Date(discount.discount_end_date).toISOString().split('T')[0]
                }`}
              value={discount.discount_max_uses}
            />
          </MDBox>
          <MDBox mt={1} mb={2}>
            <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
              yesterday
            </MDTypography>
          </MDBox>
          <MDBox
            component="ul"
            display="flex"
            flexDirection="column"
            p={0}
            m={0}
            sx={{ listStyle: "none" }}
          >
            {/* <Transaction
              color="success"
              icon="expand_less"
              name="Discount User Count"
              description={`${new Date(discount.discount_start_date).toISOString().split('T')[0]
                } - ${new Date(discount.discount_end_date).toISOString().split('T')[0]
                }`}
              value={discount.discount_user_count}
            /> */}
            <Transaction
              color="success"
              icon="expand_less"
              name="Số Lượng / 1 Khách Hàng"
              description={`${new Date(discount.discount_start_date).toISOString().split('T')[0]
                } - ${new Date(discount.discount_end_date).toISOString().split('T')[0]
                }`}
              value={discount.discount_max_uses_per_user}
            />
            <Transaction
              color="success"
              icon="expand_less"
              name="Gía Trị Đơn Hàng Tối Thiểu"
              description={`${new Date(discount.discount_start_date).toISOString().split('T')[0]
                } - ${new Date(discount.discount_end_date).toISOString().split('T')[0]
                }`}
              value={discount.discount_min_order_value}
            />
            {discount.discount_applies_to === 'specific' && (
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>

                  <Transaction
                    color="success"
                    icon="expand_less"
                    name="ProductIds"
                    description={`${new Date(discount.discount_start_date).toISOString().split('T')[0]
                      } - ${new Date(discount.discount_end_date).toISOString().split('T')[0]
                      }`}
                    value=""
                  />
                </a>
              </Dropdown>
            )}

            <Transaction
              color="success"
              icon="expand_less"
              name="Mô Tả"
              description={discount.discount_description}
              value={discount.discount_description}
            />

          </MDBox>
        </MDBox></> : <MDBox p={2} textAlign="center">
        <MDTypography variant="body2" color="text">
        Don't have discount.
        </MDTypography>
      </MDBox>}

    </Card>
  );
}

export default Transactions;

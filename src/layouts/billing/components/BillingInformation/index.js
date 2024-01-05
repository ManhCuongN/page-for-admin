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
import { Button, Modal } from 'antd'
import { Badge } from 'antd';

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";
import { ProductContext } from 'context/product.context';
import { useContext } from 'react';
import EditDiscountModal from './edit.modal';

function BillingInformation({listDiscounts}) {

  const {findDiscount, setShowModalEditDiscount,deleteDiscount, showModalEditDiscount, productState: {discount}} = useContext(ProductContext)


  const handleClickDetail = async(discountId) => {
     await findDiscount(discountId)
  }

  const handleClickDelete = async(discountId) => {
    await deleteDiscount(discountId)
 }
  const handleClickEdit = async(discountId) => {
     await findDiscount(discountId)
     setShowModalEditDiscount(true)
  }

  const handleOk = () => {
    setShowModalEditDiscount(false);
  };

  const handleCancel = () => {
    setShowModalEditDiscount(false);
  };
  return (
    <Card id="delete-account">
       <Modal title="Chỉnh Sửa Mã Giảm Gía" open={showModalEditDiscount} onOk={handleOk} onCancel={handleCancel} width={1000}>
        <EditDiscountModal discount={discount} />
      </Modal>
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Thông Tin Các Mã Giảm Gía
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {listDiscounts.length > 0 && listDiscounts.map((l) => (
            <Badge.Ribbon key={l._id} text={l.discount_is_active ? "Active" : "inActive"} color={l.discount_is_active ? "green" : "purple"}>
             <Bill 
            name={l.discount_name}
            company={l.discount_applies_to}
            email={l.discount_code}
            vat={l.createdAt}
            onClickDelete={() => handleClickDelete(l._id)}
            onClickDetail={() => handleClickDetail(l._id)}
            onClickEdit={() => handleClickEdit(l._id)}
          />
           </Badge.Ribbon>
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default BillingInformation;

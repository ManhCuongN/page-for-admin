/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
 * =========================================================
 * Material Dashboard 2 React - v2.1.0
 * =========================================================
 *
 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2022 Creative Tim (https://www.creative-tim.com)
 *
 * Coded by www.creative-tim.com
 *
 * =========================================================
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { format } from 'date-fns';
//model
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "context/product.context";
import setAuthToken from '../../../utils/setAuthToken'
import axios from "axios";
import { Button, Dropdown, Space } from 'antd';
import { AuthContext } from "../../../context/auth.context";

export default function Data() {

  const { getListProduct, findProduct, 
    updatedStatusProductFunc,
     productState: { isProductLoading, listProducts, product },
     setShowModalEdit,
    setShowModalDelete, showModalDelete } = useContext(ProductContext);
  const [updateProduct, setUpdateProduct] = useState(product);
  const {getAllUsers, deleteUser} = useContext(AuthContext)
  const [listUser, setListUser] = useState([])

  
  useEffect(() => {
    const getUsers = async() => {
        const result = await getAllUsers()
       setListUser(result.metadata);
    }
    getUsers()
  }, [])
  useEffect(() => {
    const res = getListProduct()
  }, [product])

  useEffect(() => {
    setUpdateProduct(product)
  },[product])

 

  
  const items = [
    {
      key: 2,
      label: 'Xóa',
    },
    
  ];

  const handleEditProduct = async(productId, e) => {
    const key = e.key
    if(key === "1") {
      await findProduct(productId)
      setShowModalEdit(true)
    }
    if (key === "2") {
      console.log("sá", productId);
      const data = {
        idUser: productId
      }
      await deleteUser(data)
      // await findProduct(productId)
      //  setShowModalDelete(true)
    }
  }

  const handleClickStatus = async(productId) => {
     await updatedStatusProductFunc(productId)
  }
 
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Sản Phẩm", accessor: "author", width: "45%", align: "left" },
      { Header: "Phân Loại/Số Lượng", accessor: "function", align: "left" },
      { Header: "Trạng Thái", accessor: "status", align: "center" },
      { Header: "Ngày Mở", accessor: "employed", align: "center" },
      { Header: "Thao Tác", accessor: "action", align: "center" },
    ],
    rows: listUser.map((p,index) => ({
      author: <Author key={index} image={p?.avatar} name={`${p.givenName} ${p.familyName}`} email={p?.email} />,
      function: <Job  key={index} title="" description="" />,
      // status: (
      //   (
      //     <MDBox ml={-1}>
      //       <MDBadge badgeContent="published" color="success" 
      //       variant="gradient" size="sm"
      //       onClick={() => handleClickStatus(p._id)} />
      //     </MDBox>
      //   )
      // ),
      employed: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {format(new Date(p.createdAt), 'dd/MM/yyyy HH:mm')}
        </MDTypography>
      ),
      action: (
        <Dropdown.Button menu={{ items, onClick: (e) => handleEditProduct(p.idUser,e) }}>Thao Tác</Dropdown.Button>
      ),
    })),
  };
}

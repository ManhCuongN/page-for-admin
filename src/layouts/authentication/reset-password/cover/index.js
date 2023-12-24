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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { useState, useEffect, useContext } from "react";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";
import { AuthContext } from "context/auth.context";

function Cover() {
  // Khởi tạo state cho các giá trị input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {forgetPass} = useContext(AuthContext)

  // Hàm xử lý sự kiện khi giá trị thay đổi trong input email
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Hàm xử lý sự kiện khi giá trị thay đổi trong input password
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Hàm xử lý sự kiện khi form được submit
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = {
      email,
      newPassword: password
    }
    const result = await forgetPass(data)
    if(result) {
      alert("Thành Công. Hãy Đăng Nhập Lại")
    }
  };
  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Lấy Lại Mật Khẩu
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
         
          <form onSubmit={handleSubmit}>
      <MDBox mb={4}>
        <MDInput
          type="email"
          label="Email"
          variant="standard"
          fullWidth
          value={email}
          onChange={handleEmailChange}
        />
      </MDBox>
      <MDBox mb={4}>
        <MDInput
          type="text"
          label="Mật Khẩu Mới"
          variant="standard"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
        />
      </MDBox>
      <MDBox mb={4}>
        <button type="submit" style={{
          width: "100px",
          height: "30px",
          borderRadius: "15px",
          backgroundColor: '#0D2D53',
          color: '#fff'

        }}>Submit</button>
      </MDBox>
    </form>
          
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;

import { Badge, Space, Select, Switch, Input } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { DownloadOutlined } from '@ant-design/icons';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { InputNumber } from 'antd';
// @mui material components
import { ClockCircleOutlined } from '@ant-design/icons';


import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
//model

// import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import { SelectChangeEvent } from '@mui/material/Select';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

// Data
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "context/product.context";
import { AuthContext } from "context/auth.context";

import MDInput from "components/MDInput";
import { PRODUCT_TYPE, PRODUCT_ATTR_CLOTHING, DISCOUNT_TYPE } from 'constants/index'
import Avatar from '@mui/material/Avatar';
import imageCompression from 'browser-image-compression';
import { Button, } from 'antd';

import { Button as Btn } from '@mui/material';
import MDAvatar from "components/MDAvatar";
import { Upload, Image } from 'antd';
import ImgCrop from 'antd-img-crop';
function ModalViewShop() {
    const { getListShop, findShop, showModalViewShop, setShowModalViewShop, authState: { listShop, shop } } = useContext(AuthContext);

    const [profile, setProfile] = useState(shop)
    const { email, name, phone, address, avatar, identification } = profile

    return (
        <>
            <Card sx={{ height: "100%" }}>
                <Grid container spacing={2}>
                    <Grid container spacing={4} style={{ marginLeft: "40px" }}>
                        <Grid item xs={6}>
                            <MDBox mb={5}>


                                <Image
                                    style={{ borderRadius: "100%" }}
                                    width={120}
                                    src={avatar}
                                />

                            </MDBox>

                        </Grid>
                        <Grid item xs={6}>
                            <Image style={{ borderRadius: "100%" }}
                                width={120}
                                src={identification}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <MDBox mb={2}>
                            <MDInput
                                type="text"
                                label="Tên"
                                name="name"
                                // onChange={handleChangeValue}
                                value={name}
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput
                                type="text"
                                label="Email"
                                value={email}
                                // onChange={handleChangeValue}
                                name="email"
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput
                                type="text"
                                label="Số Điện Thoại"
                                name="phone"
                                // onChange={handleChangeValue}
                                value={phone}
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput
                                type="text"
                                label="Địa Chỉ"
                                name="address"
                                // onChange={handleChangeValue}
                                value={address}
                                fullWidth
                            />
                        </MDBox>
                    </Grid>
                </Grid>



            </Card>
        </>
    )
}

export default ModalViewShop
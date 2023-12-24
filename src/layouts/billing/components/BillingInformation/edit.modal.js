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
import MDInput from "components/MDInput";
import { PRODUCT_TYPE, PRODUCT_ATTR_CLOTHING, DISCOUNT_TYPE } from 'constants/index'
import Avatar from '@mui/material/Avatar';
import imageCompression from 'browser-image-compression';
import { Button, } from 'antd';
import { message, Upload } from 'antd';
import { Button as Btn } from '@mui/material';


import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
//antd
import { MinusCircleOutlined, UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('Bạn chỉ có thể upload file JPG/PNG!');
    }
    return isJpgOrPng;
};

const { Option } = Select;
const { Search } = Input;
function EditDiscountModal({ discount }) {
    console.log("s", discount);
    const [valueStartDay, setValueStartDay] = useState(dayjs(discount.discount_start_date) || "");
    const [valueEndDay, setValueEndDay] = useState(dayjs(discount.discount_end_date));
    const [valueDiscount, setValueDiscount] = useState(discount.discount_max_value)
    const [maxUsesPerUser, setMaxUsesPerUser] = useState(discount.discount_max_uses_per_user)
    const [MaxUses, setMaxUses] = useState(discount.discount_max_uses)
    const [MinOrderValue, setMinOrderValue] = useState(discount.discount_min_order_value)
    const [productSpecifics, setProductSpecific] = useState([])
    const [show, setShow] = useState(discount.discount_is_active);
    const badgeValue = show ? 'Active' : 'inActive';
    const is_active = badgeValue === 'Active' ? true : false
    const [openStartDay, setOpenStartDay] = useState(false);
    const [openEndDay, setOpenEndDay] = useState(false);
    const [specific, setListSpecific] = useState(discount.discount_product_ids)
    const { getListProduct, getProductId, updateDiscount, findProduct,setShowModalEditDiscount,deleteDiscount, productState: { listProducts} } = useContext(ProductContext)
    const [updatedDiscount, setUpdatedDiscount] = useState(discount || null)
    const { discount_name, discount_description, discount_code, } = updatedDiscount
    const [appliesTo, setAppliesTo] = useState(updatedDiscount.discount_applies_to)

    useEffect(() => {
        const fetchData = async () => {
            await getListProduct();
        }

        fetchData();
        return () => {
            console.log("unmount");
        }
    }, [1]);

    useEffect(() => {
        // setListSpecific(discount.discount_product_ids)
        const fetchDiscounts = async () => {
            const promises = specific.map(async productId => {
                const result = await getProductId(productId);
                return result.data.metadata.product_name;
            });

            const arr = await Promise.all(promises);
            setProductSpecific(arr)
        }

        fetchDiscounts();
        return () => {
            console.log("unmount");
        }
    }, [discount, specific]);

    const hanldChangeValueBasic = (e) => {
        setUpdatedDiscount({ ...updatedDiscount, [e.target.name]: e.target.value })

    }

    const handleChangeSpecific = async (item) => {
        setListSpecific(item)
    }
    console.log("sasassa", specific);

    const hanldeDiscountValue = (e) => {
        setValueDiscount(e)
    }

    const handleMaxUses = (e) => {
        setMaxUses(e)
    }
    const handleMaxUsesPerUser = (e) => {
        setMaxUsesPerUser(e)
    }
    const hanldeMinOrderValue = (e) => {
        setMinOrderValue(e)
    }

    const handleChangeApplies = (e) => {
        setAppliesTo(e)
    }

    const handleSubmit = async (e) => {
        const data = {
            discount_name: discount_name,
            discount_description: discount_description,
            discount_code: discount_code,
            discount_is_active: is_active,
            discount_max_value: valueDiscount,
            discount_max_uses: MaxUses,
            discount_max_uses_per_user: maxUsesPerUser,
            discount_min_order_value: MinOrderValue,
            discount_start_date: valueStartDay,
            discount_end_date: valueEndDay,
            discount_applies_to: appliesTo,
            discount_product_ids: specific || []
        }
        console.log("da",data);
        await updateDiscount(discount._id, data)
    setShowModalEditDiscount(false)
    }
    return (
        <>

            <MDBox mb={2} >
                <MDBox pt={2} px={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <MDBox mb={2}>
                                <MDInput type="text" label="Tên Mã" name="discount_name" value={discount_name}
                                    onChange={hanldChangeValueBasic}
                                    fullWidth />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput type="text" label="Mô Tả" name="discount_description" value={discount_description}
                                    onChange={hanldChangeValueBasic}

                                    fullWidth />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput type="text" label="Code"
                                    name="discount_code" value={discount_code}
                                    onChange={hanldChangeValueBasic}
                                    fullWidth />
                            </MDBox>
                            <MDBox mb={2}>
                                <Select
                                    defaultValue="Áp Dụng"
                                    style={{ width: '100%', height: "45px" }}

                                    onChange={handleChangeApplies}
                                    options={[
                                        { value: DISCOUNT_TYPE.ALL, label: "Tất Cả Sản Phẩm" },
                                        { value: DISCOUNT_TYPE.SPECIFIC, label: "Sản Phẩm Cụ Thể" },

                                    ]}
                                />
                            </MDBox>
                            {appliesTo === DISCOUNT_TYPE.SPECIFIC && (
                                <MDBox mb={2}>
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="Chọn Sản Phẩm"
                                        value={specific}
                                        onChange={handleChangeSpecific}
                                        optionLabelProp="label"
                                    >
                                        {listProducts && listProducts.map((l) => (
                                            <Option value={l._id} label={l.product_name} key={l._id}>
                                                <Space>
                                                    <span role="img" aria-label="China">
                                                        {l.product_name}
                                                    </span>
                                                    {l.name}
                                                </Space>
                                            </Option>
                                        ))}


                                    </Select>
                                </MDBox>
                            )}

                            <MDBox mb={2}>
                                <Space>
                                    <Switch checked={show} onChange={() => setShow(!show)} />
                                    <Badge count={show ? <ClockCircleOutlined style={{ color: '#f5222d' }} /> : <ClockCircleOutlined style={{ color: '#f5222d' }} />} />
                                    <Badge

                                        className="site-badge-count-109"
                                        count={badgeValue}
                                        style={{ backgroundColor: '#52c41a' }}
                                    />
                                </Space>
                            </MDBox>

                            {/* //image */}
                            <MDBox mb={2}>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={6}>
                                        <Grid item xs={6}>
                                            <Grid item xs={4}>
                                                <MDBox mb={2}>

                                                </MDBox>
                                            </Grid>

                                        </Grid>
                                        <Grid item xs={8}>
                                            <MDBox mb={2}>
                                                {/* <Avatar
                        alt="Remy Sharp"
                        src={product_thumb}
                        sx={{ width: 56, height: 56 }}
                      /> */}
                                            </MDBox>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid item xs={8} container rowSpacing={1}>
                                            <MDBox mb={2}>

                                            </MDBox>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </MDBox>



                        </Grid>

                        <Grid item xs={4}>
                            <MDBox mb={2}>
                                <h5>Bắt Đầu Từ</h5>
                                <Search onClick={() => setOpenStartDay(!openStartDay)} style={{ width: 200 }} value={valueStartDay} />
                                {openStartDay && (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                                            <DemoItem >
                                                <DateCalendar value={valueStartDay} onChange={(newValue) => setValueStartDay(newValue)} />
                                            </DemoItem>
                                        </DemoContainer>
                                    </LocalizationProvider>)}
                            </MDBox>
                            <MDBox mb={2}>
                                <h5>Kết Thúc Vào</h5>
                                <Search onClick={() => setOpenEndDay(!openEndDay)} style={{ width: 200 }} value={valueEndDay} />
                                {openEndDay && (<LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                                        <DemoItem >
                                            <DateCalendar value={valueEndDay} onChange={(newValue) => setValueEndDay(newValue)} />
                                        </DemoItem>
                                    </DemoContainer>
                                </LocalizationProvider>)}
                            </MDBox>


                            <MDBox mb={2}>
                                <h5>Gía Trị Mã (%)</h5>

                                <InputNumber
                                    min={1}

                                    name="max_value"
                                    value={valueDiscount}
                                    onChange={hanldeDiscountValue}

                                    style={{ width: '100%', height: '100%' }}
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <h5>Số Lượng Mã</h5>
                                <InputNumber min={1} name="max_uses" value={MaxUses} onChange={handleMaxUses} style={{ width: '100%', height: '100%' }} />
                            </MDBox>
                            <MDBox mb={2}>
                                <h5>Số Lượng Mã / 1 KH</h5>
                                <InputNumber min={1} name="max_uses_per_user" value={maxUsesPerUser} onChange={handleMaxUsesPerUser} style={{ width: '100%', height: "45px" }} />
                            </MDBox>
                            <MDBox mb={2}>
                                <h5>Gía Trị Đơn Hàng Tối Thiểu</h5>
                                <InputNumber min={1} name='min_order_value' value={MinOrderValue} onChange={hanldeMinOrderValue} style={{ width: '100%', height: '100%' }} />
                            </MDBox>




                        </Grid>


                    </Grid>
                </MDBox>
                <Button type="primary" shape="round" icon={<DownloadOutlined />} onClick={handleSubmit} size="large">
                     Lưu
                </Button>
            </MDBox>


        </>
    )
}

export default EditDiscountModal
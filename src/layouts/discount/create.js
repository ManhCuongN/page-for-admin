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
import { PRODUCT_TYPE, PRODUCT_ATTR_CLOTHING, DISCOUNT_TYPE } from '../../constants/index'
import Avatar from '@mui/material/Avatar';
import imageCompression from 'browser-image-compression';
import { Button, } from 'antd';
import { message, Upload } from 'antd';
import { Button as Btn } from '@mui/material';
import config from '../../config'
import { io } from 'socket.io-client';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
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

function CreateDiscountComponent() {

    const [valueStartDay, setValueStartDay] = useState(dayjs('2022-04-17'));
    const [valueEndDay, setValueEndDay] = useState(dayjs('2022-04-17'));

    const [openStartDay, setOpenStartDay] = useState(false);
    const [openEndDay, setOpenEndDay] = useState(false);
    const [show, setShow] = useState(true);
    const [appliesTo, setAppliesTo] = useState(DISCOUNT_TYPE.SPECIFIC)
    const [specific, setListSpecific] = useState([])
    const [createDiscount, setCreateDiscount] = useState(null)
    const [valueDiscount, setValueDiscount] = useState(null)
    const [maxUsesPerUser, setMaxUsesPerUser] = useState(null)
    const [MaxUses, setMaxUses] = useState(null)
    const [MinOrderValue, setMinOrderValue] = useState(null)


    const { getListProduct, productState: { listProducts }, createDiscountFunc } = useContext(ProductContext)

    const [socketClient, setClient] = useState(null)
  useEffect(() => {
    const initSocket = () => {
      const newSocket = io(`${config.urlSocket}`);
      // setSocket(newSocket);
     setClient(newSocket)
  
      newSocket?.on('connect', () => {
        console.log('Connected to server ADMIN');
      });
      // newSocket.on('push-noti-new', (mess) => {
      //   console.log('Appp', mess);
      // });
      // newSocket.emit('order', "helo");
    
  };
  // Khởi tạo kết nối Socket.IO khi component được mount hoặc userId thay đổi
  initSocket();
  },[])


    //get product of shop
    useEffect(() => {
        const fetch = async () => {
            await getListProduct()
        }
        fetch()
    }, [])

    //APPLIES TO
    const handleChangeApplies = async (e) => {
        setAppliesTo(e)
    }

    const handleChangeSpecific = (value) => {
        setListSpecific(value)
    };

    const hanldChangeValueCreate = async (e) => {
        setCreateDiscount({ ...createDiscount, [e.target.name]: e.target.value })
    }
    const hanldeDiscountValue = async (value) => {
        setValueDiscount(value)
    }
    const handleMaxUsesPerUser = (v) => {
        setMaxUsesPerUser(v)
    }

    const hanldeMaxUses = (v) => {
        setMaxUses(v)
    }

    const hanldeMinOrderValue = (v) => {
        setMinOrderValue(v)
    }

    const badgeValue = show ? 'Active' : 'inActive';
    const is_active = badgeValue === 'Active'? true : false

    const handleSubmit = async() => {
        const data = {
            ...createDiscount,
            is_active,
            max_value: valueDiscount,
            max_uses: MaxUses,
            max_uses_per_user: maxUsesPerUser,
            min_order_value: MinOrderValue,
            start_date: valueStartDay,
            end_date: valueEndDay,
            applies_to: appliesTo,
            product_ids: specific || []
        }
        
        
        const result = await createDiscountFunc(data)
        if(result) {
            toast.success("Created Discount Successfully")
            setCreateDiscount("")
        }
        const message = {
            name: data.name,
            code: data.code,
            shopId: result.metadata.discount_shopId
        }
        

         socketClient?.emit("created discount", message)

    }
  
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mb={2} >
                <MDBox pt={2} px={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <MDBox mb={2}>
                                <MDInput type="text" label="Tên Mã" name="name"
                                    onChange={hanldChangeValueCreate}
                                    fullWidth />
                            </MDBox>
                            <ToastContainer />
                            <MDBox mb={2}>
                                <MDInput type="text" label="Mô Tả"
                                    onChange={hanldChangeValueCreate}

                                    name="description" fullWidth />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput type="text" label="CODE"
                                    onChange={hanldChangeValueCreate}
                                    name="code" fullWidth />
                            </MDBox>
                            <MDBox mb={2}>
                                <Select
                                    defaultValue="Lựa Chọn Phạm Vi Mã Giảm Gía"
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
                                <h5>Gía trị Mã (%)</h5>

                                <InputNumber
                                    min={1}
                                   
                                    name="max_value"
                                    onChange={hanldeDiscountValue}
                                    
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <h5>Lượt Dùng Tối Đa</h5>
                                <InputNumber min={1}  name="max_uses" onChange={hanldeMaxUses}  style={{ width: '100%', height: '100%' }} />
                            </MDBox>
                            <MDBox mb={2}>
                                <h5>Lượt Dùng/1 Khách Hàng</h5>
                                <InputNumber min={1}  name="max_uses_per_user" onChange={handleMaxUsesPerUser}  style={{ width: '100%', height: "45px" }} />
                            </MDBox>
                            <MDBox mb={2}>
                                <h5>Gía Trị Đơn Hàng Tối Thiểu</h5>
                                <InputNumber min={1}  name='min_order_value' onChange={hanldeMinOrderValue}  style={{ width: '100%', height: '100%' }} />
                            </MDBox>




                        </Grid>


                    </Grid>
                </MDBox>


                <Button type="primary" shape="round" icon={<DownloadOutlined />} onClick={handleSubmit} size="large">
             Tạo Mã
          </Button>
            </MDBox>

        </DashboardLayout>

    )
}

export default CreateDiscountComponent
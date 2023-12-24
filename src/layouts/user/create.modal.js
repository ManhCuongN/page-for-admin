// @mui material components
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

import Select, { SelectChangeEvent } from '@mui/material/Select';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

// Data
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "context/product.context";
import MDInput from "components/MDInput";
import { PRODUCT_TYPE, PRODUCT_ATTR_CLOTHING } from '../../constants/index'
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


function ModalCreate() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { setShowModalCreateProduct, uploadImage,createProductFunc, showModalCreateProduct, setShowModalEdit, showModalEdit, productState: { product } } = useContext(ProductContext)
  const [selectedValueType, setSelectedValueType] = useState("Clothing")
  const [createProduct, setCreateProduct] = useState(null)
  const [attributesProduct, setAttributesProduct] = useState(null)
  const [variationProduct, setVariationProduct] = useState(null)
  const [fileList, setFileList] = useState([])
  const [fileListImg, setFileListImg] = useState([])
  const [productThumb, setProductThumb] = useState([])

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');



  const handleCloseModal = () => {
    setShowModalCreateProduct(false)
  }

  //handle change value name product
  const changeValueName = (e) => {
    setCreateProduct({ ...createProduct, [e.target.name]: e.target.value })
  }

  //handle change value type
  const changeValueType = (e) => {
    setSelectedValueType(e.target.value)
  }

  //handle change value attributes
  const changeValueAttribute = (e) => {
    setAttributesProduct({ ...attributesProduct, [e.target.name]: e.target.value })
  }

  //handle change value variation
  const changeValueVariation = (e) => {
    setVariationProduct({ ...variationProduct, [e.target.name]: e.target.value })
  }

  //handle click submit form
  const handleSubmitCreate = async() => {
    const { product_description, product_name, product_price, product_quantity } = createProduct

    const data = {
      product_name,
      product_description,
      product_price: +product_price,
      product_quantity: +product_quantity,
      product_type: selectedValueType,
      product_attributes: attributesProduct,
      product_variation: variationProduct,
      product_thumb: productThumb,
      product_images: fileListImg
    }
    
     await createProductFunc(data)
  }



  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    console.log("file",file);

    setPreviewImage(file.thumbUrl);
    setPreviewOpen(true);
    setPreviewTitle(file.name);
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      const res = await uploadImage(uploadData)
      // Giả sử res.metadata.thumb_url là giá trị bạn muốn thêm vào
      const newThumbUrl = res.metadata.thumb_url;

      // Tạo một bản sao của mảng fileList, sau đó thêm giá trị mới vào
      const updatedFileList = [...fileListImg, newThumbUrl];

      // Set lại fileList bằng mảng đã cập nhật
      setFileListImg(updatedFileList);
      onSuccess();
    } catch (error) {

    }
  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


  const myCustomRequest = async ({ file, onSuccess, onError }) => {
    try {
      
      const uploadData = new FormData();
      uploadData.append("file", file);
      const res = await uploadImage(uploadData)
     
      // Giả sử res.metadata.thumb_url là giá trị bạn muốn thêm vào
      const newThumbUrl = res.metadata.thumb_url;
      // Tạo một bản sao của mảng fileList, sau đó thêm giá trị mới vào  
      setProductThumb(newThumbUrl);
      onSuccess();
    } catch (error) {
      console.log("loi upload thum", error);
    }
  }

console.log("thum",productThumb);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} >
      



    
      <MDBox pt={2} px={2}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <MDBox mb={2}>
              <MDInput type="text" label="Tên Sản Phẩm" name="product_name" onChange={changeValueName}
                fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Mô Tả" name="product_description" onChange={changeValueName} fullWidth />
            </MDBox>

            {selectedValueType === 'Clothing' && (
              <>
                <MDBox mb={2}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <MDInput type="text" value="Thương Hiệu" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                      <MDInput type="text" name="brand" onChange={changeValueAttribute} fullWidth />
                    </Grid>
                  </Grid>
                </MDBox>
                <MDBox mb={2}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <MDInput type="text" value="Phong Cách" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                      <MDInput type="text" name="style" onChange={changeValueAttribute} fullWidth />
                    </Grid>
                  </Grid>
                </MDBox>
                <MDBox mb={2}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <MDInput type="text" value="Chất Liệu" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                      <MDInput type="text" name="material" onChange={changeValueAttribute} fullWidth />
                    </Grid>
                  </Grid>
                </MDBox>
              </>

            )}
            {/* row 2 */}
            {selectedValueType === 'Electronics' && (
              <>
                 <MDBox mb={2}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <MDInput type="text" value="Origin" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                      <MDInput type="text" name="origin" onChange={changeValueAttribute} fullWidth />
                    </Grid>
                  </Grid>
                </MDBox>
                <MDBox mb={2}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <MDInput type="text" value="Material" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                      <MDInput type="text" name="material" onChange={changeValueAttribute} fullWidth />
                    </Grid>
                  </Grid>
                </MDBox>
                <MDBox mb={2}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <MDInput type="text" value="Expried" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                      <MDInput type="text" name="expried" onChange={changeValueAttribute} fullWidth />
                    </Grid>
                  </Grid>
                </MDBox>
              </>
            )}

            {/* //image */}
            <MDBox mb={2}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Grid item xs={6}>
                    <Grid item xs={4}>
                      <MDBox mb={2}>
                      <ImgCrop rotationSlider>
                      <Upload
                        listType="picture-card"
                        productThumb={productThumb}              
                        customRequest={myCustomRequest}
                      >
                        {productThumb.length >= 1 ? null : uploadButton}
                      </Upload>
                      </ImgCrop>
                      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
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
                      <Upload
                        listType="picture-card"
                        fileListImg={fileListImg}
                        onPreview={handlePreview}
                        customRequest={customRequest}
                      >
                        {fileList.length >= 8 ? null : uploadButton}
                      </Upload>
                      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </MDBox>
                  </Grid>
                </Grid>
              </Grid>
            </MDBox>



          </Grid>

          <Grid item xs={4}>
            <MDBox mb={2}>
              <InputLabel id="demo-simple-select-label">Phân Loại</InputLabel>
              <Select
                name="product_type"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedValueType}
                onChange={changeValueType}
                label="Categories"
              // sx={{ width: '250px', height: '35px' }}

              >
                {PRODUCT_TYPE.map((p, index) => (
                  <MenuItem key={index} value={p}>{p}</MenuItem>
                ))}
              </Select>
            </MDBox>

            <MDBox mb={2}>
              <MDInput type="text" label="Số Lượng" name="product_quantity" onChange={changeValueName} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Gía" name="product_price" onChange={changeValueName} fullWidth />
            </MDBox>
            {selectedValueType === 'Clothing' && (
              <>
                <MDBox mb={2}>
                  {/* <h4>Variation</h4> */}
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <MDInput type="text" value="Size" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                      <MDInput type="text" name="size" onChange={changeValueVariation} fullWidth />
                    </Grid>
                  </Grid>
                </MDBox>
                <MDBox mb={2}>

                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <MDInput type="text" value="Màu" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                      <MDInput type="text" name="color" onChange={changeValueVariation} fullWidth />
                    </Grid>
                  </Grid>
                </MDBox>
              </>
            )}
            {selectedValueType === 'Electronics' && (
              <>
                <MDBox mb={2}>
                  {/* <h4>Variation</h4> */}
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <MDInput type="text" value="Size" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                      <MDInput type="text" name="size" onChange={changeValueVariation} fullWidth />
                    </Grid>
                  </Grid>
                </MDBox>
                <MDBox mb={2}>

                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <MDInput type="text" value="Phân Khúc" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                      <MDInput type="text" name="segment" onChange={changeValueVariation} fullWidth />
                    </Grid>
                  </Grid>
                </MDBox>
              </>
            )}
            <Button onClick={handleSubmitCreate}>Tạo </Button>

          </Grid>


        </Grid>
      </MDBox>
   
  

</MDBox>

      </DashboardLayout>
      
  )
}

export default ModalCreate
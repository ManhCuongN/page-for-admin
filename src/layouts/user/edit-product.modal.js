import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "context/product.context";
import MDInput from "components/MDInput";
import {  Upload, Modal } from 'antd';
import { PRODUCT_TYPE } from "constants";
import ImgCrop from 'antd-img-crop';
function EditProductModal() {
    const { uploadImage,uploadImageOfThumb, setShowModalEdit, showModalEdit, productState:{product}, updatedProductFunc } = useContext(ProductContext)
    const [updatedProduct, setUpdatedProduct] = useState(product);
    
    const { product_name, product_description, product_attributes, product_price, product_quantity, product_thumb,
        product_type, product_variation, product_images } = updatedProduct
    const transformedFileList = product_images.map((path, index) => ({
        uid: `${index}`,
        name: `Image ${index + 1}`,
        status: 'done',
        url: path,
    }));
    const [fileList, setFileList] = useState(transformedFileList)
    const [updatedProductAttributes, setUpdatedProductAttributes] = useState(product_attributes)
    const [updatedProductVariation, setUpdatedProductVariation] = useState(product_variation)
    const [updatedThumb, setUpdatedThumb] = useState(product_thumb)
    const [updatedType, setUpdatedType] = useState(product_type)

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    useEffect(() => {
        setUpdatedProduct(product);
    }, [product]);
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        setPreviewImage(file.url);
        setPreviewOpen(true);
        setPreviewTitle(file.name);
    };
    const handleOk = async() => {
        let arr_images = []
        fileList.map((i) => {
            arr_images.push(i.url)
            return arr_images
        })
        const data = {
            ...updatedProduct,
            product_attributes: updatedProductAttributes,
            product_variation: updatedProductVariation,
            product_type: updatedType,
            product_thumb: updatedThumb,
            product_images: arr_images
        }
        
        await updatedProductFunc(product._id, data)
        setShowModalEdit(false);
    
      };
    
      const handleCancelModal = () => {
        setShowModalEdit(false);
      };

    const onChangeUpdatedProductForm = (e) => {
        setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
    };

    const onChangeUpdatedProductType = (e) => {
        setUpdatedType(e.target.value);
    };

    const onChangeUpdatedProductAttributes = (e) => {
        setUpdatedProductAttributes({ ...updatedProductAttributes, [e.target.name]: e.target.value })
    }
    const onChangeUpdatedProductVariation = (e) => {
        setUpdatedProductVariation({ ...updatedProductVariation, [e.target.name]: e.target.value })
    }
        ;
    //   const uploadButton = (
    //     <div>
    //       {loading ? <LoadingOutlined /> : <PlusOutlined />}
    //       <div style={{ marginTop: 8 }}>Upload</div>
    //     </div>
    //   );

    const handleUpdatedThumb = async (info) => {

        try {
            const uploadData = new FormData();
            uploadData.append("file", info.file.originFileObj);
            const res = await uploadImage(uploadData);
            const newThumbUrl = res.metadata.image_url;
            await setUpdatedThumb(newThumbUrl);
            console.log("uda2", updatedThumb);

        } catch (error) {
            console.error('Lỗi khi tải lên:', error);
        }

    };
    const customRequest = async ({ file, onSuccess, onError }) => {
        try {
            const uploadData = new FormData();
            uploadData.append("file", file);
            const res = await uploadImageOfThumb(uploadData)
            // Giả sử res.metadata.thumb_url là giá trị bạn muốn thêm vào
            const newThumbUrl = res.metadata.thumb_url;
            const newFile = {
                uid: `-${fileList.length + 1}`,
                name: `New Image ${fileList.length + 1}`,
                status: 'done',
                url: newThumbUrl,
            };
            // Tạo một bản sao của mảng fileList, sau đó thêm giá trị mới vào
            const updatedFileList = [...fileList, newFile];

            // Set lại fileList bằng mảng đã cập nhật
            setFileList(updatedFileList);
            onSuccess();
        } catch (error) {

        }
    }

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <div>

            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            <Modal title="CHỈNH SỬA" open={showModalEdit} onOk={handleOk} onCancel={handleCancelModal} style={{ minWidth: '60%', maxWidth: '80%', zIndex:"999" }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <MDBox mb={2}>
                            <MDInput type="text" label="Tên Sản Phẩm" name="product_name" value={product_name} onChange={onChangeUpdatedProductForm}
                                fullWidth />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="text" label="Mô Tả" name="product_description" value={product_description} onChange={onChangeUpdatedProductForm} fullWidth />
                        </MDBox>

                        {updatedType === 'Clothing' && (
                            <>
                                <MDBox mb={2}>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={6}>
                                            <MDInput type="text" value="Thương Hiệu" fullWidth />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <MDInput type="text" name="brand" value={updatedProductAttributes.brand} onChange={onChangeUpdatedProductAttributes} fullWidth />
                                        </Grid>
                                    </Grid>
                                </MDBox>
                                <MDBox mb={2}>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={6}>
                                            <MDInput type="text" value="Phong Cách" fullWidth />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <MDInput type="text" name="style" value={updatedProductAttributes.style} onChange={onChangeUpdatedProductAttributes} fullWidth />
                                        </Grid>
                                    </Grid>
                                </MDBox>
                                <MDBox mb={2}>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={6}>
                                            <MDInput type="text" value="Chất Liệu" fullWidth />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <MDInput type="text" name="material" value={updatedProductAttributes.material} onChange={onChangeUpdatedProductAttributes} fullWidth />
                                        </Grid>
                                    </Grid>
                                </MDBox>
                            </>

                        )}
                        {/* row 2 */}
                        {updatedType === 'Electronics' && (
                            <>
                                <MDBox mb={2}>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={6}>
                                            <MDInput type="text" value="Origin" fullWidth />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <MDInput type="text" fullWidth />
                                        </Grid>
                                    </Grid>
                                </MDBox>
                                <MDBox mb={2}>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={6}>
                                            <MDInput type="text" value="Material" fullWidth />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <MDInput type="text" fullWidth />
                                        </Grid>
                                    </Grid>
                                </MDBox>
                                <MDBox mb={2}>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={6}>
                                            <MDInput type="text" value="Expired" fullWidth />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <MDInput type="text" fullWidth />
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
                                                        name="avatar"
                                                        listType="picture-card"
                                                        className="avatar-uploader"
                                                        showUploadList={false}
                                                        onChange={handleUpdatedThumb}
                                                    >
                                                        {updatedThumb ? <img src={updatedThumb} onChange={handleUpdatedThumb} alt="avatar" style={{ width: '100%' }} /> : "abc"}
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
                                                fileList={fileList}
                                                onPreview={handlePreview}
                                                customRequest={customRequest}
                                                onChange={handleChange}
                                            >
                                                {fileList.length >= 4 ? null : uploadButton}
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
                                onChange={onChangeUpdatedProductType}
                                value={updatedType}

                                label="Phân Loại"


                            >
                                {PRODUCT_TYPE.map((p, index) => (
                                    <MenuItem key={index} value={p}>{p}</MenuItem>
                                ))}
                            </Select>
                        </MDBox>

                        <MDBox mb={2}>
                            <MDInput type="text" label="Số Lượng" name="product_quantity" value={product_quantity} onChange={onChangeUpdatedProductForm} fullWidth />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="text" label="Gía" name="product_price" value={product_price} onChange={onChangeUpdatedProductForm} fullWidth />
                        </MDBox>


                        <>

                            {/* <h4>Variation</h4> */}
                            {updatedType === 'Clothing' && (
                                <>
                                    <MDBox mb={2}>
                                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            <Grid item xs={6}>
                                                <MDInput type="text" value="Size" fullWidth />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <MDInput type="text" name="size" value={updatedProductVariation.size} onChange={onChangeUpdatedProductVariation} fullWidth />
                                            </Grid>
                                        </Grid>
                                    </MDBox>
                                    <MDBox mb={2}>

                                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            <Grid item xs={6}>
                                                <MDInput type="text" value="Màu" fullWidth />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <MDInput type="text" name="color" value={updatedProductVariation.color} onChange={onChangeUpdatedProductVariation} fullWidth />
                                            </Grid>
                                        </Grid>
                                    </MDBox>
                                </>
                            )}

                        </>

                       

                    </Grid>


                </Grid>

            </Modal>
        </>
    )
}

export default EditProductModal
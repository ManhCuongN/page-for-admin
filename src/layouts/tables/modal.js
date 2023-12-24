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

//antd
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
function ModalCom() {
  const { setShowModalEdit, showModalEdit, productState: { product } } = useContext(ProductContext)
  const [updateProduct, setUpdateProduct] = useState(null)

  useEffect(() => {
    setUpdateProduct(product)
  }, [product])
  console.log("p", product);
  if (showModalEdit) {
    var { product_name, product_description, product_thumb, product_type, product_attributes, product_quantity, product_price } = updateProduct
  }
  const handleCloseModal = () => {
    setShowModalEdit(false)
  }
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };
  const changeValueName = (e) => {
    console.log("tesst");
    setUpdateProduct({ ...updateProduct, [e.target.name]: e.target.value });
  }
  const changeValueThumb = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setUpdateProduct({ ...updateProduct, product_thumb: reader.result });
      }
    }

    if (file) {
      const a = reader.readAsDataURL(file);
      console.log("a", a);
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
  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };


  return (
    <Modal
      open={showModalEdit}
    >
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <Button onClick={handleCloseModal}>X</Button>
              <MDBox p={2}>
                <MDTypography variant="h5">Alerts</MDTypography>
              </MDBox>
              <MDBox pt={2} px={2}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <MDBox mb={2}>
                      <MDInput type="text" label="Name Product" name="product_name" value={product_name} onChange={changeValueName}
                        fullWidth />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput type="text" label="Description" name="product_description" value={product_description} onChange={changeValueName} fullWidth />
                    </MDBox>

                    {product_type === 'Clothing' && (
                      <>
                        <MDBox mb={2}>
                          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                              <MDInput type="text" label="brand" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                              <MDInput type="text" value={product_attributes?.brand} fullWidth />
                            </Grid>
                          </Grid>
                        </MDBox>
                        <MDBox mb={2}>
                          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                              <MDInput type="text" label="size" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                              <MDInput type="text" value={product_attributes?.size} fullWidth />
                            </Grid>
                          </Grid>
                        </MDBox>
                        <MDBox mb={2}>
                          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                              <MDInput type="text" label="material" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                              <MDInput type="text" value={product_attributes?.material} fullWidth />
                            </Grid>
                          </Grid>
                        </MDBox>
                      </>

                    )}
                    {/* row 2 */}
                    {product_type === 'Electronics' && (
                      <>
                        <MDBox mb={2}>
                          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                              <MDInput type="text" label="electrin" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                              <MDInput type="text" value={product_attributes?.brand} fullWidth />
                            </Grid>
                          </Grid>
                        </MDBox>
                        <MDBox mb={2}>
                          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                              <MDInput type="text" label="size" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                              <MDInput type="text" value={product_attributes?.size} fullWidth />
                            </Grid>
                          </Grid>
                        </MDBox>
                        <MDBox mb={2}>
                          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                              <MDInput type="text" label="material" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                              <MDInput type="text" value={product_attributes?.material} fullWidth />
                            </Grid>
                          </Grid>
                        </MDBox>
                      </>
                    )}

                    {/* //image */}
                    <MDBox mb={2}>
                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                          <Grid item xs={4}>
                            <MDBox mb={2}>
                              <Button>
                                Upload file
                                <VisuallyHiddenInput
                                  type="file"
                                  name="product_name"
                                  onChange={changeValueThumb}
                                />
                              </Button>
                            </MDBox>
                          </Grid>
                          <Grid item xs={8}>
                            <MDBox mb={2}>
                              <Avatar
                                alt="Remy Sharp"
                                src={product_thumb}
                                sx={{ width: 56, height: 56 }}
                              />
                            </MDBox>
                          </Grid>
                        </Grid>
                        <Grid item xs={6}> 
                            <MDBox mb={2}>
                              <Button
                                component="label"
                                variant=""
                                startIcon={<CloudUploadIcon />}
                              >
                                Upload file
                                <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
                              </Button>
                              <span>Upload Images</span>
                            </MDBox>                      
                          <Grid item xs={8} container rowSpacing={1}>
                            {selectedFiles.map((file, index) => (
                              <Grid item key={index}>
                                <Avatar
                                  alt={file.name}
                                  src={URL.createObjectURL(file)}
                                  sx={{ width: 56, height: 56 }}
                                />
                                <input
                                  type="checkbox"
                                  onChange={() => handleRemoveFile(index)}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                      </Grid>
                    </MDBox>

  

                  </Grid>

                  <Grid item xs={4}>
                    <MDBox mb={2}>
                      <InputLabel id="demo-simple-select-label">Age</InputLabel>
                      <Select
                        name="product_type"
                        onChange={changeValueName}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={product_type}
                        label="Age"
                        sx={{ width: '250px', height: '35px' }}

                      >
                        {PRODUCT_TYPE.map((p, index) => (
                          <MenuItem key={index} value={p}>{p}</MenuItem>
                        ))}
                      </Select>
                    </MDBox>

                    <MDBox mb={2}>
                      <MDInput type="text" label="Quantity" name="product_quantity" value={product_quantity} onChange={changeValueName} fullWidth />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput type="text" label="Price" name="product_price" value={product_price} onChange={changeValueName} fullWidth />
                    </MDBox>
                    <MDBox mb={2}>
                    <Form
    name="dynamic_form_nest_item"
    onFinish={onFinish}
    style={{ maxWidth: 600 }}
    autoComplete="off"
  >
    <Form.List name="users">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              <Form.Item
                {...restField}
                name={[name, 'first']}
                rules={[{ required: true, message: 'Missing first name' }]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'last']}
                rules={[{ required: true, message: 'Missing last name' }]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()}  icon={<PlusOutlined />}>
              Add field
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
                    </MDBox>
                  </Grid>

                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </Modal>
  )
}

export default ModalCom
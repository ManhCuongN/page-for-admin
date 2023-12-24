import React, { useEffect, useState } from 'react';

function Test() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8181');
    setSocket(newSocket);

    newSocket.onmessage = (event) => {
        console.log("ec",event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = (message) => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  };

  return (
    <div>
      <h1>WebSocket Example</h1>
      <div>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            sendMessage(e.target.value);
            e.target.value = '';
          }
        }}
      />
    </div>
  );
}

export default Test;




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
              <MDInput type="text" label="Name Product" name="product_name" onChange={changeValueName}
                fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Description" name="product_description" onChange={changeValueName} fullWidth />
            </MDBox>

            {selectedValueType === 'Clothing' && (
              <>
                <MDBox mb={2}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <MDInput type="text" value="Brand" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                      <MDInput type="text" name="brand" onChange={changeValueAttribute} fullWidth />
                    </Grid>
                  </Grid>
                </MDBox>
                <MDBox mb={2}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <MDInput type="text" value="Style" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                      <MDInput type="text" name="style" onChange={changeValueAttribute} fullWidth />
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
                        <Btn component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                          Upload file
                          <VisuallyHiddenInput
                            type="file"
                            name="product_thumb"
                            onChange={changeValueThumb}
                          />
                        </Btn>

                      </MDBox>
                    </Grid>
                    <Grid item xs={8}>
                      <MDBox mb={2}>
                        <Avatar
                          alt="Remy Sharp"
                          src={productThumb}
                          sx={{ width: 56, height: 56 }}
                        />
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
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
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
              <MDInput type="text" label="Quantity" name="product_quantity" onChange={changeValueName} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Price" name="product_price" onChange={changeValueName} fullWidth />
            </MDBox>
            {selectedValueType === 'Clothing' && (
              <>
                <MDBox mb={2}>
                  <h4>Variation</h4>
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
                      <MDInput type="text" value="Color" fullWidth />
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
                  <h4>Variation</h4>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <MDInput type="text" value="Size" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                      <MDInput type="text" name="size" onChange={changeValueName} fullWidth />
                    </Grid>
                  </Grid>
                </MDBox>
                <MDBox mb={2}>

                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <MDInput type="text" value="Colo3r" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                      <MDInput type="text" name="color" onChange={changeValueName} fullWidth />
                    </Grid>
                  </Grid>
                </MDBox>
              </>
            )}
            <Button onClick={handleSubmitCreate}>Submit</Button>

          </Grid>


        </Grid>
      </MDBox>
    </Card>
  </Grid>
</Grid>
</MDBox>


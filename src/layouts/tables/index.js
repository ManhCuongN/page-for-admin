
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { Modal } from 'antd';

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "context/product.context";
import EditProductModal from "./edit-product.modal";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
function Tables() {
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => isMounted.current = false;
  }, []);

  
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const { showModalEdit,deleteProductFunc, setShowModalDelete, showModalDelete, productState: {product} } = useContext(ProductContext)
  const [isModalOpen, setIsModalOpen] = useState(false);

  //modal
  const handleOk = () => {
    deleteProductFunc(product._id)
    setShowModalDelete(false);
  };

  const handleCancel = () => {
    setShowModalDelete(false);
  };
  return (

    <DashboardLayout>
      <DashboardNavbar />
      {showModalDelete && (
        <Modal title="Delete Product" open={showModalDelete} onOk={handleOk} onCancel={handleCancel}>
        <p>You definitely want to delete <b>{product.product_name}</b></p>
      </Modal>
      )}
      
      {showModalEdit &&  <EditProductModal />}
      <Grid container spacing={6}>
        <ToastContainer/>
        <Grid item xs={12}>
          <Card>
            <MDBox
              display="flex"
              justifyContent="space-between" // Căn trái và căn phải
              alignItems="center" // Căn giữa theo chiều dọc
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                 Sản Phẩm Được Đăng Bán
              </MDTypography>
              <MDBox>
                {/* <PlusCircleOutlined onClick={handleClickCreate} /> */}
              </MDBox>
            </MDBox>
            <MDBox pt={3}>
              <DataTable
                table={{ columns, rows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </MDBox>

          </Card>

        </Grid>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Sản Phẩm Chưa Được Đăng Bán
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <DataTable
                table={{ columns: pColumns, rows: pRows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </MDBox>
          </Card>
        </Grid>
      </Grid>

      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Tables;

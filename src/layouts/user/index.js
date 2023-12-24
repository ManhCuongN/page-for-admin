
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
import authorsTableData from "layouts/user/data/authorsTableData";
import projectsTableData from "layouts/user/data/projectsTableData";
import { useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "context/product.context";
import EditProductModal from "./edit-product.modal";

function Users() {
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
        <p>You definitely want to delete</p>
      </Modal>
      )}
      
      {showModalEdit &&  <EditProductModal />}
      <Grid container spacing={6}>
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
                 Danh Sách Người Dùng 
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
          
        </Grid>
      </Grid>

      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Users;

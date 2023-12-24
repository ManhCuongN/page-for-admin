import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Tabs, Avatar, Button, List, Skeleton, Modal } from 'antd';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import ModalViewShop from './modal-view-shop';
import { Badge, Card, Space,  } from 'antd';
const ConfirmShop = () => {
  const { TabPane } = Tabs;
  const { getListShop, findShop,activeShop, showModalViewShop, setShowModalViewShop, authState: { listShop, shop } } = useContext(AuthContext);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [statusShop, setStatusShop] = useState("inactive")
  const [list, setList] = useState([]);

  useEffect(() => {


    const fetchData = async () => {
      const result = await getListShop({ status: statusShop });
      setList(listShop); // Thiết lập danh sách cửa hàng khi dữ liệu được trả về
      setInitLoading(false);
    };

    fetchData();
  }, [statusShop, listShop]);

  const onLoadMore = async () => {
    setLoading(true);
    // Bạn có thể thực hiện logic lấy thêm dữ liệu ở đây
    setLoading(false);
  };

  const handleFindShop = async (shopId) => {
    setShowModalViewShop(true)
    await findShop(shopId)
  }

  const handleActiveShop = async (shopId) => {
     const payload = {
      shopId,
      role: '01'
     }
     await activeShop(payload)
  }

  const handleInActiveShop = async (shopId) => {
    const payload = {
     shopId,
     role: '00'
    }
    await activeShop(payload)
 }
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>Xem Thêm</Button>
      </div>
    ) : null;

  const renderShopList = (shops) => {
    return (
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={shops}
        renderItem={(item) => (
          
          <List.Item
            actions={[ 
              item.status === 'active' ? (
                <Button type="dashed" onClick={() => handleInActiveShop(item._id)}>Khóa</Button>
              ) : (
                <Button type="dashed" onClick={() => handleActiveShop(item._id)}>Xác Nhận</Button>
              ),
            ]}
           
          >

            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.address}
                onClick={() => handleFindShop(item._id)}
              />
              
            </Skeleton>
          </List.Item>
        )}
      />
    );
  };
  const handleOk = () => {
    setShowModalViewShop(false);
  };

  const handleCancel = () => {
    setShowModalViewShop(false);
  };

  return (

    <DashboardLayout>
      {
        showModalViewShop &&

        <Modal title="THÔNG TIN " open={showModalViewShop} onOk={handleOk} onCancel={handleCancel}>
          <ModalViewShop />


        </Modal>
      }

      <DashboardNavbar />
      <Tabs defaultActiveKey="1" onChange={setStatusShop} >
        <TabPane tab="CHỜ XÁC NHẬN" key="inactive">
          {renderShopList(listShop)}
        </TabPane>
        <TabPane tab="ĐÃ XÁC NHẬN" key="active">
          {renderShopList(listShop)}
        </TabPane>
      </Tabs>
      {/* <Footer /> */}
    </DashboardLayout>
  );
};

export default ConfirmShop;

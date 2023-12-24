import React, { useContext, useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { List, Avatar, Button, Space } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { ProductContext } from "context/product.context";
import { AuthContext } from "context/auth.context";


const ListOrdered = () => {
    const { getListOrderByShop, updateOrder } = useContext(ProductContext)
    const { authState: { shop } } = useContext(AuthContext)
    const [statusOrder, setStatusOrder] = useState(0)
    const [listOrderedByUser, setListOrderedByUser] = useState([])

    const { TabPane } = Tabs;
  
    useEffect(() => {
      const data = {
        shopId: shop?.shop?._id,
        order_status: statusOrder
      }
  
      const fetchData = async () => {
        const result = await getListOrderByShop(data)
        console.log("res", result);
        setListOrderedByUser(result)
      }
  
      fetchData()
    }, [statusOrder])

    const handleToConfirmed = async(orderId) => {
       await updateOrder(orderId)
       const data = {
        shopId: shop?.shop?._id,
        order_status: statusOrder
      }
      const result = await getListOrderByShop(data)
      setListOrderedByUser(result)
    }

  
 
  
    const renderOrderList = (orders) => {
      return (
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={orders}
          renderItem={(order) => (
            <List.Item
              key={order._id}
              actions={[
                <Space key="actions">
                  {order.order_status == 0 &&
                  (<Button type="primary" style={{marginL: "20px"}} onClick={() => handleToConfirmed(order._id)}>Xác Nhận</Button>)  
                  }
                   {order.order_status == 1 &&
                  (<Button type="primary" style={{marginL: "20px"}} onClick={() => handleToConfirmed(order._id)}>Hủy Xác Nhận</Button>)  
                  }
                  
                </Space>,
              ]}
              extra={
                <>
                <div>
                  {order.order_products.map((i) => (
                    i.item_products.map((d) => (
                      <div key={d.productId}>
                      <p><b>Sản Phẩm:</b> {d.name}</p>
                      <p><b>Số Lượng:</b> {d.quantity}</p>
                      <p><b>Thành Tiền:</b> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(d?.price)}</p>
    
                    </div>
                     
                    ))
                  ))}
                 
                </div>
               
                </>
              }
            >
              <List.Item.Meta
                
                avatar={<Avatar src="https://phuongnamvina.com/img_data/images/ban-hang-order.jpg" />}
                title={<a href={order.order_shipping.href}>{order.order_trackingNumber}</a>}
                description={order.order_shipping.note}
              />
              {order.order_checkout && (
                <div>
                  <p><b>Đơn Hàng:</b> {order.order_checkout.totalCheckout}</p>
                  <p><b>Hình Thức Thanh Toán:</b> {order.order_payment}</p>
                  <p><b>Ngày Đặt:</b> {order.createOn}</p>

                </div>
              )}
              {/* Hiển thị thông tin đơn hàng khác tùy ý */}
            </List.Item>
          )}
        />
      ); // Thêm dấu ngoặc đóng ở đây
    }
  
    return (
        <DashboardLayout>
        <DashboardNavbar />
        <Tabs defaultActiveKey="1" onChange={setStatusOrder}>
          <TabPane tab="Chờ xác nhận" key="0">
            {renderOrderList(statusOrder === "0" ? listOrderedByUser : [])}
          </TabPane>
          <TabPane tab="Đã xác nhận" key="1">
            {renderOrderList(statusOrder === "1" ? listOrderedByUser : [])}
          </TabPane>
          <TabPane tab="Hoàn Thành" key="2">
            {renderOrderList(statusOrder === "2" ? listOrderedByUser : [])}
          </TabPane>
          {/* Thêm các TabPane khác nếu cần */}
        </Tabs>
        </DashboardLayout>
    )
  }
  export default ListOrdered;
  
'use client';
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import CreateOrderModal from "./CreateOrderModal";

// Icon mapping - ĐEN TRẮNG (Font Awesome style)
const statusIcons = {
  "Khởi tạo": "📝", // Document icon
  "Đang vận chuyển": "🚚", // Truck icon
  "Hoàn thành": "✓", // Check mark
  "Đã huỷ": "✕", // X mark
  "Theo dõi TT": "👁", // Eye icon
  "Bảng kê": "📋" // Clipboard icon
};

// Action icons
const actionIcons = {
  edit: "✏", // Pencil
  delete: "🗑", // Trash
  view: "👁", // Eye
  track: "📍", // Location pin
  update: "🔄", // Refresh
  print: "🖨" // Printer
};

// Tab icons
const tabIcons = {
  "Tất cả": "📦",
  "Khởi tạo": "📝",
  "Đang vận chuyển": "🚚",
  "Hoàn thành": "✓",
  "Theo dõi TT": "👁",
  "Bảng kê": "📋",
  "Đã huỷ": "✕"
};

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showColumnsMenu, setShowColumnsMenu] = useState(false);
  const [columns, setColumns] = useState([
  { id: 'maDon', label: 'Mã đơn', visible: true },
  { id: 'trangThai', label: 'Trạng thái', visible: true },
  { id: 'ngayThang', label: 'Ngày tháng', visible: true },
  { id: 'diemNhan', label: 'Điểm nhận', visible: true },
  { id: 'diemGiao', label: 'Điểm giao', visible: true },
  { id: 'khachHang', label: 'Khách hàng', visible: true },
  { id: 'hangHoa', label: 'Hàng hóa', visible: true },
  { id: 'trongLuong', label: 'Trọng lượng', visible: true },
  { id: 'kdPhuTrach', label: 'KD phụ trách', visible: true },
  { id: 'loaiHang', label: 'Loại hàng', visible: true },
  { id: 'tongCong', label: 'Tổng cộng', visible: true },
]);
  const [activeTab, setActiveTab] = useState("Tất cả");
  
  // Load orders
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);
  
  // Save orders
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders]);
  
  // Thêm đơn hàng mới
  const addNewOrder = (formData) => {
    const orderCode = `HM${Date.now().toString().slice(-4)}`;
    
    const newOrder = {
      id: Date.now(),
      maDon: orderCode,
      trangThai: "Khởi tạo",
      ngayThang: new Date().toLocaleDateString('vi-VN'),
      diemNhan: formData.pickupAddress || "",
      diemGiao: formData.deliveryAddress || "",
      khachHang: formData.customer || "",
      hangHoa: formData.goods || "",
      trongLuong: formData.weight ? `${formData.weight} tấn` : "",
      kdpt: "Đào Lê Minh Nguyệt",
      loaiHang: formData.vehicleType || "",
      tongCong: formData.freightPrice ? `${formData.freightPrice}đ` : "0đ",
    };
    
    setOrders(prev => [newOrder, ...prev]);
  };
  
  // Cập nhật trạng thái
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, trangThai: newStatus }
        : order
    ));
  };
  
  // Xóa đơn hàng
  const deleteOrder = (orderId) => {
    if (confirm("Bạn có chắc muốn xóa đơn hàng này?")) {
      setOrders(prev => prev.filter(order => order.id !== orderId));
    }
  };
  
  // Xem chi tiết
  const viewOrderDetails = (order) => {
    const details = `
Mã đơn: ${order.maDon}
Trạng thái: ${order.trangThai}
Ngày tạo: ${order.ngayThang}
Khách hàng: ${order.khachHang}
Hàng hóa: ${order.hangHoa}
Trọng lượng: ${order.trongLuong}
Điểm nhận: ${order.diemNhan}
Điểm giao: ${order.diemGiao}
Tổng cộng: ${order.tongCong}
    `;
    alert(details);
  };
  
  // // In đơn hàng
  // const printOrder = (order) => {
  //   const printWindow = window.open('', '_blank');
  //   printWindow.document.write(`
  //     <html>
  //       <head>
  //         <title>Đơn hàng ${order.maDon}</title>
  //         <style>
  //           body { font-family: Arial, sans-serif; padding: 20px; }
  //           .header { text-align: center; margin-bottom: 30px; }
  //           .info { margin-bottom: 20px; }
  //           table { width: 100%; border-collapse: collapse; margin-top: 20px; }
  //           th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
  //           th { background-color: #f2f2f2; }
  //         </style>
  //       </head>
  //       <body>
  //         <div class="header">
  //           <h2>ĐƠN HÀNG VẬN CHUYỂN</h2>
  //           <h3>Mã đơn: ${order.maDon}</h3>
  //         </div>
  //         <div class="info">
  //           <p><strong>Khách hàng:</strong> ${order.khachHang}</p>
  //           <p><strong>Trạng thái:</strong> ${order.trangThai}</p>
  //           <p><strong>Ngày tạo:</strong> ${order.ngayThang}</p>
  //         </div>
  //         <table>
  //           <tr><th>Thông tin</th><th>Chi tiết</th></tr>
  //           <tr><td>Hàng hóa</td><td>${order.hangHoa}</td></tr>
  //           <tr><td>Trọng lượng</td><td>${order.trongLuong}</td></tr>
  //           <tr><td>Điểm nhận</td><td>${order.diemNhan}</td></tr>
  //           <tr><td>Điểm giao</td><td>${order.diemGiao}</td></tr>
  //           <tr><td>Tổng cộng</td><td>${order.tongCong}</td></tr>
  //         </table>
  //       </body>
  //     </html>
  //   `);
  //   printWindow.document.close();
  //   printWindow.print();
  // };
  
  // Lọc đơn hàng
  const filteredOrders = activeTab === "Tất cả" 
    ? orders 
    : orders.filter(order => order.trangThai === activeTab);

  // Lấy class status dựa trên trạng thái
  const getStatusClass = (status) => {
    switch(status) {
      case "Khởi tạo": return styles.statusInit;
      case "Đang vận chuyển": return styles.statusTransport;
      case "Hoàn thành": return styles.statusCompleted;
      case "Đã huỷ": return styles.statusCancelled;
      case "Theo dõi TT": return styles.statusTracking;
      case "Bảng kê": return styles.statusReport;
      default: return styles.statusInit;
    }
  };

  return (
    <div className={styles.app}>
      {/* TOPBAR */}
      <header className={styles.topbar}>
        <div className={styles.logo}>
          <img src="logohm.png" alt="Hoàng Minh" />
        </div>
        <div className={styles.user}>
          <button>
            <img src="mini-logo.png" className={styles.userAvatar} alt="User" />
          </button>
          <span className={styles.userName}>
            Đào Lê Minh Nguyệt
          </span>
        </div>
      </header>
      
      {/* BODY */}
      <div className={styles.body}>
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <ul>
            <li className={styles.active}>📦 Quản lý đơn hàng</li>
            <li>Khách hàng</li>
            <li>Theo dõi TT</li>
            <li> Bảng kê</li>
            <li>Quản lý thanh toán</li>
          </ul>
        </aside>

        {/* CONTENT */}
        <main className={styles.content}>
          <div className={styles.contentHeader}>
            <h1 className={styles.pageTitle}>📦 Danh sách đơn hàng</h1>
            <button 
              onClick={() => setModalOpen(true)} 
              className={styles.newOrderButton}
            >
              + Tạo đơn hàng mới
            </button>
          </div>
          {/* STATUS BAR */}
          <div className={styles.statusWrapper}>
            {Object.keys(tabIcons).map(tab => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                <span className={styles.tabIcon}>{tabIcons[tab]}</span>
                {tab}
              </button>
            ))}
          </div>
          
          {/* TABLE */}
          <div className={styles.tableWrapper}>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Mã đơn</th>
                    <th>Trạng thái</th>
                    <th>Ngày tháng</th>
                    <th>Điểm nhận</th>
                    <th>Điểm giao</th>
                    <th>Khách hàng</th>
                    <th>Hàng hóa</th>
                    <th>Trọng lượng</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={9}>
                        <div className={styles.empty}>
                          <p>Hiện không có đơn hàng nào.</p>
                          <button 
                            className={styles.newOrderButton}
                            onClick={() => setModalOpen(true)}
                            style={{ marginTop: '20px' }}
                          >
                            + Tạo đơn hàng đầu tiên
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className={styles.orderRow}>
                        <td>
                          <span className={styles.orderCode}>{order.maDon}</span>
                        </td>
                        <td>
                          <span className={`${styles.status} ${getStatusClass(order.trangThai)}`}>
                            <span className={styles.statusIcon}>
                              {statusIcons[order.trangThai] || "📦"}
                            </span>
                            {order.trangThai}
                          </span>
                        </td>
                        <td>{order.ngayThang}</td>
                        <td>{order.diemNhan}</td>
                        <td>{order.diemGiao}</td>
                        <td>{order.khachHang}</td>
                        <td>{order.hangHoa}</td>
                        <td>{order.trongLuong}</td>
                        <td>
                          {/* <div className={styles.actionButtons}>
                            <button 
                              className={`${styles.actionBtn} ${styles.viewBtn}`}
                              onClick={() => viewOrderDetails(order)}
                              title="Xem chi tiết"
                            >
                              <span className={styles.btnIcon}>{actionIcons.view}</span>
                              Xem
                            </button>
                            <button 
                              className={`${styles.actionBtn} ${styles.editBtn}`}
                              onClick={() => updateOrderStatus(order.id, "Đang vận chuyển")}
                              title="Cập nhật trạng thái"
                            >
                              <span className={styles.btnIcon}>{actionIcons.update}</span>
                              Vận chuyển
                            </button>
                            <button 
                              className={`${styles.actionBtn} ${styles.trackBtn}`}
                              onClick={() => updateOrderStatus(order.id, "Hoàn thành")}
                              title="Đánh dấu hoàn thành"
                            >
                              <span className={styles.btnIcon}>{actionIcons.track}</span>
                              Hoàn thành
                            </button>
                            <button 
                              className={`${styles.actionBtn} ${styles.deleteBtn}`}
                              onClick={() => deleteOrder(order.id)}
                              title="Xóa đơn hàng"
                            >
                              <span className={styles.btnIcon}>{actionIcons.delete}</span>
                              Xóa
                            </button> */}
                            {/* <button 
                              className={`${styles.actionBtn} ${styles.printBtn}`}
                              onClick={() => printOrder(order)}
                              title="In đơn hàng"
                            >
                              <span className={styles.btnIcon}>{actionIcons.print}</span>
                              In
                            </button> */}
                          {/* </div> */}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      
      {/* MODAL */}
      <CreateOrderModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)}
        onOrderCreated={addNewOrder}
      />
    </div>
  );
}
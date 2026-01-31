document.addEventListener('DOMContentLoaded', function() {
    // Lấy tham số từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');
    
    // Lấy các phần tử DOM
    const loadingEl = document.getElementById('loading');
    const orderContentEl = document.getElementById('orderContent');
    const backBtn = document.getElementById('backBtn');
    const printBtn = document.getElementById('printBtn');
    const editBtn = document.getElementById('editBtn');
    const updateBtn = document.getElementById('updateBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    
    // Khởi tạo
    if (!orderId) {
        alert('Không tìm thấy mã đơn hàng!');
        window.location.href = 'index.html';
        return;
    }
    
    // Tải đơn hàng
    loadOrder(orderId);
    
    // Sự kiện nút quay lại
    backBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    // Sự kiện nút in
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    // Sự kiện nút chỉnh sửa
    editBtn.addEventListener('click', function() {
        alert('Chức năng chỉnh sửa đang phát triển');
    });
    
    // Sự kiện nút cập nhật trạng thái
    updateBtn.addEventListener('click', function() {
        const newStatus = prompt('Cập nhật trạng thái mới:', 'Đang vận chuyển');
        if (newStatus) {
            updateOrderStatus(orderId, newStatus);
        }
    });
    
    // Sự kiện nút xóa
    deleteBtn.addEventListener('click', function() {
        if (confirm('Bạn có chắc muốn xóa đơn hàng này?')) {
            deleteOrder(orderId);
        }
    });
    
    // Hàm tải đơn hàng
    function loadOrder(orderId) {
        try {
            // Lấy từ localStorage
            const savedOrders = localStorage.getItem('orders');
            if (!savedOrders) {
                throw new Error('Không có dữ liệu đơn hàng');
            }
            
            const orders = JSON.parse(savedOrders);
            const order = orders.find(o => o.id.toString() === orderId || o.maDon === orderId);
            
            if (!order) {
                throw new Error('Không tìm thấy đơn hàng');
            }
            
            // Hiển thị dữ liệu
            displayOrder(order);
            
            // Ẩn loading, hiện content
            loadingEl.style.display = 'none';
            orderContentEl.style.display = 'block';
            
        } catch (error) {
            loadingEl.innerHTML = `<p style="color: red;">Lỗi: ${error.message}</p>
                                  <button onclick="window.location.href='index.html'">Quay lại trang chủ</button>`;
        }
    }
    
    // Hàm hiển thị đơn hàng
    function displayOrder(order) {
        // Mã đơn và trạng thái
        document.getElementById('orderCode').textContent = `Đơn hàng: ${order.maDon}`;
        const statusEl = document.getElementById('orderStatus');
        statusEl.textContent = order.trangThai;
        
        // Thêm class cho trạng thái
        const statusClass = order.trangThai.toLowerCase().replace(/\s+/g, '-');
        statusEl.className = `status ${statusClass}`;
        
        // Thông tin cơ bản
        document.getElementById('customerName').textContent = order.khachHang || '-';
        document.getElementById('goods').textContent = order.hangHoa || '-';
        document.getElementById('weight').textContent = order.trongLuong || '-';
        document.getElementById('goodsType').textContent = order.loaiHang || '-';
        document.getElementById('createdDate').textContent = order.ngayThang || '-';
        document.getElementById('kdPerson').textContent = order.kdPhuTrach || '-';
        
        // Thông tin vận chuyển
        document.getElementById('pickupAddress').textContent = order.diemNhan || '-';
        document.getElementById('deliveryAddress').textContent = order.diemGiao || '-';
        document.getElementById('pickupContact').textContent = order.pickupContact ? `📞 ${order.pickupContact}` : '';
        document.getElementById('deliveryContact').textContent = order.deliveryContact ? `📞 ${order.deliveryContact}` : '';
        
        // Thông tin thanh toán
        document.getElementById('totalAmount').textContent = order.tongCong || '-';
        document.getElementById('codAmount').textContent = order.codAmount ? `${order.codAmount}đ` : '0đ';
        document.getElementById('freightStatus').textContent = order.freightStatus || 'Chưa xác định';
        
        // Ghi chú
        if (order.driverNote) {
            document.getElementById('driverNotes').textContent = order.driverNote;
            document.getElementById('notesSection').style.display = 'block';
        }
    }
    
    // Hàm cập nhật trạng thái
    function updateOrderStatus(orderId, newStatus) {
        try {
            const savedOrders = localStorage.getItem('orders');
            if (!savedOrders) return;
            
            const orders = JSON.parse(savedOrders);
            const orderIndex = orders.findIndex(o => o.id.toString() === orderId || o.maDon === orderId);
            
            if (orderIndex !== -1) {
                orders[orderIndex].trangThai = newStatus;
                localStorage.setItem('orders', JSON.stringify(orders));
                
                // Cập nhật hiển thị
                const statusEl = document.getElementById('orderStatus');
                statusEl.textContent = newStatus;
                
                const statusClass = newStatus.toLowerCase().replace(/\s+/g, '-');
                statusEl.className = `status ${statusClass}`;
                
                alert('Đã cập nhật trạng thái thành công!');
            }
        } catch (error) {
            alert('Lỗi khi cập nhật trạng thái: ' + error.message);
        }
    }
    
    // Hàm xóa đơn hàng
    function deleteOrder(orderId) {
        try {
            const savedOrders = localStorage.getItem('orders');
            if (!savedOrders) return;
            
            const orders = JSON.parse(savedOrders);
            const updatedOrders = orders.filter(o => o.id.toString() !== orderId && o.maDon !== orderId);
            
            localStorage.setItem('orders', JSON.stringify(updatedOrders));
            alert('Đã xóa đơn hàng thành công!');
            window.location.href = 'index.html';
            
        } catch (error) {
            alert('Lỗi khi xóa đơn hàng: ' + error.message);
        }
    }
});
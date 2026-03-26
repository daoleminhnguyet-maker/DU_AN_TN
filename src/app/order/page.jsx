'use client';
import { useOrders } from '@/hooks/useOrders';
import Button from '@/components/common/Button';
import StatusBadge from '@/components/common/StatusBadge';
import './order.scss';

export default function OrdersPage() {
  const {
    orders,
    allOrders,
    currentPage,
    setCurrentPage,
    totalPages,
    selectedOrders,
    currentTab,
    setCurrentTab,
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    resetFilters,
    toggleSelectOrder,
    selectAll,
    deselectAll,
    sendToDispatch,
  } = useOrders();

  const isAllSelected = () => {
    const selectableIds = allOrders
      .filter((o) => o.status === 'Đơn mới')
      .map((o) => o.id);
    return selectableIds.length > 0 && selectableIds.every((id) => selectedOrders.includes(id));
  };

  return (
    <div className="orders-page">
      <h1 className="page-title">Danh sách đơn chuyến</h1>

      <div className="btn-group">
        <Button variant="primary" icon="📦">
          Hàng chuyến
        </Button>
        <Button variant="primary" icon="🚗">
          Hàng bo
        </Button>
        <Button variant="primary" icon="🏗️">
          Hàng cẩu-nâng
        </Button>
        <Button variant="primary" icon="❄️">
          Hàng đông lạnh
        </Button>
      </div>

      <div className="tabs">
        {[
          { key: 'all', label: '📋 Tất cả' },
          { key: 'new', label: '✨ Mới' },
          { key: 'waiting', label: '🚚 Chờ xe' },
          { key: 'delivering', label: '🚛 Đang vận chuyển' },
          { key: 'completed', label: '✅ Hoàn thành' },
          { key: 'cancelled', label: '❌ Đã hủy' },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`tab ${currentTab === tab.key ? 'active' : ''}`}
            onClick={() => setCurrentTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="filter-card">
        <div className="filter-row">
          <div className="filter-group">
            <label className="filter-label">🔍 Tìm kiếm</label>
            <input
              type="text"
              className="filter-input"
              placeholder="Mã đơn, khách hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">🏷️ Loại hàng</label>
            <select
              className="filter-input"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="Hàng chuyến">Hàng chuyến</option>
              <option value="Hàng bo">Hàng bo</option>
              <option value="Hàng cẩu">Hàng cẩu</option>
              <option value="Đông lạnh">Đông lạnh</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">Từ ngày</label>
            <input
              type="date"
              className="filter-input"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">Đến ngày</label>
            <input
              type="date"
              className="filter-input"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
          <Button variant="reset" onClick={resetFilters}>
            Đặt lại
          </Button>
        </div>
      </div>

      {selectedOrders.length > 0 && (
        <div className="bulk-bar">
          <div className="bulk-info">
            <span className="bulk-count">{selectedOrders.length}</span> bản ghi đã chọn
          </div>
          <div className="bulk-actions">
            <Button variant="bulk" onClick={sendToDispatch}>
              Gửi điều vận
            </Button>
            <Button variant="bulk-link" onClick={deselectAll}>
              Bỏ chọn tất cả
            </Button>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th className="checkbox-col">
                <input
                  type="checkbox"
                  checked={isAllSelected()}
                  onChange={(e) => (e.target.checked ? selectAll() : deselectAll())}
                />
              </th>
              <th>🆔 Mã đơn</th>
              <th>🔥 Trạng thái</th>
              <th>📅 Ngày tháng</th>
              <th>📍 Điểm nhận</th>
              <th>📍 Điểm giao</th>
              <th className="center">📏 Số km</th>
              <th>🙋‍♂️ Khách hàng</th>
              <th>📦 Hàng hóa</th>
              <th className="center">⚖️ Trọng lượng</th>
              <th>🧑‍💼 KD phụ trách</th>
              <th>🏷️ Loại hàng</th>
              <th className="right">💰 Tổng cộng</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="13" className="empty-row">
                  <div>📭</div>
                  <div>Không có dữ liệu</div>
                  <small>Danh sách đơn hàng đang trống</small>
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const isSelectable = order.status === 'Đơn mới';
                return (
                  <tr key={order.id} className={selectedOrders.includes(order.id) ? 'selected' : ''}>
                    <td className="checkbox-col">
                      {isSelectable && (
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => toggleSelectOrder(order.id)}
                        />
                      )}
                    </td>
                    <td>
                      <span style={{ color: '#2563eb', fontWeight: 500 }}>{order.code}</span>
                    </td>
                    <td>
                      <StatusBadge status={order.status} />
                    </td>
                    <td>
                      <div>{order.pickupDate}</div>
                      <small style={{ color: '#6b7280' }}>{order.pickupTime}</small>
                    </td>
                    <td title={order.pickupAddress}>
                      {order.pickupAddress.substring(0, 30)}...
                    </td>
                    <td title={order.deliveryAddress}>
                      {order.deliveryAddress.substring(0, 30)}...
                    </td>
                    <td className="center">{order.distance}</td>
                    <td>
                      <div>{order.customer.substring(0, 25)}...</div>
                      <small className="customer-badge">(Khách mới)</small>
                    </td>
                    <td>{order.cargoType}</td>
                    <td className="center">{order.weight}</td>
                    <td>{order.saleStaff}</td>
                    <td>{order.orderType}</td>
                    <td className="right">
                      <strong>{order.totalAmount}</strong>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <div className="pagination-info">
          Đang hiện từ {(currentPage - 1) * 10 + 1} đến{' '}
          {Math.min(currentPage * 10, allOrders.length)} của {allOrders.length} kết quả
        </div>
        <div className="pagination-controls">
          <button
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Trước
          </button>
          <span className="page-numbers">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </span>
          <button
            className="page-btn"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}
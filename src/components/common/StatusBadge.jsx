'use client';
import './StatusBadge.scss';

const StatusBadge = ({ status }) => {
  const statusMap = {
    'Đơn mới': 'new',
    'Chờ xe': 'waiting',
    'Đang vận chuyển': 'delivering',
    'Hoàn thành': 'completed',
    'Đã hủy': 'cancelled',
    'Đã điều xe': 'assigned',
  };

  const className = `status-badge status-${statusMap[status] || 'default'}`;
  return <span className={className}>{status}</span>;
};

export default StatusBadge;
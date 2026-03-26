import { useState, useMemo } from 'react';
import { ordersData } from '@/data/ordersData';

export const useOrders = () => {
  const [orders] = useState(ordersData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [currentTab, setCurrentTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    if (currentTab === 'new')
      filtered = filtered.filter((o) => o.status === 'Đơn mới');
    else if (currentTab === 'waiting')
      filtered = filtered.filter((o) => o.status === 'Chờ xe');
    else if (currentTab === 'delivering')
      filtered = filtered.filter((o) => o.status === 'Đang vận chuyển');
    else if (currentTab === 'completed')
      filtered = filtered.filter((o) => o.status === 'Hoàn thành');
    else if (currentTab === 'cancelled')
      filtered = filtered.filter((o) => o.status === 'Đã hủy');

    if (searchTerm) {
      filtered = filtered.filter(
        (o) =>
          o.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (typeFilter) filtered = filtered.filter((o) => o.orderType === typeFilter);
    if (dateFrom) filtered = filtered.filter((o) => o.pickupDate >= dateFrom);
    if (dateTo) filtered = filtered.filter((o) => o.pickupDate <= dateTo);

    return filtered;
  }, [orders, currentTab, searchTerm, typeFilter, dateFrom, dateTo]);

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const resetFilters = () => {
    setSearchTerm('');
    setTypeFilter('');
    setDateFrom('');
    setDateTo('');
    setCurrentPage(1);
  };

  const toggleSelectOrder = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    const selectableIds = filteredOrders
      .filter((o) => o.status === 'Đơn mới')
      .map((o) => o.id);
    setSelectedOrders(selectableIds);
  };

  const deselectAll = () => setSelectedOrders([]);

  const sendToDispatch = () => {
    alert(`Đã gửi ${selectedOrders.length} đơn đến điều vận`);
  };

  return {
    orders: paginatedOrders,
    allOrders: filteredOrders,
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
  };
};
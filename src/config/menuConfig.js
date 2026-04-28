// config/menuConfig.js

// Group dùng chung cho tất cả role
export const commonGroups = [
  {
    groupTitle: '📝 Yêu cầu',
    items: [
      { href: '/leave', icon: '🏖️', label: 'Nghỉ phép' },
      { href: '/rules', icon: '📜', label: 'Nội quy' },
    ],
  },
];

// Menu riêng cho từng role
export const roleSpecificMenus = {
  Admin: [
    {
      groupTitle: '📋 Kinh doanh',
      items: [
        { href: '/order', icon: '📦', label: 'Hàng chuyến' },
        { href: '/tracking', icon: '📊', label: 'Theo dõi TT' },
        { href: '/report', icon: '📈', label: 'Bảng kê' },
        { href: '/customers', icon: '👥', label: 'Quản lý KH' },
        { href: '/report-sales', icon: '📊', label: 'Báo cáo' },
      ],
    },
    {
      groupTitle: '🚛 Điều vận',
      items: [
        { href: '/dispatch', icon: '🚚', label: 'Điều phối xe' },
        { href: '/dispatch-tracking', icon: '📍', label: 'Theo dõi vận chuyển' },
      ],
    },
    {
      groupTitle: '👥 Nhân sự',
      items: [{ href: '/hr', icon: '👥', label: 'Quản lý nhân sự' }],
    },
    {
      groupTitle: '💰 Tài chính',
      items: [
        { href: '/accounting', icon: '💰', label: 'Kế toán' },
        { href: '/financial-report', icon: '📊', label: 'Báo cáo tài chính' },
      ],
    },
  ],
  'Kinh doanh': [
    {
      groupTitle: '📋 Kinh doanh',
      items: [
        { href: '/order', icon: '📦', label: 'Hàng chuyến' },
        { href: '/tracking', icon: '📊', label: 'Theo dõi TT' },
        { href: '/report', icon: '📈', label: 'Bảng kê' },
        { href: '/customers', icon: '👥', label: 'Quản lý KH' },
        { href: '/report-sales', icon: '📊', label: 'Báo cáo' },
      ],
    },
  ],
  'Điều vận': [
    {
      groupTitle: '🚛 Điều vận',
      items: [
        { href: '/dispatch', icon: '🚚', label: 'Điều phối xe' },
        { href: '/dispatch-tracking', icon: '📍', label: 'Theo dõi vận chuyển' },
        { href: '/order', icon: '📦', label: 'Danh sách đơn hàng' },
      ],
    },
  ],
  HCNS: [
    {
      groupTitle: '👥 Nhân sự',
      items: [
        { href: '/hr', icon: '👥', label: 'Quản lý nhân sự' },
        { href: '/attendance', icon: '📅', label: 'Chấm công' },
        { href: '/salary', icon: '💰', label: 'Bảng lương' },
      ],
    },
  ],
  'Kế toán': [
    {
      groupTitle: '💰 Kế toán',
      items: [
        { href: '/accounting', icon: '💰', label: 'Kế toán' },
        { href: '/invoice', icon: '📄', label: 'Quản lý hóa đơn' },
        { href: '/payment', icon: '💳', label: 'Thanh toán' },
        { href: '/financial-report', icon: '📊', label: 'Báo cáo tài chính' },
      ],
    },
  ],
};

// Hàm lấy menu theo role
export const getMenusByRole = (role) => {
  const specificMenus = roleSpecificMenus[role] || roleSpecificMenus.Admin;
  return [...specificMenus, ...commonGroups];
};
'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Mock data user
// const MOCK_USERS = {
//   'Admin': { name: 'Đào Lê Minh Nguyệt', role: 'Admin', avatar: 'MN' },
//   'Kinh doanh': { name: 'Nguyễn Văn A', role: 'Kinh doanh', avatar: 'NA' },
//   'Điều vận': { name: 'Trần Thị B', role: 'Điều vận', avatar: 'TB' },
//   'HCNS': { name: 'Lê Văn C', role: 'HCNS', avatar: 'LC' },
//   'Kế toán': { name: 'Phạm Thị D', role: 'Kế toán', avatar: 'PD' },
// };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Giả lập check login từ localStorage khi khởi động
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Mock user mặc định để test (có thể xóa sau)
      const defaultUser = MOCK_USERS['Admin'];
      setUser(defaultUser);
      localStorage.setItem('user', JSON.stringify(defaultUser));
    }
    setLoading(false);
  }, []);

  // Hàm login
  const login = (username, password) => {
    // Giả lập API login
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock: cho phép login với bất kỳ tài khoản nào có trong MOCK_USERS
        if (username === 'admin' && password === '123456') {
          const userData = MOCK_USERS['Admin'];
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          resolve(userData);
        } 
        else if (username === 'kinhdoanh' && password === '123456') {
          const userData = MOCK_USERS['Kinh doanh'];
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          resolve(userData);
        }
        else if (username === 'dieuvan' && password === '123456') {
          const userData = MOCK_USERS['Điều vận'];
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          resolve(userData);
        }
        else {
          reject(new Error('Sai tên đăng nhập hoặc mật khẩu'));
        }
      }, 500); // Giả lập delay mạng
    });
  };

  // Hàm logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Hàm đổi role
  const changeRole = (newRole) => {
    if (MOCK_USERS[newRole]) {
      const newUser = { ...user, ...MOCK_USERS[newRole], role: newRole };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  };

  // Hàm cập nhật thông tin user
  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    logout,
    changeRole,
    updateUser,
    isAuthenticated: !!user,
    userRole: user?.role || 'Admin',
    userName: user?.name || 'User',
    userAvatar: user?.avatar || 'U',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
// import { useState, useEffect } from "react";
// import "./CreateOrderModal.css";

// const initialFormData = {
//   customer: "",
//   businessPerson: "Đào Lê Minh Nguyệt - 0348006940",
//   goods: "",
//   weight: "",
//   description: "",
//   lotCode: "",
//   vehicleType: "",
//   distance: "",
//   dropPoints: "",
//   loadingType: "",
//   freightStatus: "",
//   codAmount: "",
//   receiveDate: "",
//   deliveryDate: "",
//   receiveTime: "",
//   deliveryTime: "",
//   pickupAddress: "",
//   deliveryAddress: "",
//   pickupContact: "",
//   deliveryContact: "",
//   loadingMethod: "",
//   unloadingMethod: "",
//   pickupMapLink: "",
//   deliveryMapLink: "",
//   returnType: "",
//   returnLocation: "",
//   priceType: "noVat",
//   freightPrice: "",
//   vatFreight: "8",
//   returnPrice: "",
//   vatReturn: "",
//   loadingPrice: "",
//   vatLoading: "",
//   driverNote: ""
// };

// export default function CreateOrderModal({ open, onClose, onOrderCreated }) {
//   const [isClosing, setIsClosing] = useState(false);
//   const [formData, setFormData] = useState(initialFormData);

//   const handleClose = () => {
//     setIsClosing(true);
//     setTimeout(() => {
//       onClose();
//       setIsClosing(false);
//     }, 300);
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Kiểm tra các trường bắt buộc
//     const requiredFields = ['customer', 'goods', 'weight', 'pickupAddress', 'deliveryAddress', 'freightPrice'];
//     const missingFields = requiredFields.filter(field => !formData[field]);
    
//     if (missingFields.length > 0) {
//       alert(`Vui lòng điền đầy đủ các trường bắt buộc`);
//       return;
//     }
    
//     // Tạo mã đơn hàng tự động
//     const orderCode = `HM${Date.now().toString().slice(-6)}`;
    
//     // Gọi callback để thêm đơn hàng vào danh sách
//     if (onOrderCreated) {
//       onOrderCreated({
//         ...formData,
//         maDon: orderCode
//       });
//     }
    
//     // Hiển thị thông báo thành công
//     alert(`✅ Đã tạo đơn hàng thành công!\nMã đơn: ${orderCode}\nTrạng thái: Khởi tạo`);
    
//     // Reset form
//     setFormData(initialFormData);
    
//     // Đóng modal sau 1 giây
//     setTimeout(() => {
//       handleClose();
//     }, 1000);
//   };

//   useEffect(() => {
//     const handleEscKey = (e) => {
//       if (e.key === 'Escape' && open) {
//         handleClose();
//       }
//     };

//     if (open) {
//       document.addEventListener('keydown', handleEscKey);
//       document.body.style.overflow = 'hidden';
//     }

//     return () => {
//       document.removeEventListener('keydown', handleEscKey);
//       document.body.style.overflow = 'auto';
//     };
//   }, [open]);

//   if (!open && !isClosing) return null;

//   return (
//     <div className={`modal-overlay ${isClosing ? 'closing' : ''}`} onClick={handleClose}>
//       <div className="modal-container" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h2>📋 Tạo đơn hàng mới</h2>
//           <button className="close-btn" onClick={handleClose}>×</button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="modal-body">
            
//             {/* PHẦN 1: Thông tin chính - 2 CỘT */}
//             <div className="form-section">
//               <h3 className="section-title">1. Thông tin chính 📦</h3>
//               <div className="two-column-grid">
                
//                 {/* Cột trái phần 1 */}
//                 <div className="column">
//                   <div className="form-group">
//                     <label>🙋‍♂️ Khách hàng *</label>
//                     <select name="customer" value={formData.customer} onChange={handleInputChange} required>
//                       <option value="">Chọn khách hàng</option>
//                       <option value="Khách hàng 1">Khách hàng 1</option>
//                       <option value="Khách hàng 2">Khách hàng 2</option>
//                     </select>
//                   </div>

//                   <div className="form-group">
//                     <label>📦 Hàng hóa *</label>
//                     <input type="text" name="goods" value={formData.goods} onChange={handleInputChange} 
//                            placeholder="Thép cuộn, hàng dễ vỡ..." required />
//                   </div>

//                   <div className="form-group">
//                     <label>📝 Mô tả hàng hóa</label>
//                     <textarea name="description" value={formData.description} onChange={handleInputChange} 
//                             placeholder="Mô tả chi tiết hàng hóa..." rows="2" />
//                   </div>

//                   <div className="form-group">
//                     <label>🚚 Loại xe *</label>
//                     <select name="vehicleType" value={formData.vehicleType} onChange={handleInputChange} required>
//                       <option value="">Chọn loại xe</option>
//                       <option value="Xe tải">Xe tải</option>
//                       <option value="Container">Container</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Cột phải phần 1 */}
//                 <div className="column">
//                   <div className="form-group">
//                     <label>🧑‍💼 Kinh doanh phụ trách *</label>
//                     <input type="text" value={formData.businessPerson} readOnly className="readonly" />
//                   </div>

//                   <div className="form-group">
//                     <label>⚖️ Trọng lượng *</label>
//                     <div className="input-with-unit">
//                       <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} 
//                              placeholder="Nhập trọng lượng" required />
//                       <span className="unit">Tấn</span>
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label>🏷️ Mã lô hàng</label>
//                     <div className="input-with-action">
//                       <input type="text" name="lotCode" value={formData.lotCode} onChange={handleInputChange} 
//                              placeholder="HM001" />
//                       <button type="button" className="secondary-btn small"
//                               onClick={() => setFormData({...formData, lotCode: `HM${Date.now().toString().slice(-6)}`})}>
//                         Sinh mã
//                       </button>
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label>📏 Khoảng cách *</label>
//                     <div className="input-with-unit">
//                       <input type="number" name="distance" value={formData.distance} onChange={handleInputChange} 
//                              placeholder="Km" required />
//                       <span className="unit">Km</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* PHẦN 2: Thông tin vận chuyển - 2 CỘT */}
//             <div className="form-section">
//               <h3 className="section-title">2. Thông tin vận chuyển 📥</h3>
//               <div className="two-column-grid">
                
//                 {/* Cột trái phần 2 */}
//                 <div className="column">
//                   <div className="form-group">
//                     <label>📅 Ngày nhận hàng *</label>
//                     <input type="date" name="receiveDate" value={formData.receiveDate} onChange={handleInputChange} required />
//                   </div>

//                   <div className="form-group">
//                     <label>⏰ Giờ nhận hàng *</label>
//                     <input type="time" name="receiveTime" value={formData.receiveTime} onChange={handleInputChange} required />
//                   </div>

//                   <div className="form-group">
//                     <label>📍 Điểm nhận *</label>
//                     <input type="text" name="pickupAddress" value={formData.pickupAddress} onChange={handleInputChange} 
//                            placeholder="Địa chỉ nhận hàng" required />
//                   </div>

//                   <div className="form-group">
//                     <label>📞 Liên hệ nhận hàng</label>
//                     <input type="tel" name="pickupContact" value={formData.pickupContact} onChange={handleInputChange} 
//                            placeholder="Tên & Số điện thoại" />
//                   </div>
//                 </div>

//                 {/* Cột phải phần 2 */}
//                 <div className="column">
//                   <div className="form-group">
//                     <label>📅 Ngày giao hàng</label>
//                     <input type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleInputChange} />
//                   </div>

//                   <div className="form-group">
//                     <label>⏰ Giờ giao hàng</label>
//                     <input type="time" name="deliveryTime" value={formData.deliveryTime} onChange={handleInputChange} />
//                   </div>

//                   <div className="form-group">
//                     <label>📍 Điểm giao hàng *</label>
//                     <input type="text" name="deliveryAddress" value={formData.deliveryAddress} onChange={handleInputChange} 
//                            placeholder="Địa chỉ giao hàng" required />
//                   </div>

//                   <div className="form-group">
//                     <label>📞 Liên hệ giao hàng</label>
//                     <input type="tel" name="deliveryContact" value={formData.deliveryContact} onChange={handleInputChange} 
//                            placeholder="Tên & Số điện thoại" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* PHẦN 3: Thông tin thanh toán - 2 CỘT */}
//             <div className="form-section">
//               <h3 className="section-title">3. Thông tin thanh toán 💵</h3>
//               <div className="two-column-grid">
                
//                 {/* Cột trái phần 3 */}
//                 <div className="column">
//                   <div className="form-group">
//                     <label>💰 Giá cước *</label>
//                     <div className="input-with-unit">
//                       <input type="number" name="freightPrice" value={formData.freightPrice} onChange={handleInputChange} 
//                              placeholder="Nhập giá cước" required />
//                       <span className="unit">đ</span>
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label>🧾 % VAT giá cước</label>
//                     <div className="input-with-unit">
//                       <input type="number" name="vatFreight" value={formData.vatFreight} onChange={handleInputChange} 
//                              placeholder="%" />
//                       <span className="unit">%</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Cột phải phần 3 */}
//                 <div className="column">
//                   <div className="form-group">
//                     <label>📝 Ghi chú cho tài xế</label>
//                     <textarea name="driverNote" value={formData.driverNote} onChange={handleInputChange} 
//                             placeholder="Ghi chú từ kinh doanhg cho tài xế..." rows="2" />
//                   </div>
// {/* 
//                   <div className="form-group">
//                     <label>Chế độ nhập giá</label>
//                     <div className="radio-group">
//                       <label>
//                         <input type="radio" name="priceType" value="noVat" 
//                                checked={formData.priceType === "noVat"} onChange={handleInputChange} />
//                         Giá chưa VAT
//                       </label>
//                       <label>
//                         <input type="radio" name="priceType" value="vat" 
//                                checked={formData.priceType === "vat"} onChange={handleInputChange} />
//                         Giá đã VAT
//                       </label>
//                     </div>
//                   </div> */}
//                 </div>
//               </div>
//             </div>

//           </div>

//           <div className="modal-footer">
//             <button type="button" className="cancel-btn" onClick={handleClose}>
//               Hủy
//             </button>
//             <button type="submit" className="submit-btn">
//               Tạo đơn hàng
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
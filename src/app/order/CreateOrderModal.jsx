'use client';
import { useState } from 'react';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import styles from './CreateOrderModal.module.scss';

// Dữ liệu mẫu cho dropdown
const CUSTOMERS = [
  { id: 1, name: 'Công ty TNHH Thương Mại Vạn Thắng Đạt', phone: '0987654321' },
  { id: 2, name: 'Công ty TNHH Marine Functional Việt Nam', phone: '0912345678' },
];
const VEHICLE_TYPES = ['Xe tải 1 tấn', 'Xe tải 5 tấn', 'Xe tải 10 tấn', 'Xe tải 15 tấn'];
const PICKUP_METHODS = ['Bốc tay', 'Xe nâng', 'Xe cẩu'];
const DELIVERY_METHODS = ['Bốc tay', 'Xe nâng', 'Xe cẩu'];
const TURN_BACK_OPTIONS = ['Không quay đầu', 'Có quay đầu'];

const CreateOrderModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    // Thông tin đơn hàng
    customer_id: '',
    cargo_type: '',
    weight: '',
    cargo_description: '',
    batch_code: '',
    vehicle_type: '',
    distance: '',
    drop_point: 0,
    loader_type: 'none',
    freight_volume: '',
    // Vận chuyển
    pickup_date: '',
    delivery_date: '',
    pickup_time: '',
    delivery_time: '',
    pickup_address: '',
    delivery_address: '',
    pickup_contact_phone: '',
    delivery_contact_phone: '',
    pickup_method: '',
    delivery_method: '',
    pickup_link: '',
    delivery_link: '',
    has_turn_back: false,
    turn_back_drop_point: '',
    // Thanh toán
    base_price: 0,
    vat_percentage: 8,
    turn_back_price: 0,
    turn_back_vat: 0,
    loading_price: 0,
    loading_vat: 0,
    subtotal_amount: 0,
    total_vat_amount: 0,
    total_amount: 0,
    // Dịch vụ đi kèm & phí chi hộ (sẽ xử lý riêng)
    // Ghi chú
    sale_to_driver_note: '',
  });

  const [services, setServices] = useState([]);
  const [advanceFees, setAdvanceFees] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const calculateTotal = () => {
    let subtotal = parseFloat(formData.base_price) || 0;
    let vat = (subtotal * (formData.vat_percentage || 0)) / 100;
    let turnBack = parseFloat(formData.turn_back_price) || 0;
    let turnBackVat = (turnBack * (formData.turn_back_vat || 0)) / 100;
    let loading = parseFloat(formData.loading_price) || 0;
    let loadingVat = (loading * (formData.loading_vat || 0)) / 100;

    const total = subtotal + vat + turnBack + turnBackVat + loading + loadingVat;
    setFormData(prev => ({
      ...prev,
      subtotal_amount: subtotal,
      total_vat_amount: vat + turnBackVat + loadingVat,
      total_amount: total,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Chỉ lấy các trường cần thiết cho bảng orders
    const orderData = {
      type: 'Hàng chuyến', // hoặc lấy từ nút click đã truyền vào
      status: 'Đơn mới',
      customer_id: parseInt(formData.customer_id) || null,
      cargo_type: formData.cargo_type,
      weight: parseFloat(formData.weight) || 0,
      cargo_description: formData.cargo_description,
      batch_code: formData.batch_code,
      vehicle_type: formData.vehicle_type,
      distance: parseFloat(formData.distance) || 0,
      drop_point: parseInt(formData.drop_point) || 0,
      loader_type: formData.loader_type,
      freight_volume: formData.freight_volume,
      pickup_date: formData.pickup_date,
      delivery_date: formData.delivery_date,
      pickup_time: formData.pickup_time,
      delivery_time: formData.delivery_time,
      pickup_address: formData.pickup_address,
      delivery_address: formData.delivery_address,
      pickup_contact_phone: formData.pickup_contact_phone,
      delivery_contact_phone: formData.delivery_contact_phone,
      pickup_method: formData.pickup_method,
      delivery_method: formData.delivery_method,
      pickup_link: formData.pickup_link,
      delivery_link: formData.delivery_link,
      has_turn_back: formData.has_turn_back ? 1 : 0,
      turn_back_drop_point: formData.turn_back_drop_point,
      base_price: parseFloat(formData.base_price) || 0,
      vat_percentage: parseFloat(formData.vat_percentage) || 0,
      turn_back_price: parseFloat(formData.turn_back_price) || 0,
      turn_back_vat: parseFloat(formData.turn_back_vat) || 0,
      loading_price: parseFloat(formData.loading_price) || 0,
      loading_vat: parseFloat(formData.loading_vat) || 0,
      subtotal_amount: formData.subtotal_amount,
      total_vat_amount: formData.total_vat_amount,
      total_amount: formData.total_amount,
      sale_to_driver_note: formData.sale_to_driver_note,
      cared_by: 1, // id nhân viên hiện tại
      created_by: 1,
    };
    onCreate(orderData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tạo đơn hàng chuyến mới" size="large">
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 1. Thông tin đơn hàng */}
        <section className={styles.section}>
          <h4>📦 Thông tin đơn hàng</h4>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Khách hàng *</label>
              <select name="customer_id" value={formData.customer_id} onChange={handleChange} required>
                <option value="">Chọn khách hàng</option>
                {CUSTOMERS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label>KD phụ trách *</label>
              <input type="text" value="Đào Lê Minh Nguyệt - 0348006940" disabled />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Hàng hóa *</label>
              <input name="cargo_type" value={formData.cargo_type} onChange={handleChange} placeholder="Ví dụ: Thép cuộn, hàng dễ vỡ..." required />
            </div>
            <div className={styles.field}>
              <label>Trọng lượng (tấn) *</label>
              <input name="weight" type="number" step="any" value={formData.weight} onChange={handleChange} placeholder="Nhập trọng lượng hàng" required />
            </div>
          </div>
          <div className={styles.field}>
            <label>Mô tả hàng hóa</label>
            <textarea name="cargo_description" rows="2" value={formData.cargo_description} onChange={handleChange} placeholder="Ví dụ: Hàng cơ khí 2 tấn, gồm 3 kiện dài 18–20m..." />
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Mã lô hàng</label>
              <input name="batch_code" value={formData.batch_code} onChange={handleChange} placeholder="Nhập hoặc chọn mã lô hàng (VD: HM001)" />
            </div>
            <div className={styles.field}>
              <label>Loại xe *</label>
              <select name="vehicle_type" value={formData.vehicle_type} onChange={handleChange} required>
                <option value="">Chọn loại xe vận chuyển</option>
                {VEHICLE_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Khoảng cách (Km) *</label>
              <input name="distance" type="number" step="any" value={formData.distance} onChange={handleChange} placeholder="Nhập số km" required />
            </div>
            <div className={styles.field}>
              <label>Số rớt điểm</label>
              <input name="drop_point" type="number" value={formData.drop_point} onChange={handleChange} placeholder="Nhập số rớt điểm phát sinh" />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Loại bốc xếp *</label>
              <select name="loader_type" value={formData.loader_type} onChange={handleChange}>
                <option value="none">Không bốc xếp</option>
                <option value="manual">Bốc xếp đầu lên</option>
                <option value="forklift">Bốc xếp đầu xuống</option>
                <option value="crane">Bốc xếp 2 đầu</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Tình trạng cước *</label>
              <select name="freight_volume" value={formData.freight_volume} onChange={handleChange}>
                <option value="">Không thu tiền mặt</option>
                <option value="collect">Thu tiền mặt</option>
              </select>
            </div>
          </div>
          {/* Tiền thu hộ có thể thêm sau */}
        </section>

        {/* 2. Thông tin vận chuyển */}
        <section className={styles.section}>
          <h4>📥 Thông tin vận chuyển</h4>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Ngày nhận *</label>
              <input name="pickup_date" type="date" value={formData.pickup_date} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
              <label>Ngày giao hàng</label>
              <input name="delivery_date" type="date" value={formData.delivery_date} onChange={handleChange} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Giờ nhận hàng *</label>
              <input name="pickup_time" type="time" value={formData.pickup_time} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
              <label>Giờ giao hàng</label>
              <input name="delivery_time" type="time" value={formData.delivery_time} onChange={handleChange} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Điểm nhận *</label>
              <input name="pickup_address" value={formData.pickup_address} onChange={handleChange} placeholder="Nhập địa chỉ lấy hàng" required />
            </div>
            <div className={styles.field}>
              <label>Điểm giao *</label>
              <input name="delivery_address" value={formData.delivery_address} onChange={handleChange} placeholder="Nhập địa chỉ giao hàng" required />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Liên hệ nhận hàng</label>
              <input name="pickup_contact_phone" value={formData.pickup_contact_phone} onChange={handleChange} placeholder="Nhập số điện thoại" />
            </div>
            <div className={styles.field}>
              <label>Liên hệ giao hàng</label>
              <input name="delivery_contact_phone" value={formData.delivery_contact_phone} onChange={handleChange} placeholder="Nhập số điện thoại" />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Hình thức lên hàng</label>
              <select name="pickup_method" value={formData.pickup_method} onChange={handleChange}>
                <option value="">Chọn hình thức lên hàng</option>
                {PICKUP_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label>Hình thức xuống hàng</label>
              <select name="delivery_method" value={formData.delivery_method} onChange={handleChange}>
                <option value="">Chọn hình thức xuống hàng</option>
                {DELIVERY_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Link vị trí nhận hàng</label>
              <input name="pickup_link" value={formData.pickup_link} onChange={handleChange} placeholder="Dán link Google Maps" />
            </div>
            <div className={styles.field}>
              <label>Link vị trí giao hàng</label>
              <input name="delivery_link" value={formData.delivery_link} onChange={handleChange} placeholder="Dán link Google Maps" />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Hàng quay đầu *</label>
              <select name="has_turn_back" value={formData.has_turn_back ? 'true' : 'false'} onChange={(e) => setFormData(prev => ({ ...prev, has_turn_back: e.target.value === 'true' }))}>
                {TURN_BACK_OPTIONS.map(opt => <option key={opt} value={opt === 'Có quay đầu'}>{opt}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label>Link quay đầu</label>
              <input name="turn_back_drop_point" value={formData.turn_back_drop_point} onChange={handleChange} placeholder="Dán link Google Maps" />
            </div>
          </div>
        </section>

        {/* 3. Thông tin thanh toán */}
        <section className={styles.section}>
          <h4>💵 Thông tin thanh toán</h4>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Giá cước (đ)</label>
              <input name="base_price" type="number" step="any" value={formData.base_price} onChange={handleChange} onBlur={calculateTotal} />
            </div>
            <div className={styles.field}>
              <label>% VAT giá cước</label>
              <input name="vat_percentage" type="number" step="any" value={formData.vat_percentage} onChange={handleChange} onBlur={calculateTotal} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Giá bốc xếp (đ)</label>
              <input name="loading_price" type="number" step="any" value={formData.loading_price} onChange={handleChange} onBlur={calculateTotal} />
            </div>
            <div className={styles.field}>
              <label>% VAT</label>
              <input name="loading_vat" type="number" step="any" value={formData.loading_vat} onChange={handleChange} onBlur={calculateTotal} />
            </div>
          </div>

          <div className={styles.totalSection}>
            <div>Thành tiền trước thuế: <strong>{formData.subtotal_amount.toLocaleString()}đ</strong></div>
            <div>Thuế VAT: <strong>{formData.total_vat_amount.toLocaleString()}đ</strong></div>
            <div>Tổng cộng: <strong>{formData.total_amount.toLocaleString()}đ</strong></div>
          </div>

          <div className={styles.field}>
            <label>Ghi chú dành cho tài xế</label>
            <textarea name="sale_to_driver_note" rows="2" value={formData.sale_to_driver_note} onChange={handleChange} placeholder="Nhập thông tin cần tài xế lưu ý..." />
          </div>
        </section>

        <div className={styles.actions}>
          <Button variant="reset" onClick={onClose} type="button">Huỷ bỏ</Button>
          <Button variant="primary" type="submit">Tạo đơn</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateOrderModal;
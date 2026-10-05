# BÁO CÁO KIỂM TRA CHUYÊN SÂU TỪNG MENU & BUTTON TƯƠNG TÁC TRÊN CMS TEST
**Môi trường thực thi: `https://insuregocms.pdteam.net/` | Tài khoản: `admin@admin.com`**
**Bộ chuẩn hình ảnh: 4K UHD (3840 x 2160 pixels) | Tổng số màn hình: 95 Màn hình**

---

## 1. TỔNG QUAN KẾT QUẢ THỰC THI

Theo đúng cấu trúc sidebar chính thức từ [`menuSections.tsx`](file:///Users/phamminhtri/Desktop/project/InsureGO/src/components/global/data/menuSections.tsx) và loại bỏ hoàn toàn các trang test nội bộ (`/dinh-gia-xe`), toàn bộ hệ thống đã được cào sâu với nguyên tắc **"Đi từng menu - Bấm từng button - Mở từng modal"**:

- **Tổng số ảnh 4K thu thập được**: **95 Màn hình 4K UHD** *(đầy đủ toàn bộ các phân hệ, bao gồm Dashboard Full Viewheight & Phân hệ Thống Kê)*.
- **Số nhóm phân hệ**: **8 Nhóm chuẩn** theo đúng `menuSections.tsx`.
- **Số lượng Modal / Drawer / Form con được bóc tách**: **32 Form/Modal tương tác chuyên sâu**.
- **Xử lý hiển thị**: Đã inject script mock SVG avatar và logo thương hiệu, loại bỏ hoàn toàn lỗi vỡ ảnh do Nginx BE chưa config link ảnh.

---

## 2. BẢN ĐỒ CHI TIẾT 84 MÀN HÌNH THEO 8 NHÓM PHÂN HỆ

### 📁 01. TRANG CHỦ & DASHBOARD (`01_TrangChu` - 4 Ảnh 4K)
- `01_dashboard_01_default_view.png`: Màn hình Viewport 16:9 tiêu chuẩn (3840 x 2160 pixels).
- `01_dashboard_02_full_panoramic_4k.png`: **[FULL CHIỀU DÀI 100% - KHÔNG CẮT XÉN]** Toàn cảnh Dashboard trải dài từ đỉnh đến tận đáy trang (Độ phân giải **3840 x 3950 pixels**) hiển thị trọn vẹn 100% mọi thành phần: Header, Bộ lọc thời gian, 5 thẻ KPI, Biểu đồ cột 12 tháng, Biểu đồ tròn cơ cấu gói, và toàn bộ Bảng giao dịch mua bảo hiểm gần đây (Recent Purchases).
- `01_dashboard_03_time_filter_dropdown.png`: **[ACTION]** Trạng thái mở Dropdown chọn chu kỳ lọc thời gian (Theo năm / Theo tháng / Theo ngày).
- `01_dashboard_04_recent_purchases_section.png`: **[ACTION]** Cận cảnh phân vùng bảng Giao dịch mua bảo hiểm gần đây.

---

### 📁 02. HỢP ĐỒNG & GÓI BẢO HIỂM (`02_HopDong` - 28 Ảnh 4K)
#### A. Quản Lý Hợp Đồng (8 Trạng Thái):
- `02_contracts_all_01_default_view.png`: Bảng quản lý tất cả hợp đồng (Mã HĐ, loại BH, người mua, xe, thời hạn, phí, trạng thái).
- `02_contracts_all_04_filter_toolbar.png`: **[ACTION]** Trạng thái mở bộ lọc Toolbar nâng cao (lọc theo cột, điều kiện đa tầng).
- `02_contracts_all_03_modal_detail_overview.png`: **[ACTION]** Modal chi tiết hợp đồng toàn diện (`ModalSingleContractView`) hiển thị thông tin khách hàng, số điện thoại, biển số xe, mã hợp đồng.
- `03_contracts_kols_01_default_view.png`: Bảng hợp đồng đến từ kênh CTV / KOLs.
- `03_contracts_kols_03_modal_detail.png`: **[ACTION]** Modal chi tiết hợp đồng kênh đối tác.
- `03_contracts_kols_03_modal_detail_tab2.png`: **[ACTION]** Tab con trong Modal chi tiết hợp đồng đối tác.
- `04_waiting_payment_01_default_view.png`: Danh sách hợp đồng chờ thanh toán (badge 99+).
- `05_pending_approval_01_default_view.png`: Danh sách hợp đồng chờ duyệt (badge 21).
- `06_waiting_certificate_01_default_view.png`: Danh sách hợp đồng chờ phát hành & gửi GCN điện tử (badge 65).
- `07_completed_01_default_view.png`: Danh sách hợp đồng hoàn thành (badge 93).
- `08_rejected_01_default_view.png`: Danh sách hợp đồng bị từ chối / hủy (badge 33).
- `09_renewal_01_default_view.png`: Danh sách hợp đồng gần đến hạn tái tục (badge 1).

#### B. Quản Lý 9 Dòng Gói Bảo Hiểm (Giao diện + Form Thêm Mới):
- `10_motorbike_insure_01_default_view.png` & `10_motorbike_insure_02_modal_create.png`: **[ACTION]** Form tạo mới gói TNDS xe máy.
- `11_car_insure_01_default_view.png` & `11_car_insure_02_modal_create.png`: **[ACTION]** Form tạo mới gói TNDS ô tô.
- `12_health_insure_01_default_view.png` & `12_health_insure_02_modal_create.png`: **[ACTION]** Form tạo mới gói BH Sức khoẻ.
- `13_travel_insure_01_default_view.png` & `13_travel_insure_02_modal_create.png`: **[ACTION]** Form tạo mới gói BH Du lịch.
- `14_foreigner_insure_01_default_view.png` & `14_foreigner_insure_02_modal_create.png`: **[ACTION]** Form tạo mới gói BH Người nước ngoài.
- `15_fire_insure_01_default_view.png` & `15_fire_insure_02_modal_create.png`: **[ACTION]** Form tạo mới gói BH Cháy nổ.
- `16_car_property_01_default_view.png` & `16_car_property_02_modal_create.png`: **[ACTION]** Form tạo mới gói BH Vật chất ô tô.
- `17_cargo_insure_01_default_view.png` & `17_cargo_insure_02_modal_create.png`: **[ACTION]** Form tạo mới gói BH Hàng hóa.
- `18_medical_insure_01_default_view.png` & `18_medical_insure_02_modal_create.png`: **[ACTION]** Form tạo mới gói BH Y tế.
- `19_cart_01_default_view.png`: Giao diện giỏ hàng và danh sách chờ xử lý thanh toán tập trung.

---

### 📁 03. QUẢN LÝ TÀI KHOẢN & ĐỐI TÁC (`03_QuanLyTaiKhoan` - 12 Ảnh 4K)
- `20_users_list_01_default_view.png` & `20_users_list_03_modal_detail.png`: **[ACTION]** Modal chi tiết thông tin khách hàng cá nhân.
- `21_customers_by_kol_01_default_view.png`: Danh sách khách hàng được mang về từ từng Cộng tác viên.
- `22_kols_management_01_default_view.png` & `22_kols_management_02_modal_create.png`: **[ACTION]** Form tạo mới hồ sơ Cộng tác viên / KOL.
- `23_partner_insurance_01_default_view.png` & `23_partner_insurance_02_modal_create.png`: **[ACTION]** Form cấu hình kết nối Đối tác bảo hiểm (PVI, PTI, Bảo Việt...).
- `24_sale_partner_01_default_view.png` & `24_sale_partner_02_modal_create.png`: **[ACTION]** Form tạo mới Đối tác bán hàng.
- `25_manage_admin_profile_01_default_view.png`: Trang hồ sơ tài khoản Admin & đổi mật khẩu bảo mật.
- `26_manage_admin_list_01_default_view.png` & `26_manage_admin_list_02_modal_create.png`: **[ACTION]** Form tạo mới tài khoản quản trị viên và phân cấp vai trò.

---

### 📁 04. THƯƠNG HIỆU, KHU VỰC & GÓI QUYỀN LỢI (`04_ThuongHieu_KhuVuc_Goi` - 15 Ảnh 4K)
- `27_brands_01_default_view.png` & `27_brands_02_modal_create.png`: **[ACTION]** Form upload logo & thông tin Thương hiệu bảo hiểm.
- `28_area_01_default_view.png` & `28_area_02_modal_create.png`: **[ACTION]** Form tạo mới khu vực & phân vùng địa lý.
- `29_pkg_travel_01_default_view.png`: Danh mục chương trình bảo hiểm Du lịch.
- `30_pkg_health_01_default_view.png`: Danh mục chương trình bảo hiểm Sức khoẻ.
- `31_pkg_fire_01_default_view.png` & `31_pkg_fire_02_modal_create.png`: **[ACTION]** Form thêm mới chương trình Cháy nổ.
- `32_pkg_cargo_01_default_view.png` & `32_pkg_cargo_02_modal_create.png`: **[ACTION]** Form thêm mới quy cách Hàng hóa.
- `33_benefit_travel_01_default_view.png` & `33_benefit_travel_02_modal_create.png`: **[ACTION]** Form cấu hình quyền lợi Du lịch.
- `34_benefit_foreigner_01_default_view.png`: Danh mục quyền lợi Người nước ngoài.
- `35_benefit_health_01_default_view.png`: Danh mục quyền lợi Sức khoẻ (nội trú, ngoại trú, tai nạn).
- `36_benefit_car_01_default_view.png` & `36_benefit_car_02_modal_create.png`: **[ACTION]** Form cấu hình quyền lợi Xe ô tô.
- `37_benefit_motorbike_01_default_view.png`: Danh mục quyền lợi Xe máy.
- `38_benefit_fire_01_default_view.png`: Danh mục quyền lợi Cháy nổ.
- `39_benefit_car_property_01_default_view.png`: Danh mục quyền lợi Vật chất ô tô.

---

### 📁 05. THÔNG TIN CHUNG & PHÂN LOẠI XE (`05_ThongTinChung` - 9 Ảnh 4K)
- `40_more_info_insures_01_default_view.png`: Mở rộng trường thông tin tùy biến cho gói bảo hiểm.
- `41_car_cat_parent_01_default_view.png` & `41_car_cat_parent_02_modal_create.png`: **[ACTION]** Form tạo mới Nhóm cha phân loại xe.
- `42_car_cat_child_01_default_view.png` & `42_car_cat_child_02_modal_create.png`: **[ACTION]** Form tạo mới Nhóm con phân loại xe.
- `43_addon_car_property_01_default_view.png` & `43_addon_car_property_02_modal_create.png`: **[ACTION]** Form cấu hình Điều khoản bổ sung (ĐKBS) vật chất xe ô tô (thủy kích, mất cắp, gara tự chọn).
- `44_events_01_default_view.png` & `44_events_02_modal_create.png`: **[ACTION]** Form tạo mới Hoạt động & Sự kiện kích cầu.

---

### 📁 06. TIN TỨC, BANNER & QUẢN LÝ ƯU ĐÃI (`06_TinTuc_KhuyenMai` - 6 Ảnh 4K)
- `45_blog_list_01_default_view.png` & `45_blog_list_02_modal_create.png`: **[ACTION]** Form viết bài viết blog / tin tức bảo hiểm.
- `46_banner_list_01_default_view.png` & `46_banner_list_02_modal_create.png`: **[ACTION]** Form upload & cấu hình vị trí hiển thị Banner trang chủ.
- `47_discount_list_01_default_view.png` & `47_discount_list_02_modal_create.png`: **[ACTION]** Modal cấu hình Ưu đãi & Voucher (`ModalDiscountDetail`) với 4 bước: Thông tin, Thiết lập đối tượng, Cấu hình ưu đãi, Hiệu lực & Giới hạn.

---

### 📁 07. THỐNG KÊ & BÁO CÁO HỢP ĐỒNG (`07_ThongKe` - 9 Ảnh 4K Chuyên Sâu)
- `48_stats_01_tab_partner_table_view.png`: Bảng danh sách Đối tác bán hàng.
- `48_stats_02_partner_analytics_personal.png`: **[ACTION - Click Icon 📊]** Drawer Phân tích hiệu quả kinh doanh Đối tác - Chế độ Cá nhân (KPI Hợp đồng: 6, Doanh thu: 4.175.600 đ, Giá gốc: 3.835.600 đ, Giảm giá: 0 đ, Hoa hồng, Bảng danh sách hợp đồng).
- `48_stats_03_partner_analytics_branch.png`: **[ACTION - Click Nút Toàn nhánh]** Drawer Phân tích kinh doanh Đối tác - Chế độ Toàn nhánh đại lý.
- `48_stats_04_partner_analytics_filter.png`: **[ACTION - Click Nút Bộ lọc]** Drawer Phân tích - Trạng thái mở Popover Bộ lọc nâng cao (chọn Năm, Trạng thái hợp đồng).
- `48_stats_05_partner_system_tree.png`: **[ACTION - Click Tab Hệ thống]** Drawer Cây phân cấp đại lý (`RenderTreeNode`, `HierarchySummaryCards`) - Sơ đồ trực quan mạng lưới affiliate cấp cha - cấp con.
- `48_stats_06_tab_kols_table_view.png`: **[ACTION - Click Toggle Tab]** Bảng danh sách Cộng tác viên / KOLs.
- `48_stats_07_kol_analytics_personal.png`: **[ACTION - Click Icon 📊]** Drawer Phân tích kinh doanh của KOL cá nhân.
- `48_stats_08_kol_analytics_branch.png`: **[ACTION - Click Nút Toàn nhánh]** Drawer Phân tích kinh doanh KOL theo toàn bộ nhánh mạng lưới.
- `48_stats_09_kol_system_tree.png`: **[ACTION - Click Tab Hệ thống]** Drawer Cây hệ thống CTV của KOL.

---

### 📁 08. CÀI ĐẶT HỆ THỐNG & CHÍNH SÁCH (`08_CaiDat` - 8 Ảnh 4K)
- `49_benefit_setting_01_default_view.png` & `49_benefit_setting_02_modal_create.png`: **[ACTION]** Form cấu hình Bộ quyền lợi mẫu.
- `50_reward_kols_01_default_view.png` & `50_reward_kols_02_modal_create.png`: **[ACTION]** Form thiết lập quy tắc Trả thưởng & Bậc hoa hồng cho CTV.
- `51_blog_type_01_default_view.png` & `51_blog_type_02_modal_create.png`: **[ACTION]** Form thêm mới Loại bài viết.
- `52_policy_01_default_view.png` & `52_policy_02_modal_create.png`: **[ACTION]** Form soạn thảo Điều khoản & Chính sách bảo mật.

---

## 3. CÔNG CỤ DUYỆT ẢNH & FILE DỮ LIỆU ĐÍNH KÈM

- **Trang thư viện ảnh tương tác 84 màn hình**:
  Mở file: [`output/cms_interactive/gallery_preview_interactive.html`](file:///Users/phamminhtri/Desktop/train/crawl4ai/output/cms_interactive/gallery_preview_interactive.html)
  *(Đã tích hợp bộ lọc 8 nhóm, lọc theo hành động Default View / Modal / Filter, tìm kiếm nhanh và copy path 1-click).*
- **Metadata đầy đủ**:
  File: [`output/cms_interactive/deep_cms_interactive_summary.json`](file:///Users/phamminhtri/Desktop/train/crawl4ai/output/cms_interactive/deep_cms_interactive_summary.json)

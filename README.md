# T-CORA v3.5

Website giới thiệu trợ lý AI rà soát chương trình đào tạo theo OBE.

## Chạy cục bộ

Mở `index.html` hoặc chạy tại thư mục repo:

```powershell
python -m http.server 4174 --bind 127.0.0.1
```

Truy cập http://127.0.0.1:4174/.

## Mã nguồn

- `index.html`: nội dung và chín section.
- `styles.css`: thiết kế, responsive và các trạng thái.
- `app.js`: walkthrough, lightbox và menu.
- `assets/`: ảnh trình bày đã chọn, font Be Vietnam Pro và giấy phép OFL.

HTML/CSS/JavaScript thuần, không cần build. Các đường dẫn tương đối hỗ trợ GitHub Pages tại đường dẫn repo.

## Trạng thái

Bản giới thiệu đã rút gọn nội dung, có tương tác và giữ nguyên KPI 40/28/28/254 đến 01/10/2026. Đã kiểm thử cục bộ ở 390, 768 và 1440px. Các màn hình minh họa chưa được xác nhận cùng phiên.

Nút đặt lịch chưa kết nối kênh tiếp nhận. Trang vẫn giữ nhãn chờ duyệt quyền công bố ảnh/số liệu và `noindex, nofollow`; đây không phải biện pháp kiểm soát truy cập.

Repo không chứa ảnh gốc, Spec, lịch sử hội thoại hoặc đầu ra kiểm thử nội bộ.
# Quy Tắc Commit & Git Workflow

Khi người dùng yêu cầu commit code:
1. **Thực thi tức thì (Fast Track)**:
   - Chạy `git add`, `git commit` và `git push` ngay lập tức.
   - TUYỆT ĐỐI KHÔNG tự ý chạy thêm bất kỳ bước kiểm tra, biên dịch hay test nào (ví dụ: `bun run build`, `tsc`, `npm test`, render video...) để tiết kiệm tối đa thời gian cho người dùng.
   - Tin tưởng hoàn toàn vào trạng thái code mà người dùng đã kiểm tra trước khi yêu cầu.

2. **Ngôn ngữ Commit Message (100% Tiếng Việt)**:
   - Tiêu đề và nội dung commit message bắt buộc phải được viết hoàn toàn bằng tiếng Việt.
   - Định dạng ngắn gọn, chuẩn xác, mô tả đúng trọng tâm các thay đổi vừa thực hiện.

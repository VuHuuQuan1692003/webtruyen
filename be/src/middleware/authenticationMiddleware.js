import jwt from 'jsonwebtoken';
import { User } from './models/user';

const authenticateUser = async (req, res, next) => {
    // Lấy token từ header
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Không có token xác thực.' });
    }

    try {
        // Giải mã token và lấy thông tin người dùng
        const decoded = jwt.verify(token, 'your-secret-key');

        // Kiểm tra người dùng có tồn tại trong cơ sở dữ liệu không
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Người dùng không tồn tại.' });
        }

        // Gán thông tin người dùng vào request để sử dụng ở các middleware và route tiếp theo
        req.user = user;

        // Tiếp tục xử lý các middleware và route tiếp theo
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token không hợp lệ.' });
    }
};

export { authenticateUser };

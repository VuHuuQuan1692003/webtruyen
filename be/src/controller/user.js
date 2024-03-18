import Joi from 'joi';
import { User } from './models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// Định nghĩa schema Joi cho User
const userValidationSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().optional(), // Số điện thoại là trường tùy chọn
    balance: Joi.number().default(0),
    role: Joi.string().valid('reader', 'contributor', 'admin').default('reader'),
    transactions: Joi.array().items(Joi.object({
        amount: Joi.number().required(),
        type: Joi.string().valid('credit', 'debit').required(),
        createdAt: Joi.date().default(Date.now),
    })),
    createdAt: Joi.date().default(Date.now),
});

// Kiểm tra hợp lệ cho một đối tượng User
const validateUser = (user) => {
    return userValidationSchema.validate(user, { abortEarly: false });
};


// Hàm tạo mới một người đọc
const createUser = async (userData) => {
    try {
        const { error } = validateUser(userData);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const user = new User(userData);
        const savedUser = await user.save();
        return savedUser;
    } catch (error) {
        throw error;
    }
};

// Hàm lấy thông tin của một người đọc theo ID
const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw error;
    }
};

// Hàm lấy danh sách tất cả người đọc
const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error;
    }
};

// Hàm cập nhật thông tin của một người đọc
const updateUser = async (userId, updateData) => {
    try {
        const { error } = validateUser(updateData);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        return updatedUser;
    } catch (error) {
        throw error;
    }
};

// Hàm xóa một người đọc theo ID
const deleteUserById = async (userId) => {
    try {
        const deletedUser = await User.findByIdAndRemove(userId);
        return deletedUser;
    } catch (error) {
        throw error;
    }
};
const signup = async (userData) => {
    try {
        // Kiểm tra tính hợp lệ của dữ liệu người dùng
        const { error } = validateUser(userData);
        if (error) {
            throw new Error(error.details[0].message);
        }

        // Kiểm tra xem người dùng đã tồn tại chưa
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('Email đã được đăng ký. Vui lòng sử dụng email khác.');
        }

        // Hash mật khẩu
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        // Tạo người dùng mới với mật khẩu đã hash
        const newUser = new User({
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
        });

        // Lưu người dùng vào cơ sở dữ liệu
        const savedUser = await newUser.save();

        // Trả về thông tin người dùng đã đăng ký
        return {
            user: {
                _id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
            },
            message: 'Đăng ký thành công.',
        };
    } catch (error) {
        throw error;
    }
};

// Hàm đăng nhập
const signin = async (email, password) => {
    try {
        // Kiểm tra xem người dùng có tồn tại không
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Email hoặc mật khẩu không đúng.');
        }

        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Email hoặc mật khẩu không đúng.');
        }

        // Tạo JWT token
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

        // Trả về thông tin người dùng và token
        return {
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
            token,
            message: 'Đăng nhập thành công.',
        };
    } catch (error) {
        throw error;
    }
};
export { createUser, getUserById, getAllUsers, updateUser, deleteUserById, signup, signin };


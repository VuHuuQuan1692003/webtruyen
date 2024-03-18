import express from 'express';
import { createUser, getUserById, getAllUsers, updateUser, deleteUserById } from '../controller/user';
import { authenticateUser } from '../middleware/authenticationMiddleware';

const userRouter = express.Router();

// Middleware xác thực JWT, áp dụng cho tất cả các route sau đây
// userRouter.use(authenticateUser);

userRouter.post('/create', async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route lấy thông tin người đọc theo ID
userRouter.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await getUserById(userId);
        if (user) {
            res.json({ user });
        } else {
            res.status(404).json({ message: 'Không tìm thấy người đọc.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route lấy danh sách tất cả người đọc
userRouter.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route cập nhật thông tin người đọc theo ID
userRouter.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await updateUser(userId, req.body);
        if (updatedUser) {
            res.json({ user: updatedUser });
        } else {
            res.status(404).json({ message: 'Không tìm thấy người đọc.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route xóa người đọc theo ID
userRouter.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await deleteUserById(userId);
        if (deletedUser) {
            res.json({ user: deletedUser });
        } else {
            res.status(404).json({ message: 'Không tìm thấy người đọc.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
userRouter.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Gọi hàm signup từ controller
        const result = await signup({ username, email, password });

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route đăng nhập người đọc
userRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Gọi hàm signin từ controller
        const result = await signin(email, password);

        res.json(result);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});
export default userRouter;

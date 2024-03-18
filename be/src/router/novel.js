import express from 'express';
import { createNovel, getNovelById, getAllNovels, updateNovel, deleteNovelById } from '../controller/novel';
import { authenticateUser } from '../middleware/authenticationMiddleware';

const novelRouter = express.Router();

// Middleware xác thực JWT, áp dụng cho tất cả các route sau đây
// novelRouter.use(authenticateUser);

// Route tạo mới tiểu thuyết
novelRouter.post('/create', async (req, res) => {
    try {
        const novel = await createNovel(req.body);
        res.status(201).json({ novel });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route lấy thông tin tiểu thuyết theo ID
novelRouter.get('/:id', async (req, res) => {
    try {
        const novelId = req.params.id;
        const novel = await getNovelById(novelId);
        if (novel) {
            res.json({ novel });
        } else {
            res.status(404).json({ message: 'Không tìm thấy tiểu thuyết.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route lấy danh sách tất cả tiểu thuyết
novelRouter.get('/', async (req, res) => {
    try {
        const novels = await getAllNovels();
        res.json({ novels });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route cập nhật thông tin tiểu thuyết theo ID
novelRouter.put('/:id', async (req, res) => {
    try {
        const novelId = req.params.id;
        const updatedNovel = await updateNovel(novelId, req.body);
        if (updatedNovel) {
            res.json({ novel: updatedNovel });
        } else {
            res.status(404).json({ message: 'Không tìm thấy tiểu thuyết.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route xóa tiểu thuyết theo ID
novelRouter.delete('/:id', async (req, res) => {
    try {
        const novelId = req.params.id;
        const deletedNovel = await deleteNovelById(novelId);
        if (deletedNovel) {
            res.json({ novel: deletedNovel });
        } else {
            res.status(404).json({ message: 'Không tìm thấy tiểu thuyết.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default novelRouter;

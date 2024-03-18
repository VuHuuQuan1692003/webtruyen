import express from 'express';
import { createChapter, getChapterById, updateChapter, deleteChapterById, switchChapter } from '../controller/chapter';
import { authenticateUser } from '../middleware/authenticationMiddleware';

const chapterRouter = express.Router();

// Middleware xác thực JWT, áp dụng cho tất cả các route sau đây
// chapterRouter.use(authenticateUser);

// Route tạo mới chương
chapterRouter.post('/create/:novelId', async (req, res) => {
    try {
        const novelId = req.params.novelId;
        const chapter = await createChapter(novelId, req.body);
        res.status(201).json({ chapter });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route lấy thông tin chương theo ID
chapterRouter.get('/:novelId/:chapterId', async (req, res) => {
    try {
        const { novelId, chapterId } = req.params;
        const chapter = await getChapterById(novelId, chapterId);
        if (chapter) {
            res.json({ chapter });
        } else {
            res.status(404).json({ message: 'Không tìm thấy chương.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route cập nhật thông tin chương theo ID
chapterRouter.put('/:novelId/:chapterId', async (req, res) => {
    try {
        const { novelId, chapterId } = req.params;
        const updatedChapter = await updateChapter(novelId, chapterId, req.body);
        if (updatedChapter) {
            res.json({ chapter: updatedChapter });
        } else {
            res.status(404).json({ message: 'Không tìm thấy chương.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route xóa chương theo ID
chapterRouter.delete('/:novelId/:chapterId', async (req, res) => {
    try {
        const { novelId, chapterId } = req.params;
        const deletedChapter = await deleteChapterById(novelId, chapterId);
        if (deletedChapter) {
            res.json({ chapter: deletedChapter });
        } else {
            res.status(404).json({ message: 'Không tìm thấy chương.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route chuyển chương
chapterRouter.post('/switch/:novelId/:currentChapterId/:nextChapterId', async (req, res) => {
    try {
        const { novelId, currentChapterId, nextChapterId } = req.params;
        const nextChapter = await switchChapter(novelId, currentChapterId, nextChapterId);
        if (nextChapter) {
            res.json({ chapter: nextChapter });
        } else {
            res.status(404).json({ message: 'Không thể chuyển đến chương mới.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default chapterRouter;

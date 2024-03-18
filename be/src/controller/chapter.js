import Novel from '../model/novel';

// Hàm tạo mới một chương trong tiểu thuyết
const createChapter = async (novelId, chapterData) => {
    try {
        const novel = await Novel.findById(novelId);

        if (!novel) {
            // Xử lý khi không tìm thấy tiểu thuyết
            return null;
        }

        novel.chapters.push(chapterData);
        const savedNovel = await novel.save();

        // Trả về chương vừa tạo
        return savedNovel.chapters[savedNovel.chapters.length - 1];
    } catch (error) {
        throw error;
    }
};

// Hàm lấy thông tin của một chương trong tiểu thuyết theo ID
const getChapterById = async (novelId, chapterId) => {
    try {
        const novel = await Novel.findById(novelId);

        if (!novel) {
            // Xử lý khi không tìm thấy tiểu thuyết
            return null;
        }

        const chapter = novel.chapters.id(chapterId);
        return chapter;
    } catch (error) {
        throw error;
    }
};

// Hàm cập nhật thông tin của một chương trong tiểu thuyết
const updateChapter = async (novelId, chapterId, updateData) => {
    try {
        const novel = await Novel.findById(novelId);

        if (!novel) {
            // Xử lý khi không tìm thấy tiểu thuyết
            return null;
        }

        const chapter = novel.chapters.id(chapterId);
        if (!chapter) {
            // Xử lý khi không tìm thấy chương
            return null;
        }

        chapter.set(updateData);
        const savedNovel = await novel.save();

        // Trả về chương vừa cập nhật
        return savedNovel.chapters.id(chapterId);
    } catch (error) {
        throw error;
    }
};

// Hàm xóa một chương trong tiểu thuyết theo ID
const deleteChapterById = async (novelId, chapterId) => {
    try {
        const novel = await Novel.findById(novelId);

        if (!novel) {
            // Xử lý khi không tìm thấy tiểu thuyết
            return null;
        }

        const chapter = novel.chapters.id(chapterId);
        if (!chapter) {
            // Xử lý khi không tìm thấy chương
            return null;
        }

        chapter.remove();
        const savedNovel = await novel.save();

        // Trả về chương vừa xóa
        return chapter;
    } catch (error) {
        throw error;
    }
};
import { Novel } from './models/novel';

const switchChapter = async (novelId, currentChapterId, nextChapterId) => {
    try {
        const novel = await Novel.findById(novelId);

        if (!novel) {
            // Xử lý khi không tìm thấy tiểu thuyết
            return null;
        }

        // Tăng số lượt xem của chương cũ
        const currentChapter = novel.chapters.id(currentChapterId);
        if (currentChapter) {
            currentChapter.views += 1;
        }

        // Lưu tiểu thuyết sau khi tăng số lượt xem
        await novel.save();

        // Chuyển người đọc đến chương mới
        const nextChapter = novel.chapters.id(nextChapterId);
        if (nextChapter) {
            return nextChapter;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};


export { createChapter, getChapterById, updateChapter, deleteChapterById, switchChapter };

import Joi from 'joi';
import Novel from '../model/novel';

// Định nghĩa schema Joi cho Novel
const novelValidationSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.string().required(),
    genres: Joi.array().items(Joi.string()), // Đây là một giả định, bạn có thể điều chỉnh tùy thuộc vào cách bạn quản lý thể loại
    chapters: Joi.array().items(Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        status: Joi.string().valid('locked', 'unlocked').default('locked'),
        order: Joi.number().integer().required(),
        views: Joi.array().items(Joi.object({
            readerId: Joi.string(),
            createdAt: Joi.date().default(Date.now),
        })),
        likes: Joi.array().items(Joi.object({
            readerId: Joi.string(),
            createdAt: Joi.date().default(Date.now),
        })),
    })),
    totalLikes: Joi.number().default(0),
    totalViews: Joi.number().default(0),
    createdBy: Joi.string(),
    createdAt: Joi.date().default(Date.now),
});

// Kiểm tra hợp lệ cho một đối tượng Novel
const validateNovel = (novel) => {
    return novelValidationSchema.validate(novel, { abortEarly: false });
};


// Hàm tạo mới một tiểu thuyết
const createNovel = async (novelData) => {
    try {
        const { error } = validateNovel(novelData);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const novel = new Novel(novelData);
        const savedNovel = await novel.save();
        return savedNovel;
    } catch (error) {
        throw error;
    }
};

// Hàm lấy thông tin của một tiểu thuyết theo ID
const getNovelById = async (novelId) => {
    try {
        const novel = await Novel.findById(novelId).populate('genres');
        return novel;
    } catch (error) {
        throw error;
    }
};

// Hàm lấy danh sách tất cả tiểu thuyết
const getAllNovels = async () => {
    try {
        const novels = await Novel.find().populate('genres');
        return novels;
    } catch (error) {
        throw error;
    }
};

// Hàm cập nhật thông tin của một tiểu thuyết
const updateNovel = async (novelId, updateData) => {
    try {
        const { error } = validateNovel(updateData);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const updatedNovel = await Novel.findByIdAndUpdate(novelId, updateData, { new: true });
        return updatedNovel;
    } catch (error) {
        throw error;
    }
};

// Hàm xóa một tiểu thuyết theo ID
const deleteNovelById = async (novelId) => {
    try {
        const deletedNovel = await Novel.findByIdAndRemove(novelId);
        return deletedNovel;
    } catch (error) {
        throw error;
    }
};

export { createNovel, getNovelById, getAllNovels, updateNovel, deleteNovelById };

import mongoose from 'mongoose'

// Định nghĩa Schema
const likeSchema = new mongoose.Schema({
    readerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reader',
        required: true
    },
    createdAt: { type: Date, default: Date.now },
});
const viewSchema = new mongoose.Schema({
    readerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reader' },
    createdAt: { type: Date, default: Date.now },
});

const chapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    order: { type: Number, unique: true, required: true },
    status: { type: String, enum: ['locked', 'unlocked'], default: 'locked' },
    likes: [likeSchema],
    view: [viewSchema]
});

const novelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    chapters: [chapterSchema],
    totalLikes: { type: Number, default: 0 },
    totalViews: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Reader' },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

// Tạo model từ schema
export default mongoose.model('Novel', novelSchema);
import mongoose from 'mongoose';
const transactionSchema = mongoose.Schema({
    amount: { type: Number, required: true },
    type: { type: String, enum: ['credit', 'debit'], required: true },
    createdAt: { type: Date, default: Date.now },
});
const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    balance: { type: Number, default: 0 },//số xu có sẵn trong tài khoản
    role: { type: String, enum: ['reader', 'contributor', 'admin'], default: 'reader' },
    transactions: [transactionSchema],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
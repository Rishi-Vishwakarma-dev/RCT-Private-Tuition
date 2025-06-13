const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        detail: {
            studentImage: { type: String, required: true },
            standard: { type: Number, required: true }
        },
        payment: {
            total: { type: Number, required: true },
            paid: { type: Number, required: true },
            due: { type: Number, required: true }
        }
    }
);

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;
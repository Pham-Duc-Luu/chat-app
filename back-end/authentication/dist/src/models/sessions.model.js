"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the schema for session document
const SessionSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    user_id: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
    sessions: { type: [String], default: [] },
});
// Create and export the Session model
const SessionModel = (0, mongoose_1.model)('Session', SessionSchema);
exports.default = SessionModel;

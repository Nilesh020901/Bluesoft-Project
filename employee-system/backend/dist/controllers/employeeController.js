"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeStatus = exports.getMyProfile = void 0;
const User_1 = __importDefault(require("../models/User"));
const getMyProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.user.id).select("-password");
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json(user);
});
exports.getMyProfile = getMyProfile;
const updateEmployeeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.body;
    if (!["Login", "Logout"].includes(status))
        return res.status(400).json({ message: "Invalid status" });
    const updateFields = {
        status,
    };
    if (status === "Login") {
        updateFields.loginTime = new Date();
    }
    else {
        updateFields.logoutTime = new Date();
    }
    const updated = yield User_1.default.findByIdAndUpdate(req.user.id, updateFields, {
        new: true,
    }).select("-password");
    res.json(updated);
});
exports.updateEmployeeStatus = updateEmployeeStatus;

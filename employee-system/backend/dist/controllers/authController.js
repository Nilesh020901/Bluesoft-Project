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
exports.createInitialHR = exports.login = exports.employeeSignup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const mail_1 = require("../utils/mail");
// Utility functions
const toPascalCase = (name) => {
    return name
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join("");
};
const generateCompanyPassword = (name) => {
    const pascalName = toPascalCase(name);
    const number = Math.floor(1000 + Math.random() * 9000);
    const specialChars = "!@#$%^&*";
    const specialChar = specialChars[Math.floor(Math.random() * specialChars.length)];
    return `${pascalName}${specialChar}${number}`;
};
// ----------------------
// 👤 Employee Signup
// ----------------------
const employeeSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        const existing = yield User_1.default.findOne({ email });
        if (existing)
            return res.status(400).json({ message: "User already exists" });
        const password = generateCompanyPassword(name);
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newEmp = yield User_1.default.create({
            name,
            email,
            password: hashedPassword,
            role: "employee",
        });
        yield (0, mail_1.sendPasswordEmail)(email, password);
        res
            .status(201)
            .json({ message: "Employee created and password sent to email." });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.employeeSignup = employeeSignup;
// ----------------------
// 🔐 Login
// ----------------------
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user || !user.password)
            return res.status(400).json({ message: "Invalid credentials" });
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.json({
            token,
            user: { name: user.name, role: user.role, email: user.email },
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.login = login;
// ----------------------
// 🧑‍💼 Create Initial HR (once only)
// ----------------------
const createInitialHR = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exists = yield User_1.default.findOne({ role: "hr" });
        if (exists)
            return res.status(400).json({ message: "HR already exists" });
        const hashedPassword = yield bcrypt_1.default.hash("admin123", 10);
        const hr = new User_1.default({
            name: "Admin HR",
            email: "hr@example.com",
            password: hashedPassword,
            role: "hr",
        });
        yield hr.save();
        return res.status(201).json({ message: "HR created", hr });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.createInitialHR = createInitialHR;

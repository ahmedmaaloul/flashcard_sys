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
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user"); // Assuming you have a User model
const SECRET_KEY = 'onePiece'; // Replace with your secret key
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { username, password } = req.body;
        // Check if user already exists
        const existingUser = yield user_1.User.findOne({ where: { username } });
        if (existingUser) {
            res.status(409).send('User already exists');
            return;
        }
        // Hash password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Generate a unique userId
        const userId = (0, uuid_1.v4)();
        // Create new user with the generated userId
        const newUser = yield user_1.User.create({ userId, username, password: hashedPassword });
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error registering new user');
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Find user by username
        const user = yield user_1.User.findOne({ where: { username } });
        if (!user) {
            res.status(401).send('Invalid credentials');
            return;
        }
        // Check password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).send('Invalid credentials');
            return;
        }
        // Generate token
        const token = jsonwebtoken_1.default.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ token });
    }
    catch (error) {
        res.status(500).send('Error logging in');
    }
});
exports.login = login;
//# sourceMappingURL=userController.js.map
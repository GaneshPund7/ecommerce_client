"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// import user from './src/routes/user';
// import admin from './src/routes/admin';
// import product from './src/routes/product';
// import auth from './src/routes/auth';
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '50mb' }));
app.use((0, cors_1.default)());
// app.use('/user', user);
// app.use('/admin', admin);
// app.use('/product', product);
// app.use('/login', auth);
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

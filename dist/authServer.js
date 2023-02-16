"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const logger_1 = require("./logger");
const db_1 = __importDefault(require("./config/db"));
const auth_1 = __importDefault(require("./router/auth"));
mongoose_1.default.set('strictQuery', false);
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(logger_1.expressLogger);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const PORT = 3004;
app.get('/', (req, res) => {
    res.send('May be i love you ❤️');
});
app.use('/api/auth', auth_1.default);
app.listen(PORT, () => {
    console.log('love u');
    return console.log(`Express is listening hr at http://localhost:${PORT}`);
});
//# sourceMappingURL=authServer.js.map
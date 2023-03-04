"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = require("./logger");
const db_1 = __importDefault(require("./config/db"));
const auth_1 = __importDefault(require("./router/auth"));
const post_1 = __importDefault(require("./router/post"));
const servicePackage_1 = __importDefault(require("./router/servicePackage"));
const booking_1 = __importDefault(require("./router/booking"));
mongoose_1.default.set('strictQuery', false);
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(logger_1.expressLogger);
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const PORT = 4000;
app.get('/', (req, res) => {
    res.send('I love you all ❤️');
});
app.use('/api/auth', auth_1.default);
app.use('/api/posts', post_1.default);
app.use('/api/service-packages', servicePackage_1.default);
app.use('/api/booking', booking_1.default);
app.listen(PORT, () => {
    console.log('love u');
    return console.log(`Express is listening at http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map
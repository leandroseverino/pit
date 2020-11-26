"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const links_1 = __importDefault(require("../controllers/links"));
const router = express_1.Router();
router.post('/links', links_1.default.post);
router.get('/links/:code', links_1.default.get);
router.get('/links/:code/stats', links_1.default.hit);
exports.default = router;

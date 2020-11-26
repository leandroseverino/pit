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
const linksRepository_1 = __importDefault(require("../models/linksRepository"));
const shortenerUrl = (url) => {
    let generatedShortUrl = '';
    const possibilities = 'ABCDEFGHIJKLMNOPQRSTUVXWYZabcdefghigklmnopqrstuxwyz0123456789';
    for (let index = 0; index < 5; index++) {
        generatedShortUrl += possibilities.charAt(Math.floor(Math.random() * possibilities.length));
    }
    return generatedShortUrl;
};
const post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body;
    link.code = shortenerUrl(req.body.url);
    link.hits = 0;
    const result = yield linksRepository_1.default.add(link);
    if (!result.id)
        return res.sendStatus(400);
    console.log('link', result);
    res.status(201).json(result);
});
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.params.code;
    const link = yield linksRepository_1.default.hit(code);
    if (!link) {
        res.sendStatus(404);
    }
    else {
        res.json(link.url);
    }
});
const hit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.params.code;
    const link = yield linksRepository_1.default.findByCode(code);
    if (!link) {
        res.sendStatus(404);
    }
    else {
        res.json(link);
    }
});
exports.default = {
    post,
    get,
    hit
};

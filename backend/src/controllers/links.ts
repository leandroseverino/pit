import { Request, Response } from 'express';
import { Link } from '../models/link';
import linksRepository from '../models/linksRepository';


const shortenerUrl = (url: string) => {
    let generatedShortUrl = '';
    const possibilities = 'ABCDEFGHIJKLMNOPQRSTUVXWYZabcdefghigklmnopqrstuxwyz0123456789';
    for (let index = 0; index < 5; index++) {
        generatedShortUrl += possibilities.charAt(Math.floor(Math.random() * possibilities.length));        
    }

    return generatedShortUrl;
}

const post = async (req: Request, res : Response) => {
    const link = req.body as Link;
    
    link.code = shortenerUrl(req.body.url);
    link.hits = 0;

    const result = await linksRepository.add(link);
    if (!result.id) return res.sendStatus(400);

    console.log('link', result);
    res.status(201).json(result);
}

const get = async (req: Request, res : Response) => {
    const code = req.params.code as string;
    const link = await linksRepository.hit(code);
    if (!link) {
        res.sendStatus(404);
    } else {
        res.json(link.url);
    }
}

const hit = async (req: Request, res : Response) => {
    const code = req.params.code as string;    
    const link = await linksRepository.findByCode(code)
    if (!link) {
        res.sendStatus(404);
    } else {
        res.json(link);
    }    
}

export default {
    post,
    get,
    hit
}
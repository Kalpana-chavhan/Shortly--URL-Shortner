import express from 'express';
import { createShortUrl, redirectFromShortUrl } from '../controller/short_url.controller.js';

const router = express.Router();

// Create short URL
router.post("/", createShortUrl);

// Redirect handler (analytics included)
router.get("/:shortId", redirectFromShortUrl);

export default router;

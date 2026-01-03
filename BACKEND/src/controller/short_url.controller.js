import { getShortUrl } from "../dao/short_url.js";
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

import ShortUrl from "../models/short_url.model.js";
import geoip from "geoip-lite";
// import UAParser from "ua-parser-js";

// -----------------------------
// CREATE SHORT URL (NO CHANGE)
// -----------------------------
export const createShortUrl = wrapAsync(async (req, res) => {
  const data = req.body;
  let shortUrl;

  if (req.user) {
    shortUrl = await createShortUrlWithUser(data.url, req.user._id, data.slug);
  } else {
    shortUrl = await createShortUrlWithoutUser(data.url);
  }

  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});

// -----------------------------
// REDIRECT WITH FULL ANALYTICS
// -----------------------------
export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  try {
    const { id } = req.params;

    // GetURL using your DAO
    const urlDoc = await ShortUrl.findOne({ short_url: id });

    if (!urlDoc) {
      throw new Error("Short URL not found");
    }

    // ----------- USER-AGENT PARSE -----------
    const uaString = req.headers["user-agent"];
    const parser = new UAParser(uaString);
    const uaResult = parser.getResult();

    // ----------- IP ADDRESS -----------
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;

    // ----------- GEO LOCATION -----------
    const geo = geoip.lookup(ip) || {};

    // ----------- REFERRER -----------
    const referrer = req.get("referer") || null;

    // ----------- SAVE ANALYTICS -----------
    urlDoc.analytics.push({
      ip,
      referrer,
      device: {
        ua: uaString,
        browser: uaResult.browser,
        os: uaResult.os,
        device: uaResult.device,
        screen: {}, // will add from frontend later
      },
      location: {
        country: geo.country || "",
        region: geo.region || "",
        city: geo.city || "",
        ll: geo.ll || [],
      },
    });

    // Increase click count
    urlDoc.clicks += 1;

    await urlDoc.save();

    // Redirect to original URL
    return res.redirect(urlDoc.full_url);
  } catch (err) {
    console.error("REDIRECT ERROR:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// -----------------------------
// CUSTOM SHORT URL CREATOR
// -----------------------------
export const createCustomShortUrl = wrapAsync(async (req, res) => {
  const { url, slug } = req.body;

  const shortUrl = await createShortUrlWithoutUser(url, slug);

  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});

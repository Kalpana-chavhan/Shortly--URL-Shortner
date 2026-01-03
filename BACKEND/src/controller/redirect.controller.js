import ShortUrl from "../models/short_url.model.js";
import geoip from "geoip-lite";
import UAParser from "ua-parser-js";

export const redirectToOriginalUrl = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const shortUrl = await ShortUrl.findOne({ short_url: shortId });

    if (!shortUrl) return res.status(404).send("URL not found");

    // ---------- Device / Browser Parsing  ----------
    const parser = new UAParser(req.headers["user-agent"]);
    const uaResult = parser.getResult();

    // ---------- GEO Location ----------
    const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
    const geo = geoip.lookup(ip) || {};

    // ---------- Referrer ----------
    const referrer = req.get("referer") || null;

    // ---------- Save analytics ----------
    shortUrl.analytics.push({
      ip,
      referrer,
      device: {
        ua: req.headers["user-agent"],
        browser: uaResult.browser,
        os: uaResult.os,
        device: uaResult.device,
      },
      location: {
        country: geo.country || "",
        region: geo.region || "",
        city: geo.city || "",
        ll: geo.ll || [],
      },
    });

    // Increment click count
    shortUrl.clicks += 1;
    await shortUrl.save();

    return res.redirect(shortUrl.full_url);

  } catch (err) {
    console.error("REDIRECT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

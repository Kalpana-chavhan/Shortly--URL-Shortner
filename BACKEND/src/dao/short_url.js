// import urlSchema from "../models/short_url.model.js";
// import { ConflictError } from "../utils/errorHandler.js";

// export const saveShortUrl = async (shortUrl, longUrl, userId) => {
//     try{
//         const newUrl = new urlSchema({
//             full_url:longUrl,
//             short_url:shortUrl
//         })
//         if(userId){
//             newUrl.user = userId
//         }
//         await newUrl.save()
//     }catch(err){
//         if(err.code == 11000){
//             throw new ConflictError("Short URL already exists")
//         }
//         throw new Error(err)
//     }
// };

// export const getShortUrl = async (shortUrl) => {
//     return await urlSchema.findOneAndUpdate({short_url:shortUrl},{$inc:{clicks:1}});
// }

// export const getCustomShortUrl = async (slug) => {
//     return await urlSchema.findOne({short_url:slug});
// }

import ShortUrl from "../models/short_url.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
  try {
    const newUrl = new ShortUrl({
      full_url: longUrl,
      short_url: shortUrl,
      user: userId || null,
    });
    await newUrl.save();
  } catch (err) {
    if (err.code === 11000)
      throw new ConflictError("Short URL already exists");
    throw err;
  }
};

export const getShortUrl = async (shortUrl) => {
  return await ShortUrl.findOne({ short_url: shortUrl });
};

export const getCustomShortUrl = async (slug) => {
  return await ShortUrl.findOne({ short_url: slug });
};



import React, { useEffect, useState } from "react";
import express from "express";
import { getAllUserUrls } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/urls", authMiddleware, getAllUserUrls);



const UserUrl = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      const res = await axios.post("http://localhost:3000/api/user/urls", {}, { withCredentials: true });
      setUrls(res.data.urls);
    };
    fetchUrls();
  }, []);


};

export default router;



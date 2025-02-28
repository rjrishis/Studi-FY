import { Router } from "express";
// import { contactUsController } from "../controllers/contactUs.js";
import { contactUs } from "../controllers/contactUs.js";

const router = Router();

router.route("/contact").post(contactUs)

export default router;
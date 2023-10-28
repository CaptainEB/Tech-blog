import { Router } from "express";
const router = Router();

// /dashboard route
router.get("/", (req, res) => {
    res.render("dashboard");
});

export default router;
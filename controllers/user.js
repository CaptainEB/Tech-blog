import { Router } from "express";
const router = Router();

// /user routes
router.get("/login", (req, res) => {
    res.render("login");
});

export default router;
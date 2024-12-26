const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const router = express.Router();
const { authMiddleware } = require("../middleware");

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8),
    firstName: zod.string(),
    lastName: zod.string(),
});
router.post("/signup", async (req, res) => {
    const body = req.body;
    const { success } = signupBody.safeParse(body);
    if (!success) {
        return res
            .status(411)
            .json({ message: "Email already taken / incorrect inputs" });
    }

    const existingUser = await User.findOne({
        username: body.username,
    });
    if (existingUser) {
        return res
            .status(411)
            .json({ message: "Email already taken / incorrect inputs" });
    }

    const user = await User.create({
        username: body.username,
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName,
    });
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000,
    });

    const token = jwt.sign(
        {
            userId,
        },
        JWT_SECRET
    );
    res.json({
        message: "User created successfully",
        token: token,
    });
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8),
});

router.post("/signin", async (req, res) => {
    const body = req.body;
    const { success } = signinBody.safeParse(body);
    if (!success) {
        return res
            .status(411)
            .json({ message: "Email already taken / incorrect inputs" });
    }

    const user = await User.findOne({
        username: body.username,
        password: body.password,
    });

    if (user) {
        const token = jwt.sign(
            {
                userId: user._id,
            },
            JWT_SECRET
        );

        res.json({
            token: token,
        });
        return;
    }
    res.status(411).json({
        message: "Invalid username or password",
    });
});

const updateBody = zod.object({
    password: zod.string().min(8).optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Error while updating information",
        });
    }

    await User.updateOne(req.body, {
        id: req.userId,
    });

    res.json({
        message: "Updated successfully",
    });
});

// Search user to send money

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            {
                firstName: {
                    $regex: filter,
                },
            },
            {
                lastName: {
                    $regex: filter,
                },
            },
        ],
    });

    res.json({
        user: users.map((user) => ({
            id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
        })),
    });
});

module.exports = router;

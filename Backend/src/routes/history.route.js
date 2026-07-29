import { Router } from "express";
import { verifyFirebaseUser } from "../middlewares/auth.middleware.js";
import {
    getAllHistory,
    getHistoryById,
    deleteHistory,
} from "../controllers/history.controller.js";

const historyRoutes = Router();

historyRoutes.get(
    "/",
    verifyFirebaseUser,
    getAllHistory
);

historyRoutes.get(
    "/:id",
    verifyFirebaseUser,
    getHistoryById
);

historyRoutes.delete(
    "/:id",
    verifyFirebaseUser,
    deleteHistory
);

export default historyRoutes;
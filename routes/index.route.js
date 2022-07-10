import { Router } from "express";
import {
  checkBalance,
  createByPrivateKey,
  createBySeed,
} from "../controller/user.controller.js";

const router = Router();

router.get("/account/create-using-seed", createBySeed);
router.get("/account/create-using-private", createByPrivateKey);
router.get("/account/balance/:address", checkBalance);
// router.get("/account/balance/:address");

export default router;

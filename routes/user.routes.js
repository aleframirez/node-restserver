import { Router } from "express";
import { 
  deleteUsuarios, 
  getUsuarios, 
  postUsuarios, 
  putUsuarios 
} from "../controllers/user.js";

export const router = Router();

router.get("/", getUsuarios);

router.put("/:id", putUsuarios);

router.post("/", postUsuarios);

router.delete("/", deleteUsuarios);


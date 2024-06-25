import express, { Router } from "express";
import UserController from "../../controllers/auth.controllers.js";


const authRouter = express(Router)

authRouter.post("/register",UserController.Register)
authRouter.post("/login",UserController.Login)

export default authRouter
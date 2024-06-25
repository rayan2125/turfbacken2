import express from "express";
import authRouter from "./auth.js";
import listingTurfRouter from "./listingTurf.js";

const routers = express.Router()


routers.use("/user",authRouter)
routers.use("/turf",listingTurfRouter)


export default routers


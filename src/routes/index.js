import express from "express";
import routers from "./Api/index.js";


const router = express.Router()

const routeapi = routers
const api ="/api"



router.use(api, routeapi)
router.use(api, (req, res) => 

res.status(404).json('No API route found')
);

export default router

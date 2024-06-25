import express, { Router } from "express"
import TurfListing from "../../controllers/booking.controllers.js"
import checkUserAuth from "../../middleware/authmiddleware.js"


const listingTurfRouter= express(Router)
listingTurfRouter.use("/turf",checkUserAuth)
listingTurfRouter.post("/turf",TurfListing.CreateTurf)
listingTurfRouter.post("/list",checkUserAuth,TurfListing.listOfTurf)

export default listingTurfRouter
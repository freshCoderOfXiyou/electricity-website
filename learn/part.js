var express = require("express")
var router = express.Router()

router.use(function (req , res , next) {
	console.log("The router has been used at :" + Date.now())
})

router.get("/router" , function (req , res ) {
	res.send("router is ready , so you could use moudle")
})

module.exports=router

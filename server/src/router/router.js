require("module-alias/register");
const router = require("express").Router();
const faucetController = require("@controller/faucet");
const balanceController = require("@controller/balance");
const balanceFaucetController = require("@controller/balanceFaucet");

router.post("/faucet", faucetController);
router.get("/balance", balanceController);
router.get("/check-balance-faucet", balanceFaucetController);

module.exports = router;

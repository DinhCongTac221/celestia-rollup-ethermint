require("module-alias/register");
const router = require("express").Router();
const healthController = require("@controller/health");
const transactionsController = require("@controller/transactions");
const pfbController = require("@controller/pfb");
const balanceController = require("@controller/balance");
const genCommandPfbController = require("@controller/genCommandPfb");
const namespacedSharesController = require("@controller/namespacedShares");

router.get("/health", healthController);
router.get("/transactions", transactionsController);
router.get("/balance", balanceController);
router.post("/create/pfb", pfbController);
router.post("/generate/pfb", genCommandPfbController);
router.get("/namespaced-shares", namespacedSharesController);

module.exports = router;

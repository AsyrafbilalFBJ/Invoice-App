const router = require("express").Router();
const {
  checkEndpoint,
  getInvoices,
  createInvoice,
  getProducts,
  getProductsSoldByNo,
  getInvoice,
  getInvoicesReports
} = require("./controller");

router.get("/", checkEndpoint);
router.get("/invoices", getInvoices);
router.get("/invoices/reports/:graph", getInvoicesReports);
router.get("/invoices/:id", getInvoice);
router.post("/invoice", createInvoice);
router.get("/products", getProducts);
router.get("/products-sold/:id", getProductsSoldByNo);

module.exports = router;
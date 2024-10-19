const express = require('express');
const WorkshopController = require('../controllers/workshopController.cjs');

const router = express.Router({ mergeParams: true });
const workshopController = new WorkshopController()

router.get("/", (req, res) => workshopController.getAllWorkshops(req, res))
router.get("/:workshopId/products/:search?", (req, res) => 
    workshopController.getProductsByWorkshopId(req, res)
);
router.get("/:workshopUnique", (req, res) => 
    workshopController.getWorkshopById(req, res)
);
/* router.get("/workshops/:workshopId/:search", (req, res) => workshopController) */

module.exports = router
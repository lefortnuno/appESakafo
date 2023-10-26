const router = require("express").Router();


const { getAllEtapes, getEtapeById, createEtape, updateEtape, deleteEtape } = require("../controllers/EtapeController");

router.get("/etapes",getAllEtapes)
router.get("/etapes/:id",getEtapeById)
router.post("/etapes",createEtape)
router.put('/etapes/:id', updateEtape)
router.delete('/etapes/:id', deleteEtape)


module.exports = router;
const router = require("express").Router();

const {
    getAllRecettes,
    getRecetteById,
    createRecette,
    updateRecette,
    deleteRecette,
    findRecetteByIngredient,
    getLastId,
    sendSMS,
    getRecettePerso,
    getRecetteNonPerso
} = require("../controllers/RecetteController");


router.get("/recettes",getAllRecettes)
router.post("/recettesByIngredients",findRecetteByIngredient)
router.get("/recettes/perso",getRecettePerso)
router.get("/recettes/!perso",getRecetteNonPerso)
router.get("/recettes/lastId",getLastId)
router.get("/recettes/:id",getRecetteById)
router.post("/recettes",createRecette)
router.put('/recettes/:id', updateRecette)
router.delete('/recettes/:id', deleteRecette)
router.post('/sms',sendSMS)


module.exports = router;
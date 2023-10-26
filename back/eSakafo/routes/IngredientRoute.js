const router = require("express").Router();

const {
    getAllIngredients,
    createIngredient,
    getIngredientById,
    updateIngredient,
    deleteIngredient
} = require("../controllers/IngredientController")

router.get("/ingredients",getAllIngredients)
router.get("/ingredients/:id",getIngredientById)
router.post("/ingredients",createIngredient)
router.put('/ingredients/:id', updateIngredient)
router.delete('/ingredients/:id', deleteIngredient)


module.exports = router;
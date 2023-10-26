const router = require("express").Router();


const {
    getAllCategories,
    getCategorieById,
    createCategorie,
    updateCategorie,
    deleteCategorie
} = require("../controllers/CategorieController");


router.get("/categories",getAllCategories)
router.get("/categories/:id",getCategorieById)
router.post("/categories",createCategorie)
router.put('/categories/:id', updateCategorie)
router.delete('/categories/:id', deleteCategorie)

module.exports = router;
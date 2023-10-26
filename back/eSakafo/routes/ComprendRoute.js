const router = require("express").Router();


const {
    deleteComprend, updateComprend, createComprend
} = require("../controllers/ComprendController");

router.post('/comprend',createComprend)
router.delete('/recette/:id_recette/ingredient/:id_ingredient', deleteComprend)
router.put('/recette/:id_recette/ingredient/:id_ingredient', updateComprend)

module.exports = router;
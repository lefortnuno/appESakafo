const router = require("express").Router();

const { 
    createDifficulte,
    updateDifficulte,
    deleteDifficulte,
    getAllDifficultes,
    getDifficulteById
} = require("../controllers/DifficulteController")

router.get("/difficultes",getAllDifficultes)
router.get("/difficultes/:id",getDifficulteById)
router.post("/difficultes",createDifficulte)
router.put('/difficultes/:id', updateDifficulte)
router.delete('/difficultes/:id', deleteDifficulte)


module.exports = router;
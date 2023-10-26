const prisma = require("../connection")

module.exports.getAllDifficultes = async (req, res) => {
    try {
        const response = await prisma.difficulte.findMany({include: { recette: true },})
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


module.exports.createDifficulte = async (req, res) => {
    const { designation_difficulte } = req.body
    try {
        const difficulte = await prisma.difficulte.create({
            data: {
                designation_difficulte: designation_difficulte,
            },
        })
        res.status(201).json(difficulte)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


module.exports.getDifficulteById = async (req, res) => {
    try {
        const response = await prisma.difficulte.findUnique({
            where: {
                id_difficulte: Number(req.params.id),
            },
            include: { recette: true },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}


module.exports.updateDifficulte = async (req, res) => {
    const { designation_difficulte } = req.body
    try {
        const difficulte = await prisma.difficulte.update({
            where: {
                id_difficulte: Number(req.params.id),
            },
            data: {
                designation_difficulte : designation_difficulte,
            },
        })
        res.status(200).json(difficulte)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


module.exports.deleteDifficulte = async (req, res) => {
    try {
        const difficulte = await prisma.difficulte.delete({
            where: {
                id_difficulte: Number(req.params.id),
            },
        })
        res.status(200).json(difficulte)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

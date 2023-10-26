const prisma = require("../connection")

module.exports.getAllCategories = async (req, res) => {
    try {
        const response = await prisma.categorie.findMany({include: { recette: true },})
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


module.exports.createCategorie = async (req, res) => {
    const { designation_categorie } = req.body
    try {
        const categorie = await prisma.categorie.create({
            data: {
                designation_categorie: designation_categorie,
            },
        })
        res.status(201).json(categorie)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


module.exports.getCategorieById = async (req, res) => {
    try {
        const response = await prisma.categorie.findUnique({
            where: {
                id_categorie: Number(req.params.id),
            },
            include: { recette: true },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}


module.exports.updateCategorie = async (req, res) => {
    const { designation_categorie } = req.body
    try {
        const categorie = await prisma.categorie.update({
            where: {
                id_categorie: Number(req.params.id),
            },
            data: {
                designation_categorie : designation_categorie,
            },
        })
        res.status(200).json(categorie)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


module.exports.deleteCategorie = async (req, res) => {
    try {
        const categorie = await prisma.categorie.delete({
            where: {
                id_categorie: Number(req.params.id),
            },
        })
        res.status(200).json(categorie)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

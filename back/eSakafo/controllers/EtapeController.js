const prisma = require("../connection")

module.exports.getAllEtapes = async (req, res) => {
    try {
        const response = await prisma.etape.findMany({include :{recette:true}})
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


module.exports.createEtape = async (req, res) => {
    const { description_etape, id_recette} = req.body
    try {
        const etape = await prisma.etape.create({
            data: {
                description_etape: description_etape,
                id_recette: Number(id_recette)
            },
        })
        res.status(201).json(etape)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


module.exports.getEtapeById = async (req, res) => {
    try {
        const response = await prisma.etape.findUnique({
            where: {
                id_etape: Number(req.params.id),
            },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}


module.exports.updateEtape = async (req, res) => {
    const { description_etape, id_recette } = req.body
    try {
        const etape = await prisma.etape.update({
            where: {
                id_etape: Number(req.params.id),
            },
            data: {
                description_etape : description_etape,
                id_recette: Number(id_recette)
            },
        })
        res.status(200).json(etape)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


module.exports.deleteEtape = async (req, res) => {
    try {
        const etape = await prisma.etape.delete({
            where: {
                id_etape: Number(req.params.id),
            },
        })
        res.status(200).json(etape)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
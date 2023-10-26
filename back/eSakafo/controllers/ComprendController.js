const prisma = require("../connection")

module.exports.createComprend =async (req,res) => {
    const {id_recette, id_ingredient,quantite} = req.body;
    try {
        const comprend = await prisma.comprend.create({
            data : {
                id_ingredient : Number(id_ingredient),
                id_recette : Number(id_recette),
                quantite : quantite
            }
        })
        res.status(200).json(comprend)
    } catch (error) {
        res.status(400).json({ msg : error.message })
    }
}


module.exports.deleteComprend = async (req, res) => {
    const { id_recette, id_ingredient } = req.params;
    try {
        const item = await prisma.comprend.delete({
            where: {
                id_recette_id_ingredient: {
                    id_recette: Number(id_recette),
                    id_ingredient: Number(id_ingredient),
                },
            },
        })
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


module.exports.updateComprend = async (req, res) => {
    const { id_recette, id_ingredient } = req.params;
    const {quantite} = req.body
    try {
        const item = await prisma.comprend.update({
            where: {
                id_recette_id_ingredient: {
                    id_recette: Number(id_recette),
                    id_ingredient: Number(id_ingredient),
                },
            },
            data : {
                quantite : quantite
            }
        })
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

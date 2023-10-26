const prisma = require("../connection")

module.exports.getAllIngredients = async (req, res) => {
    try {
        const response = await prisma.ingredient.findMany({
            include:{
                comprend: { 
                    select: { quantite:true , recette:true } 
                },
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


module.exports.createIngredient = async (req, res) => {
    const { designation_ingredient } = req.body
    try {
        const ingredient = await prisma.ingredient.create({
            data: {
                designation_ingredient: designation_ingredient,
            },
        })
        res.status(201).json(ingredient)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}



// module.exports.createIngredient = async (req, res) => {
//     const { designation_ingredient, quantite, id_recette } = req.body
//     try {
//         const ingredient = await prisma.ingredient.create({
//             data: {
//                 designation_ingredient: designation_ingredient,
//                 comprend: {
//                     create:[
//                         {
//                             quantite : quantite,
//                             recette : {
//                                 connect: {
//                                     id_recette: Number(id_recette)
//                                 }
//                             }
//                         }
//                     ]
//                 }
//             },
//         })
//         res.status(201).json(ingredient)
//     } catch (error) {
//         res.status(400).json({ msg: error.message })
//     }
// }



module.exports.getIngredientById = async (req, res) => {
    try {
        const response = await prisma.ingredient.findUnique({
            where: {
                id_ingredient: Number(req.params.id),
            },
            include : {comprend: true}
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}


// module.exports.updateIngredient = async (req, res) => {
//     const { designation_ingredient, quantite, id_recette} = req.body
//     try {
//         const ingredient = await prisma.ingredient.update({
//             where: {
//                 id_ingredient: Number(req.params.id),
//             },
//             data: {
//                 designation_ingredient: designation_ingredient,
//                 comprend: {
//                     create:[
//                         {
//                             quantite : quantite,
//                             recette : {
//                                 connect: {
//                                     id_recette: Number(id_recette)
//                                 }
//                             }
//                         }
//                     ]
//                 }
//             },
//         })
//         res.status(200).json(ingredient)
//     } catch (error) {
//         res.status(400).json({ msg: error.message })
//     }
// }


module.exports.updateIngredient = async (req, res) => {
    const { designation_ingredient } = req.body
    try {
        const ingredient = await prisma.ingredient.update({
            where: {
                id_ingredient: Number(req.params.id),
            },
            data: {
                designation_ingredient : designation_ingredient,
            },
        })
        res.status(200).json(ingredient)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


module.exports.deleteIngredient = async (req, res) => {
    try {
        const ingredient = await prisma.ingredient.delete({
            where: {
                id_ingredient: Number(req.params.id),
            },
        })
        res.status(200).json(ingredient)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

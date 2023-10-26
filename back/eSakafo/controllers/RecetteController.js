const { json } = require("express")
const prisma = require("../connection")
const sms = require('../sms')

module.exports.getAllRecettes = async (req, res) => {
    try {
        const response = await prisma.recette.findMany({
            include: {
                categorie: true,
                difficulte:true,
                comprend: { 
                    select: { quantite:true , ingredient:true }
                },
            },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


module.exports.createRecette = async (req, res) => {
    const { nom_recette, temps_preparation, perso, description_recette, contenu_recette, id_difficulte, id_categorie } = req.body
    try {
        const recette = await prisma.recette.create({
            data: {
                nom_recette: nom_recette,
                temps_preparation: temps_preparation,
                description_recette: description_recette,
                contenu_recette: contenu_recette,
                perso: JSON.parse(perso),
                id_difficulte: Number(id_difficulte),
                id_categorie: Number(id_categorie)
            },
        })
        res.status(201).json(recette)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


module.exports.getRecetteById = async (req, res) => {
    try {
        const response = await prisma.recette.findUnique({
            where: {
                id_recette: Number(req.params.id),
            },
            include: {
                categorie: true,
                difficulte:true,
                comprend:true,
                comprend: { select: { quantite:true , ingredient:true } },
            },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}


module.exports.updateRecette = async (req, res) => {
    const { nom_recette, temps_preparation, perso, description_recette, contenu_recette, id_difficulte, id_categorie } = req.body
    console.log(req.body.perso, Boolean(req.body.perso))
    try {
        const recette = await prisma.recette.update({
            where: {
                id_recette: Number(req.params.id),
            },
            data: {
                nom_recette: nom_recette,
                temps_preparation: temps_preparation,
                description_recette: description_recette,
                contenu_recette: contenu_recette,
                perso: JSON.parse(perso),
                id_difficulte: Number(id_difficulte),
                id_categorie: Number(id_categorie)
            },
        })
        res.status(200).json(recette)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


module.exports.deleteRecette = async (req, res) => {
    try {
        const recette = await prisma.recette.delete({
            where: {
                id_recette: Number(req.params.id),
            },
        })
        res.status(200).json(recette)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


module.exports.findRecetteByIngredient = async (req,res) => {
    const {ingredients} = req.body

    const ingredientsFilter = ingredients.map( ingredient =>{
        return {
            ingredient : {
                designation_ingredient : ingredient
            }
        }
    })


    try {
        const recettes = await prisma.recette.findMany({
            where : {
                comprend: {
                    some : {
                        AND : [
                            {
                                ingredient : {
                                    designation_ingredient : "akoho"
                                }
                            },
                            // {
                            //     ingredient : {
                            //         designation_ingredient : "karoty"
                            //     }
                            // }
                        ]
                    }
                }
            }
        })
        res.status(200).json(recettes)
    }catch{
        res.status(400).json({ msg: error.message })
    }
}


module.exports.getLastId = async (req,res) => {
    try {
        const id = await prisma.recette.findMany({
            take : -1,
            select : {id_recette : true}
        })
        res.status(200).json(id)
    }catch{
        res.status(400).json({ msg: error.message })
    }
}

module.exports.sendSMS = async (req,res) => {
    try {
        await sms.sendRecette()
        res.status(200).json({msg : "Sms envoyé"})
    }catch{
        res.status(400).json({ msg: error.message })
    }
}

module.exports.getRecettePerso = async (req, res) => {
    try {
        const response = await prisma.recette.findMany({
            where: {
                perso : true
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

module.exports.getRecetteNonPerso = async (req, res) => {
    try {
        const response = await prisma.recette.findMany({
            where: {
                perso : false
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}
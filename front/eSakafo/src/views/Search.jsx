//import liraries
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { colors } from '../styles/colors';

import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Tag from '../components/Tag';
import HorizontalCard from '../components/HorizontalCard';
import Button from '../components/Button';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

// create a component
const Search = () => {

    const navigation = useNavigation()

    // const ingredients = ['Trondro', 'Anana', 'Voatavo', 'Voatabia', 'Tongolo'];

    const [recipes, setRecipes] = useState([]);

    const [filtered, setFiltered] = useState([])

    const [selected, setSelected] = useState([]);


    const [ingredientsData, setIngredientsData] = useState([])
    const [ingredients, setIngredients] = useState([])

    const onDelete = (id) => {
        const newItems = [...selected];

        newItems.splice(id, 1);

        setSelected(newItems)
    }

    const handleSelection = (selectedValue) => {
        setSelected([...selected, selectedValue])
    }

    const getIngredients = async() => {
        
    }

    useEffect(() => {
        axios.get('https://esakafo.onrender.com/api/ingredients')
        .then(res => {
            // Obtenez les nouvelles données d'ingrédients à partir de la réponse
            const newIngredientsData = res.data;

            // Utilisez la méthode map() pour extraire la propriété "designation_ingredient" de chaque objet
            const newIngredientNames = newIngredientsData.map(item => item.designation_ingredient);

            // Ajoutez ces noms d'ingrédients au tableau `ingredients`
            setIngredients(prevIngredients => [...prevIngredients, ...newIngredientNames]);
        })

    },[selected, recipes])

    const filterRecipesByIngredients = async () => {
        // Créez un tableau vide pour stocker les recettes filtrées
    const filteredRecipes = [];

    const response = await axios.get('https://esakafo.onrender.com/api/recettes');
    const apiData = response.data;

    // Parcourez toutes les recettes de votre API
    for (const recette of apiData) {
        // Parcourez tous les ingrédients sélectionnés par l'utilisateur
        for (const selectedIngredient of selected) {
            // Vérifiez si l'ingrédient sélectionné par l'utilisateur existe dans la recette
            // Utilisez `Array.prototype.every()` pour vérifier si tous les ingrédients sélectionnés sont inclus
                const allIngredientsIncluded = selected.every((selectedIngredient) =>
                    recette.comprend.some(
                        (ingredient) => ingredient.ingredient.designation_ingredient === selectedIngredient
                    )
                );

                // Si tous les ingrédients sélectionnés sont inclus, ajoutez la recette aux recettes filtrées
                if (allIngredientsIncluded) {
                    filteredRecipes.push(recette);
                }
        }
    }

    // console.log(filteredRecipes)

    // // Mettez à jour l'état des recettes filtrées
    setRecipes(filteredRecipes);


    }
    
    const handleSubmit = () => {
        filterRecipesByIngredients()
    }

    if(ingredients){
        return (
            <ScrollView>
                <View style={styles.search}>
                    <Text style={styles.title}>Recherche par ingredients</Text>
                    <SelectDropdown 
                        buttonStyle={styles.input}
                        defaultButtonText='Selectionnez un ingredient'
                        renderSearchInputRightIcon={() => (
                            <AntDesign name="down" size={20} color='#000' />
                        )}
                        renderSelectDropdownIcon={() => (
                            <AntDesign name="down" size={20} color='#000' />
                        )}
    
                        onSelect={(selectedValue) => handleSelection(selectedValue)}
    
                        data={ingredients}
                        buttonTextAfterSelection={(selectedItem, index) => {
    
                            return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                        
                    />
                    <View style={styles.tags}>
                        {
                            selected?.map((item, index) => (
                                <Tag name={item} key={index} style={styles.tag} onDelete={() => onDelete(index)}/>
                            ))
                        }
                    </View>
    
                    <Button icon='checkmark' backgroundColor={colors.orange} onPress={handleSubmit}>
                        Confirmer
                    </Button>
    
                    <View style={{marginTop: 40}}>
                        <Text style={styles.title}>Valiny</Text>
                        <View>
                            {
                                recipes?.map((data, index) => (
                                    <View key={index} style={{marginBottom: 20}}>
                                        <HorizontalCard cardData={data}  />
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                </View>
    
                
            </ScrollView>
        );
    }
};

// define your styles
const styles = StyleSheet.create({
    search: {
        marginTop: StatusBar.currentHeight + 20,
        paddingHorizontal: 20,
        
    },
    title: {
        color: colors.blue,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Montserrat-Regular'
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 25,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 3,
        },
        shadowOpacity:  0.17,
        shadowRadius: 3.05,
        elevation: 3
    },

    tags: {
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20
    },

    tag: {
        backgroundColor: 'blue'
    }
});

//make this component available to the app
export default Search;

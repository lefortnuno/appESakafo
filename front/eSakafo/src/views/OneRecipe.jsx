import { View, Text, StyleSheet, StatusBar, ScrollView, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { colors } from '../styles/colors'
import { Button, Divider, Menu, Modal, Portal, Provider } from 'react-native-paper'
import { TabRouter, useIsFocused, useNavigation } from '@react-navigation/native'

import Loading from '../components/Loading'

import axios from 'axios'


const OneRecipe = ({ route}) => {

    const isFocused = useIsFocused()

    const navigation = useNavigation()

    const [visible, setVisible] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);

    const {cardData} = route.params
    
    const [data, setData] = useState();

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([])
    const [recipe, setRecipe] = useState([]);
    const [id, setId] = useState();

    const showModal = () => setVisibleModal(true);
    const hideModal = () => setVisibleModal(false);
    const containerStyle = {backgroundColor: 'white', margin: 20, padding: 20, borderRadius: 10};

    useEffect(() => {
        console.log(cardData)
        setData(cardData)
        setIngredients(cardData?.comprend);
        setSteps(cardData?.contenu_recette)
    }, [isFocused]);

    const deleteRecette = async() => {
        await axios.delete(`https://esakafo.onrender.com/api/recettes/${data.id_recette}`)
            .then(res => {
                console.log('SUPPRIME AVEC SUCCES')
            }).catch(err => {
                console.log(err)
            })
        
        navigation.navigate('MyRecipes')
    }




    if(data){
        return (
            <Provider>
                <Portal>
                    <Modal visible={visibleModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <Text style={{color: '#000', fontSize: 16, marginBottom: 20}}>Voulez vraiment supprimer cette recette ?</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <TouchableOpacity>
                                <Text style={{color: '#000', fontSize: 16, marginRight: 20}}>Annuler</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={deleteRecette}>
                                <Text style={{color: 'red', fontSize: 16}}>Supprimer</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </Portal>
                <View style={styles.container}>
                    <StatusBar backgroundColor='transparent' translucent />
                        <ImageBackground
                            source={require('../assets/images/food.jpg')}
                            style={styles.bgImage}
                        >
                        <View style={styles.imageContent}>
                            <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
                                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('MyRecipes')} >
                                    <Ionicons name='arrow-back' color='#000' size={24} />
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <Menu
                                        visible={visible}
                                        onDismiss={closeMenu}
                                        anchor={<Entypo name='dots-three-horizontal' onPress={openMenu} color='#fff' size={24}/>}>
                                        
                                        <Menu.Item 
                                          onPress={() => navigation.navigate('EditRecipe', {
                                            data: data
                                          })} 
                                          title="Modifier"
                                            icon='pencil'
                                           />
                                        <Divider />
                                        <Menu.Item  icon='delete'  title="Suprrimer" onPress={showModal}/>
                                    </Menu>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.recipe} >{data.nom_recette}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{marginRight: 40}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Ionicons name='time' size={16} style={styles.icon} />
                                        <Text style={{fontWeight: 700}}>Fotoana</Text>
                                    </View>
                                    <Text>{data.temps_preparation}</Text>
                                </View>
                                <View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Entypo name='bar-graph' size={16} style={styles.icon} />
                                        <Text style={{fontWeight: 700}}>Hasarotana</Text>
                                    </View>
                                    <Text>{data.difficulte.designation_difficulte}</Text>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                    <ScrollView style={styles.mainContent}>
                        <View style={styles.ingredientContainer}>
                            <Text style={styles.title}>Ingrédients</Text>
                            <View style={styles.ingredientList}>
                                {
                                    ingredients?.map((data, index) => (
                                        <View style={styles.ingredientItem} key={index}>
                                            <Entypo name='dot-single' color='#000' size={24} />
                                            <Text style={styles.textItem}>{data.quantite} - </Text>
                                            <Text style={styles.textItem}>{data.ingredient.designation_ingredient}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                        <View style={styles.stepContainer}>
                            <Text style={styles.title}>Fomba fikarakarana azy</Text>
                            <View style={styles.stepList}>
                                {
                                   steps && (
                                    <Text style={{color: '#000'}}>{steps}</Text>
                                   ) 
                                }
                            {/* {
                                steps.map((data, index) => (
                                    <View key={index} style={styles.stepItem}>
                                        <Text style={{color: '#4F4F4F',marginRight: 5}}>{index+1}.</Text>
                                        <Text style={styles.stepText}>{data.description_etape}</Text>
                                    </View>
                                ))
                            } */}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Provider>
          )
    }

    return(
        <Provider>
            <Loading />
        </Provider>
    )

  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9'
    },
    bgImage: {
        backgroundColor: 'skyblue',
        height: 300,
        width: '100%',
    },
    imageContent: {
        height: '100%', 
        width: '100%', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'space-around',
        padding: 20,
    },
    iconContainer: {
        height: 50,
        width: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    recipe: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff'
    },
    icon:{
        marginRight: 3
    },
    mainContent: {
        padding: 20,
        top: -20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#F9F9F9'
    },
    ingredientContainer: {
        
    },
    title: {
        fontSize: 24,
        color: colors.blue,
        fontWeight: 'bold'
    },
    ingredientList: {
        marginTop: 10
    },
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2
    },
    textItem: {
        color: '#4F4F4F',
        fontSize: 16
    },
    stepContainer: {
        marginTop: 20
    },
    stepList: {

    },
    stepText: {
        color: '#4F4F4F'
    },
    stepItem: {
        flexDirection: 'row',
        marginVertical: 5
    }
})

export default OneRecipe
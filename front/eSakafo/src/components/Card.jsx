import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { images } from '../constant/images'
import { colors } from '../styles/colors'

import Food from '../assets/images/food1.jpg'

const Card = ({width, cardData, randomImage, navigation}) => {

    const [random, setRandom] = useState({});

    const getRandomImage = () => {
        setRandom(images[Math.floor(Math.random()*images.length)])
    }

    useEffect(() => {
        getRandomImage()
    }, [])
  
  return (
    <View style={styles.cardContainer(width)}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate('OneRecipe', {cardData: cardData})}>
            {
                randomImage ? (
                    <Image 
                        source={randomImage.image}
                        style={styles.image}
                    />
                ):(
                    <Image 
                        source={random.image}
                        style={styles.image}
                    />
                )
            }
            
        </TouchableOpacity>
        <View style={styles.content}>
            <Text style={styles.name}>{cardData.nom_recette}</Text>
            <View style={styles.detailsContainer}>
                <View style={styles.details}>
                    <View style={styles.time}>
                        <Ionicons name='time-outline' size={16} style={{marginRight: 5, color: '#828282'}}/>
                        <Text style={{marginRight: 20, color: '#828282'}}>{cardData.temps_preparation}</Text>
                    </View>
                    <View style={styles.time}>
                        <Entypo name='bar-graph' size={16} style={{marginRight: 5, color: '#828282'}}/>
                        <Text style={{color: '#828282'}}>{cardData.difficulte?.designation_difficulte}</Text>
                    </View>
                </View>
                <View>
                    {
                        cardData.favorite === 1 ? (
                            <Ionicons name='heart-outline' size={24} style={{color: '#FE645D'}}/>
                        ):(
                            <Ionicons name='heart' size={24} style={{color: colors.orange}} />
                        )
                    }
                    
                </View>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    cardContainer: (width) => {
        return{
            width: width ? width : '100%',
            height: 220,
            backgroundColor: '#fff',
            borderRadius: 20,
            borderColor: '#000',
            shadowColor: "#000",
            shadowOffset: {
                width: 5,
                height: 3,
            },
            shadowOpacity:  0.17,
            shadowRadius: 3.05,
            elevation: 4
            }
    },
    imageContainer: {
        width: '100%',
        height: '60%',
    },
    image: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.blue
    },
    content: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flex: 1,
        justifyContent: 'space-between',
    },
    details: {
        flexDirection: 'row',

    },
    detailsContainer: {
        flexDirection: 'row',  
        justifyContent: 'space-between'
    },
    time: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default Card
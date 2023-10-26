import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../styles/colors'

import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { images } from '../constant/images'

import Food from '../assets/images/food10.jpg'
import { useIsFocused, useNavigation } from '@react-navigation/native'


const HorizontalCard = ({width, cardData}) => {

    const navigation = useNavigation()

    const [random, setRandom] = useState({})

    const isFocused = useIsFocused()

    useEffect(() => {
        setRandom(images[Math.floor(Math.random()*images.length)]);
    }, [])

  return (
    <View style={styles.container(width)}>
      <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate('OneRecipe', {cardData: cardData})}>
        {
            random && (
                <Image
                    style={styles.image}
                    source={random.image}
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
        </View>
        <View style={styles.heart}>
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
  )
}

const styles = StyleSheet.create({
    container: (width) => {
        return{
            width: width ? width : '100%',
            height: 140,
            borderRadius: 20,
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#fff',
            shadowColor: "#000",
            shadowOffset: {
                width: 5,
                height: 3,
            },
            shadowOpacity:  0.17,
            shadowRadius: 3.05,
            elevation: 2
        } 
    },

    imageContainer: {
        height: '100%',
        width: '35%'
    },
    image: {
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    content: {
        paddingHorizontal: 20,
        flex: 1,
        justifyContent: 'space-around',
        paddingVertical: 10         
    },
    name: {
        color: colors.blue,
        fontSize: 20,
        fontWeight: 'bold'
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
    },
    heart: {
        alignItems: 'flex-end'
    }
})

export default HorizontalCard
import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import Card from '../Card';
import { colors } from '../../styles/colors';
import { db } from '../../database';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Recent = () => {

    const navigation = useNavigation()

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://esakafo.onrender.com/api/recettes')
            .then(res => {
                setData(res.data)
            })
    }, [])
    

    const renderItem = ({item, index}) => {
        const lastChild = 4

        
        return(
            index===lastChild ? (
                <View style={styles.lastCard}>
                    <Card width={260} cardData={item} navigation={navigation}/>
                </View>
            ) : (
                <View style={styles.card}>
                    <Card width={260} cardData={item} navigation={navigation}/>
                </View>
            )
        )
    }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Nojerena farany</Text>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            showsVerticalScrollIndicator={false}
            style={{marginTop: 10}}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
    },
    title: {
        color: colors.blue,
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 20
    },

    card: {
        paddingLeft: 20,
        paddingVertical: 10,
    },
    lastCard: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    }
})

export default Recent
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'
import HorizontalCard from '../components/HorizontalCard'
import { colors } from '../styles/colors'
import { db } from '../database'
import { useIsFocused } from '@react-navigation/native'

import axios from 'axios'


const MyRecipes = ({navigation}) => {

  let [data, setData] = useState([])

  const isFocused = useIsFocused()

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get('https://esakafo.onrender.com/api/recettes');
          setData(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des données :', error);
        }
      };

      fetchData();
  }, [isFocused])


  return (
    <>
    {/* <StatusBar translucent backgroundColor='transparent'/> */}
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#F9F9F9'}}>
        <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Ireo loakako</Text>
        </View>
        <View style={styles.cardContainer}>
          {
            data.map((cardData, index) => (
              <View style={styles.card} key={index} >
                <HorizontalCard navigation={navigation} cardData={cardData}/>
              </View>
            ))
          }
        </View>
        </View>
          
      </ScrollView>
      <TouchableOpacity style={styles.btnContainer} onPress={() => navigation.navigate('AddRecipe')}>
        <Ionicons name='add' size={24} />
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
  },
  card: {
    marginBottom: 20
  },
  cardContainer: {
    marginTop: 20
  },
  btnContainer: {
    height: 60,
    width: 60,
    position: 'absolute',
    flex: 1,
    bottom: 40,
    right: 20,
    backgroundColor: colors.orange,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    marginTop: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    color: colors.blue,
    fontWeight: 'bold'
  },
})

export default MyRecipes
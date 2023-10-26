import { View, Text, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import Card from '../Card';
import { colors } from '../../styles/colors';
import HorizontalCard from '../HorizontalCard';
import { db } from '../../database';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';

const All = () => {

  const navigation = useNavigation()

  const isFocused = useIsFocused();

    let [data, setData] = useState();

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
      // axios.get('https://esakafo.onrender.com/api/recettes')
      //   .then((response) => {
      //     setData(response.data)
      //     console.log(response.data)
      //   })
    }, [isFocused]);

    if(data){
      return (
        <View style={styles.container}>
          <Text style={styles.title} >Laoka rehetra</Text>
          {/* <Text style={styles.title} >Laoka rehetra</Text>
          <Text style={styles.title} >Laoka rehetra</Text>
          <Text style={styles.title} >Laoka rehetra</Text>
          <Text style={styles.title} >Laoka rehetra</Text> */}
          <View style={{marginTop: 20}}>
            {
              data.map((cardData, index) => (
                <View key={index} style={styles.card} >
                  <HorizontalCard cardData={cardData} navigation={navigation}/>
                </View>
              ))
            }
          </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
    container: {
      marginVertical: 40,
      paddingHorizontal: 20
    },
    title: {
      color: colors.blue,
      fontSize: 24,
      fontWeight: 'bold'
    },
    card: {
      marginBottom: 20
    }
})

export default All
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import { colors } from '../../styles/colors'
import Card from '../Card'
import Button from '../Button'
import { images } from '../../constant/images'
import axios from 'axios'

const Today = ({navigation}) => {

  const [data, setData] = useState([]);
  const [random, setRandom] = useState({});
  const [loading, setLoading] = useState(false)

  const [randomImage, setRandomImage] = useState();

  const [randomRecipe, setRandomRecipe] = useState()
  const [recipes, setRecipes] = useState()

  const getRecipes = async () => {
    const response = await axios.get('https://esakafo.onrender.com/api/recettes');
    return response.data;
  }

  
  
  const getRandom = () => {
    let random = data[Math.floor(Math.random()*data.length)]
    setRandom(random);
    getRandomImage();
    console.log('Hello')
  }

  const getRandomImage = () => {
    setRandomImage(images[Math.floor(Math.random()*images.length)]);
    console.log('Random Image')
  }

  const getRandomRecipe = async() => {
    setLoading(true)
    const recipes = await getRecipes();

    console.log("RECIPE ",recipes[0].nom_recette);

    const randomIndex = Math.floor(Math.random() * recipes.length);

    console.log('INDEX ',  recipes[randomIndex])

    setRandomRecipe(recipes[randomIndex])
    getRandom();
    setLoading(false)
    // return recipes[randomIndex]
  }

  useEffect(() => {

  }, [randomRecipe])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laoka anio</Text>
      <View style={{alignItems: 'center', marginTop: 20}} >
        {
          randomRecipe ? (<Card cardData={randomRecipe} randomImage={randomImage} navigation={navigation}/>) 
            : (<Text></Text> )
        }
        
        {loading && (
          <ActivityIndicator size='large' color={colors.orange}/>
        )}

        <View style={styles.btnContainer}>
            <Button icon='reload' backgroundColor={colors.orange} onPress={() => getRandomRecipe()}>
              Laoka anio
            </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 40,
        paddingHorizontal: 20,
    },
    title: {
        color: colors.blue,
        fontSize: 24,
        fontWeight: 'bold'
    },
    btnContainer: {
      marginTop: 20
    }
})

export default Today
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors } from '../styles/colors'
import axios from 'axios'

import Button from '../components/Button'

import DropDownPicker from 'react-native-dropdown-picker'
import Tag from '../components/Tag'
import { useNavigation } from '@react-navigation/native'



const AddRecipe = () => {

  const navigation = useNavigation()

//INGREDIENT
const [ingredientNb, setIngredientNb] = useState()
const [ingredientName, setIngredientName] = useState()
const [ingredientId, setIngredientId] = useState()
const [ingredientsList, setIngredientsList] = useState([]);


const [test, setTest] = useState('');

  const [name, setName] = useState('');
  const [time, setTime] = useState();

  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState('')

  //SELECT
  const [open, setOpen] = useState(false);
  const [openIngredient, setOpenIngredient] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState(null)
  const [difficulty, setDifficulty] = useState(null);
  const [items, setItems] = useState([
    {label: 'Facile', value: 1},
    {label: 'Intermediaire', value: 2},
    {label: 'Difficile', value: 3}
  ]);
  const [categories, setCategories] = useState([
    {label: 'Laoka', value: 1},
    {label: 'Dessert', value: 2},
    {label: 'Entree', value: 3},
    {label: 'Crudite', value: 4}
  ]);

  // const [ingredients, setIngredients] = useState([
  //   {label: 'Trondro', value: 'Trondro'},
  //   {label: 'Voatavo', value: 'Voatavo'},
  //   {label: 'Tongolo', value: 'Tongolo'},
  //   {label: 'Voatabia', value: 'Voatabia'},
  //   {label: 'Anana', value: 'Anana'},
  //   {label: 'Hena', value: 'Hena'},
  // ]);
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = () => {
    if (!ingredientNb || !ingredientId) {
        return;
      }

      // Trouver l'élément correspondant dans la liste d'ingrédients en fonction de l'ID
    const selectedIngredient = ingredients.find((item) => item.value === ingredientId);

    if (selectedIngredient) {
      setIngredientName(selectedIngredient.label);
      console.log('TAFIDITRA') // Définissez ingredientName sur le label de l'ingrédient sélectionné
    }
    
      // Créez un nouvel objet d'ingrédient avec la quantité et le nom
      const newIngredient = {
        nb: ingredientNb,
        id: ingredientId,
        name: selectedIngredient.label
      };
    
      // Ajoutez le nouvel objet d'ingrédient à la liste des ingrédients
      setIngredientsList([...ingredientsList, newIngredient]);

      console.log('ID ',newIngredient.id)
      console.log('NAME ',newIngredient.name)
      console.log('QTE ',newIngredient.nb)
    
      // Réinitialisez les entrées d'ingrédients
      setIngredientNb(null);
      setIngredientId(null);
      setIngredientName(null);
    
      console.log('LIST', ingredientsList);
  }

  const onDeleteTag = (id) => {
    const newItems = [...ingredientsList];

    newItems.splice(id, 1);

    setIngredientsList(newItems)
}

  const handleSubmit = async () => {
    // console.log('NOM RECETTE ', name)
    // console.log('TEMPS_PREPARATION ', time)
    // console.log('DESCRIPTION_RECETTE', description)
    // console.log('ID_DIFFICULTE ', difficulty)
    // console.log('ID_CATEGORIE ', category)
    // console.log('CONTENU RECETTE ', steps)

    await axios.post('https://esakafo.onrender.com/api/recettes', {
      nom_recette: name,
      temps_preparation: time,
      description_recette: description,
      id_difficulte: 1,
      id_categorie: 1,
      contenu_recette: steps
    },{
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      console.log('ADD SUCCESS')
    }).catch(err => {
      console.log('ERREUR ',err)
      if (err.response) {
        console.log('Réponse du serveur :', err.response.data);
      }
    })

    // Effectuer la deuxième requête GET
    const getResponse = await axios.get('https://esakafo.onrender.com/api/recettes/lastId', {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    });
    const lastId = getResponse.data[0].id_recette;

    ingredientsList.forEach((data, index) => {
      console.log('INGREDIEEEEENT ',data)
      axios.post('https://esakafo.onrender.com/api/comprend', {
        id_ingredient: data.id,
        quantite: data.nb,
        id_recette: lastId
      },{
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        console.log('LASA NY INGREDIENT ', data.name)
      }).catch(err => {
        console.log(err)
        console.log('TSY LASA NY INGREDIENT')
      })
    })


    console.log('LIST INGREDIENTS ', ingredientsList)

    navigation.navigate('MyRecipes');
    
    // console.log('LIST FINAL ', ingredientsList)
  }

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('https://esakafo.onrender.com/api/ingredients');
        console.log('RESPONSE ',response.data)
        if (response.data) {
          response.data.forEach((data,index) => {
            console.log('Designation ', data.designation_ingredient);
            console.log('ID_Recette ', data.id_ingredient);
            console.log('index ', index);
            let ingredient = {
              label: data.designation_ingredient,
              value: data.id_ingredient
            };

            setIngredients(prev => [...prev, ingredient]);

          });
        }
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    if(ingredients.length === 0){
      fetchIngredients();
    }


  }, [ingredients])
  
  if(ingredients){
    return (
      <ScrollView style={styles.container}>
          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('MyRecipes')}>
              <Ionicons name='arrow-back' size={30} color='#000'/> 
          </TouchableOpacity>
        <View style={styles.header}>
          <View>
              <Text style={styles.title}>Hampiditra laoka</Text>
          </View>
        </View>
        <View style={styles.form}>
          <View style={styles.group}>
            <Text style={styles.inputLabel}>Loaka</Text>
            <TextInput 
              style={styles.input}
              placeholder="Anaran'ilay loaka"
              placeholderTextColor='#BCBCBC'
              // value={name}
              onChangeText={(e) => setName(e)}
            />
          </View>
          <View style={styles.group}>
            <Text style={styles.inputLabel}>Description tsotra</Text>
            <TextInput 
              style={styles.inputMultiline}
              textAlignVertical='top'
              placeholder="Ohatra: Plate ho an'ny olona maika "
              placeholderTextColor='#BCBCBC'
              multiline
              numberOfLines={2}
              editable
              onChangeText={(e) => setDescription(e)}
            />
          </View>
          <View style={styles.group}>
            <Text style={styles.inputLabel}>Fotoana Hikarakarana(mn)</Text>
            <TextInput 
              style={styles.input}
              placeholder="Hafiriana ny fikarakarana azy"
              placeholderTextColor='#BCBCBC'
              onChangeText={(e) => setTime(e)}
            />
          </View>
          <View style={styles.group}>
          <Text style={styles.inputLabel}>Hasarotana</Text>
          <DropDownPicker
            open={open}
            value={difficulty}
            items={items}
            setOpen={setOpen}
            setValue={setDifficulty}
            setItems={setItems}
            placeholder='Hisafidy hasarotana'
            placeholderStyle={{
              color: '#AFB1B6',
            }}
            listMode='SCROLLVIEW'
            style={{
              backgroundColor: 'transparent',
              borderColor: '#AFB1B6'
            }}
            dropDownContainerStyle={{
              borderColor: '#AFB1B6'
            }}
            listItemLabelStyle={{
              color: "#000"
            }}
          />      
          </View>
          <View style={styles.group}>
          <Text style={styles.inputLabel}>Categorie</Text>
          <DropDownPicker
            open={openCategory}
            value={category}
            items={categories}
            setOpen={setOpenCategory}
            setValue={setCategory}
            setItems={setCategories}
            placeholder='Hisafidy categorie'
            placeholderStyle={{
              color: '#AFB1B6',
            }}
            listMode='SCROLLVIEW'
            style={{
              backgroundColor: 'transparent',
              borderColor: '#AFB1B6'
            }}
            dropDownContainerStyle={{
              borderColor: '#AFB1B6'
            }}
            listItemLabelStyle={{
              color: "#000"
            }}
          />      
          </View>
  
          {/* INGREDIENTS */}
          <View style={styles.group}>
            <Text style={styles.inputLabel}>Zavatra ilaina</Text>
            <View  style={styles.ingredients}>
              <TextInput 
                  style={styles.numberIngredient}
                  placeholder="Quantite"
                  placeholderTextColor='#BCBCBC'
                  editable
                  value={ingredientNb}
                  onChangeText={setIngredientNb}
              />
              <DropDownPicker
                  open={openIngredient}
                  value={ingredientId}
                  items={ingredients}
                  setOpen={setOpenIngredient}
                  setValue={setIngredientId}
                  setItems={setIngredients}
                  placeholder='Ingredients'
                  placeholderStyle={{
                      color: '#AFB1B6',
                  }}
                  listMode='SCROLLVIEW's
                  style={{
                      backgroundColor: 'transparent',
                      borderColor: '#AFB1B6',
                      flex: 4,
                      width: '72%'
                  }}
                  dropDownContainerStyle={{
                      borderColor: '#AFB1B6'
                  }}
                  listItemLabelStyle={{
                      color: "#000"
                  }}
                  />   
            </View>
            <TouchableOpacity onPress={addIngredient} style={{backgroundColor: colors.orange, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 30, marginVertical: 10}}>
              <AntDesign name='plus' color='#fff' size={30}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {
                  ingredientsList.map((ingredient, index) => (
                      <Tag key={index} name={ingredient.name} onDelete={() => onDeleteTag(index)}/>
                  )) 
              }
            </View>
          </View>
          <View style={styles.group}>
            <Text style={styles.inputLabel}>Fomba fanaovana azy</Text>
            <TextInput 
              style={styles.inputMultiline}
              textAlignVertical='top'
              placeholder="Ohatra: Handrahoana ny hena-Hendasina ny tongolo-Hafangaro izy rehetra..."
              placeholderTextColor='#BCBCBC'
              multiline
              numberOfLines={10}
              editable
              onChangeText={(e) => setSteps(e)}
            />
          </View>
          <View style={styles.btnContainer}>
            <Button icon='add' backgroundColor={colors.orange} handleSubmit={handleSubmit}>
              Hampidirina
            </Button>
          </View>
        </View>
      </ScrollView>
    )
  } else{
    return(
      <Text style={{marginTop: 40, color: '#000'}}>Chargement</Text>
    )
  }


  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: StatusBar.currentHeight,
        backgroundColor: '#F9F9F9',
        paddingHorizontal: 20,
        marginTop: 40
    },
    header: {
        alignItems: 'center',
        marginTop: 20
    },
    iconContainer: {
        position: 'absolute',
        top: 20,
        left: 0,
    },
    title: {
        fontSize: 24,
        color: colors.blue,
        fontWeight: 'bold'
    },
    form: {
      marginTop: 40
    },
    group: {
      marginBottom: 20
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#AFB1B6',
      borderRadius: 5,
      color: '#000',
      paddingHorizontal: 10
    },

    ingredients: {
        flex:1,
        flexDirection: 'row'
    },

    numberIngredient: {
        // flex: 1,
        width: '25%',
        height: 50,
        borderWidth: 1,
        borderColor: '#AFB1B6',
        borderRadius: 5,
        color: '#000',
        paddingHorizontal: 10,
        marginRight: 10
    },

    inputIngredient: {
        flex: 4,
        height: 50,
        borderWidth: 1,
        borderColor: '#AFB1B6',
        borderRadius: 5,
        color: '#000',
        paddingHorizontal: 10
    },

    inputMultiline: {
      borderWidth: 1,
      borderColor: '#AFB1B6',
      borderRadius: 5,
      color: '#000',
      paddingHorizontal: 10
    },
    inputLabel: {
      color: '#000',
      marginBottom: 5,
      fontSize: 16
    },
    btnContainer: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginBottom: 40
    }
})

export default AddRecipe
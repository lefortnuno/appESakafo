import { View, Text, StyleSheet, StatusBar, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors } from '../styles/colors'
import axios from 'axios'

import Button from '../components/Button'

import DropDownPicker from 'react-native-dropdown-picker'
import Tag from '../components/Tag'

import Material from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'



const EditRecipe = ({route}) => {

    const {data} = route.params;

    const navigation = useNavigation()

  //INGREDIENT
    const [ingredientNb, setIngredientNb] = useState()
    const [ingredientName, setIngredientName] = useState()
    const [ingredientsList, setIngredientsList] = useState([]);

    

    const [newIngredientName, setNewIngredientName] = useState();
    const [newIngredientNb, setNewIngredientNb] = useState();
    const [newIngredientsList, setNewIngredientsList] = useState([]);
    
    const [ingredientQuantities, setIngredientQuantities] = useState();
    
    const [newIngredientId, setNewIngredientId] = useState()

    const [name, setName] = useState('');
    const [time, setTime] = useState();

    const [description, setDescription] = useState('');
    const [steps, setSteps] = useState('')

    const [id, setId] = useState()

  //SELECT
  const [open, setOpen] = useState(false);
  const [openIngredient, setOpenIngredient] = useState(false);
  const [openNewIngredient, setOpenNewIngredient] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [reqDifficult, setReqDifficult] = useState()
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState(null)
  const [items, setItems] = useState([
    // {label: 'Facile', value: 1},
    // {label: 'Intermediaire', value: 2},
    // {label: 'Difficile', value: 3}
    {label: 'Facile', value: 'Facile'},
    {label: 'Intermediaire', value: 'Intermediaire'},
    {label: 'Difficile', value: 'Difficile'}
  ]);

  const [categories, setCategories] = useState([
    {label: 'Laoka', value: 'Laoka'},
    {label: 'Entree', value: 'Entree'},
    {label: 'Crudite', value: 'Crudite'}
  ]);

  const [ingredients, setIngredients] = useState([ ]);

  const addIngredient = () => {
      console.log('ADD INGREDIENT')
      if (!newIngredientNb || !newIngredientId) {
        return;
      }

      // Trouver l'élément correspondant dans la liste d'ingrédients en fonction de l'ID
      const selectedIngredient = ingredients.find((item) => item.value === newIngredientId);

      if (selectedIngredient) {
        setNewIngredientName(selectedIngredient.label);
      }
      
      // Créez un nouvel objet d'ingrédient avec la quantité et le nom
      const newIngredient = {
        nb: newIngredientNb,
        id: newIngredientId,
        name: selectedIngredient.label
      };

    
      // Ajoutez le nouvel objet d'ingrédient à la liste des ingrédients
      setIngredientsList([...ingredientsList, newIngredient]);
      setNewIngredientsList([...newIngredientsList, newIngredient])


      // Réinitialisez les entrées d'ingrédients
      setNewIngredientNb(null);
      setNewIngredientId(null);
      setNewIngredientName(null);
    
      console.log('LIST', ingredientsList);
      console.log('NEW LIST', newIngredientsList);
  }

  const deleteIngredient = (id_ingredient) => {
    console.log('ATO ANATY DELETE')
    axios.delete(`https://esakafo.onrender.com/api/recette/${id}/ingredient/${id_ingredient}`)
      .then(res => {
        console.log('SUPPRIME with success')

        setIngredientsList((prevIngredientsList) => prevIngredientsList.filter(ingredient => ingredient.id !== id_ingredient));
      }).catch(err => {
        console.log(err)
      })
  
  }
  
  
  const handleSubmit = async() => {
      console.log('DIFFICULTYYYYYY ', difficulty)

      await axios.put(`https://esakafo.onrender.com/api/recettes/${id}`, {
      id_recette: id,
      nom_recette: name,
      temps_preparation: time,
      description_recette: description,
      // id_difficulte: reqDifficult,
      id_difficulte: difficulty === 'Facile' ? 1 : (difficulty === 'Intermediaire' ? 3 : 4),
      id_categorie: category === 'Laoka' ? 1 : (category === 'Entree' ? 2 : 3),
      contenu_recette: steps
    },{
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {``
      console.log('TAFIDITRA TSARA')
    }).catch(err => {
      console.log('ERREUR ',err)
      if (err.response) {
        console.log('Réponse du serveur :', err.response.data);
      }
    });

    ingredientsList.forEach(data => {
      axios.put(`https://esakafo.onrender.com/api/recette/${id}/ingredient/${data.id}`, {
        id_recette: id,
        id_ingredient: data.id,
        quantite: data.nb
      },{
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        console.log('NIOVA NY INGREDIENT')
      }).catch(err => {
        console.log(err)
      })
    })

    newIngredientsList.forEach(data => {
      axios.post('https://esakafo.onrender.com/api/comprend',{
        id_recette: id,
        id_ingredient: data.id,
        quantite: data.nb
      }, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        console.log('LASA NY INGREDIENT VAOVAO')
      }).catch(err => {
        console.log(err)
      })
      }
    )
  
    navigation.navigate('MyRecipes')
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
    

    setDifficulty(data.difficulte.designation_difficulte)
    // setDifficulty(data.difficulte.id_difficulte)
    console.log('FICFFF ',data.difficulte.id_difficulte)
    setIngredientsList([])
    setId(data.id_recette)
    console.log('DATA', data.comprend)
    data.comprend.forEach((data) => {

        console.log('BONJOUR')
        
        let newIngredient = {
          nb: data.quantite,
          name: data.ingredient.designation_ingredient,
          id: data.ingredient.id_ingredient
        };

        // console.log('QTE ', newIngredient.nb)
        // console.log('Nom Ing ', newIngredient.name)

        setIngredientsList((prevIngredientsList) => [...prevIngredientsList, newIngredient]);
        // console.log('LIST HEHE', newIngredient)
      
      }
    )
    setName(data.nom_recette);
    setDescription(data.description_recette)
    setTime(data.temps_preparation)
    setDifficulty(data.difficulte.designation_difficulte)
    setSteps(data.contenu_recette)
    setCategory(data.categorie.designation_categorie)

    setIngredientQuantities(ingredientsList.map(data => data.nb));

  }, [data, route.params, reqDifficult, ingredients])
  


  return (
    <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('MyRecipes')}>
            <Ionicons name='arrow-back' size={30} color='#000'/> 
        </TouchableOpacity>
      <View style={styles.header}>
        <View>
            <Text style={styles.title}>Hanova laoka</Text>
        </View>
      </View>
      <View style={styles.form}>
        <View style={styles.group}>
          <Text style={styles.inputLabel}>Loaka</Text>
          <TextInput 
            style={styles.input}
            placeholder="Anaran'ilay loaka"
            placeholderTextColor='#BCBCBC'
            value={name}
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
            value={description}
          />
        </View>
        <View style={styles.group}>
          <Text style={styles.inputLabel}>Fotoana Hikarakarana(mn)</Text>
          <TextInput 
            style={styles.input}
            placeholder="Hafiriana ny fikarakarana azy"
            placeholderTextColor='#BCBCBC'
            onChangeText={(e) => setTime(e)}
            value={time}
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
            borderColor: '#AFB1B6',
            elevation: 999
          }}
          dropDownContainerStyle={{
            borderColor: '#AFB1B6',
            elevation: 999
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
          <View style={styles.ingredients}>
            {
              ingredientsList?.map((data, index) => (
                <View key={index} style={{flexDirection: 'row', marginBottom: 20}}>
                  <TouchableOpacity style={{ width: '12%', alignItems: 'center', justifyContent: 'center'}}>
                    <Material name='cancel' size={20} color='#f65252' onPress={() => deleteIngredient(data.id)} />
                  </TouchableOpacity> 
                  <TextInput 
                      style={styles.numberIngredient}
                      placeholder="Quantite"
                      placeholderTextColor='#BCBCBC'
                      editable={false}
                      onChangeText={setIngredientNb}
                      value={data.nb}
                      // onChangeText={text => {
                      //   const newQuantities = [...ingredientQuantities];
                      //   newQuantities[index] = text;
                      //   setIngredientQuantities(newQuantities);
                      // }}
                      // value={ingredientQuantities[index]}
                  />
                  
                  <DropDownPicker
                      open={openIngredient}
                      value={data.id}
                      items={ingredients}
                      setOpen={setOpenIngredient}
                      setValue={setIngredientName}
                      setItems={setIngredients}
                      disabled
                      placeholder='Ingredients'
                      placeholderStyle={{
                          color: '#AFB1B6',
                      }}
                      listMode='SCROLLVIEW'
                      style={{
                          backgroundColor: 'transparent',
                          borderColor: '#AFB1B6',
                          flex: 4,
                          width: '60%'
                      }}
                      dropDownContainerStyle={{
                          borderColor: '#AFB1B6'
                      }}
                      listItemLabelStyle={{
                          color: "#000"
                      }}
                      /> 
                </View>
              ))
            }
          </View>

          {/* NEW INGREDIENT */}
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TextInput 
                  style={styles.numberIngredient}
                  placeholder="Quantite"
                  placeholderTextColor='#BCBCBC'
                  editable
                  value={newIngredientNb}
                  onChangeText={setNewIngredientNb}
              />
              <DropDownPicker
                  open={openNewIngredient}
                  value={newIngredientId}
                  items={ingredients}
                  setOpen={setOpenNewIngredient}
                  setValue={setNewIngredientId}
                  setItems={setIngredients}
                  placeholder='Ingredients'
                  placeholderStyle={{
                      color: '#AFB1B6',
                  }}
                  listMode='SCROLLVIEW'
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
          </View>
          <TouchableOpacity 
          onPress={addIngredient} 
          style={{backgroundColor: colors.orange, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 30, marginVertical: 10}}>
              <AntDesign name='plus' color='#fff' size={30}/>
            </TouchableOpacity>
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
            value={steps}
            // onChangeText={(e) => setRecipe(e)}
          />
        </View>
        <View style={styles.btnContainer}>
          <Button icon='pencil' backgroundColor={colors.orange} handleSubmit={handleSubmit}>
            Hovaina
          </Button>
        </View>
    </ScrollView>
  )
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

    // ingredients: {
    //     flex:1,
    //     flexDirection: 'row'
    // },

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

export default EditRecipe
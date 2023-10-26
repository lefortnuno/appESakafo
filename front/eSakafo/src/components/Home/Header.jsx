import { View, Text, StyleSheet, TextInput } from 'react-native'
import { StatusBar } from 'react-native';
import React, { useState } from 'react'
import { Avatar } from 'react-native-paper';
import { colors } from '../../styles/colors';

import Ionicons from 'react-native-vector-icons/Ionicons'

const Header = () => {

    const [search, setSearch] = useState('');

  return (
    <View style={styles.header}>
        <View style={styles.headerTop}>
            <Text style={styles.title}>eSakafo</Text>
            <Avatar.Image size={48} source={require('../../assets/images/user.jpg')} />
        </View>
        <View style={styles.searchSection}>
            <Ionicons name='search' size={24} style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Recherche"
                placeholderTextColor='#BDBDBD'
                onChangeText={setSearch}
                underlineColorAndroid="transparent"
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        marginTop: StatusBar.currentHeight + 20,
        paddingHorizontal: 20,
    },
    headerTop: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'VarelaRound-Regular',
        color: colors.orange,
        fontSize: 26,
    },
    searchSection: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,

        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 3,
        },
        shadowOpacity:  0.17,
        shadowRadius: 3.05,
        elevation: 3

    },
    searchInput: {
        flex: 1,
        paddingLeft: 0,
        backgroundColor: 'transparent',
        color: '#000',  
    },
    searchIcon: {
        marginHorizontal: 20,
        color: '#BDBDBD',
    }
})

export default Header
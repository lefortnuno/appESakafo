//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo'

// create a component
const Tag = ({name, onDelete}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{name}</Text>
            <TouchableOpacity onPress={() => onDelete()}>
                <Entypo name='cross' color='#000' size={20} />
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent :'center',
        paddingLeft: 20,
        paddingRight: 10,
        paddingVertical: 4,
        backgroundColor: '#fff',
        marginRight: 14,
        marginBottom: 10,
        borderRadius: 20
    },

    text: {
        color: '#5a5a5a',
        fontWeight: 'bold',
        marginRight: 5
    }
});

//make this component available to the app
export default Tag;

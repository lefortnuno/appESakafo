//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import All from '../components/Home/All';
import Header from '../components/Home/Header';
import Recent from '../components/Home/Recent';
import Today from '../components/Home/Today';

// create a component
const MyComponent = () => {
    return (
        <ScrollView>
            <Header />
            <Today />
            <Recent />
            <All />
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default MyComponent;

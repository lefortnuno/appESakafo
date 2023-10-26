import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors';

import AntDesign from 'react-native-vector-icons/AntDesign'

const Landing = ({navigation}) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/landingBg.png')} style={styles.image}>
                <Text style={styles.title}>eSakafo</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('BottomTabs')}
                >
                    <View style={{flex: 1,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.txtButton}>Hiditra</Text>
                        <AntDesign name="right"  size={24} color="#fff" style={styles.icon} />
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C0EECA',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 48,
        marginBottom: 48,
        color: '#000',
        fontFamily: 'VarelaRound-Regular',
    },  
    button: {
        height: 60,
        backgroundColor: colors.orange,
        borderRadius: 30,
        paddingLeft: 50,
        paddingRight: 15,
    },
    icon: {
        marginLeft: 10,
        marginTop: 5,
    },  
    txtButton: {
        fontSize: 20,
        color: '#fff',
    }
});

export default Landing;

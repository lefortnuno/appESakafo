import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../styles/colors'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Button = ({children, icon, width, backgroundColor, onPress, handleSubmit}) => {
  return (
    <TouchableOpacity style={styles.button(width, backgroundColor)} onPress={handleSubmit ? handleSubmit : onPress}>
        {icon &&(
            <Ionicons name={icon} size={24} style={styles.icon} />
        )}
        <Text style={styles.text}>
            {children}
        </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: (width, backgroundColor) => {
        return{
            backgroundColor: backgroundColor,
            paddingHorizontal: 20,
            paddingVertical: 10,
            height: 44,
            borderRadius: 22,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 3,
            width: width ? 200 : undefined,
        }
        
    },
    text: {
        color: '#fff',
        fontSize: 14
    },
    icon: {
        marginRight: 10,
        color: '#fff'
    }
})

export default Button
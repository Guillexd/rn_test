import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'

export default function Header({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{ title }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: colors.gray3,
        padding: 20,
        alignItems: 'center'
    },
    text: {
        color: colors.white,
        fontFamily: 'Josefin',
        fontSize: 22,
        textAlign: 'center'
    }
})
import { StyleSheet, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Categories from '../components/Categories'

export default function Home({ setCategory }) {
  return (
    <View style={styles.container}>
      <Header title='Categorias' />
      <Categories setCategory={setCategory} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 140,
  }
})
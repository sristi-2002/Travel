import React from 'react'

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Pressable,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { useLocalSearchParams } from 'expo-router'

const { width, height } = Dimensions.get('window')

const Details = () => {

  const { place } = useLocalSearchParams()

  const menu = [

    {
      title: 'Hotels',
      icon: 'bed-outline',
      top: 50,
      right: 230,
    },

    {
      title: 'Tourist',
      icon: 'location-outline',
      top: 300,
      right: 5,
    },

    {
      title: 'Adventure',
      icon: 'bicycle-outline',
      top: 170,
      right: 90,
    },

    {
      title: 'Cafe',
      icon: 'cafe-outline',
      top: 450,
      right:130,
    },

    {
      title: 'Emergency',
      icon: 'medical-outline',
      top: 570,
      right: 190,
    },

  ]

  return (

    <ImageBackground
      source={{
        uri:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      }}
      blurRadius={5}
      style={styles.container}
    >

      {/* DARK OVERLAY */}

      <View style={styles.overlay} />

      {/* OUTER ORBIT CIRCLE */}

      <View style={styles.orbitCircle} />

      {/* BIG MAIN CIRCLE */}

      <View style={styles.bigCircle}>

        {/* INNER IMAGE CIRCLE */}

        <ImageBackground
          source={{
            uri:
              'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
          }}
          style={styles.innerCircle}
          imageStyle={{
            borderRadius: 180,
          }}
        >

          <View style={styles.textContainer}>

            <Text style={styles.smallTitle}>
              CITY OF
            </Text>

            <Text style={styles.city}>
              {place}
            </Text>

            <Text style={styles.date}>
              Wednesday
            </Text>

            <Text style={styles.date}>
              January 15, 2026
            </Text>

            <Text style={styles.temp}>
              28°
            </Text>

          </View>

        </ImageBackground>

      </View>

      {/* SMALL FLOATING MENU CIRCLES */}

      {menu.map((item, index) => (

        <Pressable
          key={index}
          style={[
            styles.menuWrapper,
            {
              top: item.top,
              right: item.right,
            },
          ]}
        >

          <View style={styles.smallCircle}>

            <Ionicons
              name={item.icon as any}
              size={28}
              color="#fff"
            />

          </View>

          <Text style={styles.sideLabel}>
            {item.title}
          </Text>

        </Pressable>

      ))}

      {/* MENU ICON */}

     

    </ImageBackground>
  )
}

export default Details

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  /* BIG OUTER ORBIT */

  orbitCircle: {

    width: 540,
    height: 540,

    borderRadius: 270,

    borderWidth: 1.5,
    borderColor: '#ffffff70',

    position: 'absolute',

    left: -250,
    top: 80,
  },

  /* BIG MAIN CIRCLE */

  bigCircle: {

    width: 420,
    height: 420,

    borderRadius: 210,

    borderWidth: 2,
    borderColor: '#fff',

    position: 'absolute',

    left: -170,
    top: 140,

    justifyContent: 'center',
    alignItems: 'center',
  },

  /* INNER IMAGE CIRCLE */

  innerCircle: {

    width: 340,
    height: 340,

    borderRadius: 170,

    overflow: 'hidden',

    justifyContent: 'center',
  },

  /* TEXT */

  textContainer: {
    marginLeft: 120,
  },

  smallTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
  },

  city: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },

  date: {
    color: '#fff',
    marginTop: 10,
    fontSize: 14,
  },

  temp: {
    color: '#fff',
    fontSize: 48,
    marginTop: 25,
    fontWeight: '300',
  },

  /* MENU WRAPPER */

  menuWrapper: {

    position: 'absolute',

    flexDirection: 'row',
    alignItems: 'center',
  },

  /* SMALL CIRCLES */

  smallCircle: {

    width: 82,
    height: 82,

    borderRadius: 41,

    backgroundColor: '#24324a',

    borderWidth: 2,
    borderColor: '#fff',

    justifyContent: 'center',
    alignItems: 'center',
  },

  /* LABEL */

  sideLabel: {

    color: '#fff',

    fontSize: 16,

    marginLeft: 16,

    fontWeight: '500',
  },

  /* TOP MENU ICON */

  menuIcon: {

    position: 'absolute',

    top: 60,
    left: 20,
  },

  /* GRID ICON */

  gridIcon: {

    position: 'absolute',

    top: 60,
    right: 20,
  },

})
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { placedetails } from "../data/placedetails";

const { width, height } = Dimensions.get("window");

const Details = () => {
  const { place } = useLocalSearchParams();

  const [selectedMenu, setSelectedMenu] = useState("Hotels");
  const menu = [
    {
      title: "Hotels",
      icon: "bed-outline",
      top: 50,
      right: 230,
      route: "/place/hotels",
    },
    {
      title: "Tourist",
      icon: "location-outline",
      top: 300,
      right: 5,
      route: "/place/tourists",
    },
    {
      title: "Adventure",
      icon: "bicycle-outline",
      top: 170,
      right: 90,
      route: "/place/adventure",
    },
    {
      title: "Cafe",
      icon: "cafe-outline",
      top: 450,
      right: 130,
      route: "/place/cafes",
    },
    {
      title: "Emergency",
      icon: "medical-outline",
      top: 570,
      right: 190,
      route: "/place/emergency",
    },
  ] as const;
  const details = placedetails[place as keyof typeof placedetails];

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
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
            uri: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
          }}
          style={styles.innerCircle}
          imageStyle={{
            borderRadius: 180,
          }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.smallTitle}>CITY OF</Text>

            <Text style={styles.city}>{place}</Text>

            <Text style={styles.date}>Wednesday</Text>

            <Text style={styles.date}>January 15, 2026</Text>

            <Text style={styles.temp}>28°</Text>
          </View>
        </ImageBackground>
      </View>
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
          onPress={() =>
            router.push({
              pathname: item.route,
              params: { place },
            })
          }
        >
          <View
            style={[
              styles.smallCircle,
              selectedMenu === item.title && {
                backgroundColor: "#4F8EF7",
              },
            ]}
          >
            <Ionicons name={item.icon as any} size={28} color="#fff" />
          </View>

          <Text style={styles.sideLabel}>{item.title}</Text>
        </Pressable>
      ))}

      {/* 
   {selectedMenu && details && (
<View style={styles.popup}>
   <Text style={styles.popupTitle}>{selectedMenu}</Text>

  <ScrollView showsVerticalScrollIndicator={false}>

  {selectedMenu === "Hotels" &&
    details.hotels.map((hotel, index) => (
      <View key={index} style={styles.card}>
        <Text style={styles.cardTitle}>{hotel.name}</Text>
        <Text>⭐ {hotel.rating}</Text>
        <Text>${hotel.price} / night</Text>
      </View>
    ))}

  {selectedMenu === "Cafe" &&
    details.cafes.map((cafe, index) => (
      <View key={index} style={styles.card}>
        <Text style={styles.cardTitle}>{cafe.name}</Text>
        <Text>⭐ {cafe.rating}</Text>
        <Text>${cafe.price}</Text>
      </View>
    ))}

  {selectedMenu === "Tourist" &&
    details.attractions.map((item, index) => (
      <Text key={index} style={styles.list}>
        📍 {item}
      </Text>
    ))}

  {selectedMenu === "Adventure" &&
    details.adventure.map((item, index) => (
      <Text key={index} style={styles.list}>
        🏔 {item}
      </Text>
    ))}

  {selectedMenu === "Emergency" &&
    details.emergency.map((hospital, index) => (
      <View key={index} style={styles.card}>
        <Text style={styles.cardTitle}>
          🏥 {hospital.name}
        </Text>

        <Text>{hospital.address}</Text>

        <Text>{hospital.phone}</Text>
      </View>
    ))}

</ScrollView>
</View>
)} */}

      {/* MENU ICON */}
    </ImageBackground>
  );
};

export default Details;

const styles = StyleSheet.create({
  popup: {
    position: "absolute",
    top: 90,
    right: 20,
    width: 280,
    maxHeight: 430,
    backgroundColor: "rgba(20,30,45,0.95)",
    borderRadius: 20,
    padding: 15,
  },

  popupTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
  },

  list: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },

  description: {
    color: "#fff",
    width: 170,
    marginTop: 8,
    fontSize: 13,
  },

  infoCard: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 25,
    padding: 20,
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  name: {
    fontWeight: "600",
    flex: 1,
  },

  container: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  /* BIG OUTER ORBIT */

  orbitCircle: {
    width: 540,
    height: 540,

    borderRadius: 270,

    borderWidth: 1.5,
    borderColor: "#ffffff70",

    position: "absolute",

    left: -250,
    top: 80,
  },

  /* BIG MAIN CIRCLE */

  bigCircle: {
    width: 420,
    height: 420,

    borderRadius: 210,

    borderWidth: 2,
    borderColor: "#fff",

    position: "absolute",

    left: -170,
    top: 140,

    justifyContent: "center",
    alignItems: "center",
  },

  /* INNER IMAGE CIRCLE */

  innerCircle: {
    width: 340,
    height: 340,

    borderRadius: 170,

    overflow: "hidden",

    justifyContent: "center",
  },

  /* TEXT */

  textContainer: {
    marginLeft: 120,
  },

  smallTitle: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 8,
  },

  city: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  date: {
    color: "#fff",
    marginTop: 10,
    fontSize: 14,
  },

  temp: {
    color: "#fff",
    fontSize: 48,
    marginTop: 25,
    fontWeight: "300",
  },

  /* MENU WRAPPER */

  menuWrapper: {
    position: "absolute",

    flexDirection: "row",
    alignItems: "center",
  },

  /* SMALL CIRCLES */

  smallCircle: {
    width: 82,
    height: 82,

    borderRadius: 41,

    backgroundColor: "#24324a",

    borderWidth: 2,
    borderColor: "#fff",

    justifyContent: "center",
    alignItems: "center",
  },

  /* LABEL */

  sideLabel: {
    color: "#fff",

    fontSize: 16,

    marginLeft: 16,

    fontWeight: "500",
  },

  /* TOP MENU ICON */

  menuIcon: {
    position: "absolute",

    top: 60,
    left: 20,
  },

  /* GRID ICON */

  gridIcon: {
    position: "absolute",

    top: 60,
    right: 20,
  },
});

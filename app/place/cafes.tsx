import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { placedetails } from "../../data/placedetails";
import { getPlaceImage } from "../../data/placeMedia";

const Cafes = () => {
  const { place } = useLocalSearchParams();

  const cafeList =
    placedetails[place as keyof typeof placedetails]?.cafes || [];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>☕ {place} Cafes</Text>

      <FlatList
        data={cafeList}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: getPlaceImage("cafes", index) }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.location}>📍 {place}</Text>
              <Text style={styles.meta}>⭐ {item.rating} • ₹{item.price}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Cafes;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
  heading: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 160,
  },
  info: {
    padding: 15,
  },
  title: { fontSize: 18, fontWeight: "700" },
  location: { marginTop: 6, fontSize: 14, color: "#666" },
  meta: { marginTop: 6, fontSize: 15, color: "#333" },
});

import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { placedetails } from "../../data/placedetails";
import { getPlaceImage } from "../../data/placeMedia";

const Tourists = () => {
  const { place } = useLocalSearchParams();

  const touristList =
    placedetails[place as keyof typeof placedetails]?.attractions || [];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📍 {place} Tourist Places</Text>

      <FlatList
        data={touristList}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: getPlaceImage("attractions", index) }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={styles.title}>{item}</Text>
              <Text style={styles.location}>📍 {place}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Tourists;

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
  title: { fontSize: 18, fontWeight: "600" },
  location: { marginTop: 6, fontSize: 14, color: "#666" },
});

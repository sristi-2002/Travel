import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { placedetails } from "../../data/placedetails";
import { getPlaceImage } from "../../data/placeMedia";

const Emergency = () => {
  const { place } = useLocalSearchParams();

  const emergencyList =
    placedetails[place as keyof typeof placedetails]?.emergency || [];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🚑 {place} Emergency Services</Text>

      <FlatList
        data={emergencyList}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: getPlaceImage("emergency", index) }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>

              <Text style={styles.address}>📍 {item.address}</Text>

              <Text style={styles.phone}>📞 {item.phone}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Emergency;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F4F7FB",
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 140,
  },

  info: {
    padding: 16,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  address: {
    marginTop: 8,
    fontSize: 15,
    color: "#555",
  },

  phone: {
    marginTop: 6,
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
});

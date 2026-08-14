import React, { useRef } from "react";
import {
  View,
  Pressable,
  ImageBackground,
  Text,
  StyleSheet,
} from "react-native";

import Swiper from "react-native-deck-swiper";
import { Ionicons } from "@expo/vector-icons";
import { getPlaceImage } from "../data/placeMedia";
import { router } from "expo-router";

type HotelItem = {
  id: number;
  name: string;
  rating: number;
  price: number;
  location?: string;
  image?: string;
  isMore?: boolean;
  count?: number;
};

type Props = {
  cards: HotelItem[];
  place: any;
  onMorePress: () => void;
};

export default function HotelSwiper({
  cards,
  place,
  onMorePress,
}: Props) {
  const swiperRef = useRef<any>(null);

  return (
    <View style={styles.wrapper}>

      <Swiper
        ref={swiperRef}
        cards={cards}
        backgroundColor="transparent"
        stackSize={3}
        infinite={false}
        verticalSwipe={false}
        renderCard={(item: HotelItem | undefined, index: number) => {

          // IMPORTANT:
          // Swiper can call renderCard with undefined.
          if (!item) {
            return <View style={styles.emptyCard} />;
          }

          // =========================
          // + MORE CARD
          // =========================
          if (item.isMore) {
            return (
              <Pressable
                style={styles.moreCard}
                onPress={onMorePress}
              >
                <ImageBackground
                source={{
                  uri:
                    item.image ??
                    getPlaceImage("hotels", index),
                }}
                style={styles.image}
                imageStyle={{
                  borderRadius: 30,
                }}
              ></ImageBackground>
                <Ionicons
                  name="add-circle-outline"
                  size={55}
                  color="#fff"
                />

                <Text style={styles.moreNumber}>
                  +{item.count ?? 0}
                </Text>

                <Text style={styles.moreText}>
                  More Hotels
                </Text>
              </Pressable>
            );
          }

          // =========================
          // NORMAL HOTEL CARD
          // =========================
          return (
              <Pressable
               onPress={() => router.push("../hotel/hotelDetails")}>
               <View style={styles.container}>
             <ImageBackground
                source={{
                  uri:
                    item.image ??
                    getPlaceImage("hotels", index),
                }}
                style={styles.image}
                imageStyle={{
                  borderRadius: 30,
                }}
              >
                <View style={styles.overlay}>
                  <Text style={styles.name}>
                    {item.name}
                  </Text>

                  <Text style={styles.location}>
                    📍 {item.location ?? place}
                  </Text>

                  <Text style={styles.rating}>
                    ⭐ {item.rating} • ₹
                    {item.price}/night
                  </Text>
                </View>
              </ImageBackground>
              
            </View></Pressable>
          );
        }}
      />

      {/* =========================
          ARROW BUTTONS
      ========================= */}
      <View style={styles.buttons}>

        <Pressable
          onPress={() =>
            swiperRef.current?.swipeLeft()
          }
        >
          <Ionicons
            name="chevron-back-circle"
            size={45}
            color="#000"
          />
        </Pressable>

        <Pressable
          onPress={() =>
            swiperRef.current?.swipeRight()
          }
        >
          <Ionicons
            name="chevron-forward-circle"
            size={45}
            color="#000"
          />
        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 340,
    height: 400,
  },

  container: {
    width: 320,
    height: 350,
  },

  image: {
    width: 320,
    height: 350,
    justifyContent: "flex-end",
  },

  overlay: {
    padding: 30,
    backgroundColor: "rgba(0,0,0,.35)",
  },

  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  location: {
    color: "#fff",
    marginTop: 5,
  },

  rating: {
    color: "#fff",
    marginTop: 5,
  },

  // =========================
  // MORE CARD
  // =========================

  moreCard: {
    width: 320,
    height: 350,
    borderRadius: 30,
    backgroundColor: "#777",
    justifyContent: "center",
    alignItems: "center",
  },

  moreNumber: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 10,
  },

  moreText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 5,
  },

  emptyCard: {
    width: 320,
    height: 350,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 40,
  },
});

import React, { useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { HapticTab } from '@/components/haptic-tab';
type Adventure = {
  id: string;
  name: string;
  category: string;
  location: string;
  duration: string;
  price: number;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  image: string;
};

const adventures: Adventure[] = [
  {
    id: "1",
    name: "River Rafting",
    category: "Water Adventure",
    location: "Rishikesh, India",
    duration: "3 hours",
    price: 1499,
    description:
      "Experience exciting river rapids with a trained guide and discover the beauty of the river.",
    icon: "water-outline",
    image:
      "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: "2",
    name: "Paragliding",
    category: "Air Adventure",
    location: "Bir Billing, India",
    duration: "20 minutes",
    price: 2500,
    description:
      "Fly above beautiful mountain landscapes with an experienced instructor and enjoy breathtaking views.",
    icon: "airplane-outline",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: "3",
    name: "Mountain Trekking",
    category: "Land Adventure",
    location: "Manali, India",
    duration: "5 hours",
    price: 999,
    description:
      "Explore scenic mountain trails, beautiful forests and unforgettable outdoor landscapes.",
    icon: "walk-outline",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: "4",
    name: "Kayaking",
    category: "Water Adventure",
    location: "Rishikesh, India",
    duration: "2 hours",
    price: 1200,
    description:
      "Paddle through scenic waters and enjoy an exciting outdoor experience with professional guidance.",
    icon: "boat-outline",
    image:
      "https://images.unsplash.com/photo-1472745942893-4b9f730c7668?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: "5",
    name: "Rock Climbing",
    category: "Land Adventure",
    location: "Manali, India",
    duration: "2 hours",
    price: 1800,
    description:
      "Challenge yourself with an outdoor climbing experience and guidance from trained professionals.",
    icon: "trending-up-outline",
    image:
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=500&q=85",
  },
];

const BACKGROUND_IMAGE =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=90";

const CARD_WIDTH = 132;
const CARD_GAP = 14;
const CARD_STEP = CARD_WIDTH + CARD_GAP;

export default function AdventureScreen() {
  const { width } = useWindowDimensions();

  const [selected, setSelected] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const listRef = useRef<FlatList<Adventure>>(null);
  const activeAdventure = adventures[selected];

  const selectAdventure = (index: number) => {
    setSelected(index);

    listRef.current?.scrollToOffset({
      offset: index * CARD_STEP,
      animated: true,
    });
  };

  const chooseDate = () => {
    Alert.alert("Choose date", "Select your preferred date", [
      {
        text: "Tomorrow",
        onPress: () => setDate("Tomorrow"),
      },
      {
        text: "In 2 days",
        onPress: () => setDate("In 2 days"),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const chooseTime = () => {
    Alert.alert("Choose time", "Select an available time slot", [
      {
        text: "09:00 AM",
        onPress: () => setTime("09:00 AM"),
      },
      {
        text: "12:00 PM",
        onPress: () => setTime("12:00 PM"),
      },
      {
        text: "03:00 PM",
        onPress: () => setTime("03:00 PM"),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const handleBooking = () => {
    if (!date || !time) {
      Alert.alert(
        "Choose your schedule",
        "Please select a date and time before booking."
      );
      return;
    }

    Alert.alert(
      "Booking Summary",
      `Activity: ${activeAdventure.name}\nLocation: ${activeAdventure.location}\nDate: ${date}\nTime: ${time}\nPrice per person: ₹${activeAdventure.price.toLocaleString("en-IN")}`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Continue",
          onPress: () =>
            Alert.alert(
              "Demo",
              "Connect your booking confirmation screen here."
            ),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={{ uri: BACKGROUND_IMAGE }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.darkOverlay} />

        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* HEADER */}

            <View style={styles.header}>
              <View style={styles.headerText}>
                <Text style={styles.eyebrow}>
                  DISCOVER YOUR NEXT EXPERIENCE
                </Text>

                <Text style={styles.heading}>
                  Where do{"\n"}you want to go?
                </Text>
              </View>

              <TouchableOpacity
                style={styles.compassButton}
                onPress={() =>
                  Alert.alert("Explore", "Find your next adventure.")
                }
              >
                <Ionicons
                  name="compass-outline"
                  size={27}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>

            {/* GLASS DETAILS PANEL */}

            <View style={styles.glassWrapper}>
              <BlurView
                intensity={40}
                tint="dark"
                style={styles.glassPanel}
              >
                <View style={styles.glassContent}>
                  <View style={styles.titleRow}>
                    <View style={styles.titleArea}>
                      <Text style={styles.category}>
                        {activeAdventure.category.toUpperCase()}
                      </Text>

                      <Text style={styles.activityTitle}>
                        {activeAdventure.name}
                      </Text>
                    </View>

                    <View style={styles.activityIcon}>
                      <Ionicons
                        name={activeAdventure.icon}
                        size={25}
                        color="#86F3D4"
                      />
                    </View>
                  </View>

                  {/* LOCATION */}

                  <View style={styles.locationRow}>
                    <View style={styles.locationIcon}>
                      <Ionicons
                        name="location"
                        size={17}
                        color="#86F3D4"
                      />
                    </View>

                    <View style={styles.locationTextArea}>
                      <Text style={styles.miniLabel}>LOCATION</Text>
                      <Text style={styles.locationText}>
                        {activeAdventure.location}
                      </Text>
                    </View>

                    <Ionicons
                      name="navigate-outline"
                      size={19}
                      color="#B8D9D5"
                    />
                  </View>

                  {/* DURATION AND PRICE */}

                  <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                      <Ionicons
                        name="time-outline"
                        size={19}
                        color="#86F3D4"
                      />

                      <View>
                        <Text style={styles.miniLabel}>DURATION</Text>
                        <Text style={styles.statValue}>
                          {activeAdventure.duration}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.statBox}>
                      <Ionicons
                        name="pricetag-outline"
                        size={19}
                        color="#86F3D4"
                      />

                      <View>
                        <Text style={styles.miniLabel}>PRICE / PERSON</Text>
                        <Text style={styles.statValue}>
                          ₹{activeAdventure.price.toLocaleString("en-IN")}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* DESCRIPTION */}

                  <Text style={styles.description} numberOfLines={3}>
                    {activeAdventure.description}
                  </Text>

                  {/* DATE AND TIME */}

                  <View style={styles.scheduleRow}>
                    <TouchableOpacity
                      style={styles.scheduleButton}
                      onPress={chooseDate}
                      activeOpacity={0.8}
                    >
                      <Ionicons
                        name="calendar-outline"
                        size={19}
                        color="#86F3D4"
                      />

                      <View style={styles.scheduleText}>
                        <Text style={styles.miniLabel}>DATE</Text>
                        <Text style={styles.scheduleValue} numberOfLines={1}>
                          {date || "Select date"}
                        </Text>
                      </View>

                      <Ionicons
                        name="chevron-down"
                        size={14}
                        color="#D4E5E3"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.scheduleButton}
                      onPress={chooseTime}
                      activeOpacity={0.8}
                    >
                      <Ionicons
                        name="time-outline"
                        size={19}
                        color="#86F3D4"
                      />

                      <View style={styles.scheduleText}>
                        <Text style={styles.miniLabel}>TIME</Text>
                        <Text style={styles.scheduleValue} numberOfLines={1}>
                          {time || "Select time"}
                        </Text>
                      </View>

                      <Ionicons
                        name="chevron-down"
                        size={14}
                        color="#D4E5E3"
                      />
                    </TouchableOpacity>
                  </View>

                  {/* BOOKING BUTTON */}

                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={handleBooking}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.bookButtonText}>
                      Book This Adventure
                    </Text>

                    <Ionicons
                      name="arrow-forward"
                      size={20}
                      color="#073537"
                    />
                  </TouchableOpacity>
                </View>
              </BlurView>
            </View>

            {/* CAROUSEL HEADING */}

            <View style={styles.carouselHeader}>
              <View>
                <Text style={styles.carouselTitle}>
                  Explore Adventures
                </Text>

                <Text style={styles.carouselSubtitle}>
                  Tap a card to discover more
                </Text>
              </View>

              <Text style={styles.counter}>
                {String(selected + 1).padStart(2, "0")} /{" "}
                {String(adventures.length).padStart(2, "0")}
              </Text>
            </View>

            {/* HORIZONTAL CAROUSEL */}

            <FlatList
              ref={listRef}
              data={adventures}
              horizontal
              initialScrollIndex={1}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              snapToInterval={CARD_STEP}
              snapToAlignment="start"
              decelerationRate="fast"
              bounces={false}
              getItemLayout={(_, index) => ({
                length: CARD_STEP,
                offset: CARD_STEP * index,
                index,
              })}
              contentContainerStyle={{
                paddingHorizontal: (width - CARD_WIDTH) / 2,
                paddingBottom: 20,
              }}
              ItemSeparatorComponent={() => (
                <View style={{ width: CARD_GAP }} />
              )}
              onMomentumScrollEnd={(event) => {
                const index = Math.round(
                  event.nativeEvent.contentOffset.x / CARD_STEP
                );

                setSelected(
                  Math.max(0, Math.min(index, adventures.length - 1))
                );
              }}
              renderItem={({ item, index }) => {
                const isSelected = selected === index;

                return (
                  <View style={styles.cardSlot}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => selectAdventure(index)}
                      style={[
                        styles.card,
                        isSelected
                          ? styles.selectedCard
                          : styles.sideCard,
                      ]}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={styles.cardImage}
                        resizeMode="cover"
                      />

                      <View style={styles.cardShade} />

                      <View style={styles.cardContent}>
                        <View style={styles.cardIcon}>
                          <Ionicons
                            name={item.icon}
                            size={19}
                            color="#FFFFFF"
                          />
                        </View>

                        {isSelected ? (
                          <View>
                            <Text
                              style={styles.cardTitle}
                              numberOfLines={2}
                            >
                              {item.name}
                            </Text>

                            <Text style={styles.cardPrice}>
                              ₹{item.price.toLocaleString("en-IN")}
                            </Text>
                          </View>
                        ) : (
                          <Text
                            style={styles.sideCardTitle}
                            numberOfLines={2}
                          >
                            {item.name}
                          </Text>
                        )}
                      </View>

                      {isSelected && (
                        <View style={styles.selectedBadge}>
                          <Ionicons
                            name="checkmark"
                            size={13}
                            color="#073537"
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                );
              }}
            />

            <Text style={styles.bottomHint}>
              SWIPE TO EXPLORE MORE EXPERIENCES
            </Text>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#062D30",
  },

  background: {
    flex: 1,
  },

  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2, 22, 27, 0.43)",
  },

  safeArea: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 16,
    paddingBottom: 20,
  },

  header: {
    paddingHorizontal: 24,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerText: {
    flex: 1,
  },

  eyebrow: {
    fontSize: 9,
    letterSpacing: 1.7,
    color: "#A7E8D9",
    fontWeight: "700",
    marginBottom: 9,
  },

  heading: {
    fontSize: 29,
    lineHeight: 35,
    color: "#FFFFFF",
    fontWeight: "800",
    letterSpacing: -0.6,
  },

  compassButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.27)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  glassWrapper: {
    marginHorizontal: 24,
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    backgroundColor: "rgba(6,28,34,0.55)",
  },

  glassPanel: {
    borderRadius: 24,
    overflow: "hidden",
  },

  glassContent: {
    padding: 16,
    backgroundColor: "rgba(5,25,31,0.48)",
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },

  titleArea: {
    flex: 1,
    marginRight: 8,
  },

  category: {
    fontSize: 9,
    letterSpacing: 1.4,
    color: "#86F3D4",
    fontWeight: "700",
    marginBottom: 5,
  },

  activityTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "800",
  },

  activityIcon: {
    height: 43,
    width: 43,
    borderRadius: 14,
    backgroundColor: "rgba(134,243,212,0.13)",
    borderWidth: 1,
    borderColor: "rgba(134,243,212,0.22)",
    justifyContent: "center",
    alignItems: "center",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
  },

  locationIcon: {
    marginRight: 9,
  },

  locationTextArea: {
    flex: 1,
  },

  miniLabel: {
    color: "#A9C6C8",
    fontSize: 8,
    letterSpacing: 0.8,
    marginBottom: 4,
  },

  locationText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },

  statsRow: {
    flexDirection: "row",
    gap: 9,
    marginBottom: 13,
  },

  statBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
    minHeight: 59,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  statValue: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  description: {
    color: "#D0E0E0",
    fontSize: 11,
    lineHeight: 17,
    marginBottom: 14,
  },

  scheduleRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 13,
  },

  scheduleButton: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 8,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },

  scheduleText: {
    flex: 1,
    minWidth: 0,
  },

  scheduleValue: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },

  bookButton: {
    minHeight: 47,
    paddingHorizontal: 15,
    borderRadius: 13,
    backgroundColor: "#86F3D4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  bookButtonText: {
    color: "#073537",
    fontSize: 13,
    fontWeight: "800",
  },

  carouselHeader: {
    paddingHorizontal: 24,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  carouselTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },

  carouselSubtitle: {
    color: "#C3D6D6",
    fontSize: 10,
    marginTop: 4,
  },

  counter: {
    color: "#86F3D4",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  // Each carousel slot has the same height.
  // Only the visible card changes height.

  cardSlot: {
    width: CARD_WIDTH,
    height: 172,
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    width: CARD_WIDTH,
    borderRadius: 19,
    overflow: "hidden",
    backgroundColor: "#173E42",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },

  selectedCard: {
    height: 168,
    borderWidth: 2,
    borderColor: "#86F3D4",
    transform: [{ translateY: 0 }],
  },

  sideCard: {
    height: 138,
    opacity: 0.88,
    transform: [{ translateY: -15 }],
  },

  cardImage: {
    ...StyleSheet.absoluteFillObject,
  },

  cardShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(3,20,24,0.34)",
  },

  cardContent: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-end",
  },

  cardIcon: {
    height: 31,
    width: 31,
    borderRadius: 11,
    backgroundColor: "rgba(255,255,255,0.22)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 17,
  },

  sideCardTitle: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  cardPrice: {
    color: "#86F3D4",
    fontSize: 11,
    fontWeight: "800",
    marginTop: 5,
  },

  selectedBadge: {
    position: "absolute",
    right: 8,
    top: 8,
    height: 22,
    width: 22,
    borderRadius: 11,
    backgroundColor: "#86F3D4",
    alignItems: "center",
    justifyContent: "center",
  },

  bottomHint: {
    textAlign: "center",
    color: "rgba(255,255,255,0.65)",
    fontSize: 8,
    letterSpacing: 1.5,
    marginTop: 1,
    marginBottom: 10,
  },
});

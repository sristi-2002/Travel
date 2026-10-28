import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { placedetails } from "../../data/placedetails";
import { getPlaceImage } from "../../data/placeMedia";

type AdventureInfo = {
  description: string;
  duration: string;
  difficulty: string;
  price: number;
  season: string;
  includes: string[];
  icon: keyof typeof Ionicons.glyphMap;
};

const placeInfo: Record<string, { subtitle: string; emoji: string; color: string }> = {
  gulmarg: {
    subtitle: "Snowy slopes, mountain views and thrilling outdoor experiences.",
    emoji: "❄️",
    color: "#3568D4",
  },
  rajasthan: {
    subtitle: "Desert safaris, royal experiences and unforgettable adventures.",
    emoji: "🐪",
    color: "#D86B36",
  },
  jaipur: {
    subtitle: "Discover heritage, aerial views and outdoor thrills.",
    emoji: "🏰",
    color: "#C34D70",
  },
  jaisalmer: {
    subtitle: "Explore golden dunes, desert nights and camel trails.",
    emoji: "🌵",
    color: "#C17A2B",
  },
  manali: {
    subtitle: "Mountain trails, river adventures and Himalayan scenery.",
    emoji: "🏔️",
    color: "#2F8A79",
  },
  goa: {
    subtitle: "Make the most of the coast with water sports and island trips.",
    emoji: "🌊",
    color: "#1599A6",
  },
  rishikesh: {
    subtitle: "Take on river rapids, forest trails and Himalayan foothills.",
    emoji: "🌿",
    color: "#25866D",
  },
};

const adventureDetails: Record<string, AdventureInfo> = {
  skiing: {
    description: "Enjoy snow-covered slopes with a qualified local instructor. Choose a run suitable for your experience and current snow conditions.",
    duration: "2–3 hours",
    difficulty: "Beginner to advanced",
    price: 2500,
    season: "Winter; snow dependent",
    includes: ["Safety briefing", "Instructor guidance", "Equipment availability varies"],
    icon: "snow-outline",
  },
  snowboard: {
    description: "Try snowboarding on designated slopes with guidance and equipment arranged through a local operator.",
    duration: "2–3 hours",
    difficulty: "Beginner to advanced",
    price: 2800,
    season: "Winter; snow dependent",
    includes: ["Safety briefing", "Instructor guidance", "Equipment availability varies"],
    icon: "snow-outline",
  },
  gondola: {
    description: "Ride a scenic mountain cable car and enjoy panoramic views. Operating phases and tickets depend on weather and availability.",
    duration: "2–4 hours",
    difficulty: "Easy",
    price: 900,
    season: "Weather and ticket dependent",
    includes: ["Scenic cable-car experience", "Mountain viewpoints", "Photo opportunities"],
    icon: "trail-sign-outline",
  },
  snowmobile: {
    description: "Explore approved snowy areas on a guided snowmobile ride. Confirm route, duration and safety equipment with the operator.",
    duration: "20–40 minutes",
    difficulty: "Easy with guide",
    price: 3000,
    season: "Winter; snow dependent",
    includes: ["Operator briefing", "Guided ride", "Safety equipment as provided"],
    icon: "speedometer-outline",
  },
  sledging: {
    description: "Enjoy a classic snow sled ride in a designated area with local assistance.",
    duration: "15–30 minutes",
    difficulty: "Easy",
    price: 700,
    season: "Winter; snow dependent",
    includes: ["Sled ride", "Local assistance", "Short activity session"],
    icon: "happy-outline",
  },
  trekking: {
    description: "Walk scenic trails with time for viewpoints and photos. Route access and difficulty depend on local conditions.",
    duration: "2–4 hours",
    difficulty: "Easy to moderate",
    price: 1800,
    season: "Route and weather dependent",
    includes: ["Local guide", "Route briefing", "Rest and photo stops"],
    icon: "walk-outline",
  },
  paragliding: {
    description: "Experience a tandem flight with a qualified pilot where flights are permitted. Availability depends on wind, weather and local launch-site rules.",
    duration: "10–20 minutes in the air",
    difficulty: "Easy with qualified pilot",
    price: 4500,
    season: "Weather and operator dependent",
    includes: ["Pilot briefing", "Safety harness", "Flight only when conditions allow"],
    icon: "airplane-outline",
  },
  camel: {
    description: "Take a guided camel ride across desert trails and dunes, with time to enjoy the landscape and take photographs.",
    duration: "30–90 minutes",
    difficulty: "Easy",
    price: 800,
    season: "Usually best in cooler hours",
    includes: ["Camel ride", "Local handler", "Short photo stops"],
    icon: "paw-outline",
  },
  desert: {
    description: "Explore the Thar Desert on a guided dune excursion. Confirm the route, vehicle, duration and safety arrangements before booking.",
    duration: "1–2 hours",
    difficulty: "Easy to moderate",
    price: 1800,
    season: "Season and operator dependent",
    includes: ["Local driver or guide", "Desert route", "Photo stops where permitted"],
    icon: "car-sport-outline",
  },
  camping: {
    description: "Spend an evening in a desert camp with a chance to enjoy sunset views and local cultural performances where offered.",
    duration: "Evening or overnight",
    difficulty: "Easy",
    price: 2500,
    season: "Camp and weather dependent",
    includes: ["Camp stay package varies", "Evening activity if offered", "Meals depend on package"],
    icon: "bonfire-outline",
  },
  balloon: {
    description: "See the landscape from above on a balloon experience where licensed operators and suitable conditions are available.",
    duration: "1–3 hours including briefing",
    difficulty: "Easy",
    price: 6500,
    season: "Weather and operator dependent",
    includes: ["Operator briefing", "Flight when conditions allow", "Safety instructions"],
    icon: "airplane-outline",
  },
  zipline: {
    description: "Glide along a supervised zipline course. Check age, weight, health and equipment requirements with the venue.",
    duration: "30–60 minutes",
    difficulty: "Easy with supervision",
    price: 1200,
    season: "Venue and weather dependent",
    includes: ["Safety briefing", "Harness and helmet as provided", "Supervised ride"],
    icon: "git-merge-outline",
  },
  rafting: {
    description: "Join a guided river rafting session on an approved stretch. Operators set trips according to river flow and safety conditions.",
    duration: "1–3 hours",
    difficulty: "Varies by river stretch",
    price: 1500,
    season: "River and weather dependent",
    includes: ["Guide", "Safety briefing", "Safety equipment as provided"],
    icon: "boat-outline",
  },
  watersports: {
    description: "Choose a coastal water activity with a local operator. The exact activity and duration depend on the package selected.",
    duration: "15–60 minutes",
    difficulty: "Easy to moderate",
    price: 1200,
    season: "Sea and weather dependent",
    includes: ["Operator briefing", "Activity equipment as provided", "Life jacket where applicable"],
    icon: "water-outline",
  },
  safari: {
    description: "Explore a designated nature or desert route with a local guide or driver. Wildlife sightings are never guaranteed.",
    duration: "1–3 hours",
    difficulty: "Easy",
    price: 1800,
    season: "Route and operator dependent",
    includes: ["Guide or driver", "Designated route", "Stops where permitted"],
    icon: "binoculars-outline",
  },
};

function findInfo(name: string): AdventureInfo {
  const n = name.toLowerCase();
  if (n.includes("ski") || n.includes("snowboard")) return adventureDetails.skiing;
  if (n.includes("gondola") || n.includes("cable car")) return adventureDetails.gondola;
  if (n.includes("snowmobile") || n.includes("snow mobile")) return adventureDetails.snowmobile;
  if (n.includes("sled")) return adventureDetails.sledging;
  if (n.includes("paraglid") || n.includes("parasail")) return adventureDetails.paragliding;
  if (n.includes("trek") || n.includes("hike") || n.includes("trail")) return adventureDetails.trekking;
  if (n.includes("camel")) return adventureDetails.camel;
  if (n.includes("camp") || n.includes("glamp")) return adventureDetails.camping;
  if (n.includes("dune") || n.includes("desert safari") || n.includes("jeep safari") || n.includes("quad bike")) return adventureDetails.desert;
  if (n.includes("balloon")) return adventureDetails.balloon;
  if (n.includes("zipline") || n.includes("zip line")) return adventureDetails.zipline;
  if (n.includes("raft") || n.includes("river")) return adventureDetails.rafting;
  if (n.includes("water") || n.includes("scuba") || n.includes("snorkel") || n.includes("jet ski") || n.includes("banana boat")) return adventureDetails.watersports;
  if (n.includes("safari") || n.includes("wildlife")) return adventureDetails.safari;

  return {
    description: `Discover ${name.toLowerCase()} with a local activity provider in the area. Confirm the exact meeting point, duration, inclusions and safety requirements before booking.`,
    duration: "Confirm with operator",
    difficulty: "Ask the local provider",
    price: 1000,
    season: "Confirm local availability",
    includes: ["Activity briefing", "Inclusions depend on provider", "Confirm availability before paying"],
    icon: "compass-outline",
  };
}

const formatINR = (value: number) => `₹${value.toLocaleString("en-IN")}`;

const Adventure = () => {
  const params = useLocalSearchParams<{ place?: string | string[] }>();
  const place = Array.isArray(params.place) ? params.place[0] : params.place || "Destination";
  const placeKey = place.toLowerCase().replace(/[^a-z]/g, "");
  const destination = placeInfo[placeKey] || {
    subtitle: `Discover outdoor experiences and local activities in ${place}.`,
    emoji: "🧭",
    color: "#3568D4",
  };

  const adventureList = useMemo(() => {
    const found = placedetails[place as keyof typeof placedetails]?.adventure || [];
    return found.map((name: string, index: number) => ({
      id: `${place}-${index}-${name}`,
      name,
      info: findInfo(String(name)),
      imageIndex: index,
    }));
  }, [place]);

  const [selected, setSelected] = useState<(typeof adventureList)[number] | null>(null);
  const [bookingItem, setBookingItem] = useState<(typeof adventureList)[number] | null>(null);
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("Choose a date");

  const openMap = (activityName: string) => {
    const query = encodeURIComponent(`${activityName}, ${place}, India`);
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`).catch(() =>
      Alert.alert("Map unavailable", "Search for this activity in your map app.")
    );
  };

  const startBooking = (item: (typeof adventureList)[number]) => {
    setDate("Choose a date");
    setPeople(2);
    setBookingItem(item);
  };

  const submitBookingRequest = () => {
    if (!bookingItem) return;
    if (date === "Choose a date") {
      Alert.alert("Choose a date", "Please select a preferred date to continue.");
      return;
    }
    const total = bookingItem.info.price * people;
    setBookingItem(null);
    Alert.alert(
      "Booking request prepared",
      `${bookingItem.name}\n${place} · ${date}\n${people} ${people === 1 ? "person" : "people"} · ${formatINR(total)} estimated.\n\nThis demo does not confirm availability or take payment. Connect a booking API or operator contact to complete reservations.`
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={destination.color} />
      <FlatList
        data={adventureList}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <View style={[styles.hero, { backgroundColor: destination.color }]}>
              <View style={styles.heroTop}>
                <View style={styles.heroIcon}><Text style={styles.heroEmoji}>{destination.emoji}</Text></View>
                <View style={styles.destinationTag}><Ionicons name="location" size={13} color="#fff" /><Text style={styles.destinationTagText}>{place.toUpperCase()}</Text></View>
              </View>
              <Text style={styles.heroTitle}>{place}{"\n"}Adventures</Text>
              <Text style={styles.heroSubtitle}>{destination.subtitle}</Text>
              <View style={styles.heroStats}>
                <View style={styles.heroStat}><Ionicons name="compass-outline" size={16} color="#fff" /><Text style={styles.heroStatText}>{adventureList.length} activities</Text></View>
                <View style={styles.heroStat}><Ionicons name="calendar-outline" size={16} color="#fff" /><Text style={styles.heroStatText}>Plan your trip</Text></View>
              </View>
              <View style={styles.heroDecorationOne} />
              <View style={styles.heroDecorationTwo} />
            </View>
            <View style={styles.headingRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionHeading}>Explore experiences</Text>
                <Text style={styles.sectionSubheading}>Choose an activity to see details and booking options.</Text>
              </View>
              <View style={styles.countBadge}><Text style={styles.countBadgeText}>{adventureList.length}</Text></View>
            </View>
            <View style={styles.tipBanner}>
              <Ionicons name="information-circle-outline" size={21} color="#2D5FC1" />
              <Text style={styles.tipText}>Prices shown are estimates. Season, weather and local operator availability can change.</Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="compass-outline" size={42} color="#8A9AB8" />
            <Text style={styles.emptyTitle}>No adventures added yet</Text>
            <Text style={styles.emptyText}>Add activity names to the adventure array for {place} in data/placedetails.ts.</Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Pressable onPress={() => setSelected(item)}>
              <Image
                source={{ uri: getPlaceImage("adventure", item.imageIndex) }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.imageShade} />
              <View style={styles.imageTop}>
                <View style={styles.typePill}><Text style={styles.typePillText}>ADVENTURE {String(index + 1).padStart(2, "0")}</Text></View>
                <View style={styles.imageIcon}><Ionicons name={item.info.icon} size={20} color={destination.color} /></View>
              </View>
              <View style={styles.imageTitleWrap}>
                <Text style={styles.imageTitle}>{item.name}</Text>
                <View style={styles.imageLocation}><Ionicons name="location" size={13} color="#fff" /><Text style={styles.imageLocationText}>{item.name}, {place}</Text></View>
              </View>
            </Pressable>

            <View style={styles.cardBody}>
              <Text style={styles.description} numberOfLines={3}>{item.info.description}</Text>
              <View style={styles.factsRow}>
                <Fact icon="time-outline" label={item.info.duration} />
                <Fact icon="fitness-outline" label={item.info.difficulty} />
              </View>
              <View style={styles.priceAndActions}>
                <View>
                  <Text style={styles.fromLabel}>STARTING FROM</Text>
                  <Text style={styles.price}>{formatINR(item.info.price)}<Text style={styles.perPerson}> / person</Text></Text>
                </View>
                <View style={styles.actions}>
                  <Pressable style={styles.mapButton} onPress={() => openMap(item.name)}>
                    <Ionicons name="map-outline" size={17} color={destination.color} />
                  </Pressable>
                  <Pressable style={[styles.bookButton, { backgroundColor: destination.color }]} onPress={() => startBooking(item)}>
                    <Text style={styles.bookText}>Book now</Text><Ionicons name="arrow-forward" size={15} color="#fff" />
                  </Pressable>
                </View>
              </View>
              <Pressable style={styles.detailsLink} onPress={() => setSelected(item)}>
                <Text style={[styles.detailsLinkText, { color: destination.color }]}>View full details</Text>
                <Ionicons name="chevron-forward" size={15} color={destination.color} />
              </Pressable>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.footerNote}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#188365" />
            <View style={{ flex: 1 }}>
              <Text style={styles.footerTitle}>Travel safely</Text>
              <Text style={styles.footerText}>Confirm the operator's credentials, exact meeting point, inclusions, cancellation terms and current conditions before paying.</Text>
            </View>
          </View>
        }
      />

      <Modal visible={!!selected && !bookingItem} transparent animationType="slide" onRequestClose={() => setSelected(null)}>
        {selected && (
          <View style={styles.modalBackdrop}>
            <View style={styles.sheet}>
              <View style={styles.handle} />
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.sheetHeader}>
                  <Text style={styles.sheetTitle}>{selected.name}</Text>
                  <Pressable onPress={() => setSelected(null)} style={styles.closeButton}><Ionicons name="close" size={21} color="#18315F" /></Pressable>
                </View>
                <Text style={styles.sheetLocation}><Ionicons name="location-outline" size={15} color="#74819A" /> {selected.name}, {place}, India</Text>
                <Text style={styles.sheetDescription}>{selected.info.description}</Text>
                <View style={styles.detailFactRow}>
                  <Fact icon="time-outline" label={selected.info.duration} />
                  <Fact icon="fitness-outline" label={selected.info.difficulty} />
                </View>
                <View style={styles.seasonBox}><Ionicons name="calendar-outline" size={18} color="#A46A19" /><Text style={styles.seasonText}>{selected.info.season}</Text></View>
                <Text style={styles.includesHeading}>What to expect</Text>
                {selected.info.includes.map((line) => (
                  <View key={line} style={styles.includeRow}><Ionicons name="checkmark-circle" size={17} color="#188365" /><Text style={styles.includeText}>{line}</Text></View>
                ))}
                <View style={styles.detailPriceRow}><View><Text style={styles.fromLabel}>ESTIMATED PRICE</Text><Text style={styles.detailPrice}>{formatINR(selected.info.price)} <Text style={styles.perPerson}>per person</Text></Text></View><Pressable style={[styles.detailMapButton, { borderColor: destination.color }]} onPress={() => openMap(selected.name)}><Ionicons name="navigate-outline" size={16} color={destination.color} /><Text style={[styles.detailMapText, { color: destination.color }]}>Location</Text></Pressable></View>
                <Pressable style={[styles.primaryButton, { backgroundColor: destination.color }]} onPress={() => { setSelected(null); startBooking(selected); }}><Text style={styles.primaryButtonText}>Book this adventure</Text><Ionicons name="arrow-forward" size={18} color="#fff" /></Pressable>
              </ScrollView>
            </View>
          </View>
        )}
      </Modal>

      <Modal visible={!!bookingItem} transparent animationType="slide" onRequestClose={() => setBookingItem(null)}>
        {bookingItem && (
          <View style={styles.modalBackdrop}>
            <View style={styles.bookingSheet}>
              <View style={styles.handle} />
              <View style={styles.sheetHeader}>
                <View style={{ flex: 1 }}><Text style={styles.sheetTitle}>Book your adventure</Text><Text style={styles.bookingName}>{bookingItem.name} · {place}</Text></View>
                <Pressable onPress={() => setBookingItem(null)} style={styles.closeButton}><Ionicons name="close" size={21} color="#18315F" /></Pressable>
              </View>
              <View style={[styles.totalCard, { backgroundColor: `${destination.color}12` }]}>
                <View style={[styles.totalIcon, { backgroundColor: destination.color }]}><Ionicons name={bookingItem.info.icon} size={23} color="#fff" /></View>
                <View style={{ flex: 1 }}><Text style={styles.totalCaption}>Estimated total</Text><Text style={styles.totalPrice}>{formatINR(bookingItem.info.price * people)}</Text><Text style={styles.totalCaption}>{formatINR(bookingItem.info.price)} × {people} {people === 1 ? "person" : "people"}</Text></View>
              </View>
              <Text style={styles.formLabel}>Choose a preferred date</Text>
              <View style={styles.dateRow}>
                {["30 Oct", "31 Oct", "01 Nov"].map((day) => <Pressable key={day} onPress={() => setDate(day)} style={[styles.dateButton, date === day && { backgroundColor: destination.color, borderColor: destination.color }]}><Ionicons name="calendar-outline" size={15} color={date === day ? "#fff" : destination.color} /><Text style={[styles.dateText, date === day && { color: "#fff" }]}>{day}</Text></Pressable>)}
              </View>
              <Text style={styles.formLabel}>Participants</Text>
              <View style={styles.participantRow}>
                <View><Text style={styles.participantTitle}>Number of people</Text><Text style={styles.participantSubtitle}>Confirm age limits with the operator.</Text></View>
                <View style={styles.counter}><Pressable style={styles.counterButton} onPress={() => setPeople((n) => Math.max(1, n - 1))}><Ionicons name="remove" size={17} color="#18315F" /></Pressable><Text style={styles.counterNumber}>{people}</Text><Pressable style={styles.counterButton} onPress={() => setPeople((n) => Math.min(20, n + 1))}><Ionicons name="add" size={17} color="#18315F" /></Pressable></View>
              </View>
              <View style={styles.disclaimer}><Ionicons name="information-circle-outline" size={17} color="#A46A19" /><Text style={styles.disclaimerText}>This is a demo booking request. Availability and final pricing are not confirmed until the local provider responds.</Text></View>
              <Pressable style={[styles.primaryButton, { backgroundColor: destination.color }]} onPress={submitBookingRequest}><Text style={styles.primaryButtonText}>Continue · {formatINR(bookingItem.info.price * people)}</Text><Ionicons name="arrow-forward" size={18} color="#fff" /></Pressable>
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
};

function Fact({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return <View style={styles.fact}><Ionicons name={icon} size={15} color="#63779F" /><Text style={styles.factText}>{label}</Text></View>;
}

export default Adventure;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F3F6FC" },
  listContent: { paddingBottom: 30 },
  hero: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 25, minHeight: 285, overflow: "hidden", borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  heroTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  heroIcon: { width: 45, height: 45, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
  heroEmoji: { fontSize: 23 },
  destinationTag: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 11, paddingVertical: 7, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.19)" },
  destinationTagText: { color: "#fff", fontSize: 10, fontWeight: "900", letterSpacing: 1 },
  heroTitle: { color: "#fff", fontSize: 35, lineHeight: 39, fontWeight: "900", marginTop: 28, letterSpacing: -0.6 },
  heroSubtitle: { color: "rgba(255,255,255,0.91)", fontSize: 13, lineHeight: 20, marginTop: 9, maxWidth: 310 },
  heroStats: { flexDirection: "row", gap: 16, marginTop: 18 },
  heroStat: { flexDirection: "row", alignItems: "center", gap: 6 },
  heroStatText: { color: "#fff", fontSize: 11, fontWeight: "800" },
  heroDecorationOne: { position: "absolute", width: 190, height: 190, borderRadius: 95, borderWidth: 28, borderColor: "rgba(255,255,255,0.07)", right: -62, bottom: -85 },
  heroDecorationTwo: { position: "absolute", width: 100, height: 100, borderRadius: 50, backgroundColor: "rgba(255,255,255,0.07)", right: 42, top: 92 },
  headingRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginTop: 24, gap: 12 },
  sectionHeading: { fontSize: 21, fontWeight: "900", color: "#17294D" },
  sectionSubheading: { fontSize: 12, color: "#7B879E", lineHeight: 17, marginTop: 5 },
  countBadge: { width: 42, height: 42, borderRadius: 14, backgroundColor: "#E4EBFF", alignItems: "center", justifyContent: "center" },
  countBadgeText: { color: "#3159B5", fontWeight: "900", fontSize: 16 },
  tipBanner: { flexDirection: "row", alignItems: "center", gap: 9, marginHorizontal: 18, marginTop: 17, marginBottom: 15, backgroundColor: "#EAF1FF", borderRadius: 14, padding: 12 },
  tipText: { flex: 1, color: "#536A95", fontSize: 11, lineHeight: 16 },
  card: { marginHorizontal: 16, marginBottom: 18, backgroundColor: "#fff", borderRadius: 23, overflow: "hidden", borderWidth: 1, borderColor: "#E5EBF5", elevation: 4, shadowColor: "#18325D", shadowOpacity: 0.08, shadowRadius: 13, shadowOffset: { width: 0, height: 6 } },
  cardImage: { width: "100%", height: 205, backgroundColor: "#D8E1F2" },
  imageShade: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: "rgba(8,19,42,0.12)" },
  imageTop: { position: "absolute", top: 13, left: 13, right: 13, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  typePill: { backgroundColor: "rgba(255,255,255,0.94)", paddingHorizontal: 10, paddingVertical: 7, borderRadius: 12 },
  typePillText: { color: "#34518B", fontSize: 9, fontWeight: "900", letterSpacing: 0.6 },
  imageIcon: { width: 39, height: 39, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.95)", alignItems: "center", justifyContent: "center" },
  imageTitleWrap: { position: "absolute", left: 15, right: 15, bottom: 14 },
  imageTitle: { color: "#fff", fontSize: 22, fontWeight: "900", textShadowColor: "rgba(0,0,0,0.4)", textShadowRadius: 6, textShadowOffset: { width: 0, height: 2 } },
  imageLocation: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 5 },
  imageLocationText: { color: "#fff", fontSize: 11, fontWeight: "700", textShadowColor: "rgba(0,0,0,0.4)", textShadowRadius: 5 },
  cardBody: { paddingHorizontal: 15, paddingTop: 14, paddingBottom: 13 },
  description: { color: "#65728C", fontSize: 12, lineHeight: 19 },
  factsRow: { flexDirection: "row", flexWrap: "wrap", gap: 7, marginTop: 13 },
  fact: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#F1F4FA", borderRadius: 9, paddingHorizontal: 9, paddingVertical: 7 },
  factText: { color: "#61718E", fontSize: 10, fontWeight: "700", flexShrink: 1 },
  priceAndActions: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 16 },
  fromLabel: { color: "#8994A9", fontSize: 8, fontWeight: "900", letterSpacing: 0.7 },
  price: { color: "#17294D", fontSize: 18, fontWeight: "900", marginTop: 4 },
  perPerson: { color: "#8490A5", fontSize: 10, fontWeight: "500" },
  actions: { flexDirection: "row", alignItems: "center", gap: 7 },
  mapButton: { width: 39, height: 39, borderRadius: 12, borderWidth: 1, borderColor: "#E1E8F6", alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  bookButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, paddingHorizontal: 14, height: 39, borderRadius: 12 },
  bookText: { color: "#fff", fontSize: 11, fontWeight: "900" },
  detailsLink: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", gap: 2, marginTop: 12, paddingVertical: 2 },
  detailsLinkText: { fontSize: 11, fontWeight: "900" },
  footerNote: { flexDirection: "row", gap: 10, marginHorizontal: 18, marginTop: 1, padding: 14, borderRadius: 16, backgroundColor: "#E9F8F1", borderWidth: 1, borderColor: "#D5F0E4" },
  footerTitle: { color: "#1A795F", fontSize: 12, fontWeight: "900" },
  footerText: { color: "#5B897B", fontSize: 11, lineHeight: 17, marginTop: 4 },
  empty: { alignItems: "center", marginHorizontal: 20, marginTop: 35, padding: 25, backgroundColor: "#fff", borderRadius: 20 },
  emptyTitle: { color: "#17294D", fontSize: 17, fontWeight: "900", marginTop: 12 },
  emptyText: { color: "#7B879E", fontSize: 12, textAlign: "center", lineHeight: 18, marginTop: 6 },
  modalBackdrop: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(12,24,51,0.48)" },
  sheet: { maxHeight: "88%", backgroundColor: "#fff", borderTopLeftRadius: 27, borderTopRightRadius: 27, paddingHorizontal: 19, paddingBottom: 25 },
  handle: { alignSelf: "center", width: 43, height: 5, borderRadius: 4, backgroundColor: "#D8DFEC", marginTop: 10, marginBottom: 15 },
  sheetHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  sheetTitle: { flex: 1, color: "#17294D", fontSize: 21, lineHeight: 27, fontWeight: "900" },
  closeButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#EFF3FA", alignItems: "center", justifyContent: "center" },
  sheetLocation: { color: "#77839A", fontSize: 12, marginTop: 10 },
  sheetDescription: { color: "#5E6C85", fontSize: 13, lineHeight: 21, marginTop: 14 },
  detailFactRow: { flexDirection: "row", flexWrap: "wrap", gap: 7, marginTop: 15 },
  seasonBox: { flexDirection: "row", alignItems: "center", gap: 8, padding: 11, borderRadius: 12, backgroundColor: "#FFF5E5", marginTop: 13 },
  seasonText: { color: "#94651F", fontSize: 11, fontWeight: "700", flex: 1 },
  includesHeading: { color: "#17294D", fontSize: 14, fontWeight: "900", marginTop: 19, marginBottom: 10 },
  includeRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 9 },
  includeText: { flex: 1, color: "#62718B", fontSize: 12, lineHeight: 17 },
  detailPriceRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 16, paddingTop: 14, borderTopWidth: 1, borderTopColor: "#EDF0F6" },
  detailPrice: { color: "#17294D", fontSize: 20, fontWeight: "900", marginTop: 4 },
  detailMapButton: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderRadius: 11 },
  detailMapText: { fontSize: 11, fontWeight: "900" },
  primaryButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 9, minHeight: 50, borderRadius: 14, marginTop: 17, marginBottom: 8 },
  primaryButtonText: { color: "#fff", fontSize: 13, fontWeight: "900" },
  bookingSheet: { backgroundColor: "#fff", borderTopLeftRadius: 27, borderTopRightRadius: 27, paddingHorizontal: 20, paddingBottom: 28 },
  bookingName: { color: "#7B879E", fontSize: 12, marginTop: 5 },
  totalCard: { flexDirection: "row", alignItems: "center", gap: 11, padding: 14, borderRadius: 17, marginTop: 18 },
  totalIcon: { width: 45, height: 45, borderRadius: 15, alignItems: "center", justifyContent: "center" },
  totalCaption: { color: "#77839A", fontSize: 10 },
  totalPrice: { color: "#17294D", fontSize: 23, fontWeight: "900", marginVertical: 3 },
  formLabel: { color: "#253A63", fontSize: 13, fontWeight: "900", marginTop: 19, marginBottom: 10 },
  dateRow: { flexDirection: "row", gap: 8 },
  dateButton: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5, paddingVertical: 12, borderWidth: 1, borderColor: "#DFE6F3", borderRadius: 12, backgroundColor: "#fff" },
  dateText: { color: "#31549D", fontSize: 11, fontWeight: "800" },
  participantRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 9 },
  participantTitle: { color: "#253A63", fontSize: 12, fontWeight: "800" },
  participantSubtitle: { color: "#8792A7", fontSize: 10, marginTop: 4 },
  counter: { flexDirection: "row", alignItems: "center", gap: 13 },
  counterButton: { width: 31, height: 31, borderRadius: 10, backgroundColor: "#EEF2FA", alignItems: "center", justifyContent: "center" },
  counterNumber: { minWidth: 15, textAlign: "center", color: "#17294D", fontSize: 15, fontWeight: "900" },
  disclaimer: { flexDirection: "row", alignItems: "flex-start", gap: 8, padding: 11, backgroundColor: "#FFF5E5", borderRadius: 12, marginTop: 15 },
  disclaimerText: { flex: 1, color: "#8D6C36", fontSize: 10, lineHeight: 15 },
});

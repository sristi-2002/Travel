import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { placedetails } from "../../data/placedetails";
import { getPlaceImage } from "../../data/placeMedia";

const Tourists = () => {
  const { place } = useLocalSearchParams<{ place: string }>();
  const { width } = useWindowDimensions();

  const isWide = width >= 700;
  const city = place || "Destination";

  const touristList =
    placedetails[city as keyof typeof placedetails]?.attractions || [];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const heroImage = getPlaceImage("attractions", 0);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#11151D" />

      <ImageBackground
        source={{ uri: heroImage }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.bgOverlay} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
              <View style={styles.brand}>
                <View style={styles.brandLogo}>
                  <Text style={styles.logoText}>✦</Text>
                </View>

                <View>
                  <Text style={styles.brandTitle}>{city}</Text>
                  <Text style={styles.brandSubtitle}>TRAVEL EXPLORER</Text>
                </View>
              </View>

              <Pressable style={styles.exploreButton}>
                <Text style={styles.exploreButtonText}>✧ Explore</Text>
              </Pressable>
            </View>

            {/* MAIN CONTENT */}
            <View
              style={[
                styles.content,
                isWide ? styles.contentWide : styles.contentMobile,
              ]}
            >
              {/* HERO DESTINATION */}
              <ImageBackground
                source={{ uri: heroImage }}
                style={[
                  styles.hero,
                  isWide ? styles.heroWide : styles.heroMobile,
                ]}
                imageStyle={styles.heroImage}
              >
                <View style={styles.heroShade} />

                <View style={styles.heroTopContent}>
                  <Text style={styles.heroEyebrow}>
                    YOUR NEXT ADVENTURE
                  </Text>

                  <Text
                    style={[
                      styles.heroTitle,
                      !isWide && styles.heroTitleMobile,
                    ]}
                    numberOfLines={2}
                  >
                    {city}
                  </Text>

                  <Text style={styles.heroSubtitle}>
                    Discover {city}
                  </Text>

                  <Text
                    style={[
                      styles.heroDescription,
                      !isWide && styles.heroDescriptionMobile,
                    ]}
                  >
                    Explore breathtaking landscapes, beautiful
                    destinations, local culture and unforgettable
                    experiences.
                  </Text>

                  <View style={styles.weatherPill}>
                    <Text style={styles.weatherIcon}>☁️</Text>

                    <View>
                      <Text style={styles.weatherTemp}>18°C</Text>
                      <Text style={styles.weatherCaption}>
                        Pleasant weather
                      </Text>
                    </View>
                  </View>
                </View>

                {/* HERO LOCATION FOOTER */}
                <View style={styles.heroFooter}>
                  <View style={styles.pin}>
                    <Text style={styles.pinText}>⌖</Text>
                  </View>

                  <View style={styles.footerLocation}>
                    <Text style={styles.footerCity}>{city}</Text>
                    <Text style={styles.footerCaption}>
                      Beautiful destination
                    </Text>
                  </View>

                  <Pressable style={styles.favoriteButton}>
                    <Text style={styles.favoriteText}>♡</Text>
                  </Pressable>
                </View>
              </ImageBackground>

              {/* TOURIST SPOTS */}
              <View
                style={[
                  styles.spotsPanel,
                  isWide && styles.spotsPanelWide,
                ]}
              >
                {/* TITLE */}
                <View style={styles.spotsHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.sectionTitle}>
                      Must-See Destinations
                    </Text>

                    <Text style={styles.sectionSubtitle}>
                      Places to explore in {city}
                    </Text>
                  </View>

                  <View style={styles.countBadge}>
                    <Text style={styles.countText}>
                      {touristList.length}
                    </Text>
                  </View>
                </View>

                {/* SPOT LIST */}
                {touristList.map((item, index) => (
                  <Pressable
                    key={`${item}-${index}`}
                    onPress={() => setSelectedIndex(index)}
                    style={({ pressed }) => [
                      styles.spotCard,
                      pressed && styles.spotPressed,
                      isWide && styles.spotCardWide,
                    ]}
                  >
                    <Image
                      source={{
                        uri: getPlaceImage("attractions", index),
                      }}
                      style={[
                        styles.spotImage,
                        isWide && styles.spotImageWide,
                      ]}
                    />

                    <View style={styles.spotDetails}>
                      <Text
                        style={styles.spotName}
                        numberOfLines={2}
                      >
                        {item}
                      </Text>

                      <Text
                        style={styles.spotCategory}
                        numberOfLines={1}
                      >
                        Tourist Attraction
                      </Text>

                      <Text style={styles.spotLocation}>
                        📍 {city}
                      </Text>
                    </View>

                    <View style={styles.spotArrow}>
                      <Text style={styles.arrowText}>›</Text>
                    </View>
                  </Pressable>
                ))}

                {touristList.length === 0 && (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>
                      No destinations found.
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* FOOTER */}
            <View style={styles.bottomFooter}>
              <Text style={styles.bottomFooterText}>
                DISCOVER  ·  EXPLORE  ·  EXPERIENCE
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>

      {/* PLACE DETAILS MODAL */}
      <Modal
        visible={selectedIndex !== null}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setSelectedIndex(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modal}>
            {selectedIndex !== null && (
              <>
                <Image
                  source={{
                    uri: getPlaceImage("attractions", selectedIndex),
                  }}
                  style={styles.modalImage}
                />

                <Pressable
                  onPress={() => setSelectedIndex(null)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeText}>✕</Text>
                </Pressable>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={styles.modalScroll}
                >
                  <View style={styles.modalBody}>
                    <Text style={styles.modalEyebrow}>
                      DESTINATION GUIDE
                    </Text>

                    <Text style={styles.modalTitle}>
                      {touristList[selectedIndex]}
                    </Text>

                    <Text style={styles.modalLocation}>
                      📍 {city}
                    </Text>

                    <View style={styles.separator} />

                    <Text style={styles.modalDescription}>
                      Discover {touristList[selectedIndex]} in {city}.
                      Explore its scenic beauty, experience the local
                      culture and enjoy a memorable visit to this
                      beautiful destination.
                    </Text>

                    <View style={styles.modalTag}>
                      <Text style={styles.modalTagText}>
                        ✦ Tourist Attraction
                      </Text>
                    </View>
                  </View>
                </ScrollView>

                <Pressable
                  style={styles.modalDone}
                  onPress={() => setSelectedIndex(null)}
                >
                  <Text style={styles.modalDoneText}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Tourists;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#11151D",
  },

  background: {
    flex: 1,
  },

  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(9,13,20,0.84)",
  },

  scrollContent: {
    flexGrow: 1,
    padding: 12,
  },

  container: {
    flex: 1,
    backgroundColor: "rgba(22,26,35,0.94)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 24,
    padding: 14,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  brandLogo: {
    width: 38,
    height: 38,
    borderRadius: 50,
    backgroundColor: "#C3A77B",
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    fontSize: 20,
    color: "#151820",
  },

  brandTitle: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "700",
  },

  brandSubtitle: {
    fontSize: 8,
    color: "#A4A8B1",
    letterSpacing: 1.3,
    marginTop: 3,
  },

  exploreButton: {
    backgroundColor: "rgba(255,255,255,0.09)",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  exploreButtonText: {
    color: "#D8D8D8",
    fontSize: 11,
  },

  /* CONTENT LAYOUT */

  content: {
    gap: 18,
  },

  contentWide: {
    flexDirection: "row",
    alignItems: "stretch",
  },

  contentMobile: {
    flexDirection: "column",
  },

  /* HERO */

  hero: {
    overflow: "hidden",
    borderRadius: 20,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },

  heroWide: {
    flex: 1,
    minHeight: 480,
  },

  heroMobile: {
    width: "100%",
    height: 230,
  },

  heroImage: {
    borderRadius: 20,
  },

  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(7,11,19,0.38)",
  },

  heroTopContent: {
    padding: 18,
  },

  heroEyebrow: {
    color: "#D5B98D",
    fontSize: 9,
    letterSpacing: 1.6,
    fontWeight: "700",
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "800",
    marginTop: 9,
  },

  heroTitleMobile: {
    fontSize: 32,
    marginTop: 6,
  },

  heroSubtitle: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 2,
  },

  heroDescription: {
    color: "#E0E3E8",
    fontSize: 12,
    lineHeight: 19,
    maxWidth: 280,
    marginTop: 12,
  },

  heroDescriptionMobile: {
    fontSize: 11,
    lineHeight: 16,
    maxWidth: 300,
    marginTop: 8,
  },

  weatherPill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    backgroundColor: "rgba(0,0,0,0.22)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: 12,
  },

  weatherIcon: {
    fontSize: 18,
  },

  weatherTemp: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  weatherCaption: {
    color: "#D7D7D7",
    fontSize: 9,
  },

  heroFooter: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(8,10,15,0.55)",
    margin: 9,
    borderRadius: 14,
    padding: 9,
  },

  pin: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  pinText: {
    fontSize: 18,
    color: "#B69A6F",
  },

  footerLocation: {
    flex: 1,
    marginLeft: 9,
  },

  footerCity: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  footerCaption: {
    color: "#BFC2C8",
    fontSize: 9,
    marginTop: 3,
  },

  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },

  favoriteText: {
    color: "#FFFFFF",
    fontSize: 19,
  },

  /* SPOTS */

  spotsPanel: {
    width: "100%",
  },

  spotsPanelWide: {
    flex: 1,
  },

  spotsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  sectionSubtitle: {
    color: "#A7ABB4",
    fontSize: 11,
    marginTop: 4,
  },

  countBadge: {
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: "rgba(195,167,123,0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(195,167,123,0.2)",
  },

  countText: {
    color: "#D5B98D",
    fontSize: 12,
    fontWeight: "700",
  },

  spotCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#242934",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.045)",
    borderRadius: 15,
    padding: 9,
    marginBottom: 10,
  },

  spotCardWide: {
    padding: 8,
    borderRadius: 12,
  },

  spotPressed: {
    opacity: 0.75,
  },

  spotImage: {
    width: 94,
    height: 82,
    borderRadius: 11,
  },

  spotImageWide: {
    width: 92,
    height: 72,
  },

  spotDetails: {
    flex: 1,
    paddingHorizontal: 11,
  },

  spotName: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  spotCategory: {
    color: "#B0B4BC",
    fontSize: 10,
    marginTop: 5,
  },

  spotLocation: {
    color: "#A7ADB7",
    fontSize: 10,
    marginTop: 5,
  },

  spotArrow: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "rgba(195,167,123,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },

  arrowText: {
    color: "#C3A77B",
    fontSize: 23,
    marginTop: -2,
  },

  emptyState: {
    padding: 25,
    backgroundColor: "#242934",
    borderRadius: 15,
  },

  emptyText: {
    color: "#AAAAAA",
    textAlign: "center",
  },

  /* FOOTER */

  bottomFooter: {
    alignItems: "center",
    paddingTop: 18,
    paddingBottom: 5,
  },

  bottomFooterText: {
    color: "#858B96",
    fontSize: 9,
    letterSpacing: 1.4,
  },

  /* MODAL */

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modal: {
    width: "100%",
    maxWidth: 450,
    maxHeight: "85%",
    borderRadius: 23,
    overflow: "hidden",
    backgroundColor: "#202630",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },

  modalImage: {
    width: "100%",
    height: 240,
  },

  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 50,
    backgroundColor: "rgba(0,0,0,0.65)",
    alignItems: "center",
    justifyContent: "center",
  },

  closeText: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  modalScroll: {
    flexGrow: 0,
  },

  modalBody: {
    padding: 20,
  },

  modalEyebrow: {
    color: "#C3A77B",
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: "700",
  },

  modalTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "800",
    marginTop: 8,
  },

  modalLocation: {
    color: "#C3A77B",
    fontSize: 12,
    marginTop: 8,
  },

  separator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 18,
  },

  modalDescription: {
    color: "#D0D4DB",
    fontSize: 14,
    lineHeight: 23,
  },

  modalTag: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(195,167,123,0.12)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 18,
  },

  modalTagText: {
    color: "#C3A77B",
    fontSize: 11,
  },

  modalDone: {
    backgroundColor: "#C3A77B",
    marginHorizontal: 18,
    marginBottom: 18,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  modalDoneText: {
    color: "#151820",
    fontSize: 14,
    fontWeight: "700",
  },
});
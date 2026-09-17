import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";

import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Animated, Easing} from "react-native";
import { useEffect, useRef } from "react";
type RoomType = {
  id: string;
  name: string;
  bed: string;
  price: number;
  maxAdults: number;
  maxChildren: number;
  hasAcOption: boolean;
  acPrice: number;
  breakfastPrice: number;
  lunchPrice: number;
  poolPrice: number;
  features: string[];
};

const HotelDetails = () => {
  const images = [
    require("../../assets/images/h1.png"),
    require("../../assets/images/h1.png"),
    require("../../assets/images/h1.png"),
    require("../../assets/images/h1.png"),
  ];

  // --------------------------------------------------
  // COUNTERS
  // --------------------------------------------------

  const [rooms, setrooms] = useState(1);
  const [childs, setchilds] = useState(0);
  const [adults, setadults] = useState(1);

  // --------------------------------------------------
  // ROOM TYPES
  // --------------------------------------------------

  // Price rotation
const flipAnim = useRef(new Animated.Value(0)).current;

const [showBookingModal, setShowBookingModal] = useState(false);
useEffect(() => {
  const animation = Animated.loop(
    Animated.sequence([
      Animated.delay(5000),

      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.delay(5000),

      Animated.timing(flipAnim, {
        toValue: 0,
        duration: 700,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ])
  );

  animation.start();

  return () => {
    animation.stop();
  };
}, []);
const frontRotate = flipAnim.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "180deg"],
});

const backRotate = flipAnim.interpolate({
  inputRange: [0, 1],
  outputRange: ["180deg", "360deg"],
});

  const roomTypes: RoomType[] = [
  {
    id: "single",
    name: "Single Room",
    bed: "1 Single Bed",
    price: 2000,

    maxAdults: 2,
    maxChildren: 0,

    hasAcOption: true,
    acPrice: 500,

    breakfastPrice: 300,
    lunchPrice: 500,
    poolPrice: 300,

    features: [
      "Free WiFi",
      "Air Conditioning",
      "Room Service",
    ],
  },

  {
    id: "double",
    name: "Double Room",
    bed: "1 Double Bed",
    price: 3500,

    maxAdults: 3,
    maxChildren: 2,

    hasAcOption: true,
    acPrice: 700,

    breakfastPrice: 400,
    lunchPrice: 600,
    poolPrice: 300,

    features: [
      "Free WiFi",
      "Air Conditioning",
      "Room Service",
    ],
  },

  {
    id: "twin",
    name: "Twin Room",
    bed: "2 Single Beds",
    price: 3500,

    maxAdults: 6,
    maxChildren: 2,

    hasAcOption: false,
    acPrice: 0,

    breakfastPrice: 0,
    lunchPrice: 0,
    poolPrice: 0,

    features: [
      "Free WiFi",
      "Room Service",
    ],
  },

  {
    id: "deluxe",
    name: "Deluxe Room",
    bed: "1 King Size Bed",
    price: 5000,

    maxAdults: 4,
    maxChildren: 2,

    hasAcOption: false,
    acPrice: 0,

    breakfastPrice: 0,
    lunchPrice: 0,
    poolPrice: 0,

    features: [
      "Free WiFi",
      "Room Service",
      "King Size Bed",
    ],
  },
];

const increaseAdults = () => {
  if (adults < selectedRoom.maxAdults) {
    setadults(adults + 1);
  }
};

const decreaseAdults = () => {
  if (adults > 1) {
    setadults(adults - 1);
  }
};

const increaseChildren = () => {
  if (childs < selectedRoom.maxChildren) {
    setchilds(childs + 1);
  }
};

const decreaseChildren = () => {
  if (childs > 0) {
    setchilds(childs - 1);
  }
};

  // --------------------------------------------------
  // SELECTED ROOM
  // --------------------------------------------------
const [selectedRoom, setSelectedRoom] = useState<RoomType>(roomTypes[0]);

  // --------------------------------------------------
  // ROOM OPTIONS
  // --------------------------------------------------

  const [isAcRoom, setIsAcRoom] = useState(false);

  // --------------------------------------------------
  // EXTRA SERVICES
  // --------------------------------------------------

  const [breakfast, setBreakfast] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [poolAccess, setPoolAccess] = useState(false);

  // --------------------------------------------------
  // NIGHTS
  // --------------------------------------------------

  const nights = 2;

  // --------------------------------------------------
  // EXTRA PRICE
  // --------------------------------------------------
const extraCost =
  (selectedRoom.hasAcOption && isAcRoom
    ? selectedRoom.acPrice
    : 0) +
  (breakfast ? selectedRoom.breakfastPrice : 0) +
  (lunch ? selectedRoom.lunchPrice : 0) +
  (poolAccess ? selectedRoom.poolPrice : 0);

const roomPrice = selectedRoom.price + extraCost;

  const totalCost =
    (selectedRoom.price + extraCost) * rooms * nights;

  // --------------------------------------------------
  // SELECT ROOM
  // --------------------------------------------------

 const handleRoomSelect = (room: RoomType) => {
  setSelectedRoom(room);

  setBreakfast(false);
  setLunch(false);
  setPoolAccess(false);
  setIsAcRoom(false);

  // Keep current values within the new room's limits
  setadults((prev) => Math.min(prev, room.maxAdults));
  setchilds((prev) => Math.min(prev, room.maxChildren));
};

  return (
    <View style={styles.container}>

      {/* ==================================================
          SCROLLABLE HOTEL CONTENT
      ================================================== */}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >

        {/* MAIN IMAGE */}

        <Image
          source={require("../../assets/images/h1.png")}
          style={styles.image}
        />

        {/* ==================================================
            IMAGES
        ================================================== */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={styles.selectimage}
            />
          ))}
        </ScrollView>

        {/* ==================================================
            DESCRIPTION
        ================================================== */}

        <View style={styles.descriptionCard}>

          <Text style={styles.descriptionTitle}>
            Hotel Description
          </Text>

          <Text style={styles.description}>
            Hotel is very big.............
            {"\n"}
            ..............................................
            {"\n"}
            ..............................................
          </Text>

        </View>

        {/* ==================================================
            AMENITIES
        ================================================== */}

        <Text style={styles.sectionTitle}>
          Amenities
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.amenitiesContainer}
        >

          <View style={styles.amenityItem}>
            <Ionicons name="wifi-outline" size={22} />
            <Text style={styles.amenityText}>
              WiFi
            </Text>
          </View>

          <View style={styles.amenityItem}>
            <Ionicons name="car-outline" size={22} />
            <Text style={styles.amenityText}>
              Parking
            </Text>
          </View>

          <View style={styles.amenityItem}>
            <Ionicons
              name="restaurant-outline"
              size={22}
            />
            <Text style={styles.amenityText}>
              Restaurant
            </Text>
          </View>

          <View style={styles.amenityItem}>
            <Ionicons name="water-outline" size={22} />
            <Text style={styles.amenityText}>
              Pool
            </Text>
          </View>

          <View style={styles.amenityItem}>
            <Ionicons
              name="shield-checkmark-outline"
              size={22}
            />
            <Text style={styles.amenityText}>
              Security
            </Text>
          </View>

          <View style={styles.amenityItem}>
            <Ionicons
              name="business-outline"
              size={22}
            />
            <Text style={styles.amenityText}>
              Business
            </Text>
          </View>

        </ScrollView>

        {/* ==================================================
            HOTEL DESCRIPTION CARD
        ================================================== */}

        <View style={styles.hotelbookingCard}>

          <Text style={styles.hoteldescriptionTitle}>
            Experience comfort and convenience at our
            beautiful hotel, designed to make every stay
            memorable. Enjoy spacious and well-appointed
            rooms, modern amenities, complimentary Wi-Fi,
            delicious dining options, and exceptional
            hospitality.

            {"\n\n"}

            Whether you're traveling for business or
            leisure, our hotel offers a relaxing environment
            and easy access to popular attractions and
            essential services. Book your stay with us and
            enjoy a comfortable, convenient, and
            unforgettable experience.
          </Text>

        </View>

        {/* ==================================================
            BOOK YOUR ROOM
        ================================================== */}

        <Text style={styles.bookTitle}>
          Book Your Room
        </Text>

        {/* ==================================================
            ROOM TYPE BUTTONS
        ================================================== */}

        <View style={styles.roomTypeRow}>

          {roomTypes.map((room) => {

            const isSelected =
              selectedRoom?.id === room.id;

            return (
              <Pressable
                key={room.id}
                onPress={() => handleRoomSelect(room)}
                style={[
                  styles.roomTypeButton,
                  isSelected &&
                    styles.roomTypeButtonSelected,
                ]}
              >

                <Text
                  style={[
                    styles.roomTypeButtonText,
                    isSelected &&
                      styles.roomTypeButtonTextSelected,
                  ]}
                >
                  {room.name}
                </Text>

              </Pressable>
            );
          })}

        </View>

        {/* ==================================================
            SELECTED ROOM DETAILS CARD
        ================================================== */}

        <View style={styles.selectedRoomCard}>

          {/* ROOM HEADER */}

          <View style={styles.selectedRoomHeader}>

            <View style={styles.selectedRoomHeaderLeft}>

              <Text style={styles.selectedRoomTitle}>
                {selectedRoom.name}
              </Text>

              <View style={styles.roomBasicInfo}>

                <View style={styles.basicInfoItem}>
                  <Ionicons
                    name="bed-outline"
                    size={16}
                  />

                  <Text style={styles.basicInfoText}>
                    {selectedRoom.bed}
                  </Text>
                </View>

                <View style={styles.basicInfoItem}>
                  <Ionicons
                    name="people-outline"
                    size={16}
                  />

                  <Text style={styles.basicInfoText}>
                    {selectedRoom.maxAdults + selectedRoom.maxChildren} Guests
                  </Text>
                </View>

              </View>

            </View>

            <View style={styles.roomPriceBox}>

              <Text style={styles.roomPrice}>
                ₹
                {selectedRoom.price.toLocaleString(
                  "en-IN"
                )}
              </Text>

              <Text style={styles.perNight}>
                per night
              </Text>

            </View>

          </View>

          {/* ==================================================
              MEAL OPTIONS
          ================================================== */}

          <Text style={styles.extraTitle}>
  Meal Options
</Text>

{/* AC / NON-AC */}
{selectedRoom.hasAcOption && (
  <View style={styles.extraRow}>
    <View style={styles.extraLeft}>
      <Ionicons
        name="snow-outline"
        size={20}
      />

      <View style={styles.extraTextContainer}>
        <Text style={styles.extraName}>
          Room Type
        </Text>

        <Text style={styles.extraDescription}>
          Choose AC or Non-AC room
        </Text>
      </View>
    </View>

    <View style={styles.extraButtons}>

      {/* NON-AC */}
      <Pressable
        onPress={() => setIsAcRoom(false)}
        style={[
          styles.extraButton,
          !isAcRoom && styles.extraButtonActive,
        ]}
      >
        <Text
          style={[
            styles.extraButtonText,
            !isAcRoom && styles.extraButtonTextActive,
          ]}
        >
          Non-AC
        </Text>

        <Text
          style={[
            styles.extraPrice,
            !isAcRoom && styles.extraButtonTextActive,
          ]}
        >
          Included
        </Text>
      </Pressable>

      {/* AC */}
      <Pressable
        onPress={() => setIsAcRoom(true)}
        style={[
          styles.extraButton,
          isAcRoom && styles.extraButtonActive,
        ]}
      >
        <Text
          style={[
            styles.extraButtonText,
            isAcRoom && styles.extraButtonTextActive,
          ]}
        >
          AC
        </Text>

        <Text
          style={[
            styles.extraPrice,
            isAcRoom && styles.extraButtonTextActive,
          ]}
        >
          +₹{selectedRoom.acPrice}
        </Text>
      </Pressable>

    </View>
  </View>
)}

          {/* BREAKFAST */}

          <View style={styles.extraRow}>

            <View style={styles.extraLeft}>

              <Ionicons
                name="restaurant-outline"
                size={20}
              />

              <View style={styles.extraTextContainer}>

                <Text style={styles.extraName}>
                  Breakfast
                </Text>

                <Text style={styles.extraDescription}>
                  Breakfast during your stay
                </Text>

              </View>

            </View>

            <View style={styles.extraButtons}>

              <Pressable
                onPress={() => setBreakfast(false)}
                style={[
                  styles.extraButton,
                  !breakfast &&
                    styles.extraButtonActive,
                ]}
              >

                <Text
                  style={[
                    styles.extraButtonText,
                    !breakfast &&
                      styles.extraButtonTextActive,
                  ]}
                >
                  Without
                </Text>

              </Pressable>

              <Pressable
                onPress={() => setBreakfast(true)}
                style={[
                  styles.extraButton,
                  breakfast &&
                    styles.extraButtonActive,
                ]}
              >

                <Text
                  style={[
                    styles.extraButtonText,
                    breakfast &&
                      styles.extraButtonTextActive,
                  ]}
                >
                  With
                </Text>

                <Text
                  style={[
                    styles.extraPrice,
                    breakfast &&
                      styles.extraButtonTextActive,
                  ]}
                >
                  {selectedRoom.breakfastPrice === 0
                    ? "FREE"
                    : `+₹${selectedRoom.breakfastPrice}`}
                </Text>

              </Pressable>

            </View>

          </View>

          {/* ==================================================
              LUNCH
          ================================================== */}

          <View style={styles.extraRow}>

            <View style={styles.extraLeft}>

              <Ionicons
                name="restaurant-outline"
                size={20}
              />

              <View style={styles.extraTextContainer}>

                <Text style={styles.extraName}>
                  Lunch
                </Text>

                <Text style={styles.extraDescription}>
                  Lunch during your stay
                </Text>

              </View>

            </View>

            <View style={styles.extraButtons}>

              <Pressable
                onPress={() => setLunch(false)}
                style={[
                  styles.extraButton,
                  !lunch &&
                    styles.extraButtonActive,
                ]}
              >

                <Text
                  style={[
                    styles.extraButtonText,
                    !lunch &&
                      styles.extraButtonTextActive,
                  ]}
                >
                  Without
                </Text>

              </Pressable>

              <Pressable
                onPress={() => setLunch(true)}
                style={[
                  styles.extraButton,
                  lunch &&
                    styles.extraButtonActive,
                ]}
              >

                <Text
                  style={[
                    styles.extraButtonText,
                    lunch &&
                      styles.extraButtonTextActive,
                  ]}
                >
                  With
                </Text>

                <Text
                  style={[
                    styles.extraPrice,
                    lunch &&
                      styles.extraButtonTextActive,
                  ]}
                >
                  {selectedRoom.lunchPrice === 0
                    ? "FREE"
                    : `+₹${selectedRoom.lunchPrice}`}
                </Text>

              </Pressable>

            </View>

          </View>

          {/* ==================================================
              SWIMMING POOL
          ================================================== */}

          <View style={styles.extraRow}>

            <View style={styles.extraLeft}>

              <Ionicons
                name="water-outline"
                size={20}
              />

              <View style={styles.extraTextContainer}>

                <Text style={styles.extraName}>
                  Swimming Pool
                </Text>

                <Text style={styles.extraDescription}>
                  Swimming pool access
                </Text>

              </View>

            </View>

            <View style={styles.extraButtons}>

              <Pressable
                onPress={() => setPoolAccess(false)}
                style={[
                  styles.extraButton,
                  !poolAccess &&
                    styles.extraButtonActive,
                ]}
              >

                <Text
                  style={[
                    styles.extraButtonText,
                    !poolAccess &&
                      styles.extraButtonTextActive,
                  ]}
                >
                  No
                </Text>

              </Pressable>

              <Pressable
                onPress={() => setPoolAccess(true)}
                style={[
                  styles.extraButton,
                  poolAccess &&
                    styles.extraButtonActive,
                ]}
              >

                <Text
                  style={[
                    styles.extraButtonText,
                    poolAccess &&
                      styles.extraButtonTextActive,
                  ]}
                >
                  Yes
                </Text>

                <Text
                  style={[
                    styles.extraPrice,
                    poolAccess &&
                      styles.extraButtonTextActive,
                  ]}
                >
                  {selectedRoom.poolPrice === 0
                    ? "FREE"
                    : `+₹${selectedRoom.poolPrice}`}
                </Text>

              </Pressable>

            </View>

          </View>

          {/* ==================================================
              ROOM FEATURES
          ================================================== */}

          <Text style={styles.extraTitle}>
            Room Includes
          </Text>

          <View style={styles.featuresContainer}>

            {selectedRoom.features.map(
              (feature, index) => (
                <View
                  key={index}
                  style={styles.featureItem}
                >

                  <Ionicons
                    name="checkmark-circle"
                    size={17}
                    color="#00194a"
                  />

                  <Text style={styles.featureText}>
                    {feature}
                  </Text>

                </View>
              )
            )}

          </View>

        </View>

        {/* ==================================================
            ROOM / CHILDREN / ADULTS
        ================================================== */}

        <View style={styles.bookingCard}>

          {/* ROOMS */}

          <View style={styles.bookingItem}>

            <Ionicons
              name="bed"
              size={22}
            />

            <View style={styles.counter}>

              <Pressable
                onPress={() =>
                  setrooms(Math.max(1, rooms - 1))
                }
              >
                <Ionicons
                  name="remove"
                  size={16}
                />
              </Pressable>

              <Text style={styles.bookingValue}>
                {rooms}
              </Text>

              <Pressable
                onPress={() =>
                  setrooms(rooms + 1)
                }
              >
                <Ionicons
                  name="add"
                  size={16}
                />
              </Pressable>

            </View>

            <Text style={styles.bookingLabel}>
              Rooms
            </Text>

          </View>

          {/* CHILDREN */}

          <View style={styles.bookingItem}>

            <Ionicons
              name="happy-outline"
              size={22}
            />

            <View style={styles.counter}>

              <Pressable
                onPress={decreaseChildren}
              >
                <Ionicons
                  name="remove"
                  size={16}
                />
              </Pressable>

              <Text style={styles.bookingValue}>
                {childs}
              </Text>

              <Pressable
                onPress={increaseChildren}
              >
                <Ionicons
                  name="add"
                  size={16}
                />
              </Pressable>

            </View>

            <Text style={styles.bookingLabel}>
              Children
            </Text>

          </View>

          {/* ADULTS */}

          <View style={styles.bookingItem}>

            <Ionicons
              name="man"
              size={22}
            />

            <View style={styles.counter}>

              <Pressable
               onPress={decreaseAdults}
              >
                <Ionicons
                  name="remove"
                  size={16}
                />
              </Pressable>

              <Text style={styles.bookingValue}>
                {adults}
              </Text>

              <Pressable
                onPress={increaseAdults}
              >
                <Ionicons
                  name="add"
                  size={16}
                />
              </Pressable>

            </View>

            <Text style={styles.bookingLabel}>
              Adults
            </Text>

          </View>

        </View>
        </ScrollView>

      {/* ==================================================
          FIXED BOTTOM BOOKING BAR
      ================================================== */}

      <View style={styles.bottomContainer}>

        {/* CHECK IN */}

        <Pressable style={styles.dateCard}>

          <Ionicons
            name="calendar-outline"
            color="#ffffff"
            size={20}
          />

          <View>

            <Text style={styles.infoLabel}>
              Check-in
            </Text>

            <Text style={styles.infoValue}>
              12 Aug
            </Text>

          </View>

        </Pressable>

        {/* PRICE */}

      <View style={styles.flipContainer}>

  {/* PRICE SIDE */}
  <Animated.View
    style={[
      styles.priceCircle,
      {
        transform: [{ rotateY: frontRotate }],
      },
    ]}
  >
    <Text style={styles.priceLabel}>
      Price
    </Text>

    <Text style={styles.priceValue}>
      ₹{totalCost.toLocaleString("en-IN")}
    </Text>
  </Animated.View>


  {/* BOOK NOW SIDE */}
  <Animated.View
    style={[
      styles.priceCircle,
      styles.bookCircle,
      {
        transform: [{ rotateY: backRotate }],
      },
    ]}
  >
    <Pressable
      onPress={() => setShowBookingModal(true)}
    >
      <Text style={styles.bookText}>
        Book Now
      </Text>
    </Pressable>
  </Animated.View>

</View>

        {/* CHECK OUT */}

        <Pressable style={styles.dateCard}>

          <Ionicons
            name="calendar-outline"
            color="#ffffff"
            size={20}
          />

          <View>

            <Text style={styles.infoLabel}>
              Check-out
            </Text>

            <Text style={styles.infoValue}>
              14 Aug
            </Text>

          </View>

        </Pressable>

      </View>

    </View>
  );
};

export default HotelDetails;


// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({
  flipContainer: {
  width: 130,
  height: 130,
  position: "relative",
},

priceCircle: {
  width: 130,
  height: 130,
  borderRadius: 65,
  position: "absolute",
  justifyContent: "center",
  alignItems: "center",
  backfaceVisibility: "hidden",
},

bookCircle: {
  backfaceVisibility: "hidden",
},

  // ----------------------------------------------------
  // MAIN CONTAINER
  // ----------------------------------------------------

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 120,
  },

  // ----------------------------------------------------
  // IMAGE
  // ----------------------------------------------------

  image: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  selectimage: {
    width: 150,
    height: 120,
    marginTop: 10,
    marginRight: 10,
    borderRadius: 20,
  },

  // ----------------------------------------------------
  // DESCRIPTION
  // ----------------------------------------------------

  descriptionCard: {
    backgroundColor: "#fff",
    alignItems: "flex-start",
    borderRadius: 20,

    marginTop: 0,
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20,

    paddingHorizontal: 10,
    paddingVertical: 10,

    shadowColor: "#000",
    elevation: 3,
  },

  descriptionTitle: {
    fontSize: 20,
    fontWeight: "bold",

    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },

  description: {
    fontSize: 20,

    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",

    textAlign: "center",

    fontWeight: "bold",

    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
  },

  // ----------------------------------------------------
  // AMENITIES
  // ----------------------------------------------------

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",

    marginLeft: 25,
    marginBottom: 2,
  },

  amenitiesContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },

  amenityItem: {
    width: 70,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 15,
  },

  amenityText: {
    fontSize: 11,
    color: "gray",

    marginTop: 5,

    textAlign: "center",
  },

  // ----------------------------------------------------
  // HOTEL DESCRIPTION CARD
  // ----------------------------------------------------

  hotelbookingCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    backgroundColor: "#fff",

    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,

    paddingVertical: 15,

    borderRadius: 15,

    elevation: 3,
  },

  hoteldescriptionTitle: {
    fontSize: 15,

    marginTop: 20,

    textAlign: "center",

    color: "gray",

    marginBottom: 10,
    marginLeft: 10,
    marginHorizontal: 20,
  },

  // ----------------------------------------------------
  // BOOK TITLE
  // ----------------------------------------------------

  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",

    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },

  // ----------------------------------------------------
  // ROOM TYPE BUTTONS
  // ----------------------------------------------------

  roomTypeRow: {
    flexDirection: "row",
    flexWrap: "wrap",

    gap: 10,

    paddingBottom: 10,
    paddingTop: 30,
    paddingHorizontal: 20,
  },

  roomTypeButton: {
    width: "48%",
    minHeight: 50,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 10,

    backgroundColor: "#f1f1f1",

    borderWidth: 1,
    borderColor: "#ddd",
  },

  roomTypeButtonSelected: {
    backgroundColor: "#222",
    borderColor: "#222",
  },

  roomTypeButtonText: {
    fontSize: 14,
    fontWeight: "600",

    color: "#555",
  },

  roomTypeButtonTextSelected: {
    color: "#fff",
  },

  // ----------------------------------------------------
  // SELECTED ROOM CARD
  // ----------------------------------------------------

  selectedRoomCard: {
    backgroundColor: "#ffffff",

    marginHorizontal: 20,
    marginTop: 5,
    marginBottom: 20,

    padding: 15,

    borderRadius: 16,

    elevation: 3,

    borderWidth: 1,
    borderColor: "#eeeeee",
  },

  selectedRoomHeader: {
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "flex-start",

    paddingBottom: 15,

    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  selectedRoomHeaderLeft: {
    flex: 1,
  },

  selectedRoomTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  roomBasicInfo: {
    marginTop: 8,

    flexDirection: "column",

    gap: 6,
  },

  basicInfoItem: {
    flexDirection: "row",
    alignItems: "center",

    gap: 6,
  },

  basicInfoText: {
    fontSize: 12,
    color: "#777",
  },

  roomPriceBox: {
    alignItems: "flex-end",
  },

  roomPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#00194a",
  },

  perNight: {
    fontSize: 10,
    color: "#888",
    marginTop: 2,
  },

  // ----------------------------------------------------
  // EXTRA OPTIONS
  // ----------------------------------------------------

  extraTitle: {
    fontSize: 14,
    fontWeight: "700",

    color: "#222",

    marginTop: 15,
    marginBottom: 10,
  },

  extraRow: {
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 12,

    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  extraLeft: {
    flexDirection: "row",
    alignItems: "center",

    flex: 1,

    gap: 10,
  },

  extraTextContainer: {
    flex: 1,
  },

  extraName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },

  extraDescription: {
    fontSize: 10,
    color: "#999",

    marginTop: 3,
  },

  extraButtons: {
    flexDirection: "row",
    gap: 5,
  },
bookText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
  },
  extraButton: {
    minWidth: 58,
    minHeight: 38,

    paddingHorizontal: 7,

    borderRadius: 8,

    borderWidth: 1,
    borderColor: "#ddd",

    backgroundColor: "#fff",

    alignItems: "center",
    justifyContent: "center",
  },

  extraButtonActive: {
    backgroundColor: "#00194a",
    borderColor: "#00194a",
  },

  extraButtonText: {
    fontSize: 9,
    fontWeight: "600",

    color: "#555",
  },

  extraButtonTextActive: {
    color: "#fff",
  },

  extraPrice: {
    fontSize: 8,

    color: "#00194a",

    marginTop: 2,

    fontWeight: "600",
  },

  // ----------------------------------------------------
  // FEATURES
  // ----------------------------------------------------

  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",

    gap: 10,

    marginTop: 5,
  },

  featureItem: {
    flexDirection: "row",

    alignItems: "center",

    width: "47%",

    gap: 5,
  },

  featureText: {
    fontSize: 11,
    color: "#555",

    flex: 1,
  },

  // ----------------------------------------------------
  // ROOM / CHILDREN / ADULTS
  // ----------------------------------------------------

  bookingCard: {
    flexDirection: "row",

    justifyContent: "space-around",
    alignItems: "center",

    backgroundColor: "#fff",

    marginHorizontal: 20,
    marginBottom: 20,

    paddingVertical: 5,

    borderRadius: 15,

    elevation: 3,
  },

  bookingItem: {
    alignItems: "center",
  },

  counter: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 1,

    gap: 8,
  },

  bookingValue: {
    fontSize: 16,
    fontWeight: "bold",

    marginTop: 4,
  },

  bookingLabel: {
    fontSize: 12,
    color: "gray",

    marginTop: 2,
  },

  // ----------------------------------------------------
  // FIXED BOTTOM BAR
  // ----------------------------------------------------

  bottomContainer: {
    position: "absolute",

    bottom: 0,
    left: 0,
    right: 0,

    height: 80,

    backgroundColor: "#ffffff",

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 8,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    elevation: 10,

    zIndex: 100,
  },

  dateCard: {
    width: 125,
    height: 55,

    backgroundColor: "#00194a",

    borderRadius: 15,

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    gap: 6,

    elevation: 4,

    zIndex: 2,
  },


  infoLabel: {
    fontSize: 9,
    color: "#ffffff",
  },

  infoValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  priceLabel: {
    fontSize: 11,
    color: "#FFFFFF",
  },

  priceValue: {
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
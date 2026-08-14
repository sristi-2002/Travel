import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
const HotelDetails = () => {
  const images = [
    require("../../assets/images/h1.png"),
    require("../../assets/images/h1.png"),
    require("../../assets/images/h1.png"),
    require("../../assets/images/h1.png"),
  ];
  const [rooms, setrooms] = useState(1);
  const [childs, setchilds] = useState(1);
  const [adults, setadults] = useState(1);

const roomPrice = 5000;
const nights = 2;

const totalCost = roomPrice * rooms * nights;
  return (
  <ScrollView
    style={{ flex: 1 }}
    contentContainerStyle={{ paddingBottom: 30 }}
    showsVerticalScrollIndicator={false}
  >

    <Image
      source={require("../../assets/images/h1.png")}
      style={styles.image}
    />

    {/* Images */}
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

    {/* Description */}
    <View style={styles.descriptionCard}>
      <Text style={styles.descriptionTitle}>
        Hotel Description
      </Text>

      <Text style={styles.description}>
        Hotel is very big.............
        ..............................................
        ..............................................
      </Text>
    </View>

   

    {/* Your amenities here */}
{/* Amenities */}
<Text style={styles.sectionTitle}>Amenities</Text>

<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.amenitiesContainer}
>
  <View style={styles.amenityItem}>
    <Ionicons name="wifi-outline" size={22} />
    <Text style={styles.amenityText}>WiFi</Text>
  </View>

  <View style={styles.amenityItem}>
    <Ionicons name="car-outline" size={22} />
    <Text style={styles.amenityText}>Parking</Text>
  </View>

  <View style={styles.amenityItem}>
    <Ionicons name="restaurant-outline" size={22} />
    <Text style={styles.amenityText}>Restaurant</Text>
  </View>

  <View style={styles.amenityItem}>
    <Ionicons name="water-outline" size={22} />
    <Text style={styles.amenityText}>Pool</Text>
  </View>

  <View style={styles.amenityItem}>
    <Ionicons name="shield-checkmark-outline" size={22} />
    <Text style={styles.amenityText}>Security</Text>
  </View>

  <View style={styles.amenityItem}>
    <Ionicons name="business-outline" size={22} />
    <Text style={styles.amenityText}>Business</Text>
  </View>
</ScrollView>

    {/* BOOKING CARD */}
    <Text style={styles.bookTitle}>
      Book Your Room
    </Text>

    <View style={styles.bookingCard}>

      {/* Rooms */}
      <View style={styles.bookingItem}>
        <Ionicons name="bed" size={22} />

        <View style={styles.counter}>
          <Pressable
            onPress={() => setrooms(Math.max(1, rooms - 1))}
          >
            <Ionicons name="remove" size={16} />
          </Pressable>

          <Text style={styles.bookingValue}>
            {rooms}
          </Text>

          <Pressable
            onPress={() => setrooms(rooms + 1)}
          >
            <Ionicons name="add" size={16} />
          </Pressable>
        </View>

        <Text style={styles.bookingLabel}>
          Rooms
        </Text>
      </View>


      {/* Children */}
      <View style={styles.bookingItem}>
        <Ionicons name="happy-outline" size={22} />

        <View style={styles.counter}>
          <Pressable
            onPress={() => setchilds(Math.max(0, childs - 1))}
          >
            <Ionicons name="remove" size={16} />
          </Pressable>

          <Text style={styles.bookingValue}>
            {childs}
          </Text>

          <Pressable
            onPress={() => setchilds(childs + 1)}
          >
            <Ionicons name="add" size={16} />
          </Pressable>
        </View>

        <Text style={styles.bookingLabel}>
          Children
        </Text>
      </View>


      {/* Adults */}
      <View style={styles.bookingItem}>
        <Ionicons name="man" size={22} />

        <View style={styles.counter}>
          <Pressable
            onPress={() => setadults(Math.max(1, adults - 1))}
          >
            <Ionicons name="remove" size={16} />
          </Pressable>

          <Text style={styles.bookingValue}>
            {adults}
          </Text>

          <Pressable
            onPress={() => setadults(adults + 1)}
          >
            <Ionicons name="add" size={16} />
          </Pressable>
        </View>

        <Text style={styles.bookingLabel}>
          Adults
        </Text>
      </View>

    </View>
{/* FIXED BOTTOM BOOKING BAR */}
<View style={styles.bottomContainer}>

  {/* Check In */}
  <Pressable style={styles.dateCard}>
    <Ionicons name="calendar-outline" color = "#ffffff" size={20} />

    <View>
      <Text style={styles.infoLabel}>Check-in</Text>
      <Text style={styles.infoValue}>12 Aug</Text>
    </View>
  </Pressable>


  {/* Floating Price */}
  <Pressable style={styles.priceCircle}>
    <Text style={styles.priceLabel}>Price</Text>
    <Text style={styles.priceValue}>₹5,000</Text>
  </Pressable>


  {/* Check Out */}
  <Pressable style={styles.dateCard}>
    <Ionicons name="calendar-outline" color = "#ffffff" size={20} />

    <View>
      <Text style={styles.infoLabel}>Check-out</Text>
      <Text style={styles.infoValue}>14 Aug</Text>
    </View>
  </Pressable>

</View>
  </ScrollView>
);
};

export default HotelDetails;

const styles = StyleSheet.create({
  bottomContainer: {
  position: "absolute",
  bottom: 5,
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

priceCircle: {
  position: "absolute",

  left: "50%",
  marginLeft: -38,

  bottom: 30,

  width: 76,
  height: 76,

  borderRadius: 38,

  backgroundColor: "#FF0000",

  alignItems: "center",
  justifyContent: "center",

  elevation: 10,
  zIndex: 20,

  borderWidth: 3,
  borderColor: "#FFFFFF",
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
fixedBottomBar: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,

  height: 70,

  backgroundColor: "#fff",

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",

  paddingHorizontal: 10,

  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,

  elevation: 8,
},

bottomItem: {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 5,
},

bottomPrice: {
  width: 70,
  height: 70,
  borderRadius: 35,

  backgroundColor: "#ff0000",

  alignItems: "center",
  justifyContent: "center",

  elevation: 8,
  marginTop: -25,

  zIndex: 10,
},
datePriceContainer: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginHorizontal: 20,
  marginTop: 15,
  marginBottom: 30,
},
  hotelInfoBar: {
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "#eb0707",
  marginHorizontal: 15,
  paddingVertical: 10,
  borderRadius: 15,
  elevation: 1,
},

infoItem: {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
},

  sectionTitle: {
  fontSize: 16,
  fontWeight: "bold",
  marginLeft: 25,
  marginTop: 20,
  marginBottom: 10,
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
  bookTitle: {
  fontSize: 16,
  fontWeight: "bold",
  marginLeft: 20,
  marginTop: 20,
  marginBottom: 10,
},

bookingCard: {
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "#fff",
  marginHorizontal: 20,
  marginBottom: 120,
  paddingVertical: 15,
  borderRadius: 15,
  elevation: 3,
},
//   sectionTitle: {
//   fontSize: 18,
//   fontWeight: "bold",
//   marginHorizontal: 20,
//   marginTop: 20,
//   marginBottom: 12,
// },

// amenityItem: {
//   alignItems: "center",
//   justifyContent: "center",
//   width: 75,
//   marginLeft: 10,
// },

// amenityText: {
//   fontSize: 11,
//   marginTop: 5,
//   color: "gray",
// },
  counter: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 5,
  gap: 8,
},

//   bookingCard: {
//   flexDirection: "row",
//   justifyContent: "space-around",
//   alignItems: "center",
//   backgroundColor: "#fff",
//   marginHorizontal: 20,
//   paddingVertical: 15,
//   borderRadius: 15,
//   elevation: 3,
// },

bookingItem: {
  alignItems: "center",
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
  descriptionCard:{
    backgroundColor: "#fff",
    alignItems: "flex-start",
    borderRadius: 20,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: "#000",
  },
  descriptionTitle:{
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
   description:{
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
});
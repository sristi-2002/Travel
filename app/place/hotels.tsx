import React, { useEffect, useRef, useState } from "react";
import {
  Pressable,
  ImageBackground,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { placedetails } from "../../data/placedetails";
import { getPlaceImage } from "../../data/placeMedia";
import Swiper from "react-native-deck-swiper";
import HotelSwiper from "../hotelSwipper";
type HotelItem = {
  id: number;
  name: string;
  rating: number;
  price: number;
  location?: string;
  image?: string;

  // Used for the "+ More" card
  isMore?: boolean;
  count?: number;
};

const { width } = Dimensions.get("window");
const Hotels = () => {
 
// Reference to the Swiper component.
// Used to control card navigation programmatically
// (e.g., move to the next/previous card when an arrow is pressed).

const swiperRef = useRef(null);
  const { place } = useLocalSearchParams();
const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");

  const [cards, setCards] = useState<HotelItem[]>([]);
// const hotelGroups = [];

// for (let i = 0; i < cards.length; i += 5) {
//   hotelGroups.push(cards.slice(i, i + 5));
// }
  // Filter modal
  const [showFilter, setShowFilter] = useState(false);

  // Price modal
  const [showPrice, setShowPrice] = useState(false);

  // Rating modal
  const [showRating, setShowRating] = useState(false);

  // Price values
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Temporary price values
  const [tempMinPrice, setTempMinPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");

  // Rating
  const [selectedRating, setSelectedRating] = useState<number | null>(
    null
  );

  // Temporary filter values
  const [selectedLocation, setSelectedLocation] = useState("");

  const [tempLocation, setTempLocation] = useState("");
  const [tempRating, setTempRating] = useState<number | null>(null);



  const [showAllHotels, setShowAllHotels] = useState(false);  //false → show your 5-card swiper ------  true → show all hotels in 2 columns
 


  const hotelList =
    (placedetails[place as keyof typeof placedetails]?.hotels ||
      []) as HotelItem[];


       useEffect(() => {
    setShowAllHotels(false); // when the user changes destination/place, you want to go back to the initial 5-card view:
    setCards(hotelList.slice(0, 5));  // Show only the first 5 hotels in the swiper
    setActiveTab("All");

    setMinPrice("");
    setMaxPrice("");
    setSelectedRating(null);
    setSelectedLocation("");
  }, [place]);


    const swiperCards = [
  ...cards.slice(0, 5),
  {
    id: -1,
    name: "More",
    rating: 0,
    price: 0,
    isMore: true,
    count: Math.max(hotelList.length - 5, 0),
  },
];

  /*
   * Load hotels when place changes
   */
  
  /*
   * ALL
   */
  const handleAll = () => {
    setActiveTab("All");

    setCards(hotelList.slice(0, 10));
  };

  /*
   * PRICE TAB
   */
  const handlePrice = () => {
    setActiveTab("Price");

    setTempMinPrice(minPrice);
    setTempMaxPrice(maxPrice);

    setShowPrice(true);
  };

  /*
   * APPLY PRICE
   */
  const applyPrice = () => {
    const min = tempMinPrice
      ? Number(tempMinPrice)
      : 0;

    const max = tempMaxPrice
      ? Number(tempMaxPrice)
      : Infinity;

    const filtered = hotelList.filter(
      (hotel) =>
        hotel.price >= min &&
        hotel.price <= max
    );

    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);

    setCards(filtered.slice(0, 10));

    setShowPrice(false);
  };

  /*
   * RATING TAB
   */
  const handleRating = () => {
    setActiveTab("Rating");
    setTempRating(selectedRating);
    setShowRating(true);
  };

  /*
   * APPLY RATING
   */
  const applyRating = () => {
    const filtered = tempRating
      ? hotelList.filter(
          (hotel) => hotel.rating >= tempRating
        )
      : hotelList;

    setSelectedRating(tempRating);

    setCards(filtered.slice(0, 10));

    setShowRating(false);
  };

  /*
   * FILTER TAB
   */
  const handleFilter = () => {
    setActiveTab("Filter");

    setTempLocation(selectedLocation);
    setTempRating(selectedRating);

    setShowFilter(true);
  };

  /*
   * APPLY FILTER
   */
  const applyFilter = () => {
    let filtered = [...hotelList];

    // Location
    if (tempLocation.trim()) {
      filtered = filtered.filter((hotel) =>
        (hotel.location ?? "")
          .toLowerCase()
          .includes(tempLocation.toLowerCase())
      );
    }

    // Rating
    if (tempRating) {
      filtered = filtered.filter(
        (hotel) => hotel.rating >= tempRating
      );
    }

    // Price
    if (minPrice) {
      filtered = filtered.filter(
        (hotel) => hotel.price >= Number(minPrice)
      );
    }

    if (maxPrice) {
      filtered = filtered.filter(
        (hotel) => hotel.price <= Number(maxPrice)
      );
    }

    setSelectedLocation(tempLocation);
    setSelectedRating(tempRating);

    setCards(filtered.slice(0, 10));

    setShowFilter(false);
  };

  /*
   * NEXT CARD
   */
  // const nextCard = () => {
  //   setCards((prev) => {
  //     const updated = [...prev];

  //     const first = updated.shift();

  //     if (first) {
  //       updated.push(first);
  //     }

  //     return updated;
  //   });
  // };

  /*
   * Maximum 3 cards for stack
   */
 // const visibleCards = cards.slice(0, 3);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* =========================
            HOTEL TITLE
        ========================== */}

        <Text style={styles.title}>
          Hotel List
        </Text>

        {/* =========================
            TABS
        ========================== */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabScroll}
        >
          <View style={styles.tabContainer}>
            {["All", "Filter", "Price", "Rating"].map(
              (tab) => (
                <Pressable
                  key={tab}
                  onPress={() => {
                    if (tab === "All") {
                      handleAll();
                    }

                    if (tab === "Filter") {
                      handleFilter();
                    }

                    if (tab === "Price") {
                      handlePrice();
                    }

                    if (tab === "Rating") {
                      handleRating();
                    }
                  }}
                  style={[
                    styles.tab,
                    activeTab === tab &&
                      styles.activeTab,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === tab &&
                        styles.activeTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                </Pressable>
              )
            )}
          </View>
        </ScrollView>

        {/* =========================
            FIRST STACK
        ========================== */}





{/* =========================  ========================== */}
{!showAllHotels ? (
  // =========================
  // FIRST: 5 HOTEL SWIPER
  // =========================
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.horizontalList}
  >
    <HotelSwiper
      cards={swiperCards}
      place={place}
      onMorePress={() => setShowAllHotels(true)}
    />
  </ScrollView>
) : (
  // =========================
  // AFTER + MORE: 2 COLUMN GRID
  // =========================

  // note
  // 1. ViewProps contains properties such as:
  /*
  ViewProps contains properties such as:

style
children
accessible
pointerEvents
etc.

But it does not contain onPress.

View
 ├── arrange things
 ├── control layout
 ├── apply styles
 └── contain other components

  */


  <View style={styles.hotelGrid}>
    {hotelList.map((item, index) => (
      <Pressable 
      onPress = { () => router.push("/hotel/hotelDetails")}> <View
        key={`grid-${item.id}`}
        style={styles.gridCard}
        
      >
      
        <ImageBackground
          source={{
            uri:
              item.image ??
              getPlaceImage("hotels", index),
          }}
          style={styles.gridImage}
          imageStyle={{
            borderRadius: 20,
          }}
        >
          <Pressable style={styles.favorite}>
            <Ionicons
              name="heart-outline"
              size={20}
              color="#fff"
            />
          </Pressable>

          <View style={styles.overlay}>
            <Text
              style={styles.hotelName}
              numberOfLines={1}
            >
              {item.name}
            </Text>

            <Text
              style={styles.location}
              numberOfLines={1}
            >
              📍 {item.location ?? place}
            </Text>

            <Text style={styles.rating}>
              ⭐ {item.rating} • ₹
              {item.price}/night
            </Text>
          </View>
        </ImageBackground>
      </View></Pressable>
     
    ))}
  </View>
)}
      




<Text>Hotel Screen Loaded</Text>
        {/* =========================
            SECOND HORIZONTAL LIST
        ========================== */}

        <View style={styles.secondSection}>
          <Text style={styles.secondTitle}>
            More Hotels
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
              styles.horizontalList
            }
          >
            {cards.map((item, index) => (
              <View
                key={`horizontal-${item.id}`}
                style={styles.horizontalCard}
              >
                <ImageBackground
                  source={{
                    uri:
                      item.image ??
                      getPlaceImage(
                        "hotels",
                        index
                      ),
                  }}
                  style={styles.horizontalImage}
                  imageStyle={{
                    borderRadius: 25,
                  }}
                >
                  <Pressable
                    style={styles.favorite}
                  >
                    <Ionicons
                      name="heart-outline"
                      size={20}
                      color="#fff"
                    />
                  </Pressable>

                  <View style={styles.overlay}>
                    <Text
                      style={styles.hotelName}
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>

                    <Text
                      style={styles.location}
                      numberOfLines={1}
                    >
                      📍{" "}
                      {item.location ?? place}
                    </Text>

                    <Text
                      style={styles.rating}
                    >
                      ⭐ {item.rating} • ₹
                      {item.price}/night
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* =================================================
          FILTER MODAL
      ================================================= */}

      <Modal
        visible={showFilter}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setShowFilter(false)
        }
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Filter Hotels
            </Text>

            {/* Location */}

            <Text style={styles.inputLabel}>
              Location
            </Text>

            <TextInput
              value={tempLocation}
              onChangeText={setTempLocation}
              placeholder="Enter location"
              style={styles.input}
            />

            {/* Rating */}

            <Text style={styles.inputLabel}>
              Rating
            </Text>

            <View style={styles.ratingOptions}>
              {[3, 4, 4.5].map((rating) => (
                <Pressable
                  key={rating}
                  onPress={() =>
                    setTempRating(rating)
                  }
                  style={[
                    styles.ratingButton,
                    tempRating === rating &&
                      styles.selectedRatingButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.ratingButtonText,
                      tempRating === rating &&
                        styles.selectedRatingText,
                    ]}
                  >
                    ⭐ {rating}+
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Buttons */}

            <View style={styles.modalButtons}>
              <Pressable
                style={styles.cancelButton}
                onPress={() =>
                  setShowFilter(false)
                }
              >
                <Text>Cancel</Text>
              </Pressable>

              <Pressable
                style={styles.applyButton}
                onPress={applyFilter}
              >
                <Text style={styles.applyText}>
                  Apply
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* =================================================
          PRICE MODAL
      ================================================= */}

      <Modal
        visible={showPrice}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setShowPrice(false)
        }
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Price Range
            </Text>

            <Text style={styles.inputLabel}>
              Minimum Price
            </Text>

            <TextInput
              value={tempMinPrice}
              onChangeText={setTempMinPrice}
              placeholder="₹ 0"
              keyboardType="numeric"
              style={styles.input}
            />

            <Text style={styles.inputLabel}>
              Maximum Price
            </Text>

            <TextInput
              value={tempMaxPrice}
              onChangeText={setTempMaxPrice}
              placeholder="₹ 10000"
              keyboardType="numeric"
              style={styles.input}
            />

            <View style={styles.modalButtons}>
              <Pressable
                style={styles.cancelButton}
                onPress={() =>
                  setShowPrice(false)
                }
              >
                <Text>Cancel</Text>
              </Pressable>

              <Pressable
                style={styles.applyButton}
                onPress={applyPrice}
              >
                <Text style={styles.applyText}>
                  Apply
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* =================================================
          RATING MODAL
      ================================================= */}

      <Modal
        visible={showRating}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setShowRating(false)
        }
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Rating
            </Text>

            {[3, 4, 4.5].map((rating) => (
              <Pressable
                key={rating}
                onPress={() =>
                  setTempRating(rating)
                }
                style={[
                  styles.fullRatingButton,
                  tempRating === rating &&
                    styles.selectedRatingButton,
                ]}
              >
                <Text
                  style={[
                    styles.ratingButtonText,
                    tempRating === rating &&
                      styles.selectedRatingText,
                  ]}
                >
                  ⭐ {rating} and above
                </Text>
              </Pressable>
            ))}

            <View style={styles.modalButtons}>
              <Pressable
                style={styles.cancelButton}
                onPress={() =>
                  setShowRating(false)
                }
              >
                <Text>Cancel</Text>
              </Pressable>

              <Pressable
                style={styles.applyButton}
                onPress={applyRating}
              >
                <Text style={styles.applyText}>
                  Apply
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },

  title: {
    fontSize: 30,
    color: "#000",
  },

  /* =========================
     TABS
  ========================== */

  tabScroll: {
    marginTop: 20,
  },

  tabContainer: {
    flexDirection: "row",
    gap: 10,
    paddingRight: 20,
  },

  tab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F2F2F2",
  },

  activeTab: {
    backgroundColor: "#000",
  },

  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },

  activeTabText: {
    color: "#fff",
  },

  /* =========================
     FIRST STACK
  ========================== */

stackContainer: {
  width: width - 40,
  height: 330,
  marginTop: 30,
  marginRight: 20,
  position: "relative",
},

  hotelCard: {
    position: "absolute",
    width: "85%",
    height: 280,
    marginRight: 20,
    alignSelf: "center",
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 10,
  },

  image: {
    flex: 1,
    justifyContent: "flex-end",
  },

  favorite: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    padding: 40,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  hotelName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

  location: {
    color: "#fff",
    marginTop: 6,
  },

  rating: {
    color: "#fff",
    marginTop: 8,
  },

  /* =========================
     SECOND SECTION
  ========================== */

  secondSection: {
    marginTop: 20,
  },

  secondTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 15,
  },

  horizontalList: {
    paddingRight: 20,
  },
hotelGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  paddingHorizontal: 10,
},

gridCard: {
  width: "48%",
  marginBottom: 16,
},

gridImage: {
  width: "100%",
  height: 220,
  justifyContent: "flex-end",
},
  horizontalCard: {
    width: 280,
    height: 250,
    marginRight: 15,
    borderRadius: 25,
    overflow: "hidden",
    elevation: 6,
    backgroundColor: "#fff",
  },

  horizontalImage: {
    flex: 1,
    justifyContent: "flex-end",
  },

  /* =========================
     MODAL
  ========================== */

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    paddingBottom: 35,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 25,
  },

  inputLabel: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 10,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
  },

  ratingOptions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
  },

  ratingButton: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#F2F2F2",
  },

  fullRatingButton: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#F2F2F2",
    marginBottom: 10,
  },

  selectedRatingButton: {
    backgroundColor: "#000",
  },

  ratingButtonText: {
    color: "#333",
    fontWeight: "600",
  },

  selectedRatingText: {
    color: "#fff",
  },

  modalButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 25,
  },

  cancelButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
  },

  applyButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  applyText: {
    color: "#fff",
    fontWeight: "700",
  },
});

export default Hotels;





//first design








// import React, { useEffect, useState } from "react";
// import {
//   Pressable,
//   ImageBackground,
//   View,
//   Text,
//   StyleSheet,
// } from "react-native";

// import { Ionicons } from "@expo/vector-icons";
// import { useLocalSearchParams } from "expo-router";
// import { placedetails } from "../../data/placedetails";
// import { getPlaceImage } from "../../data/placeMedia";


// type HotelItem = {
//   id: number;
//   name: string;
//   rating: number;
//   price: number;
//   location?: string;
//   image?: string;
// };


// const Hotels = () => {

// const { place } = useLocalSearchParams();

// const [currentIndex,setCurrentIndex] = useState(0);


// const hotelList =
//   (placedetails[place as keyof typeof placedetails]?.hotels || []) as HotelItem[];

// const [cards, setCards] = useState<HotelItem[]>([]);

// useEffect(() => {
//   setCards(hotelList);
// }, [place]);

// const nextCard = () => {
//   console.log("Pressed");

//   setCards(prev => {
//     console.log(prev.map(x => x.name));

//     const updated = [...prev];
//     const first = updated.shift();

//     if (first) {
//       updated.push(first);
//     }

//     console.log(updated.map(x => x.name));

//     return updated;
//   });
// };

// const visibleCards = cards.slice(0, 3);





// return (

// <View

// style={{
// flex:1,
// paddingHorizontal:20,
// paddingTop:30,
// }}

// >


// <Text style={styles.title}>
// Hotel List
// </Text>



// <View

// style={{
// marginTop:30,
// height:330,
// justifyContent:"center",
// }}

// >



// {
// visibleCards.map((item, index) => {


// const cardPosition = 2-index;



// return (
// <View>
// <Pressable

// key={item.id}

// onPress={()=>{

//  if(cardPosition===2){
//    nextCard();
//  }

// }}

// style={[

// styles.hotelCard,

// {

// zIndex:cardPosition,

// top:(2-cardPosition)*22,

// right:-(2-cardPosition)*24,


// transform:[

// {
// scale:

// cardPosition===2

// ?1

// :

// cardPosition===1

// ?0.95

// :

// 0.90

// }

// ]

// }

// ]}


// >



// <ImageBackground


// source={{

// uri:item.image ??
// getPlaceImage("hotels",index)

// }}


// style={styles.image}


// imageStyle={{

// borderRadius:30

// }}


// >



// <Pressable style={styles.favorite}>

// <Ionicons

// name="heart-outline"

// size={20}

// color="#fff"

// />

// </Pressable>



// <View style={styles.overlay}>


// <Text style={styles.hotelName}>

// {item.name}

// </Text>



// <Text style={styles.location}>

// 📍 {item.location ?? place}

// </Text>



// <Text style={styles.rating}>

// ⭐ {item.rating} • ₹{item.price}/night

// </Text>



// </View>



// </ImageBackground>



// </Pressable>


// // 2nd filter by come horizontal scroll view

// <Pressable

// key={item.id}

// onPress={()=>{

//  if(cardPosition===2){
//    nextCard();
//  }

// }}

// style={[

// styles.hotelCard,

// {

// zIndex:cardPosition,

// top:(2-cardPosition)*22,

// right:-(2-cardPosition)*24,


// transform:[

// {
// scale:

// cardPosition===2

// ?1

// :

// cardPosition===1

// ?0.95

// :

// 0.90

// }

// ]

// }

// ]}


// >



// <ImageBackground


// source={{

// uri:item.image ??
// getPlaceImage("hotels",index)

// }}


// style={styles.image}


// imageStyle={{

// borderRadius:30

// }}


// >



// <Pressable style={styles.favorite}>

// <Ionicons

// name="heart-outline"

// size={20}

// color="#fff"

// />

// </Pressable>



// <View style={styles.overlay}>


// <Text style={styles.hotelName}>

// {item.name}

// </Text>



// <Text style={styles.location}>

// 📍 {item.location ?? place}

// </Text>



// <Text style={styles.rating}>

// ⭐ {item.rating} • ₹{item.price}/night

// </Text>



// </View>



// </ImageBackground>



// </Pressable>
// </View>


// )

// })

// }



// </View>



// </View>

// );

// };



// const styles = StyleSheet.create({


// center:{
// flex:1,
// justifyContent:"center",
// alignItems:"center"
// },


// title:{
// fontSize:30,
// color:"#000"
// },


// hotelCard:{

// position:"absolute",

// width:"92%",

// height:280,
// marginRight:20,

// alignSelf:"center",

// borderRadius:30,

// overflow:"hidden",

// backgroundColor:"#fff",

// elevation:10,

// },


// image:{

// flex:1,

// justifyContent:"flex-end",

// },


// favorite:{

// position:"absolute",

// top:20,

// right:20,

// width:40,

// height:40,

// borderRadius:20,

// backgroundColor:"rgba(0,0,0,0.3)",

// justifyContent:"center",

// alignItems:"center",

// },


// overlay:{

// padding:40,

// backgroundColor:"rgba(0,0,0,0.35)",

// },


// hotelName:{

// color:"#fff",

// fontSize:24,

// fontWeight:"700",

// },


// location:{

// color:"#fff",

// marginTop:6,

// },


// rating:{

// color:"#fff",

// marginTop:8,

// },


// });


// export default Hotels;
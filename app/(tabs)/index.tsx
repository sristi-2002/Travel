import React, {
  useState,
  useRef,
  useEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  Animated,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const [search, setSearch] = useState("");
const scrollRef = useRef<ScrollView | null>(null);
  const originalPlaces = [
    {
      id: 1,
      title: "Hill",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1170&auto=format&fit=crop",
    },

    {
      id: 2,
      title: "Sea",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1173&auto=format&fit=crop",
    },

    {
      id: 3,
      title: "Desert",
      image:
        "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1170&auto=format&fit=crop",
    },

    {
      id: 4,
      title: "WildLife",
      image:
        "https://plus.unsplash.com/premium_photo-1686899171869-4d80f6f9d315?q=80&w=1025&auto=format&fit=crop",
    },

    {
      id: 5,
      title: "Island",
      image:
        "https://images.unsplash.com/photo-1676121207399-6e4ed14f04b5?w=600&auto=format&fit=crop&q=60",
    },

    {
      id: 6,
      title: "Foreign",
      image:
        "https://images.unsplash.com/photo-1614107151491-6876eecbff89?q=80&w=1374&auto=format&fit=crop",
    },
  ];
  const places = [...originalPlaces, ...originalPlaces];
 
useEffect(() => {
  let currentOffset = 0;
  let currentIndex = 0;

  const interval = setInterval(() => {
    currentIndex++;

    currentOffset += 134;

    scrollRef.current?.scrollTo({
      x: currentOffset,
      animated: true,
    });

    // RESET SILENTLY
    if (currentIndex >= originalPlaces.length) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          x: 0,
          animated: false,
        });

        currentOffset = 0;
        currentIndex = 0;
      }, 400);
    }
  }, 2200);

  return () => clearInterval(interval);
}, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.Hc}>
          
          <View>
            <Text style={styles.textH}>
              Hello Tourist!
            </Text>

            <Text style={styles.HeaderV}>
              How can I guide you ?
            </Text>
          </View>

          {/* SEARCH */}
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={18}
              color="#999"
            />

            <TextInput
              placeholder="Search"
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
              style={styles.input}
            />
          </View>
        </View>

        {/* MAIN CARD */}
        <View style={styles.cardWrapper}>
          
          <Text style={styles.title}>
            Begin Your Voyage Here
          </Text>

          <Text style={styles.subtitle}>
            Unlock your next travel experience
          </Text>

          {/* HORIZONTAL SCROLL */}
       <Animated.ScrollView
       decelerationRate="fast"
snapToAlignment="start"
scrollEventThrottle={16}
  ref={scrollRef}
  horizontal
 // pagingEnabled
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.cardRow}
>
            {places.map((item, index) => (
              <View
               key={`${item.id}-${index}`}
                style={styles.card}
              >
                
                {/* BACK IMAGE LEFT */}
                <Image
                  source={{ uri: item.image }}
                  style={styles.backImageLeft}
                />

                {/* BACK IMAGE RIGHT */}
                <Image
                  source={{ uri: item.image }}
                  style={styles.backImageRight}
                />

                {/* FRONT IMAGE */}
                <View style={styles.imageCard}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                  />
                </View>

                {/* TITLE */}
                <Text style={styles.cardText}>
                  {item.title}
                </Text>

              </View>
            ))}
          </Animated.ScrollView>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* HEADER */
  Hc: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 14,
    marginTop: 18,
  },

  textH: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },

  HeaderV: {
    fontSize: 15,
    color: "#8E8E93",
    marginTop: 3,
  },

  /* SEARCH */
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 120,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },

  input: {
    flex: 1,
    marginLeft: 6,
    fontSize: 13,
  },

  /* MAIN BOX */
  cardWrapper: {
    backgroundColor: "#F5F5F5",
    marginHorizontal: 10,
    marginTop: 22,
    borderRadius: 18,
    paddingTop: 28,
    paddingBottom: 34,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0B132B",
  },

  subtitle: {
    fontSize: 16,
    color: "#8E8E93",
    marginTop: 8,
    marginBottom: 42,
  },

  /* HORIZONTAL ROW */
  cardRow: {
    paddingRight: 20,
  },

  /* CARD */
  card: {
    width: 110,
    height: 210,
    alignItems: "center",
    marginRight: 24,
    position: "relative",
  },

  /* BACK IMAGE LEFT */
  backImageLeft: {
    position: "absolute",

    width: 92,
    height: 132,

    borderRadius: 30,

    top: 8,
    left: -4,

    transform: [{ rotate: "-16deg" }],

    opacity: 0.32,

    overflow: "hidden",

    borderWidth: 2,
    borderColor: "#fff",

    backgroundColor: "#fff",
  },

  /* BACK IMAGE RIGHT */
  backImageRight: {
    position: "absolute",

    width: 92,
    height: 132,

    borderRadius: 30,

    top: 0,
    right: -2,

    transform: [{ rotate: "16deg" }],

    opacity: 0.38,

    overflow: "hidden",

    borderWidth: 2,
    borderColor: "#fff",

    backgroundColor: "#fff",
  },

  /* FRONT IMAGE */
  imageCard: {
    position: "absolute",

    width: 96,
    height: 132,

    borderRadius: 32,

    overflow: "hidden",

    borderWidth: 2,
    borderColor: "#fff",

    backgroundColor: "#fff",

    zIndex: 10,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.12,
    shadowRadius: 10,

    elevation: 6,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  /* TEXT */
  cardText: {
    position: "absolute",
    bottom: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#0B132B",
  },
});











//masin card









// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   Dimensions,
//   TouchableOpacity,
//   TextInput,
// } from "react-native";

// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";

// const { width } = Dimensions.get("window");

// const CARD_WIDTH = width * 0.68;
// const CARD_HEIGHT = 430;
// const SPACING = 10;

// const DATA = [
//   {
//     id: 1,
//     title: "Kashmir",
//     location: "India",
//     rating: "4.9",
//     image:
//       "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1200&auto=format&fit=crop",
//   },

//   {
//     id: 2,
//     title: "Andaman",
//     location: "India",
//     rating: "4.8",
//     image:
//       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
//   },

//   {
//     id: 3,
//     title: "Rajasthan",
//     location: "India",
//     rating: "4.7",
//     image:
//       "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1200&auto=format&fit=crop",
//   },

//   {
//     id: 4,
//     title: "Gir Forest",
//     location: "India",
//     rating: "4.8",
//     image:
//       "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=1200&auto=format&fit=crop",
//   },

//   {
//     id: 5,
//     title: "Paris",
//     location: "France",
//     rating: "4.9",
//     image:
//       "https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=1200&auto=format&fit=crop",
//   },
// ];

// export default function Index() {
//   const [search, setSearch] = useState("");
//   const [activeIndex, setActiveIndex] = useState(0);

//   const scrollRef = useRef<ScrollView>(null);

//   useEffect(() => {
//     let index = 0;

//     const interval = setInterval(() => {
//       index++;

//       if (index >= DATA.length) {
//         index = 0;
//       }

//       setActiveIndex(index);

//       scrollRef.current?.scrollTo({
//         x: index * (CARD_WIDTH + SPACING),
//         animated: true,
//       });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//       >
//         {/* HEADER */}
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.hello}>
//               Hello Tourist!
//             </Text>

//             <Text style={styles.sub}>
//               How can I guide you ?
//             </Text>
//           </View>

//           <View style={styles.searchBox}>
//             <Ionicons
//               name="search"
//               size={18}
//               color="#A1A1AA"
//             />

//             <TextInput
//               value={search}
//               onChangeText={setSearch}
//               placeholder="Search"
//               placeholderTextColor="#A1A1AA"
//               style={styles.input}
//             />
//           </View>
//         </View>

//         {/* DESTINATION SECTION */}
//         <View style={styles.section}>
//           <View style={styles.row}>
//             <Text style={styles.heading}>
//               Popular Destination
//             </Text>

//             <Text style={styles.viewAll}>
//               View All
//             </Text>
//           </View>

//           {/* CARDS */}
//           <ScrollView
//             ref={scrollRef}
//             horizontal
//             pagingEnabled
//             snapToInterval={
//               CARD_WIDTH + SPACING
//             }
//             decelerationRate="fast"
//             showsHorizontalScrollIndicator={
//               false
//             }
//             contentContainerStyle={{
//               paddingHorizontal: 70,
//               paddingTop: 25,
//             }}
//           >
//             {DATA.map((item, index) => {
//               return (
//                 <View
//                   key={item.id}
//                   style={[
//                     styles.cardContainer,
//                     {
//                       marginRight: SPACING,
//                     },
//                   ]}
//                 >
//                   {/* LEFT BACK CARD */}
//                   <View
//                     style={[
//                       styles.backCard,
//                       {
//                         left: -45,
//                         top: 25,
//                       },
//                     ]}
//                   >
//                     <Image
//                       source={{
//                         uri:
//                           DATA[
//                             (index + 1) %
//                               DATA.length
//                           ].image,
//                       }}
//                       style={
//                         styles.backImage
//                       }
//                     />
//                   </View>

//                   {/* RIGHT BACK CARD */}
//                   <View
//                     style={[
//                       styles.backCard,
//                       {
//                         right: -45,
//                         top: 25,
//                       },
//                     ]}
//                   >
//                     <Image
//                       source={{
//                         uri:
//                           DATA[
//                             (index + 2) %
//                               DATA.length
//                           ].image,
//                       }}
//                       style={
//                         styles.backImage
//                       }
//                     />
//                   </View>

//                   {/* MAIN CARD */}
//                   <View style={styles.mainCard}>
//                     <Image
//                       source={{
//                         uri: item.image,
//                       }}
//                       style={styles.image}
//                     />

//                     {/* OVERLAY */}
//                     <View
//                       style={
//                         styles.overlay
//                       }
//                     />

//                     {/* TOP BUTTONS */}
//                     <View
//                       style={
//                         styles.topRow
//                       }
//                     >
//                       <View
//                         style={
//                           styles.ratingBox
//                         }
//                       >
//                         <Ionicons
//                           name="star"
//                           size={13}
//                           color="#fff"
//                         />

//                         <Text
//                           style={
//                             styles.ratingText
//                           }
//                         >
//                           {item.rating}
//                         </Text>
//                       </View>

//                       <TouchableOpacity
//                         style={
//                           styles.heartBox
//                         }
//                       >
//                         <Ionicons
//                           name="heart-outline"
//                           size={16}
//                           color="#fff"
//                         />
//                       </TouchableOpacity>
//                     </View>

//                     {/* BOTTOM GLASS BOX */}
//                     <View
//                       style={
//                         styles.bottomBox
//                       }
//                     >
//                       <View>
//                         <View
//                           style={
//                             styles.locationRow
//                           }
//                         >
//                           <Ionicons
//                             name="location-outline"
//                             size={12}
//                             color="#fff"
//                           />

//                           <Text
//                             style={
//                               styles.location
//                             }
//                           >
//                             {item.location}
//                           </Text>
//                         </View>

//                         <Text
//                           style={
//                             styles.place
//                           }
//                         >
//                           {item.title}
//                         </Text>
//                       </View>

//                       <TouchableOpacity
//                         style={
//                           styles.arrowButton
//                         }
//                       >
//                         <Ionicons
//                           name="arrow-forward"
//                           size={18}
//                           color="#fff"
//                         />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 </View>
//               );
//             })}
//           </ScrollView>

//           {/* DOTS */}
//           <View style={styles.dotRow}>
//             {DATA.map((_, index) => (
//               <View
//                 key={index}
//                 style={[
//                   styles.dot,
//                   activeIndex === index &&
//                     styles.activeDot,
//                 ]}
//               />
//             ))}
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#031018",
//     overflow: "visible",
//   },

//   header: {
//     marginTop: 12,
//     marginHorizontal: 18,

//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   hello: {
//     color: "#fff",
//     fontSize: 28,
//     fontWeight: "800",
//   },

//   sub: {
//     color: "#A1A1AA",
//     marginTop: 4,
//     fontSize: 14,
//   },

//   searchBox: {
//     width: 125,
//     height: 42,
//     borderRadius: 14,

//     backgroundColor: "#111827",

//     flexDirection: "row",
//     alignItems: "center",

//     paddingHorizontal: 12,
//   },

//   input: {
//     flex: 1,
//     marginLeft: 6,
//     color: "#fff",
//     fontSize: 13,
//   },

//   section: {
//     marginTop: 36,
//     overflow: "visible",
//   },

//   row: {
//     marginHorizontal: 20,

//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",

//     marginBottom: 10,
//   },

//   heading: {
//     color: "#fff",
//     fontSize: 34,
//     fontWeight: "800",
//   },

//   viewAll: {
//     color: "#9CA3AF",
//     fontSize: 14,
//   },

//   cardContainer: {
//     width: CARD_WIDTH,
//     height: CARD_HEIGHT + 40,

//     justifyContent: "center",
//     alignItems: "center",

//     overflow: "visible",
//   },

//   backCard: {
//     position: "absolute",

//     width: CARD_WIDTH - 20,
//     height: CARD_HEIGHT - 40,

//     borderRadius: 34,

//     overflow: "hidden",

//     borderWidth: 1.5,
//     borderColor:
//       "rgba(255,255,255,0.4)",

//     opacity: 0.55,
//   },

//   backImage: {
//     width: "100%",
//     height: "100%",
//   },

//   mainCard: {
//     width: CARD_WIDTH,
//     height: CARD_HEIGHT,

//     borderRadius: 36,

//     overflow: "hidden",

//     borderWidth: 1.6,
//     borderColor:
//       "rgba(255,255,255,0.7)",
//   },

//   image: {
//     width: "100%",
//     height: "100%",
//     position: "absolute",
//   },

//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor:
//       "rgba(0,0,0,0.18)",
//   },

//   topRow: {
//     position: "absolute",
//     top: 18,
//     left: 18,
//     right: 18,

//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   ratingBox: {
//     flexDirection: "row",
//     alignItems: "center",

//     backgroundColor:
//       "rgba(255,255,255,0.25)",

//     paddingHorizontal: 12,
//     paddingVertical: 6,

//     borderRadius: 20,
//   },

//   ratingText: {
//     color: "#fff",
//     marginLeft: 4,
//     fontWeight: "700",
//     fontSize: 12,
//   },

//   heartBox: {
//     width: 34,
//     height: 34,
//     borderRadius: 17,

//     justifyContent: "center",
//     alignItems: "center",

//     backgroundColor:
//       "rgba(255,255,255,0.25)",
//   },

//   bottomBox: {
//     position: "absolute",
//     left: 16,
//     right: 16,
//     bottom: 18,

//     backgroundColor:
//       "rgba(255,255,255,0.16)",

//     borderRadius: 26,

//     paddingVertical: 16,
//     paddingHorizontal: 16,

//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",

//     borderWidth: 1,
//     borderColor:
//       "rgba(255,255,255,0.25)",
//   },

//   locationRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   location: {
//     color: "#fff",
//     fontSize: 12,
//     marginLeft: 4,
//   },

//   place: {
//     color: "#fff",
//     fontSize: 30,
//     fontWeight: "800",
//     marginTop: 2,
//   },

//   arrowButton: {
//     width: 46,
//     height: 46,
//     borderRadius: 23,

//     backgroundColor: "#28B6F6",

//     justifyContent: "center",
//     alignItems: "center",
//   },

//   dotRow: {
//     flexDirection: "row",
//     justifyContent: "center",

//     marginTop: 26,
//     marginBottom: 40,
//   },

//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,

//     backgroundColor:
//       "rgba(255,255,255,0.35)",

//     marginHorizontal: 5,
//   },

//   activeDot: {
//     backgroundColor: "#2EC5FF",
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//   },
// });
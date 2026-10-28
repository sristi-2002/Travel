import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

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

type RoomOptions = {
  ac: boolean;
  breakfast: boolean;
  lunch: boolean;
  pool: boolean;
};

const HotelDetails = () => {
  const router = useRouter();
  const nights = 2;
  const entranceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(entranceAnim, {
      toValue: 1,
      speed: 1.4,
      bounciness: 5,
      useNativeDriver: true,
    }).start();
  }, [entranceAnim]);

  const images = [
    require("../../assets/images/h1.png"),
    require("../../assets/images/h1.png"),
    require("../../assets/images/h1.png"),
    require("../../assets/images/h1.png"),
  ];

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
      features: ["Free WiFi", "Air Conditioning", "Room Service"],
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
      features: ["Free WiFi", "Air Conditioning", "Room Service"],
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
      features: ["Free WiFi", "Room Service"],
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
      features: ["Free WiFi", "Room Service", "King Size Bed"],
    },
  ];

  const [roomQuantities, setRoomQuantities] = useState<Record<string, number>>({
    single: 1,
    double: 0,
    twin: 0,
    deluxe: 0,
  });

  const [selectedRoomId, setSelectedRoomId] = useState("single");
  const [roomOptions, setRoomOptions] = useState<Record<string, RoomOptions>>({
    single: { ac: false, breakfast: false, lunch: false, pool: false },
    double: { ac: false, breakfast: false, lunch: false, pool: false },
    twin: { ac: false, breakfast: false, lunch: false, pool: false },
    deluxe: { ac: false, breakfast: false, lunch: false, pool: false },
  });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  const selectedRoom =
    roomTypes.find((room) => room.id === selectedRoomId) ?? roomTypes[0];
  const selectedOptions = roomOptions[selectedRoom.id];

  const updateRoomQuantity = (roomId: string, change: number) => {
    setRoomQuantities((previous) => ({
      ...previous,
      [roomId]: Math.max(0, Math.min(10, (previous[roomId] ?? 0) + change)),
    }));
    if (change > 0) setSelectedRoomId(roomId);
    setBookingConfirmed(false);
  };

  const updateOption = (key: keyof RoomOptions, value: boolean) => {
    setRoomOptions((previous) => ({
      ...previous,
      [selectedRoom.id]: {
        ...previous[selectedRoom.id],
        [key]: value,
      },
    }));
    setBookingConfirmed(false);
  };

  const totalRooms = Object.values(roomQuantities).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );

  const roomBreakdown = useMemo(
    () =>
      roomTypes
        .map((room) => {
          const quantity = roomQuantities[room.id] ?? 0;
          const options = roomOptions[room.id];
          const extrasPerRoom =
            (room.hasAcOption && options.ac ? room.acPrice : 0) +
            (options.breakfast ? room.breakfastPrice : 0) +
            (options.lunch ? room.lunchPrice : 0) +
            (options.pool ? room.poolPrice : 0);
          return {
            room,
            quantity,
            extrasPerRoom,
            lineTotal: (room.price + extrasPerRoom) * quantity * nights,
          };
        })
        .filter((item) => item.quantity > 0),
    [roomQuantities, roomOptions],
  );

  const totalCost = roomBreakdown.reduce((sum, item) => sum + item.lineTotal, 0);

  const getSelectedAddons = (room: RoomType) => {
    const options = roomOptions[room.id];
    const addons = [
      { key: "ac", name: "Air conditioning", selected: room.hasAcOption && options.ac, price: room.acPrice },
      { key: "breakfast", name: "Breakfast", selected: options.breakfast, price: room.breakfastPrice },
      { key: "lunch", name: "Lunch", selected: options.lunch, price: room.lunchPrice },
      { key: "pool", name: "Swimming pool", selected: options.pool, price: room.poolPrice },
    ];
    return addons.filter((addon) => addon.selected);
  };

  const handleRoomSelect = (room: RoomType) => {
    setSelectedRoomId(room.id);
  };

  const Counter = ({
    value,
    onDecrease,
    onIncrease,
  }: {
    value: number;
    onDecrease: () => void;
    onIncrease: () => void;
  }) => (
    <View style={styles.counter}>
      <Pressable onPress={onDecrease} style={styles.counterButton}>
        <Ionicons name="remove" size={16} color="#00194a" />
      </Pressable>
      <Text style={styles.counterValue}>{value}</Text>
      <Pressable onPress={onIncrease} style={styles.counterButton}>
        <Ionicons name="add" size={16} color="#00194a" />
      </Pressable>
    </View>
  );

  const OptionToggle = ({
    title,
    icon,
    optionKey,
    price,
    available = true,
  }: {
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    optionKey: keyof RoomOptions;
    price: number;
    available?: boolean;
  }) => {
    const enabled = selectedOptions[optionKey];

    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: enabled, disabled: !available }}
        accessibilityLabel={`${title}, ${enabled ? "selected" : "not selected"}`}
        disabled={!available}
        onPress={() => updateOption(optionKey, !enabled)}
        style={[
          styles.addonItem,
          enabled && styles.addonItemSelected,
          !available && styles.addonItemDisabled,
        ]}
      >
        <View style={[styles.addonIcon, enabled && styles.addonIconSelected]}>
          <Ionicons
            name={enabled ? "checkmark" : icon}
            size={24}
            color={enabled ? "#ffffff" : "#00194a"}
          />
        </View>

        <Text style={styles.addonTitle}>{title}</Text>

        {enabled ? (
          <Text style={styles.addonPrice}>
            {price === 0
              ? "Added · FREE"
              : `Added · +₹${price.toLocaleString("en-IN")}`}
          </Text>
        ) : (
          <Text style={styles.addonHint}>
            {price === 0 ? "Tap to add free" : "Tap to add"}
          </Text>
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator
      >
        {/* Hero image and property actions */}
        <View style={styles.heroContainer}>
          <Image
            source={require("../../assets/images/h1.png")}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroTopActions}>
            <Pressable style={styles.heroCircleButton} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={22} color="#172033" />
            </Pressable>
            <View style={styles.heroRightActions}>
              <Pressable
                style={styles.heroCircleButton}
                onPress={() => Share.share({ message: "Check out Glasswood Villa in Islamabad!" })}
              >
                <Ionicons name="share-social-outline" size={19} color="#172033" />
              </Pressable>
              <Pressable
                style={styles.heroCircleButton}
                onPress={() => setIsFavorite((value) => !value)}
              >
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={20}
                  color={isFavorite ? "#e53935" : "#172033"}
                />
              </Pressable>
            </View>
          </View>
          <View style={styles.heroGradientContent}>
            <View style={styles.heroPropertyInfo}>
              <Text style={styles.heroPropertyName}>Glasswood Villa</Text>
              <View style={styles.heroLocationRow}>
                <Ionicons name="location-outline" size={14} color="#ffffff" />
                <Text style={styles.heroLocationText}>Islamabad, Pakistan</Text>
              </View>
              <View style={styles.heroRatingRow}>
                <Ionicons name="star" size={14} color="#ffc247" />
                <Text style={styles.heroRatingText}>4.8</Text>
                <Text style={styles.heroReviewText}>(128 reviews)</Text>
              </View>
            </View>
            <View style={styles.heroPriceCard}>
              <Text style={styles.heroPriceCaption}>Starting from</Text>
              <Text style={styles.heroPrice}>₹9,840</Text>
              <Text style={styles.heroPriceUnit}>per night</Text>
            </View>
          </View>
        </View>

        {/* Property highlights */}
        <View style={styles.propertyStatsCard}>
          {[
            { icon: "bed-outline", value: "8", label: "Beds" },
            { icon: "water-outline", value: "4", label: "Baths" },
            { icon: "car-sport-outline", value: "2", label: "Garage" },
            { icon: "resize-outline", value: "6,500", label: "Sqft" },
          ].map((item, index) => (
            <View key={item.label} style={styles.propertyStatItem}>
              <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={20} color="#172033" />
              <Text style={styles.propertyStatValue}>{item.value}</Text>
              <Text style={styles.propertyStatLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Compact photo collage */}
        <View style={styles.galleryGrid}>
          <View style={styles.galleryLargeColumn}>
            <Image source={images[1]} style={styles.galleryLargeImage} />
            <View style={styles.photoCountBadge}>
              <Ionicons name="images-outline" size={13} color="#fff" />
              <Text style={styles.photoCountText}>30+ Photos</Text>
            </View>
          </View>
          <View style={styles.gallerySmallColumn}>
            <View style={styles.gallerySmallRow}>
              <Image source={images[2]} style={styles.gallerySmallImage} />
              <Image source={images[3]} style={styles.gallerySmallImage} />
            </View>
            <Image source={images[0]} style={styles.galleryWideImage} />
          </View>
        </View>

        {/* About property */}
        <View style={styles.aboutPropertySection}>
          <View style={styles.aboutHeadingRow}>
            <Ionicons name="business-outline" size={21} color="#172033" />
            <Text style={styles.aboutPropertyTitle}>About Property</Text>
          </View>
          <Text style={styles.aboutPropertyText} numberOfLines={descriptionExpanded ? undefined : 3}>
            Glasswood Villa is a beautiful property blending modern architecture with comfort. Spacious interiors, premium finishes, a peaceful atmosphere, and thoughtful amenities make it an inviting place to stay for families, couples, and business travellers.
          </Text>
          <Pressable
            style={styles.readMoreButton}
            onPress={() => setDescriptionExpanded((value) => !value)}
          >
            <Text style={styles.readMoreText}>{descriptionExpanded ? "See Less" : "See More"}</Text>
            <Ionicons name={descriptionExpanded ? "chevron-up" : "chevron-down"} size={14} color="#8b7a50" />
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Amenities</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.amenitiesContainer}
        >
          {[
            { icon: "wifi-outline", label: "WiFi" },
            { icon: "car-outline", label: "Parking" },
            { icon: "restaurant-outline", label: "Restaurant" },
            { icon: "water-outline", label: "Pool" },
            { icon: "shield-checkmark-outline", label: "Security" },
            { icon: "business-outline", label: "Business" },
          ].map((item) => (
            <View style={styles.amenityItem} key={item.label}>
              <Ionicons
                name={item.icon as keyof typeof Ionicons.glyphMap}
                size={22}
                color="#00194a"
              />
              <Text style={styles.amenityText}>{item.label}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.dateGuestCard}>
          <Text style={styles.sectionHeading}>Your Stay</Text>
          <View style={styles.stayDatesRow}>
            <View style={styles.stayDateItem}>
              <Ionicons name="calendar-outline" size={19} color="#00194a" />
              <View>
                <Text style={styles.stayDateLabel}>Check-in</Text>
                <Text style={styles.stayDateValue}>12 Aug 2026</Text>
                <Text style={styles.stayDateTime}>From 2:00 PM</Text>
              </View>
            </View>
            <View style={styles.stayDateDivider} />
            <View style={styles.stayDateItem}>
              <Ionicons name="calendar-outline" size={19} color="#00194a" />
              <View>
                <Text style={styles.stayDateLabel}>Check-out</Text>
                <Text style={styles.stayDateValue}>14 Aug 2026</Text>
                <Text style={styles.stayDateTime}>Until 11:00 AM</Text>
              </View>
            </View>
          </View>
          <Text style={styles.stayHint}>2 nights · Update these sample dates to match your booking flow.</Text>
        </View>

        <Animated.View
          style={[
            styles.sectionBlock,
            styles.glassSection,
            {
              opacity: entranceAnim,
              transform: [{ translateY: entranceAnim.interpolate({ inputRange: [0, 1], outputRange: [22, 0] }) }],
            },
          ]}
        >
          <View style={styles.roomSectionHeader}>
            <View style={styles.roomSectionIcon}>
              <Ionicons name="bed-outline" size={22} color="#ffffff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionHeading}>Choose Your Rooms</Text>
              <Text style={styles.sectionSubtitle}>Choose your room type and set how many you need.</Text>
            </View>
            <View style={styles.roomCountBadge}>
              <Text style={styles.roomCountBadgeText}>{totalRooms} selected</Text>
            </View>
          </View>

          {roomTypes.map((room, index) => {
            const quantity = roomQuantities[room.id] ?? 0;
            const isSelected = selectedRoom.id === room.id;
            const accentColors = ["#5b6cff", "#e56ca8", "#16a6a1", "#f39b45"];
            return (
              <Animated.View
                key={room.id}
                style={{
                  opacity: entranceAnim,
                  transform: [{ translateY: entranceAnim.interpolate({ inputRange: [0, 1], outputRange: [18 + index * 4, 0] }) }],
                }}
              >
                <Pressable
                  onPress={() => handleRoomSelect(room)}
                  style={[
                    styles.roomCard,
                    styles.glassRoomCard,
                    isSelected && styles.roomCardSelected,
                    isSelected && { borderColor: accentColors[index] },
                  ]}
                >
                  <View style={[styles.roomAccentBar, { backgroundColor: accentColors[index] }]} />
                  <View style={[styles.roomImagePlaceholder, { backgroundColor: `${accentColors[index]}18` }]}>
                    <Ionicons name="bed" size={27} color={accentColors[index]} />
                    <View style={styles.roomImageSparkle}><Ionicons name="sparkles" size={11} color={accentColors[index]} /></View>
                  </View>
                  <View style={styles.roomInfo}>
                    <View style={styles.roomTitleLine}>
                      <Text style={styles.roomName}>{room.name}</Text>
                      {isSelected && <Ionicons name="checkmark-circle" size={18} color={accentColors[index]} />}
                    </View>
                    <Text style={styles.roomBed}>{room.bed}</Text>
                    <View style={styles.roomMetaLine}>
                      <Ionicons name="people-outline" size={13} color="#7a849a" />
                      <Text style={styles.roomCapacity}>Up to {room.maxAdults + room.maxChildren} guests</Text>
                    </View>
                    <Text style={styles.roomPrice}>₹{room.price.toLocaleString("en-IN")} <Text style={styles.perNight}>/ night</Text></Text>
                  </View>
                  <View style={styles.quantityControls}>
                    <Pressable
                      accessibilityLabel={`Remove one ${room.name}`}
                      onPress={(event) => { event.stopPropagation?.(); updateRoomQuantity(room.id, -1); }}
                      style={[styles.quantityButton, quantity === 0 && styles.quantityButtonMuted]}
                    >
                      <Ionicons name="remove" size={17} color={quantity === 0 ? "#a6afbf" : "#172033"} />
                    </Pressable>
                    <Text style={styles.quantityValue}>{quantity}</Text>
                    <Pressable
                      accessibilityLabel={`Add one ${room.name}`}
                      onPress={(event) => { event.stopPropagation?.(); updateRoomQuantity(room.id, 1); }}
                      style={[styles.quantityButton, styles.quantityButtonActive, { backgroundColor: accentColors[index] }]}
                    >
                      <Ionicons name="add" size={18} color="#ffffff" />
                    </Pressable>
                  </View>
                </Pressable>
              </Animated.View>
            );
          })}
        </Animated.View>

<View style={styles.sectionBlock}>
  <Text style={styles.sectionHeading}>
    Add-ons for {selectedRoom.name}
  </Text>

  <View style={styles.addonsContainer}>
    {selectedRoom.hasAcOption && (
      <OptionToggle
        title="AC"
        icon="snow-outline"
        optionKey="ac"
        price={selectedRoom.acPrice}
        available={selectedRoom.hasAcOption}
      />
    )}

    <OptionToggle
      title="Breakfast"
      icon="restaurant-outline"
      optionKey="breakfast"
      price={selectedRoom.breakfastPrice}
    />

    <OptionToggle
      title="Lunch"
      icon="fast-food-outline"
      optionKey="lunch"
      price={selectedRoom.lunchPrice}
    />

    <OptionToggle
      title="Pool"
      icon="water-outline"
      optionKey="pool"
      price={selectedRoom.poolPrice}
    />
  </View>

</View>

        <View style={styles.guestCard}>
          <Text style={styles.sectionHeading}>Guests</Text>
          <View style={styles.guestRow}>
            <View style={styles.guestLabelWrap}>
              <Ionicons name="man-outline" size={22} color="#00194a" />
              <View>
                <Text style={styles.guestTitle}>Adults</Text>
                <Text style={styles.guestSubtitle}>Age 13+</Text>
              </View>
            </View>
            <Counter
              value={adults}
              onDecrease={() => setAdults((value) => Math.max(1, value - 1))}
              onIncrease={() => setAdults((value) => Math.min(30, value + 1))}
            />
          </View>
          <View style={styles.guestRow}>
            <View style={styles.guestLabelWrap}>
              <Ionicons name="happy-outline" size={22} color="#00194a" />
              <View>
                <Text style={styles.guestTitle}>Children</Text>
                <Text style={styles.guestSubtitle}>Age 0–12</Text>
              </View>
            </View>
            <Counter
              value={children}
              onDecrease={() =>
                setChildren((value) => Math.max(0, value - 1))
              }
              onIncrease={() => setChildren((value) => Math.min(20, value + 1))}
            />
          </View>
          <Text style={styles.guestNote}>
            Guest capacity should be checked against the limits for each room
            before a real reservation is submitted.
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.sectionHeading}>Your Booking Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Stay duration</Text>
            <Text style={styles.summaryValue}>{nights} nights</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Rooms selected</Text>
            <Text style={styles.summaryValue}>{totalRooms}</Text>
          </View>

          {roomBreakdown.map(({ room, quantity, lineTotal }) => (
            <View key={room.id} style={styles.summaryLineGroup}>
              <View style={styles.summaryLine}>
                <View style={styles.summaryRoomInfo}>
                  <Text style={styles.summaryRoomName}>
                    {quantity} × {room.name}
                  </Text>
                  <Text style={styles.summarySmall}>
                    ₹{room.price.toLocaleString("en-IN")} base per room/night
                  </Text>
                </View>
                <Text style={styles.summaryValue}>
                  ₹{(room.price * quantity * nights).toLocaleString("en-IN")}
                </Text>
              </View>

              <View style={styles.summaryFeaturesWrap}>
                {room.features.map((feature) => (
                  <View key={`${room.id}-feature-${feature}`} style={styles.summaryFeatureChip}>
                    <Ionicons name="checkmark-circle" size={12} color="#16a085" />
                    <Text style={styles.summaryFeatureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              {getSelectedAddons(room).map((addon) => (
                <View key={`${room.id}-${addon.key}`} style={styles.addonSummaryRow}>
                  <Text style={styles.addonSummaryLabel}>
                    + {addon.name} ({quantity} room{quantity > 1 ? "s" : ""} × {nights} nights)
                  </Text>
                  <Text style={styles.addonSummaryPrice}>
                    ₹{(addon.price * quantity * nights).toLocaleString("en-IN")}
                  </Text>
                </View>
              ))}

            </View>
          ))}

          {totalRooms === 0 && (
            <Text style={styles.emptySelection}>
              Add at least one room to continue.
            </Text>
          )}

          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total price</Text>
            <Text style={styles.totalValue}>
              ₹{totalCost.toLocaleString("en-IN")}
            </Text>
          </View>

          <Pressable
            disabled={totalRooms === 0}
            style={[
              styles.primaryButton,
              totalRooms === 0 && styles.disabledButton,
            ]}
            onPress={() => {
              setBookingConfirmed(false);
              setShowBookingModal(true);
            }}
          >
            <Text style={styles.primaryButtonText}>Review & Confirm</Text>
          </Pressable>
        </View>

        <View style={styles.locationCard}>
          <View style={styles.locationHeadingRow}>
            <Ionicons name="location-outline" size={21} color="#00194a" />
            <Text style={styles.sectionHeading}>Map & Location</Text>
          </View>
          <View style={styles.mapPreview}>
            <View style={styles.mapRoadHorizontal} />
            <View style={styles.mapRoadVertical} />
            <View style={styles.mapRoadDiagonal} />
            <View style={styles.mapParkOne} />
            <View style={styles.mapParkTwo} />
            <View style={styles.mapPinBubble}>
              <Ionicons name="location" size={28} color="#e53935" />
            </View>
            <View style={styles.mapLabelBubble}>
              <Text style={styles.mapLabelTitle}>Your Hotel</Text>
              <Text style={styles.mapLabelSubtitle}>Add the actual hotel address</Text>
            </View>
          </View>
          <Text style={styles.locationAddress}>
            <Ionicons name="navigate-outline" size={14} color="#00194a" />  Hotel address will appear here
          </Text>
          <Text style={styles.nearbyTitle}>Nearby Tourist Spots</Text>
          {[
            { name: "Popular landmark", detail: "Add distance", icon: "business-outline" as const },
            { name: "Local museum", detail: "Add distance", icon: "easel-outline" as const },
            { name: "Park or viewpoint", detail: "Add distance", icon: "leaf-outline" as const },
          ].map((spot) => (
            <View key={spot.name} style={styles.nearbySpotRow}>
              <View style={styles.nearbySpotIcon}>
                <Ionicons name={spot.icon} size={17} color="#00194a" />
              </View>
              <Text style={styles.nearbySpotName}>{spot.name}</Text>
              <Text style={styles.nearbySpotDistance}>{spot.detail}</Text>
            </View>
          ))}
          <Text style={styles.locationNote}>
            Replace the sample map and nearby spots with the hotel's real coordinates and verified attractions.
          </Text>
        </View>

        <Animated.View
          style={[
            styles.reviewSection,
            styles.glassReviewSection,
            {
              opacity: entranceAnim,
              transform: [{ translateY: entranceAnim.interpolate({ inputRange: [0, 1], outputRange: [26, 0] }) }],
            },
          ]}
        >
          <View style={styles.reviewHeaderRow}>
            <View>
              <Text style={styles.sectionHeading}>Guest love this stay</Text>
              <Text style={styles.reviewSubheading}>Real-feeling highlights from recent guests</Text>
            </View>
            <Pressable style={styles.viewReviewsButton} onPress={() => {}}>
              <Text style={styles.viewReviewsText}>View all</Text>
              <Ionicons name="chevron-forward" size={13} color="#5b5ee8" />
            </Pressable>
          </View>

          <View style={styles.reviewOverviewCard}>
            <View style={styles.reviewScoreBlock}>
              <View style={styles.reviewScoreIcon}><Ionicons name="star" size={19} color="#ffffff" /></View>
              <Text style={styles.reviewScore}>4.8<Text style={styles.reviewScoreOutOf}>/5</Text></Text>
              <View style={styles.reviewOverviewStars}>
                {[1, 2, 3, 4, 5].map((star) => <Ionicons key={star} name="star" size={12} color="#ffb547" />)}
              </View>
              <Text style={styles.reviewTotalText}>128 reviews</Text>
            </View>
            <View style={styles.reviewDistribution}>
              {[
                { star: 5, percent: 78 },
                { star: 4, percent: 15 },
                { star: 3, percent: 5 },
                { star: 2, percent: 1 },
                { star: 1, percent: 1 },
              ].map((item) => (
                <View key={item.star} style={styles.ratingBarRow}>
                  <Text style={styles.ratingBarLabel}>{item.star}</Text>
                  <Ionicons name="star" size={10} color="#ffb547" />
                  <View style={styles.ratingBarBackground}>
                    <View style={[styles.ratingBarFill, { width: `${item.percent}%`, backgroundColor: item.star >= 4 ? "#f5ad43" : "#9da9c4" }]} />
                  </View>
                  <Text style={styles.ratingPercent}>{item.percent}%</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.reviewHighlightsRow}>
            {[
              { icon: "sparkles-outline" as const, label: "Clean rooms", color: "#6b61e8", bg: "#f0edff" },
              { icon: "heart-outline" as const, label: "Friendly staff", color: "#e35e91", bg: "#fff0f6" },
              { icon: "location-outline" as const, label: "Great location", color: "#139b91", bg: "#e8fbf7" },
            ].map((item) => (
              <View key={item.label} style={styles.reviewHighlightChip}>
                <View style={[styles.reviewHighlightIcon, { backgroundColor: item.bg }]}>
                  <Ionicons name={item.icon} size={14} color={item.color} />
                </View>
                <Text style={styles.reviewHighlightText}>{item.label}</Text>
              </View>
            ))}
          </View>

          {[
            { id: "1", name: "Rahul Sharma", initials: "RS", date: "2 days ago", comment: "The room was spotless and beautifully designed. Staff were warm and check-in was effortless.", rating: 5, color: "#6b61e8", bg: "#f0edff", tag: "Wonderful stay" },
            { id: "2", name: "Priya Das", initials: "PD", date: "1 week ago", comment: "Peaceful atmosphere, comfortable beds and lovely amenities. Would happily stay here again.", rating: 4, color: "#d94e8a", bg: "#fff0f6", tag: "Very comfortable" },
          ].map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewCardHeader}>
                <View style={[styles.reviewerAvatar, { backgroundColor: review.bg }]}>
                  <Text style={[styles.reviewerInitials, { color: review.color }]}>{review.initials}</Text>
                </View>
                <View style={styles.reviewerIdentity}>
                  <Text style={styles.reviewName}>{review.name}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <View style={styles.reviewVerifiedBadge}>
                  <Ionicons name="checkmark-circle" size={12} color="#159b79" />
                  <Text style={styles.reviewVerifiedText}>Verified</Text>
                </View>
              </View>
              <View style={styles.reviewStars}>
                {[1, 2, 3, 4, 5].map((star) => <Ionicons key={star} name={star <= review.rating ? "star" : "star-outline"} size={14} color="#ffb547" />)}
                <View style={styles.reviewTag}><Text style={styles.reviewTagText}>{review.tag}</Text></View>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
              <View style={styles.reviewFooterRow}>
                <Ionicons name="thumbs-up-outline" size={13} color="#7d879a" />
                <Text style={styles.reviewHelpfulText}>Helpful review</Text>
                <View style={styles.reviewFooterSpacer} />
                <Ionicons name="chatbubble-ellipses-outline" size={13} color="#7d879a" />
                <Text style={styles.reviewHelpfulText}>Reply</Text>
              </View>
            </View>
          ))}
        </Animated.View>
      </ScrollView>

      {/* Fixed bottom action bar inspired by the reference design */}
      <View style={styles.bottomContainer}>
        <View style={styles.footerPriceBlock}>
          <Text style={styles.footerPrice}>₹{totalCost.toLocaleString("en-IN")}</Text>
          <Text style={styles.footerPriceLabel}>Total Price</Text>
        </View>
        <Pressable
          style={styles.scheduleVisitButton}
          onPress={() => {
            setBookingConfirmed(false);
            setShowBookingModal(true);
          }}
        >
          <Text style={styles.scheduleVisitText}>Schedule Visit</Text>
        </Pressable>
        <Pressable
          style={[styles.footerBookButton, totalRooms === 0 && styles.disabledButton]}
          disabled={totalRooms === 0}
          onPress={() => {
            setBookingConfirmed(false);
            setShowBookingModal(true);
          }}
        >
          <Text style={styles.footerBookText}>Book Now</Text>
          <Ionicons name="arrow-forward" size={16} color="#ffffff" />
        </Pressable>
      </View>

      {/* Booking confirmation modal */}
      <Modal
        visible={showBookingModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowBookingModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Confirm Your Booking</Text>
              <Pressable onPress={() => setShowBookingModal(false)}>
                <Ionicons name="close" size={25} color="#00194a" />
              </Pressable>
            </View>

            <Text style={styles.modalSubtitle}>
              Check your room quantities and total before continuing.
            </Text>

            <ScrollView style={styles.modalRoomList}>
              {roomBreakdown.map(({ room, quantity }) => (
                <View key={room.id} style={styles.modalRoomGroup}>
                  <View style={styles.modalRoomRow}>
                    <View style={styles.summaryRoomInfo}>
                      <Text style={styles.summaryRoomName}>
                        {quantity} × {room.name}
                      </Text>
                      <Text style={styles.summarySmall}>
                        {nights} nights · ₹{room.price.toLocaleString("en-IN")} per room/night
                      </Text>
                    </View>
                    <Text style={styles.summaryValue}>
                      ₹{(room.price * quantity * nights).toLocaleString("en-IN")}
                    </Text>
                  </View>

                  <View style={styles.summaryFeaturesWrap}>
                    {room.features.map((feature) => (
                      <View key={`${room.id}-modal-feature-${feature}`} style={styles.summaryFeatureChip}>
                        <Ionicons name="checkmark-circle" size={12} color="#16a085" />
                        <Text style={styles.summaryFeatureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>

                  {getSelectedAddons(room).map((addon) => (
                    <View key={`${room.id}-${addon.key}`} style={styles.modalAddonRow}>
                      <Text style={styles.addonSummaryLabel}>
                        <Text style={styles.modalAddonBullet}>+ </Text>
                        {addon.name}
                      </Text>
                      <Text style={styles.addonSummaryPrice}>
                        ₹{(addon.price * quantity * nights).toLocaleString("en-IN")}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Guests</Text>
                <Text style={styles.summaryValue}>
                  {adults} adults, {children} children
                </Text>
              </View>
            </ScrollView>

            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total amount</Text>
              <Text style={styles.totalValue}>
                ₹{totalCost.toLocaleString("en-IN")}
              </Text>
            </View>

            {bookingConfirmed ? (
              <View style={styles.confirmationMessage}>
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color="#16803c"
                />
                <Text style={styles.confirmationText}>
                  Selection confirmed. Connect a booking API to complete the
                  reservation.
                </Text>
              </View>
            ) : (
              <Pressable
                disabled={totalRooms === 0}
                style={[
                  styles.primaryButton,
                  totalRooms === 0 && styles.disabledButton,
                ]}
                onPress={() => setBookingConfirmed(true)}
              >
                <Text style={styles.primaryButtonText}>Confirm Selection</Text>
              </Pressable>
            )}

            {bookingConfirmed && (
              <Pressable
                style={styles.primaryButton}
                onPress={() => {
                  setShowBookingModal(false);
                  // TODO: Call your real booking API/payment flow here.
                }}
              >
                <Text style={styles.primaryButtonText}>Book Hotel</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HotelDetails;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6ff" },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 115 },
  heroContainer: {
    height: 315,
    position: "relative",
    backgroundColor: "#d8e0e8",
    overflow: "hidden",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroImage: { width: "100%", height: "100%", position: "absolute" },
  heroTopActions: {
    position: "absolute",
    top: 42,
    left: 18,
    right: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroRightActions: { flexDirection: "row", gap: 10 },
  heroCircleButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.96)",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  heroGradientContent: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 34,
    paddingBottom: 17,
    backgroundColor: "rgba(10,16,25,0.62)",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 10,
  },
  heroPropertyInfo: { flex: 1 },
  heroPropertyName: { color: "#fff", fontSize: 23, fontWeight: "800", marginBottom: 6 },
  heroLocationRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  heroLocationText: { color: "#fff", fontSize: 11 },
  heroRatingRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 7 },
  heroRatingText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  heroReviewText: { color: "#e9edf2", fontSize: 11 },
  heroPriceCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minWidth: 105,
    elevation: 4,
  },
  heroPriceCaption: { fontSize: 9, color: "#667085" },
  heroPrice: { fontSize: 17, fontWeight: "800", color: "#172033", marginTop: 2 },
  heroPriceUnit: { fontSize: 9, color: "#667085", marginTop: 1 },
  propertyStatsCard: {
    marginHorizontal: 16,
    marginTop: -1,
    paddingVertical: 15,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-around",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  propertyStatItem: { flex: 1, alignItems: "center", justifyContent: "center", gap: 3, borderRightWidth: 1, borderRightColor: "#f0f1f4" },
  propertyStatValue: { fontSize: 13, fontWeight: "800", color: "#172033" },
  propertyStatLabel: { fontSize: 10, color: "#737987" },
  galleryGrid: { marginHorizontal: 14, marginTop: 12, flexDirection: "row", gap: 8, height: 170 },
  galleryLargeColumn: { flex: 1.08, position: "relative" },
  galleryLargeImage: { width: "100%", height: "100%", borderRadius: 15 },
  gallerySmallColumn: { flex: 1.25, gap: 8 },
  gallerySmallRow: { flex: 1, flexDirection: "row", gap: 8 },
  gallerySmallImage: { flex: 1, width: "50%", height: "100%", borderRadius: 13 },
  galleryWideImage: { width: "100%", flex: 1, borderRadius: 13 },
  photoCountBadge: { position: "absolute", bottom: 10, left: 10, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 18, backgroundColor: "rgba(25,25,25,0.62)", flexDirection: "row", alignItems: "center", gap: 5 },
  photoCountText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  aboutPropertySection: { marginHorizontal: 22, marginTop: 20, marginBottom: 2 },
  aboutHeadingRow: { flexDirection: "row", alignItems: "center", gap: 9, marginBottom: 8 },
  aboutPropertyTitle: { color: "#172033", fontSize: 16, fontWeight: "800" },
  aboutPropertyText: { color: "#5f6470", fontSize: 12, lineHeight: 19 },
  readMoreButton: { flexDirection: "row", alignItems: "center", gap: 5, alignSelf: "flex-start", marginTop: 7 },
  readMoreText: { color: "#8b7a50", fontSize: 11, fontWeight: "700" },
  image: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  imageStrip: { paddingHorizontal: 12, paddingTop: 10 },
  selectImage: {
    width: 135,
    height: 100,
    marginRight: 10,
    borderRadius: 14,
  },
  descriptionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 16,
    padding: 15,
    elevation: 3,
  },
  descriptionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#00194a",
    marginBottom: 8,
  },
  description: { fontSize: 14, lineHeight: 21, color: "#555" },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    color: "#00194a",
  },
  amenitiesContainer: { paddingHorizontal: 20, paddingBottom: 5 },
  amenityItem: {
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  amenityText: { fontSize: 11, color: "gray", marginTop: 5 },
  hotelDescriptionCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    borderRadius: 15,
    elevation: 2,
  },
  hotelDescriptionText: {
    fontSize: 13,
    lineHeight: 21,
    textAlign: "left",
    color: "#666",
  },
  dateGuestCard: {
    marginHorizontal: 20,
    marginTop: 18,
    padding: 15,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5ebf5",
    elevation: 2,
  },
  stayDatesRow: { flexDirection: "row", alignItems: "center", marginTop: 14 },
  stayDateItem: { flex: 1, flexDirection: "row", alignItems: "flex-start", gap: 9 },
  stayDateDivider: { width: 1, height: 52, backgroundColor: "#e1e7f0", marginHorizontal: 10 },
  stayDateLabel: { fontSize: 11, color: "#667085" },
  stayDateValue: { fontSize: 13, fontWeight: "700", color: "#00194a", marginTop: 4 },
  stayDateTime: { fontSize: 10, color: "#7b8494", marginTop: 3 },
  stayHint: { fontSize: 10, color: "#7b8494", marginTop: 12 },
  locationCard: {
    marginHorizontal: 20,
    marginTop: 22,
    padding: 15,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5ebf5",
    elevation: 2,
  },
  locationHeadingRow: { flexDirection: "row", alignItems: "center", gap: 7, marginBottom: 12 },
  mapPreview: {
    height: 155,
    borderRadius: 13,
    overflow: "hidden",
    backgroundColor: "#e7f0e5",
    position: "relative",
  },
  mapRoadHorizontal: { position: "absolute", top: 68, left: -10, right: -10, height: 18, backgroundColor: "#fff", transform: [{ rotate: "-8deg" }] },
  mapRoadVertical: { position: "absolute", top: -20, bottom: -20, left: "58%", width: 16, backgroundColor: "#fff", transform: [{ rotate: "17deg" }] },
  mapRoadDiagonal: { position: "absolute", top: 25, left: -15, width: "115%", height: 10, backgroundColor: "#f8fbf6", transform: [{ rotate: "23deg" }] },
  mapParkOne: { position: "absolute", width: 72, height: 42, top: 12, left: 15, borderRadius: 12, backgroundColor: "#c7e2c2" },
  mapParkTwo: { position: "absolute", width: 90, height: 42, bottom: 10, right: 15, borderRadius: 12, backgroundColor: "#c7e2c2" },
  mapPinBubble: { position: "absolute", top: 42, left: "42%", width: 38, height: 38, borderRadius: 19, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", elevation: 3 },
  mapLabelBubble: { position: "absolute", top: 15, left: "49%", paddingHorizontal: 9, paddingVertical: 6, borderRadius: 8, backgroundColor: "#fff", elevation: 2 },
  mapLabelTitle: { fontSize: 11, fontWeight: "700", color: "#00194a" },
  mapLabelSubtitle: { fontSize: 9, color: "#7b8494", marginTop: 2 },
  locationAddress: { color: "#526176", fontSize: 11, marginTop: 11 },
  nearbyTitle: { fontSize: 14, fontWeight: "700", color: "#00194a", marginTop: 16, marginBottom: 5 },
  nearbySpotRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#f0f2f6", gap: 9 },
  nearbySpotIcon: { width: 30, height: 30, borderRadius: 10, backgroundColor: "#f0f4fb", alignItems: "center", justifyContent: "center" },
  nearbySpotName: { flex: 1, fontSize: 12, color: "#334155", fontWeight: "600" },
  nearbySpotDistance: { fontSize: 10, color: "#7b8494" },
  locationNote: { fontSize: 10, color: "#8a94a6", lineHeight: 15, marginTop: 10 },
  sectionBlock: { marginHorizontal: 20, marginTop: 22 },
  glassSection: { padding: 14, borderRadius: 24, backgroundColor: "rgba(255,255,255,0.78)", borderWidth: 1, borderColor: "rgba(255,255,255,0.95)", shadowColor: "#6876c8", shadowOpacity: 0.12, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 4 },
  roomSectionHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 14 },
  roomSectionIcon: { width: 44, height: 44, borderRadius: 15, backgroundColor: "#6266e8", alignItems: "center", justifyContent: "center", shadowColor: "#6266e8", shadowOpacity: 0.25, shadowRadius: 8, elevation: 3 },
  roomCountBadge: { backgroundColor: "#eaf8f4", borderRadius: 12, paddingHorizontal: 9, paddingVertical: 7 },
  roomCountBadgeText: { fontSize: 10, fontWeight: "800", color: "#159b79" },
  addonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
    marginTop: 14,
  },
  addonItem: {
    width: "48%",
    minHeight: 126,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#dce3ef",
    borderRadius: 14,
    backgroundColor: "#ffffff",
  },
  addonItemSelected: {
    borderColor: "#00194a",
    backgroundColor: "#f0f4ff",
  },
  addonItemDisabled: { opacity: 0.45 },
  addonIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#edf1f8",
    marginBottom: 8,
  },
  addonIconSelected: { backgroundColor: "#00194a" },
  addonTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#00194a",
    textAlign: "center",
  },
  addonPrice: {
    marginTop: 5,
    fontSize: 11,
    fontWeight: "700",
    color: "#16803d",
    textAlign: "center",
  },
  addonHint: {
    marginTop: 5,
    fontSize: 10,
    color: "#7a8494",
    textAlign: "center",
  },
  sectionHeading: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#00194a",
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
    marginBottom: 12,
    lineHeight: 18,
  },
  roomCard: {
    backgroundColor: "rgba(255,255,255,0.82)",
    borderWidth: 1,
    borderColor: "rgba(216,224,242,0.95)",
    borderRadius: 19,
    padding: 12,
    marginBottom: 11,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    overflow: "hidden",
  },
  glassRoomCard: { shadowColor: "#8794d7", shadowOpacity: 0.12, shadowRadius: 10, shadowOffset: { width: 0, height: 5 } },
  roomAccentBar: { position: "absolute", left: 0, top: 10, bottom: 10, width: 4, borderTopRightRadius: 4, borderBottomRightRadius: 4 },
  roomImagePlaceholder: { width: 62, height: 70, borderRadius: 15, alignItems: "center", justifyContent: "center", marginRight: 11, marginLeft: 3 },
  roomImageSparkle: { position: "absolute", top: 6, right: 6 },
  roomMetaLine: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  roomCardSelected: { borderWidth: 1.5, backgroundColor: "rgba(255,255,255,0.98)" },
  roomInfo: { flex: 1, paddingRight: 5 },
  roomTitleLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  roomName: { fontSize: 15, fontWeight: "bold", color: "#00194a" },
  roomBed: { fontSize: 12, color: "#666", marginTop: 4 },
  roomPrice: { fontSize: 14, fontWeight: "bold", color: "#e53935", marginTop: 6 },
  perNight: { fontSize: 11, fontWeight: "normal", color: "#777" },
  roomCapacity: { fontSize: 11, color: "#888", marginTop: 3 },
  quantityControls: { flexDirection: "row", alignItems: "center", gap: 8 },
  quantityButton: {
    width: 29,
    height: 29,
    borderRadius: 9,
    backgroundColor: "#edf1f7",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonActive: { backgroundColor: "#6266e8" },
  quantityButtonMuted: { backgroundColor: "#f0f2f8" },
  quantityValue: {
    minWidth: 15,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "#00194a",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e9edf2",
  },
  optionLeft: { flex: 1, flexDirection: "row", alignItems: "center", gap: 9 },
  optionTextWrap: { flex: 1 },
  optionName: { fontSize: 13, fontWeight: "600", color: "#333" },
  optionDescription: { fontSize: 10, color: "#888", marginTop: 3 },
  optionToggle: {
    minWidth: 78,
    paddingHorizontal: 8,
    paddingVertical: 7,
    alignItems: "center",
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#d7dce5",
    backgroundColor: "#fff",
  },
  optionToggleActive: { backgroundColor: "#00194a", borderColor: "#00194a" },
  optionToggleDisabled: { opacity: 0.4 },
  optionToggleText: { fontSize: 10, fontWeight: "bold", color: "#00194a" },
  optionToggleTextActive: { color: "#fff" },
  optionPrice: { fontSize: 9, color: "#00194a", marginTop: 2 },

  guestCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    elevation: 2,
  },
  guestRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eef0f4",
  },
  guestLabelWrap: { flexDirection: "row", alignItems: "center", gap: 10 },
  guestTitle: { fontSize: 13, fontWeight: "600", color: "#333" },
  guestSubtitle: { fontSize: 10, color: "#888", marginTop: 2 },
  guestNote: { fontSize: 10, lineHeight: 15, color: "#888", marginTop: 10 },
  counter: { flexDirection: "row", alignItems: "center", gap: 10 },
  counterButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#edf1f7",
    alignItems: "center",
    justifyContent: "center",
  },
  counterValue: {
    minWidth: 14,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  summaryCard: {
    backgroundColor: "rgba(255,255,255,0.9)",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    shadowColor: "#6876c8",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 7 },
    elevation: 4,
  },
  summaryFeaturesWrap: { flexDirection: "row", flexWrap: "wrap", gap: 6, paddingBottom: 6 },
  summaryFeatureChip: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#effaf6", borderRadius: 9, paddingHorizontal: 7, paddingVertical: 5 },
  summaryFeatureText: { fontSize: 9, color: "#36796b", fontWeight: "600" },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginVertical: 7,
  },
  summaryLabel: { flex: 1, fontSize: 12, color: "#555" },
  summaryValue: { fontSize: 12, fontWeight: "600", color: "#00194a" },
  summaryLineGroup: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f2f5",
  },
  summaryLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
  },
  addonSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    paddingVertical: 5,
    paddingLeft: 10,
  },
  addonSummaryLabel: { flex: 1, fontSize: 11, color: "#5d6b82" },
  addonSummaryPrice: { fontSize: 11, fontWeight: "600", color: "#16803d" },
  modalRoomGroup: {
    paddingBottom: 8,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f2f5",
  },
  modalAddonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    paddingVertical: 5,
    paddingLeft: 10,
  },
  modalAddonBullet: { color: "#16803d", fontWeight: "700" },
  summaryRoomInfo: { flex: 1 },
  summaryRoomName: { fontSize: 13, fontWeight: "600", color: "#333" },
  summarySmall: { fontSize: 10, color: "#888", marginTop: 4 },
  emptySelection: { color: "#c62828", fontSize: 12, marginTop: 8 },
  summaryDivider: { height: 1, backgroundColor: "#e5e7eb", marginVertical: 12 },
  totalLabel: { fontSize: 15, fontWeight: "bold", color: "#00194a" },
  totalValue: { fontSize: 19, fontWeight: "bold", color: "#e53935" },
  primaryButton: {
    backgroundColor: "#00194a",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  primaryButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  disabledButton: { opacity: 0.45 },
  reviewSection: { marginHorizontal: 20, marginTop: 24, marginBottom: 25 },
  glassReviewSection: { padding: 14, borderRadius: 24, backgroundColor: "rgba(255,255,255,0.78)", borderWidth: 1, borderColor: "rgba(255,255,255,0.95)", shadowColor: "#6876c8", shadowOpacity: 0.12, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 4 },
  reviewHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 },
  reviewSubheading: { color: "#858da4", fontSize: 10, marginTop: 5 },
  viewReviewsButton: { flexDirection: "row", alignItems: "center", gap: 2, paddingHorizontal: 8, paddingVertical: 7, borderRadius: 10, backgroundColor: "#f0efff" },
  viewReviewsText: { color: "#5b5ee8", fontSize: 10, fontWeight: "800" },
  reviewOverviewCard: { flexDirection: "row", alignItems: "center", gap: 16, backgroundColor: "#ffffff", borderRadius: 19, padding: 14, marginTop: 15, borderWidth: 1, borderColor: "#edf0fa" },
  reviewScoreBlock: { width: 100, alignItems: "center", borderRightWidth: 1, borderRightColor: "#edf0f7", paddingRight: 12 },
  reviewScoreIcon: { width: 34, height: 34, borderRadius: 12, backgroundColor: "#ffb547", alignItems: "center", justifyContent: "center", marginBottom: 5 },
  reviewScore: { fontSize: 26, fontWeight: "900", color: "#202747" },
  reviewScoreOutOf: { fontSize: 12, color: "#929ab0", fontWeight: "600" },
  reviewOverviewStars: { flexDirection: "row", gap: 1, marginTop: 3 },
  reviewTotalText: { fontSize: 10, color: "#858da4", marginTop: 5 },
  reviewDistribution: { flex: 1, gap: 7 },
  reviewHighlightsRow: { flexDirection: "row", flexWrap: "wrap", gap: 7, marginTop: 12, marginBottom: 4 },
  reviewHighlightChip: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.8)", borderWidth: 1, borderColor: "#f0f1fa" },
  reviewHighlightIcon: { width: 24, height: 24, borderRadius: 9, alignItems: "center", justifyContent: "center" },
  reviewHighlightText: { fontSize: 9, fontWeight: "700", color: "#596178" },
  ratingBarRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  ratingBarLabel: { width: 10, fontSize: 11, color: "#526176" },
  ratingBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: "#e8edf3",
    borderRadius: 10,
    overflow: "hidden",
  },
  ratingBarFill: { height: "100%", backgroundColor: "#f5a623", borderRadius: 10 },
  ratingPercent: { width: 30, fontSize: 10, textAlign: "right", color: "#8490a3" },
  reviewCard: { backgroundColor: "rgba(255,255,255,0.96)", borderRadius: 18, padding: 13, marginTop: 10, borderWidth: 1, borderColor: "#edf0fa", shadowColor: "#8a92c4", shadowOpacity: 0.08, shadowRadius: 9, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  reviewCardHeader: { flexDirection: "row", alignItems: "center", gap: 9 },
  reviewerAvatar: { width: 39, height: 39, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  reviewerInitials: { fontSize: 12, fontWeight: "900" },
  reviewerIdentity: { flex: 1 },
  reviewName: { fontSize: 12, fontWeight: "800", color: "#202747" },
  reviewDate: { fontSize: 9, color: "#929ab0", marginTop: 3 },
  reviewVerifiedBadge: { flexDirection: "row", alignItems: "center", gap: 3, paddingHorizontal: 7, paddingVertical: 5, backgroundColor: "#eaf9f3", borderRadius: 8 },
  reviewVerifiedText: { fontSize: 8, color: "#159b79", fontWeight: "800" },
  reviewComment: { fontSize: 11, lineHeight: 17, color: "#5d6b82", marginTop: 9 },
  reviewStars: { flexDirection: "row", alignItems: "center", gap: 2, marginTop: 9 },
  reviewTag: { marginLeft: 6, backgroundColor: "#fff5e5", borderRadius: 7, paddingHorizontal: 7, paddingVertical: 4 },
  reviewTagText: { color: "#b7791f", fontSize: 8, fontWeight: "800" },
  reviewFooterRow: { flexDirection: "row", alignItems: "center", gap: 5, borderTopWidth: 1, borderTopColor: "#f0f2f8", paddingTop: 9, marginTop: 10 },
  reviewHelpfulText: { fontSize: 9, color: "#7d879a" },
  reviewFooterSpacer: { flex: 1 },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 78,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -3 },
    zIndex: 100,
    gap: 8,
  },
  footerPriceBlock: { width: 92, justifyContent: "center" },
  footerPrice: { fontSize: 14, fontWeight: "800", color: "#172033" },
  footerPriceLabel: { fontSize: 11, color: "#737987", marginTop: 3 },
  scheduleVisitButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d9c9a7",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 4,
  },
  scheduleVisitText: { color: "#4f4a40", fontSize: 11, fontWeight: "700" },
  footerBookButton: {
    flex: 1.05,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#172033",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 5,
  },
  footerBookText: { color: "#fff", fontSize: 12, fontWeight: "800" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "82%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: { fontSize: 19, fontWeight: "bold", color: "#00194a", flex: 1 },
  modalSubtitle: { fontSize: 12, lineHeight: 18, color: "#777", marginTop: 8, marginBottom: 12 },
  modalRoomList: { maxHeight: 250 },
  modalRoomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    paddingVertical: 9,
  },
  confirmationMessage: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 15 },
  confirmationText: { flex: 1, color: "#16803c", fontSize: 12, fontWeight: "600", lineHeight: 17 },
});

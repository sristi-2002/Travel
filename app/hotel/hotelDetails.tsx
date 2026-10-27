import React, { useMemo, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
  const nights = 2;

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
    description,
    icon,
    optionKey,
    price,
    available = true,
  }: {
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    optionKey: keyof RoomOptions;
    price: number;
    available?: boolean;
  }) => {
    const enabled = selectedOptions[optionKey];
    return (
      <View style={styles.optionRow}>
        <View style={styles.optionLeft}>
          <Ionicons name={icon} size={20} color="#00194a" />
          <View style={styles.optionTextWrap}>
            <Text style={styles.optionName}>{title}</Text>
            <Text style={styles.optionDescription}>{description}</Text>
          </View>
        </View>
        <Pressable
          disabled={!available}
          onPress={() => updateOption(optionKey, !enabled)}
          style={[
            styles.optionToggle,
            enabled && styles.optionToggleActive,
            !available && styles.optionToggleDisabled,
          ]}
        >
          <Text style={[styles.optionToggleText, enabled && styles.optionToggleTextActive]}>
            {enabled ? "Included" : "Add"}
          </Text>
          <Text style={[styles.optionPrice, enabled && styles.optionToggleTextActive]}>
            {price === 0 ? "FREE" : `+₹${price}`}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator
      >
        <Image
          source={require("../../assets/images/h1.png")}
          style={styles.image}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageStrip}
        >
          {images.map((image, index) => (
            <Image key={index} source={image} style={styles.selectImage} />
          ))}
        </ScrollView>

        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionTitle}>Hotel Description</Text>
          <Text style={styles.description}>
            Enjoy a comfortable stay with welcoming service, spacious rooms,
            and convenient amenities for business and leisure travellers.
          </Text>
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

        <View style={styles.hotelDescriptionCard}>
          <Text style={styles.hotelDescriptionText}>
            Experience comfort and convenience at our beautiful hotel. Enjoy
            well-appointed rooms, modern amenities, complimentary Wi-Fi,
            dining options, and helpful hospitality. Whether travelling for
            business or leisure, relax in a convenient and welcoming setting.
          </Text>
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.sectionHeading}>Choose Your Rooms</Text>
          <Text style={styles.sectionSubtitle}>
            Select any combination of room types. Choose up to 10 of each type.
          </Text>

          {roomTypes.map((room) => {
            const quantity = roomQuantities[room.id] ?? 0;
            const isSelected = selectedRoom.id === room.id;
            return (
              <Pressable
                key={room.id}
                onPress={() => handleRoomSelect(room)}
                style={[
                  styles.roomCard,
                  isSelected && styles.roomCardSelected,
                ]}
              >
                <View style={styles.roomInfo}>
                  <View style={styles.roomTitleLine}>
                    <Text style={styles.roomName}>{room.name}</Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color="#00194a"
                      />
                    )}
                  </View>
                  <Text style={styles.roomBed}>{room.bed}</Text>
                  <Text style={styles.roomPrice}>
                    ₹{room.price.toLocaleString("en-IN")}{" "}
                    <Text style={styles.perNight}>/ night</Text>
                  </Text>
                  <Text style={styles.roomCapacity}>
                    Up to {room.maxAdults + room.maxChildren} guests
                  </Text>
                </View>
                <View style={styles.quantityControls}>
                  <Pressable
                    onPress={() => updateRoomQuantity(room.id, -1)}
                    style={styles.quantityButton}
                  >
                    <Ionicons name="remove" size={18} color="#00194a" />
                  </Pressable>
                  <Text style={styles.quantityValue}>{quantity}</Text>
                  <Pressable
                    onPress={() => updateRoomQuantity(room.id, 1)}
                    style={[styles.quantityButton, styles.quantityButtonActive]}
                  >
                    <Ionicons name="add" size={18} color="#ffffff" />
                  </Pressable>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.sectionHeading}>
            Options for {selectedRoom.name}
          </Text>
          <Text style={styles.sectionSubtitle}>
            These options apply to every {selectedRoom.name.toLowerCase()} you
            selected.
          </Text>

          {selectedRoom.hasAcOption && (
            <OptionToggle
              title="Air conditioning"
              description="AC room upgrade"
              icon="snow-outline"
              optionKey="ac"
              price={selectedRoom.acPrice}
            />
          )}
          <OptionToggle
            title="Breakfast"
            description="Breakfast during your stay"
            icon="restaurant-outline"
            optionKey="breakfast"
            price={selectedRoom.breakfastPrice}
          />
          <OptionToggle
            title="Lunch"
            description="Lunch during your stay"
            icon="fast-food-outline"
            optionKey="lunch"
            price={selectedRoom.lunchPrice}
          />
          <OptionToggle
            title="Swimming pool"
            description="Pool access"
            icon="water-outline"
            optionKey="pool"
            price={selectedRoom.poolPrice}
          />

          <Text style={styles.featuresTitle}>Room Includes</Text>
          <View style={styles.featuresContainer}>
            {selectedRoom.features.map((feature) => (
              <View key={feature} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={16} color="#00194a" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
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

          {roomBreakdown.map(({ room, quantity, extrasPerRoom, lineTotal }) => (
            <View key={room.id} style={styles.summaryLine}>
              <View style={styles.summaryRoomInfo}>
                <Text style={styles.summaryRoomName}>
                  {quantity} × {room.name}
                </Text>
                <Text style={styles.summarySmall}>
                  ₹{room.price.toLocaleString("en-IN")} base
                  {extrasPerRoom > 0
                    ? ` + ₹${extrasPerRoom.toLocaleString("en-IN")} extras`
                    : ""}{" "}
                  per room/night
                </Text>
              </View>
              <Text style={styles.summaryValue}>
                ₹{lineTotal.toLocaleString("en-IN")}
              </Text>
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

        <View style={styles.reviewSection}>
          <Text style={styles.sectionHeading}>Guest Reviews</Text>
          <View style={styles.ratingCard}>
            {[
              { star: 5, percent: 70 },
              { star: 4, percent: 20 },
              { star: 3, percent: 7 },
              { star: 2, percent: 2 },
              { star: 1, percent: 1 },
            ].map((item) => (
              <View key={item.star} style={styles.ratingBarRow}>
                <Text style={styles.ratingBarLabel}>{item.star}</Text>
                <Ionicons name="star" size={12} color="#F5A623" />
                <View style={styles.ratingBarBackground}>
                  <View
                    style={[
                      styles.ratingBarFill,
                      { width: `${item.percent}%` },
                    ]}
                  />
                </View>
                <Text style={styles.ratingPercent}>{item.percent}%</Text>
              </View>
            ))}
          </View>

          {[
            {
              id: "1",
              name: "Rahul Sharma",
              comment:
                "The room was clean and comfortable. The staff were friendly and the overall experience was wonderful.",
              rating: 5,
            },
            {
              id: "2",
              name: "Priya Das",
              comment:
                "A pleasant stay with good amenities and a peaceful atmosphere. The service was also good.",
              rating: 4,
            },
            {
              id: "3",
              name: "Amit Verma",
              comment:
                "Great hospitality, spacious rooms and a smooth check-in experience. Would love to visit again.",
              rating: 5,
            },
          ].map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <Text style={styles.reviewName}>{review.name}</Text>
              <Text style={styles.reviewComment}>{review.comment}</Text>
              <View style={styles.reviewStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name={star <= review.rating ? "star" : "star-outline"}
                    size={15}
                    color="#F5A623"
                  />
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Fixed bottom bar */}
      <View style={styles.bottomContainer}>
        <View style={styles.dateCard}>
          <Ionicons name="calendar-outline" color="#ffffff" size={15} />
          <View>
            <Text style={styles.infoLabel}>Check-in</Text>
            <Text style={styles.infoValue}>12 Aug</Text>
          </View>
        </View>

        <Pressable
          style={[
            styles.middleBookButton,
            totalRooms === 0 && styles.disabledButton,
          ]}
          disabled={totalRooms === 0}
          onPress={() => {
            setBookingConfirmed(false);
            setShowBookingModal(true);
          }}
        >
          <Text style={styles.middlePriceLabel}>Total Price</Text>
          <Text style={styles.middlePriceValue}>
            ₹{totalCost.toLocaleString("en-IN")}
          </Text>
          <Text style={styles.middleBookText}>Book Now</Text>
        </Pressable>

        <View style={styles.dateCard}>
          <Ionicons name="calendar-outline" color="#ffffff" size={15} />
          <View>
            <Text style={styles.infoLabel}>Check-out</Text>
            <Text style={styles.infoValue}>14 Aug</Text>
          </View>
        </View>
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
              {roomBreakdown.map(
                ({ room, quantity, extrasPerRoom, lineTotal }) => (
                  <View key={room.id} style={styles.modalRoomRow}>
                    <View style={styles.summaryRoomInfo}>
                      <Text style={styles.summaryRoomName}>
                        {quantity} × {room.name}
                      </Text>
                      <Text style={styles.summarySmall}>
                        {nights} nights
                        {extrasPerRoom > 0
                          ? ` • extras ₹${extrasPerRoom}/room/night`
                          : ""}
                      </Text>
                    </View>
                    <Text style={styles.summaryValue}>
                      ₹{lineTotal.toLocaleString("en-IN")}
                    </Text>
                  </View>
                ),
              )}

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
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 120 },
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
  sectionBlock: { marginHorizontal: 20, marginTop: 22 },
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
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e6ee",
    borderRadius: 14,
    padding: 13,
    marginBottom: 11,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  roomCardSelected: { borderColor: "#00194a", borderWidth: 1.5 },
  roomInfo: { flex: 1, paddingRight: 8 },
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
  quantityButtonActive: { backgroundColor: "#00194a" },
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
  featuresTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#00194a",
    marginTop: 17,
    marginBottom: 8,
  },
  featuresContainer: { flexDirection: "row", flexWrap: "wrap", gap: 9 },
  featureItem: { width: "47%", flexDirection: "row", alignItems: "center", gap: 5 },
  featureText: { flex: 1, fontSize: 11, color: "#555" },
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
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginVertical: 7,
  },
  summaryLabel: { flex: 1, fontSize: 12, color: "#555" },
  summaryValue: { fontSize: 12, fontWeight: "600", color: "#00194a" },
  summaryLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f2f5",
  },
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
  ratingCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginTop: 12,
    marginBottom: 14,
    gap: 9,
  },
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
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 13,
    marginBottom: 10,
    elevation: 2,
  },
  reviewName: { fontSize: 13, fontWeight: "bold", color: "#172b4d" },
  reviewComment: { fontSize: 12, lineHeight: 18, color: "#5d6b82", marginTop: 6 },
  reviewStars: { flexDirection: "row", gap: 2, marginTop: 8 },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 80,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 7,
    paddingVertical: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    zIndex: 100,
    gap: 5,
  },
  dateCard: {
    width: 94,
    height: 52,
    backgroundColor: "#00194a",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  infoLabel: { fontSize: 8, color: "#fff" },
  infoValue: { fontSize: 11, fontWeight: "bold", color: "#fff" },
  middleBookButton: {
    flex: 1,
    minWidth: 0,
    height: 62,
    backgroundColor: "#e53935",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  middlePriceLabel: { fontSize: 9, color: "#fff" },
  middlePriceValue: { fontSize: 14, fontWeight: "bold", color: "#fff" },
  middleBookText: { fontSize: 11, fontWeight: "bold", color: "#fff" },
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

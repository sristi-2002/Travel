// Single source of truth for all destination details.
// Every place has: description + 5 hotels + 5 cafes + 5 attractions + 5 adventures + 5 emergency contacts.
// Consumed by app/details.tsx (popup) and app/place/*.tsx screens.

export const placedetails = {
  /* ================= HILL ================= */

  Kashmir: {
    description:
      "Kashmir is known for snow-covered mountains, Dal Lake, tulip gardens and beautiful valleys.",
    hotels: [
    {
      id: 1,
      name: "The Khyber Himalayan Resort",
      location: "Gulmarg, Kashmir",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
      rating: 4.8,
      price: 180,
    },
    {
      id: 2,
      name: "Welcome Hotel Pine-N-Peak",
      location: "Pahalgam, Kashmir",
      image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=80",
      rating: 4.4,
      price: 120,
    },
    {
      id: 3,
      name: "Vivanta Dal View",
      location: "Srinagar, Kashmir",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",
      rating: 4.6,
      price: 150,
    },
    {
      id: 4,
      name: "Hotel Grand Mumtaz",
      location: "Srinagar, Kashmir",
      image: "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?w=1200&q=80",
      rating: 4.2,
      price: 95,
    },
    {
      id: 5,
      name: "Lalit Grand Palace",
      location: "Srinagar, Kashmir",
      image: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&q=80",
      rating: 4.7,
      price: 210,
    },],
    cafes: [
      { id: 1, name: "Stream Restaurant", rating: 4.5, price: 20 },
      { id: 2, name: "Cafe Liberty", rating: 4.4, price: 15 },
      { id: 3, name: "Chai Jaai", rating: 4.6, price: 12 },
      { id: 4, name: "Mughal Darbar", rating: 4.3, price: 18 },
      { id: 5, name: "Winterfell Cafe", rating: 4.5, price: 16 },
    ],
    attractions: ["Dal Lake", "Gulmarg", "Sonmarg", "Pahalgam", "Nishat Garden"],
    adventure: ["Gondola Ride", "Skiing", "Horse Riding", "Shikara Ride", "Trekking"],
    emergency: [
      { id: 1, name: "SMHS Hospital", address: "Karan Nagar, Srinagar", phone: "+91 9070011223" },
      { id: 2, name: "SKIMS Hospital", address: "Soura, Srinagar", phone: "+91 9070022334" },
      { id: 3, name: "Tourist Police Srinagar", address: "Dal Gate", phone: "+91 9070033445" },
      { id: 4, name: "Gulmarg Health Centre", address: "Gulmarg", phone: "+91 9070044556" },
      { id: 5, name: "Pahalgam Sub-District Hospital", address: "Pahalgam", phone: "+91 9070055667" },
    ],
  },

  Manali: {
    description:
      "Manali is a beautiful hill station famous for snow, adventure sports, pine forests and breathtaking mountain views.",
    hotels: [
      { id: 1, name: "Hotel Manali Heights", rating: 4.5, price: 120 },
      { id: 2, name: "Snow Valley Resort", rating: 4.3, price: 95 },
      { id: 3, name: "The Himalayan", rating: 4.7, price: 170 },
      { id: 4, name: "Manuallaya Resort", rating: 4.4, price: 130 },
      { id: 5, name: "Span Resort & Spa", rating: 4.6, price: 160 },
    ],
    cafes: [
      { id: 1, name: "Cafe 1947", rating: 4.7, price: 18 },
      { id: 2, name: "Johnson's Cafe", rating: 4.5, price: 15 },
      { id: 3, name: "Drifters' Cafe", rating: 4.4, price: 14 },
      { id: 4, name: "Cafe Amigos", rating: 4.3, price: 13 },
      { id: 5, name: "Rocky's Cafe", rating: 4.5, price: 16 },
    ],
    attractions: ["Solang Valley", "Rohtang Pass", "Hadimba Temple", "Old Manali", "Jogini Falls"],
    adventure: ["Paragliding", "River Rafting", "Skiing", "Trekking", "Zorbing"],
    emergency: [
      { id: 1, name: "Mission Hospital", address: "Mall Road, Manali", phone: "+91 9876543210" },
      { id: 2, name: "Civil Hospital", address: "Old Manali", phone: "+91 9123456789" },
      { id: 3, name: "Regional Hospital", address: "Kullu Road", phone: "+91 9988776655" },
      { id: 4, name: "Lady Willingdon Hospital", address: "Manali Town", phone: "+91 9988001122" },
      { id: 5, name: "Tourist Police Manali", address: "Mall Road", phone: "+91 9988112233" },
    ],
  },

  Darjeeling: {
    description:
      "Darjeeling is famous for tea gardens, the Himalayan Railway and Kanchenjunga views.",
    hotels: [
      { id: 1, name: "Mayfair Darjeeling", rating: 4.6, price: 150 },
      { id: 2, name: "Summit Swiss Heritage", rating: 4.2, price: 95 },
      { id: 3, name: "Cedar Inn", rating: 4.4, price: 110 },
      { id: 4, name: "The Elgin", rating: 4.7, price: 165 },
      { id: 5, name: "Sterling Darjeeling", rating: 4.3, price: 105 },
    ],
    cafes: [
      { id: 1, name: "Glenary's", rating: 4.8, price: 17 },
      { id: 2, name: "Keventers", rating: 4.6, price: 14 },
      { id: 3, name: "Sonam's Kitchen", rating: 4.5, price: 12 },
      { id: 4, name: "Nathmulls Tea Room", rating: 4.6, price: 15 },
      { id: 5, name: "Cafe 88", rating: 4.3, price: 13 },
    ],
    attractions: ["Tiger Hill", "Batasia Loop", "Happy Valley Tea Estate", "Rock Garden", "Peace Pagoda"],
    adventure: ["Toy Train Ride", "Hiking", "Camping", "Cable Car Ride", "Mountain Biking"],
    emergency: [
      { id: 1, name: "Darjeeling District Hospital", address: "Chowrasta", phone: "+91 9800011223" },
      { id: 2, name: "Planters Hospital", address: "Nehru Road", phone: "+91 9800022334" },
      { id: 3, name: "Darjeeling Police", address: "Sadar Thana", phone: "+91 9800033445" },
      { id: 4, name: "Eden Hospital", address: "Lebong Cart Road", phone: "+91 9800044556" },
      { id: 5, name: "Tourist Help Desk", address: "Mall Road", phone: "+91 9800055667" },
    ],
  },

  Shimla: {
    description:
      "Shimla is famous for colonial buildings, snowfall and pleasant weather.",
    hotels: [
      { id: 1, name: "Clarkes Hotel", rating: 4.5, price: 130 },
      { id: 2, name: "Snow Valley Resorts", rating: 4.2, price: 90 },
      { id: 3, name: "Wildflower Hall", rating: 4.8, price: 250 },
      { id: 4, name: "The Oberoi Cecil", rating: 4.7, price: 200 },
      { id: 5, name: "Radisson Shimla", rating: 4.4, price: 140 },
    ],
    cafes: [
      { id: 1, name: "Wake & Bake Cafe", rating: 4.7, price: 16 },
      { id: 2, name: "Cafe Sol", rating: 4.4, price: 14 },
      { id: 3, name: "Indian Coffee House", rating: 4.5, price: 8 },
      { id: 4, name: "Honey Hut", rating: 4.3, price: 12 },
      { id: 5, name: "Cafe Simla Times", rating: 4.6, price: 15 },
    ],
    attractions: ["Mall Road", "Jakhoo Temple", "Kufri", "The Ridge", "Christ Church"],
    adventure: ["Horse Riding", "Camping", "Ice Skating", "Trekking", "Toboggan Ride"],
    emergency: [
      { id: 1, name: "IGMC Hospital", address: "Ridge Road, Shimla", phone: "+91 9418011223" },
      { id: 2, name: "DDU Hospital", address: "Sanjauli", phone: "+91 9418022334" },
      { id: 3, name: "Shimla Police", address: "Sadar Bazaar", phone: "+91 9418033445" },
      { id: 4, name: "Kamla Nehru Hospital", address: "Lakkar Bazaar", phone: "+91 9418044556" },
      { id: 5, name: "Tourist Information Centre", address: "The Mall", phone: "+91 9418055667" },
    ],
  },

  Sikkim: {
    description:
      "Sikkim offers monasteries, alpine lakes, snow mountains and peaceful nature.",
    hotels: [
      { id: 1, name: "Elgin Nor-Khill", rating: 4.7, price: 165 },
      { id: 2, name: "Summit Denzong Resort", rating: 4.3, price: 110 },
      { id: 3, name: "Mayfair Spa Resort", rating: 4.6, price: 175 },
      { id: 4, name: "The Chumbi Residency", rating: 4.4, price: 120 },
      { id: 5, name: "Hotel Sonam Delek", rating: 4.2, price: 85 },
    ],
    cafes: [
      { id: 1, name: "Cafe Fiction", rating: 4.6, price: 15 },
      { id: 2, name: "Baker's Cafe", rating: 4.4, price: 12 },
      { id: 3, name: "Roll House", rating: 4.3, price: 10 },
      { id: 4, name: "Nimtho", rating: 4.7, price: 18 },
      { id: 5, name: "Cafe Live & Loud", rating: 4.5, price: 16 },
    ],
    attractions: ["Tsomgo Lake", "Nathula Pass", "MG Marg", "Rumtek Monastery", "Ban Jhakri Falls"],
    adventure: ["Yak Ride", "River Rafting", "Trekking", "Cable Car Ride", "Mountain Biking"],
    emergency: [
      { id: 1, name: "STNM Hospital", address: "Sochakgang, Gangtok", phone: "+91 9832011223" },
      { id: 2, name: "Central Referral Hospital", address: "Tadong", phone: "+91 9832022334" },
      { id: 3, name: "Gangtok Police", address: "Sadar Thana", phone: "+91 9832033445" },
      { id: 4, name: "Manipal Hospital", address: "5th Mile, Tadong", phone: "+91 9832044556" },
      { id: 5, name: "Tourism Help Desk", address: "MG Marg", phone: "+91 9832055667" },
    ],
  },

  /* ================= SEA ================= */

  Andaman: {
    description:
      "Andaman is famous for crystal clear water, coral reefs and scuba diving.",
    hotels: [
      { id: 1, name: "SeaShell Resort", rating: 4.7, price: 180 },
      { id: 2, name: "Sinclairs Bayview", rating: 4.4, price: 140 },
      { id: 3, name: "Taj Exotica Resort", rating: 4.9, price: 320 },
      { id: 4, name: "Symphony Palms Beach", rating: 4.5, price: 160 },
      { id: 5, name: "Silver Sand Havelock", rating: 4.6, price: 190 },
    ],
    cafes: [
      { id: 1, name: "Full Moon Cafe", rating: 4.5, price: 16 },
      { id: 2, name: "Anju Coco Resto", rating: 4.4, price: 14 },
      { id: 3, name: "Something Different", rating: 4.6, price: 18 },
      { id: 4, name: "Barefoot Bar & Brasserie", rating: 4.7, price: 22 },
      { id: 5, name: "Excel Restaurant", rating: 4.3, price: 12 },
    ],
    attractions: ["Radhanagar Beach", "Cellular Jail", "Ross Island", "Neil Island", "Elephant Beach"],
    adventure: ["Scuba Diving", "Snorkeling", "Sea Walk", "Jet Ski", "Kayaking"],
    emergency: [
      { id: 1, name: "GB Pant Hospital", address: "Atlanta Point, Port Blair", phone: "+91 9474011223" },
      { id: 2, name: "INHS Dhanvantari", address: "Minnie Bay", phone: "+91 9474022334" },
      { id: 3, name: "Port Blair Police", address: "Aberdeen Bazaar", phone: "+91 9474033445" },
      { id: 4, name: "Havelock PHC", address: "Havelock Island", phone: "+91 9474044556" },
      { id: 5, name: "Coast Guard Help", address: "Haddo Wharf", phone: "+91 9474055667" },
    ],
  },

  Goa: {
    description:
      "Goa is famous for beaches, nightlife, churches and water sports.",
    hotels: [
      { id: 1, name: "Taj Fort Aguada Resort", rating: 4.8, price: 220 },
      { id: 2, name: "Resort Rio", rating: 4.5, price: 150 },
      { id: 3, name: "W Goa", rating: 4.7, price: 280 },
      { id: 4, name: "The Leela Goa", rating: 4.9, price: 350 },
      { id: 5, name: "Cidade de Goa", rating: 4.4, price: 160 },
    ],
    cafes: [
      { id: 1, name: "Cafe Bodega", rating: 4.6, price: 18 },
      { id: 2, name: "Artjuna Cafe", rating: 4.7, price: 20 },
      { id: 3, name: "Gunpowder", rating: 4.5, price: 17 },
      { id: 4, name: "Bomra's", rating: 4.6, price: 24 },
      { id: 5, name: "Cafe Chocolatti", rating: 4.4, price: 15 },
    ],
    attractions: ["Baga Beach", "Calangute Beach", "Fort Aguada", "Dudhsagar Falls", "Basilica of Bom Jesus"],
    adventure: ["Parasailing", "Jet Ski", "Scuba Diving", "Banana Boat Ride", "Kayaking"],
    emergency: [
      { id: 1, name: "Goa Medical College", address: "Bambolim", phone: "+91 9822011223" },
      { id: 2, name: "Manipal Hospital Goa", address: "Dona Paula", phone: "+91 9822022334" },
      { id: 3, name: "Tourist Police Goa", address: "Panaji", phone: "+91 9822033445" },
      { id: 4, name: "Asilo Hospital", address: "Mapusa", phone: "+91 9822044556" },
      { id: 5, name: "Fire & Rescue Goa", address: "St. Inez, Panaji", phone: "+91 9822055667" },
    ],
  },

  Kerala: {
    description:
      "Kerala is known for backwaters, houseboats, beaches and lush greenery.",
    hotels: [
      { id: 1, name: "Kumarakom Lake Resort", rating: 4.8, price: 210 },
      { id: 2, name: "Taj Malabar Cochin", rating: 4.6, price: 180 },
      { id: 3, name: "Zuri Kumarakom", rating: 4.5, price: 160 },
      { id: 4, name: "Spice Village Thekkady", rating: 4.7, price: 175 },
      { id: 5, name: "Uday Samudra Kovalam", rating: 4.3, price: 130 },
    ],
    cafes: [
      { id: 1, name: "Kashi Art Cafe", rating: 4.7, price: 16 },
      { id: 2, name: "Teapot Cafe", rating: 4.6, price: 14 },
      { id: 3, name: "Fusion Bay", rating: 4.4, price: 15 },
      { id: 4, name: "Dal Roti", rating: 4.5, price: 12 },
      { id: 5, name: "Cafe Papaya", rating: 4.3, price: 13 },
    ],
    attractions: ["Alleppey Backwaters", "Munnar Tea Gardens", "Fort Kochi", "Periyar Lake", "Varkala Beach"],
    adventure: ["Houseboat Cruise", "Bamboo Rafting", "Trekking", "Kayaking", "Elephant Safari"],
    emergency: [
      { id: 1, name: "Amrita Hospital Kochi", address: "Edappally", phone: "+91 9847011223" },
      { id: 2, name: "General Hospital Ernakulam", address: "Kochi", phone: "+91 9847022334" },
      { id: 3, name: "Tourist Police Kerala", address: "Alappuzha", phone: "+91 9847033445" },
      { id: 4, name: "Medical College Trivandrum", address: "Thiruvananthapuram", phone: "+91 9847044556" },
      { id: 5, name: "Munnar Taluk Hospital", address: "Munnar", phone: "+91 9847055667" },
    ],
  },

  Lakshadweep: {
    description:
      "Lakshadweep is a group of coral islands famous for lagoons, white sand and marine life.",
    hotels: [
      { id: 1, name: "Bangaram Island Resort", rating: 4.7, price: 260 },
      { id: 2, name: "Agatti Island Beach Resort", rating: 4.5, price: 200 },
      { id: 3, name: "Kadmat Beach Resort", rating: 4.4, price: 170 },
      { id: 4, name: "Minicoy Island Retreat", rating: 4.3, price: 150 },
      { id: 5, name: "Kavaratti Lagoon Resort", rating: 4.2, price: 140 },
    ],
    cafes: [
      { id: 1, name: "Lagoon View Cafe", rating: 4.5, price: 18 },
      { id: 2, name: "Coral Reef Diner", rating: 4.4, price: 16 },
      { id: 3, name: "Island Spice Cafe", rating: 4.3, price: 14 },
      { id: 4, name: "Sea Breeze Kitchen", rating: 4.4, price: 15 },
      { id: 5, name: "Palm Shade Cafe", rating: 4.2, price: 13 },
    ],
    attractions: ["Agatti Island", "Bangaram Atoll", "Kadmat Island", "Minicoy Lighthouse", "Kavaratti Lagoon"],
    adventure: ["Scuba Diving", "Snorkeling", "Kayaking", "Glass-Bottom Boat", "Wind Surfing"],
    emergency: [
      { id: 1, name: "Kavaratti Govt Hospital", address: "Kavaratti", phone: "+91 4896011223" },
      { id: 2, name: "Agatti Health Centre", address: "Agatti Island", phone: "+91 4896022334" },
      { id: 3, name: "Island Police Kavaratti", address: "Kavaratti", phone: "+91 4896033445" },
      { id: 4, name: "Minicoy PHC", address: "Minicoy Island", phone: "+91 4896044556" },
      { id: 5, name: "Coast Guard Lakshadweep", address: "Agatti", phone: "+91 4896055667" },
    ],
  },

  Pondicherry: {
    description:
      "Pondicherry blends French colonial charm with beaches, cafes and spiritual retreats.",
    hotels: [
      { id: 1, name: "Palais de Mahe", rating: 4.7, price: 160 },
      { id: 2, name: "La Villa", rating: 4.6, price: 150 },
      { id: 3, name: "The Promenade", rating: 4.5, price: 140 },
      { id: 4, name: "Le Dupleix", rating: 4.4, price: 130 },
      { id: 5, name: "Villa Shanti", rating: 4.5, price: 145 },
    ],
    cafes: [
      { id: 1, name: "Cafe des Arts", rating: 4.7, price: 15 },
      { id: 2, name: "Baker Street", rating: 4.6, price: 14 },
      { id: 3, name: "Coromandel Cafe", rating: 4.6, price: 18 },
      { id: 4, name: "Zuka Choco-la", rating: 4.5, price: 13 },
      { id: 5, name: "Cafe Xtasi", rating: 4.4, price: 12 },
    ],
    attractions: ["Promenade Beach", "Auroville", "French Quarter", "Sri Aurobindo Ashram", "Paradise Beach"],
    adventure: ["Scuba Diving", "Kayaking", "Surfing", "Cycling Tour", "Boat Ride"],
    emergency: [
      { id: 1, name: "JIPMER Hospital", address: "Dhanvantari Nagar", phone: "+91 9443011223" },
      { id: 2, name: "Indira Gandhi GH", address: "Pondicherry", phone: "+91 9443022334" },
      { id: 3, name: "Tourist Police", address: "Beach Road", phone: "+91 9443033445" },
      { id: 4, name: "New Medical Centre", address: "MG Road", phone: "+91 9443044556" },
      { id: 5, name: "Fire Station Pondy", address: "Villianur Road", phone: "+91 9443055667" },
    ],
  },

  /* ================= DESERT ================= */

  Rajasthan: {
    description:
      "Rajasthan is known for forts, palaces, deserts and royal culture.",
    hotels: [
      { id: 1, name: "Umaid Bhawan Palace", rating: 4.9, price: 250 },
      { id: 2, name: "Hotel Narain Niwas", rating: 4.4, price: 110 },
      { id: 3, name: "Taj Lake Palace", rating: 4.9, price: 340 },
      { id: 4, name: "Rambagh Palace", rating: 4.8, price: 300 },
      { id: 5, name: "Suryagarh Jaisalmer", rating: 4.6, price: 200 },
    ],
    cafes: [
      { id: 1, name: "Tapri Central", rating: 4.6, price: 14 },
      { id: 2, name: "Bar Palladio", rating: 4.5, price: 20 },
      { id: 3, name: "Cafe Palladio", rating: 4.6, price: 18 },
      { id: 4, name: "Nibs Cafe", rating: 4.4, price: 13 },
      { id: 5, name: "Anokhi Cafe", rating: 4.5, price: 15 },
    ],
    attractions: ["Amber Fort", "City Palace", "Jaisalmer Fort", "Hawa Mahal", "Mehrangarh Fort"],
    adventure: ["Camel Safari", "Desert Camping", "Zipline", "Hot Air Balloon", "Dune Bashing"],
    emergency: [
      { id: 1, name: "SMS Hospital", address: "JLN Marg, Jaipur", phone: "+91 9414011223" },
      { id: 2, name: "Mahatma Gandhi Hospital", address: "Sitapura, Jaipur", phone: "+91 9414022334" },
      { id: 3, name: "Tourist Police Jaipur", address: "Hawa Mahal Road", phone: "+91 9414033445" },
      { id: 4, name: "MDM Hospital", address: "Jodhpur", phone: "+91 9414044556" },
      { id: 5, name: "Jawahar Hospital", address: "Jaisalmer", phone: "+91 9414055667" },
    ],
  },

  Gujarat: {
    description:
      "Gujarat offers the white desert of Kutch, temples, wildlife and vibrant culture.",
    hotels: [
      { id: 1, name: "The House of MG", rating: 4.6, price: 150 },
      { id: 2, name: "Rann Riders", rating: 4.4, price: 120 },
      { id: 3, name: "Hyatt Ahmedabad", rating: 4.5, price: 140 },
      { id: 4, name: "Fern Kutch Resort", rating: 4.3, price: 110 },
      { id: 5, name: "Gateway Hotel Vadodara", rating: 4.4, price: 125 },
    ],
    cafes: [
      { id: 1, name: "Agashiye", rating: 4.7, price: 20 },
      { id: 2, name: "Cafe Uppercrust", rating: 4.5, price: 15 },
      { id: 3, name: "Mocha Cafe", rating: 4.4, price: 13 },
      { id: 4, name: "Huber & Holly", rating: 4.5, price: 16 },
      { id: 5, name: "La Pino'z Cafe", rating: 4.2, price: 12 },
    ],
    attractions: ["Rann of Kutch", "Gir National Park", "Somnath Temple", "Statue of Unity", "Sabarmati Ashram"],
    adventure: ["Desert Camping", "Wildlife Safari", "Camel Ride", "ATV Ride", "Bird Watching"],
    emergency: [
      { id: 1, name: "Civil Hospital Ahmedabad", address: "Asarwa", phone: "+91 9426011223" },
      { id: 2, name: "Sterling Hospital", address: "Ahmedabad", phone: "+91 9426022334" },
      { id: 3, name: "Kutch Police", address: "Bhuj", phone: "+91 9426033445" },
      { id: 4, name: "GK General Hospital", address: "Bhuj", phone: "+91 9426044556" },
      { id: 5, name: "Fire Station Ahmedabad", address: "Danapith", phone: "+91 9426055667" },
    ],
  },

  Kutch: {
    description:
      "Kutch is famous for the vast white salt desert, handicrafts and the Rann Utsav.",
    hotels: [
      { id: 1, name: "Rann Utsav Tent City", rating: 4.6, price: 190 },
      { id: 2, name: "Rann Riders Resort", rating: 4.4, price: 130 },
      { id: 3, name: "Toran Rann Resort", rating: 4.3, price: 120 },
      { id: 4, name: "White Rann Resort", rating: 4.5, price: 150 },
      { id: 5, name: "Gateway to Rann", rating: 4.2, price: 110 },
    ],
    cafes: [
      { id: 1, name: "Rann Cafe", rating: 4.4, price: 14 },
      { id: 2, name: "Desert Delight", rating: 4.3, price: 12 },
      { id: 3, name: "Bhungadi Cafe", rating: 4.5, price: 15 },
      { id: 4, name: "Salt Flats Diner", rating: 4.3, price: 13 },
      { id: 5, name: "Kutchi Kitchen", rating: 4.6, price: 16 },
    ],
    attractions: ["White Rann", "Kalo Dungar", "Mandvi Beach", "Bhuj Palace", "Dholavira"],
    adventure: ["Desert Camping", "Camel Safari", "ATV Ride", "Star Gazing", "Paramotoring"],
    emergency: [
      { id: 1, name: "GK General Hospital", address: "Bhuj", phone: "+91 9825011223" },
      { id: 2, name: "Adani Hospital", address: "Mundra", phone: "+91 9825022334" },
      { id: 3, name: "Kutch District Police", address: "Bhuj", phone: "+91 9825033445" },
      { id: 4, name: "Mandvi Sub-Hospital", address: "Mandvi", phone: "+91 9825044556" },
      { id: 5, name: "Rann Utsav Help Desk", address: "Dhordo", phone: "+91 9825055667" },
    ],
  },

  Jaisalmer: {
    description:
      "Jaisalmer, the Golden City, is famous for its sandstone fort, havelis and Thar Desert dunes.",
    hotels: [
      { id: 1, name: "Suryagarh Jaisalmer", rating: 4.7, price: 210 },
      { id: 2, name: "The Serai", rating: 4.8, price: 300 },
      { id: 3, name: "Fort Rajwada", rating: 4.4, price: 130 },
      { id: 4, name: "Desert Tulip Hotel", rating: 4.3, price: 110 },
      { id: 5, name: "Hotel Rang Mahal", rating: 4.5, price: 140 },
    ],
    cafes: [
      { id: 1, name: "The Trio Restaurant", rating: 4.6, price: 16 },
      { id: 2, name: "Free Tibet Cafe", rating: 4.5, price: 13 },
      { id: 3, name: "Desert Boy's Dhani", rating: 4.6, price: 15 },
      { id: 4, name: "Jaisal Italy", rating: 4.4, price: 17 },
      { id: 5, name: "Saffron Cafe", rating: 4.5, price: 14 },
    ],
    attractions: ["Jaisalmer Fort", "Sam Sand Dunes", "Patwon Ki Haveli", "Gadisar Lake", "Kuldhara Village"],
    adventure: ["Camel Safari", "Dune Bashing", "Desert Camping", "Paramotoring", "Jeep Safari"],
    emergency: [
      { id: 1, name: "Jawahar Hospital", address: "Jaisalmer", phone: "+91 9829011223" },
      { id: 2, name: "SJ Government Hospital", address: "Gandhi Colony", phone: "+91 9829022334" },
      { id: 3, name: "Jaisalmer Police", address: "Kotwali", phone: "+91 9829033445" },
      { id: 4, name: "Sam Health Centre", address: "Sam Village", phone: "+91 9829044556" },
      { id: 5, name: "Tourist Assistance", address: "Gadisar Road", phone: "+91 9829055667" },
    ],
  },

  Bikaner: {
    description:
      "Bikaner is known for its majestic Junagarh Fort, camel breeding farm and desert festivals.",
    hotels: [
      { id: 1, name: "Laxmi Niwas Palace", rating: 4.7, price: 180 },
      { id: 2, name: "The Lallgarh Palace", rating: 4.6, price: 160 },
      { id: 3, name: "Narendra Bhawan", rating: 4.8, price: 200 },
      { id: 4, name: "Hotel Bhairon Vilas", rating: 4.3, price: 100 },
      { id: 5, name: "Gaj Kesri Hotel", rating: 4.2, price: 90 },
    ],
    cafes: [
      { id: 1, name: "Chhotu Motu Joshi", rating: 4.6, price: 10 },
      { id: 2, name: "Heeralal Restaurant", rating: 4.5, price: 12 },
      { id: 3, name: "Gallops Cafe", rating: 4.4, price: 14 },
      { id: 4, name: "Bikaneri Bhujia Cafe", rating: 4.5, price: 9 },
      { id: 5, name: "Cafe Indeep", rating: 4.3, price: 13 },
    ],
    attractions: ["Junagarh Fort", "Karni Mata Temple", "Camel Research Farm", "Lallgarh Palace", "Gajner Lake"],
    adventure: ["Camel Safari", "Desert Camping", "Jeep Safari", "Village Trail", "Star Gazing"],
    emergency: [
      { id: 1, name: "PBM Hospital", address: "Bikaner", phone: "+91 9414111223" },
      { id: 2, name: "Sardar Patel Medical College", address: "Bikaner", phone: "+91 9414122334" },
      { id: 3, name: "Bikaner Police", address: "Kotwali", phone: "+91 9414133445" },
      { id: 4, name: "District Hospital", address: "Station Road", phone: "+91 9414144556" },
      { id: 5, name: "Fire Station Bikaner", address: "Rani Bazaar", phone: "+91 9414155667" },
    ],
  },

  /* ================= WILDLIFE ================= */

  "Gir Forest": {
    description:
      "Gir Forest is the last home of the Asiatic Lion, with rich wildlife and safaris.",
    hotels: [
      { id: 1, name: "The Fern Gir Forest Resort", rating: 4.5, price: 150 },
      { id: 2, name: "Lion Safari Camp", rating: 4.4, price: 130 },
      { id: 3, name: "Gir Jungle Lodge", rating: 4.3, price: 110 },
      { id: 4, name: "Woods at Sasan", rating: 4.6, price: 160 },
      { id: 5, name: "Gir Birding Lodge", rating: 4.2, price: 100 },
    ],
    cafes: [
      { id: 1, name: "Jungle Cafe", rating: 4.4, price: 14 },
      { id: 2, name: "Safari Diner", rating: 4.3, price: 12 },
      { id: 3, name: "Lion's Den Cafe", rating: 4.5, price: 15 },
      { id: 4, name: "Forest View Restaurant", rating: 4.4, price: 16 },
      { id: 5, name: "Gir Spice Kitchen", rating: 4.3, price: 13 },
    ],
    attractions: ["Gir National Park", "Devaliya Safari Park", "Kamleshwar Dam", "Somnath Temple", "Crocodile Breeding Centre"],
    adventure: ["Lion Safari", "Jeep Safari", "Bird Watching", "Nature Trail", "Night Camping"],
    emergency: [
      { id: 1, name: "Sasan Gir PHC", address: "Sasan Gir", phone: "+91 9427011223" },
      { id: 2, name: "Junagadh Civil Hospital", address: "Junagadh", phone: "+91 9427022334" },
      { id: 3, name: "Forest Range Office", address: "Sasan", phone: "+91 9427033445" },
      { id: 4, name: "Veraval Sub-Hospital", address: "Veraval", phone: "+91 9427044556" },
      { id: 5, name: "Wildlife Rescue Help", address: "Gir East", phone: "+91 9427055667" },
    ],
  },

  Kaziranga: {
    description:
      "Kaziranga is a UNESCO site famous for the one-horned rhinoceros and lush grasslands.",
    hotels: [
      { id: 1, name: "IORA - The Retreat", rating: 4.6, price: 160 },
      { id: 2, name: "Wild Grass Lodge", rating: 4.4, price: 120 },
      { id: 3, name: "Diphlu River Lodge", rating: 4.7, price: 190 },
      { id: 4, name: "Infinity Resorts", rating: 4.5, price: 150 },
      { id: 5, name: "Landmark Woods", rating: 4.3, price: 110 },
    ],
    cafes: [
      { id: 1, name: "Rhino Cafe", rating: 4.4, price: 13 },
      { id: 2, name: "Green Leaf Diner", rating: 4.3, price: 12 },
      { id: 3, name: "Assam Tea House", rating: 4.6, price: 14 },
      { id: 4, name: "Jungle Brew", rating: 4.5, price: 15 },
      { id: 5, name: "Kaziranga Kitchen", rating: 4.4, price: 16 },
    ],
    attractions: ["Kaziranga National Park", "Kohora Range", "Bagori Range", "Elephant Safari Point", "Kaziranga Orchid Park"],
    adventure: ["Elephant Safari", "Jeep Safari", "Bird Watching", "River Cruise", "Nature Walk"],
    emergency: [
      { id: 1, name: "Kaziranga CHC", address: "Kohora", phone: "+91 9435011223" },
      { id: 2, name: "Bokakhat Civil Hospital", address: "Bokakhat", phone: "+91 9435022334" },
      { id: 3, name: "Forest Beat Office", address: "Kohora Range", phone: "+91 9435033445" },
      { id: 4, name: "Golaghat Hospital", address: "Golaghat", phone: "+91 9435044556" },
      { id: 5, name: "Wildlife Rescue Centre", address: "Panbari", phone: "+91 9435055667" },
    ],
  },

  Sundarbans: {
    description:
      "Sundarbans is the world's largest mangrove forest and home to the Royal Bengal Tiger.",
    hotels: [
      { id: 1, name: "Sundarban Tiger Camp", rating: 4.5, price: 140 },
      { id: 2, name: "Sunderban Sonar Bangla", rating: 4.4, price: 120 },
      { id: 3, name: "Royal Sundarban Resort", rating: 4.3, price: 110 },
      { id: 4, name: "Mangrove Retreat", rating: 4.4, price: 130 },
      { id: 5, name: "Sundarban Riverview Lodge", rating: 4.2, price: 100 },
    ],
    cafes: [
      { id: 1, name: "Mangrove Cafe", rating: 4.3, price: 12 },
      { id: 2, name: "Tiger Trail Diner", rating: 4.4, price: 13 },
      { id: 3, name: "River Delta Kitchen", rating: 4.5, price: 15 },
      { id: 4, name: "Bengal Spice Cafe", rating: 4.4, price: 14 },
      { id: 5, name: "Honey Island Cafe", rating: 4.3, price: 11 },
    ],
    attractions: ["Sajnekhali Sanctuary", "Sudhanyakhali Watchtower", "Dobanki Canopy Walk", "Netidhopani", "Bhagabatpur Crocodile Farm"],
    adventure: ["Boat Safari", "Bird Watching", "Village Tour", "Canopy Walk", "Fishing Trip"],
    emergency: [
      { id: 1, name: "Gosaba Rural Hospital", address: "Gosaba", phone: "+91 9433011223" },
      { id: 2, name: "Canning Sub-Divisional Hospital", address: "Canning", phone: "+91 9433022334" },
      { id: 3, name: "Forest Range Office", address: "Sajnekhali", phone: "+91 9433033445" },
      { id: 4, name: "Basanti Block Hospital", address: "Basanti", phone: "+91 9433044556" },
      { id: 5, name: "River Rescue Help", address: "Godkhali Jetty", phone: "+91 9433055667" },
    ],
  },

  Periyar: {
    description:
      "Periyar is a scenic tiger reserve in Kerala known for its lake, elephants and spice plantations.",
    hotels: [
      { id: 1, name: "Spice Village Thekkady", rating: 4.7, price: 175 },
      { id: 2, name: "Greenwoods Resort", rating: 4.4, price: 120 },
      { id: 3, name: "Elephant Court", rating: 4.5, price: 140 },
      { id: 4, name: "The Wild Corridor", rating: 4.6, price: 160 },
      { id: 5, name: "Cardamom County", rating: 4.3, price: 110 },
    ],
    cafes: [
      { id: 1, name: "Spice Garden Cafe", rating: 4.5, price: 15 },
      { id: 2, name: "Chrissie's Cafe", rating: 4.6, price: 16 },
      { id: 3, name: "Grandma's Cafe", rating: 4.4, price: 12 },
      { id: 4, name: "Ebony's Restaurant", rating: 4.5, price: 17 },
      { id: 5, name: "Periyar Brew House", rating: 4.3, price: 13 },
    ],
    attractions: ["Periyar Lake", "Thekkady Spice Gardens", "Mangala Devi Temple", "Kurisumala", "Elephant Junction"],
    adventure: ["Boat Safari", "Bamboo Rafting", "Jungle Trekking", "Elephant Ride", "Night Patrol Walk"],
    emergency: [
      { id: 1, name: "Thekkady Health Centre", address: "Thekkady", phone: "+91 9847111223" },
      { id: 2, name: "Kumily Taluk Hospital", address: "Kumily", phone: "+91 9847122334" },
      { id: 3, name: "Forest Info Centre", address: "Thekkady", phone: "+91 9847133445" },
      { id: 4, name: "Idukki District Hospital", address: "Idukki", phone: "+91 9847144556" },
      { id: 5, name: "Wildlife Rescue Kumily", address: "Kumily", phone: "+91 9847155667" },
    ],
  },

  Ranthambore: {
    description:
      "Ranthambore is a famous tiger reserve in Rajasthan set around an ancient fort.",
    hotels: [
      { id: 1, name: "The Oberoi Vanyavilas", rating: 4.9, price: 320 },
      { id: 2, name: "Nahargarh Ranthambhore", rating: 4.6, price: 170 },
      { id: 3, name: "Tigress Resort", rating: 4.4, price: 130 },
      { id: 4, name: "Aman-i-Khas", rating: 4.8, price: 350 },
      { id: 5, name: "Ranthambhore Regency", rating: 4.5, price: 150 },
    ],
    cafes: [
      { id: 1, name: "Jungle Cafe", rating: 4.4, price: 14 },
      { id: 2, name: "Tiger Trail Diner", rating: 4.5, price: 16 },
      { id: 3, name: "Safari Bites", rating: 4.3, price: 12 },
      { id: 4, name: "Fort View Cafe", rating: 4.5, price: 15 },
      { id: 5, name: "Rajasthali Kitchen", rating: 4.4, price: 13 },
    ],
    attractions: ["Ranthambore National Park", "Ranthambore Fort", "Padam Talao", "Trinetra Ganesh Temple", "Surwal Lake"],
    adventure: ["Tiger Safari", "Jeep Safari", "Canter Safari", "Bird Watching", "Fort Trekking"],
    emergency: [
      { id: 1, name: "Sawai Madhopur District Hospital", address: "Sawai Madhopur", phone: "+91 9414211223" },
      { id: 2, name: "Alamgir Hospital", address: "Ranthambore Road", phone: "+91 9414222334" },
      { id: 3, name: "Forest Range Office", address: "Ranthambore", phone: "+91 9414233445" },
      { id: 4, name: "Community Health Centre", address: "Sawai Madhopur", phone: "+91 9414244556" },
      { id: 5, name: "Wildlife Rescue Help", address: "Sherpur", phone: "+91 9414255667" },
    ],
  },

  /* ================= ISLAND ================= */

  "Sri Lanka": {
    description:
      "Sri Lanka offers golden beaches, ancient temples, tea country and abundant wildlife.",
    hotels: [
      { id: 1, name: "Shangri-La Colombo", rating: 4.7, price: 200 },
      { id: 2, name: "Heritance Kandalama", rating: 4.6, price: 180 },
      { id: 3, name: "Cinnamon Grand Colombo", rating: 4.5, price: 160 },
      { id: 4, name: "Jetwing Lighthouse Galle", rating: 4.6, price: 175 },
      { id: 5, name: "Earl's Regency Kandy", rating: 4.4, price: 140 },
    ],
    cafes: [
      { id: 1, name: "Ministry of Crab", rating: 4.8, price: 30 },
      { id: 2, name: "Cafe Kumbuk", rating: 4.6, price: 16 },
      { id: 3, name: "The Gallery Cafe", rating: 4.7, price: 20 },
      { id: 4, name: "Pedlar's Inn Cafe", rating: 4.5, price: 14 },
      { id: 5, name: "Whight & Co", rating: 4.5, price: 15 },
    ],
    attractions: ["Sigiriya Rock", "Temple of the Tooth", "Galle Fort", "Ella Nine Arch Bridge", "Yala National Park"],
    adventure: ["Whale Watching", "Surfing", "Safari", "Hiking", "White Water Rafting"],
    emergency: [
      { id: 1, name: "National Hospital Colombo", address: "Colombo", phone: "+94 112011223" },
      { id: 2, name: "Kandy General Hospital", address: "Kandy", phone: "+94 812022334" },
      { id: 3, name: "Tourist Police Colombo", address: "Fort", phone: "+94 112033445" },
      { id: 4, name: "Galle Teaching Hospital", address: "Galle", phone: "+94 912044556" },
      { id: 5, name: "Ambulance Suwa Seriya", address: "Island-wide", phone: "+94 1990" },
    ],
  },

  Maldives: {
    description:
      "The Maldives is a tropical paradise of overwater villas, turquoise lagoons and coral reefs.",
    hotels: [
      { id: 1, name: "Soneva Fushi", rating: 4.9, price: 800 },
      { id: 2, name: "Baros Maldives", rating: 4.8, price: 550 },
      { id: 3, name: "Conrad Rangali Island", rating: 4.8, price: 700 },
      { id: 4, name: "Kurumba Maldives", rating: 4.6, price: 400 },
      { id: 5, name: "Adaaran Prestige Vadoo", rating: 4.5, price: 450 },
    ],
    cafes: [
      { id: 1, name: "Ithaa Undersea", rating: 4.9, price: 60 },
      { id: 2, name: "Sea Salt Cafe", rating: 4.6, price: 28 },
      { id: 3, name: "Reef Bar & Grill", rating: 4.5, price: 32 },
      { id: 4, name: "Lagoon Cafe", rating: 4.5, price: 25 },
      { id: 5, name: "Symphony Restaurant", rating: 4.7, price: 40 },
    ],
    attractions: ["Male City", "Maafushi Island", "Banana Reef", "Hulhumale Beach", "Vaadhoo Sea of Stars"],
    adventure: ["Scuba Diving", "Snorkeling", "Jet Ski", "Parasailing", "Sunset Cruise"],
    emergency: [
      { id: 1, name: "IGMH Hospital", address: "Male", phone: "+960 3011223" },
      { id: 2, name: "ADK Hospital", address: "Male", phone: "+960 3022334" },
      { id: 3, name: "Maldives Police", address: "Male", phone: "+960 3033445" },
      { id: 4, name: "Hulhumale Hospital", address: "Hulhumale", phone: "+960 3044556" },
      { id: 5, name: "Coast Guard Rescue", address: "Male Atoll", phone: "+960 191" },
    ],
  },

  Bali: {
    description:
      "Bali is famous for rice terraces, beaches, temples and vibrant island culture.",
    hotels: [
      { id: 1, name: "The Mulia Nusa Dua", rating: 4.8, price: 300 },
      { id: 2, name: "Padma Resort Ubud", rating: 4.7, price: 220 },
      { id: 3, name: "Ayana Resort Jimbaran", rating: 4.7, price: 260 },
      { id: 4, name: "Alila Seminyak", rating: 4.6, price: 200 },
      { id: 5, name: "Hanging Gardens Ubud", rating: 4.8, price: 280 },
    ],
    cafes: [
      { id: 1, name: "Cafe Pomegranate", rating: 4.6, price: 14 },
      { id: 2, name: "Sisterfields Cafe", rating: 4.7, price: 18 },
      { id: 3, name: "Crate Cafe", rating: 4.5, price: 12 },
      { id: 4, name: "La Favela", rating: 4.6, price: 20 },
      { id: 5, name: "Kynd Community", rating: 4.5, price: 16 },
    ],
    attractions: ["Tanah Lot Temple", "Ubud Rice Terraces", "Uluwatu Temple", "Kuta Beach", "Mount Batur"],
    adventure: ["Surfing", "Volcano Trekking", "White Water Rafting", "Scuba Diving", "ATV Ride"],
    emergency: [
      { id: 1, name: "Sanglah General Hospital", address: "Denpasar", phone: "+62 3610011223" },
      { id: 2, name: "BIMC Hospital", address: "Kuta", phone: "+62 3610022334" },
      { id: 3, name: "Bali Tourist Police", address: "Kuta", phone: "+62 3610033445" },
      { id: 4, name: "Siloam Hospital", address: "Nusa Dua", phone: "+62 3610044556" },
      { id: 5, name: "Emergency Ambulance", address: "Island-wide", phone: "+62 118" },
    ],
  },

  /* ================= FOREIGN ================= */

  Paris: {
    description:
      "Paris is famous for the Eiffel Tower, museums, fashion and romantic streets.",
    hotels: [
      { id: 1, name: "Hotel Lutetia", rating: 4.9, price: 350 },
      { id: 2, name: "Le Bristol Paris", rating: 4.8, price: 420 },
      { id: 3, name: "Shangri-La Paris", rating: 4.9, price: 500 },
      { id: 4, name: "Hotel Le Meurice", rating: 4.8, price: 480 },
      { id: 5, name: "Citadines Les Halles", rating: 4.3, price: 160 },
    ],
    cafes: [
      { id: 1, name: "Cafe de Flore", rating: 4.8, price: 25 },
      { id: 2, name: "Les Deux Magots", rating: 4.7, price: 24 },
      { id: 3, name: "Angelina Paris", rating: 4.7, price: 22 },
      { id: 4, name: "Cafe de la Paix", rating: 4.6, price: 26 },
      { id: 5, name: "Le Comptoir General", rating: 4.5, price: 18 },
    ],
    attractions: ["Eiffel Tower", "Louvre Museum", "Arc de Triomphe", "Notre-Dame", "Montmartre"],
    adventure: ["Seine River Cruise", "Cycling Tour", "Hot Air Balloon", "Segway Tour", "Catacombs Tour"],
    emergency: [
      { id: 1, name: "Hopital Cochin", address: "14th Arrondissement", phone: "+33 140011223" },
      { id: 2, name: "Hopital Pitie-Salpetriere", address: "13th Arrondissement", phone: "+33 140022334" },
      { id: 3, name: "Prefecture de Police", address: "Ile de la Cite", phone: "+33 140033445" },
      { id: 4, name: "American Hospital", address: "Neuilly-sur-Seine", phone: "+33 140044556" },
      { id: 5, name: "European Emergency", address: "City-wide", phone: "112" },
    ],
  },

  "New York": {
    description:
      "New York City is famous for skyscrapers, Broadway, Central Park and iconic landmarks.",
    hotels: [
      { id: 1, name: "The Plaza Hotel", rating: 4.8, price: 550 },
      { id: 2, name: "The Standard High Line", rating: 4.6, price: 320 },
      { id: 3, name: "Pod Times Square", rating: 4.3, price: 180 },
      { id: 4, name: "The Ritz-Carlton NYC", rating: 4.9, price: 600 },
      { id: 5, name: "citizenM Times Square", rating: 4.5, price: 250 },
    ],
    cafes: [
      { id: 1, name: "Blue Bottle Coffee", rating: 4.6, price: 18 },
      { id: 2, name: "Cafe Grumpy", rating: 4.5, price: 14 },
      { id: 3, name: "Bluestone Lane", rating: 4.6, price: 16 },
      { id: 4, name: "Ess-a-Bagel", rating: 4.7, price: 12 },
      { id: 5, name: "Levain Bakery", rating: 4.8, price: 15 },
    ],
    attractions: ["Statue of Liberty", "Times Square", "Central Park", "Empire State Building", "Brooklyn Bridge"],
    adventure: ["Helicopter Tour", "Cycling Central Park", "Kayaking Hudson", "Edge Skywalk", "Harbor Cruise"],
    emergency: [
      { id: 1, name: "NYC Health Bellevue", address: "First Avenue", phone: "+1 2120011223" },
      { id: 2, name: "Mount Sinai Hospital", address: "Upper East Side", phone: "+1 2120022334" },
      { id: 3, name: "NYPD Midtown", address: "Times Square", phone: "+1 2120033445" },
      { id: 4, name: "NY-Presbyterian", address: "Manhattan", phone: "+1 2120044556" },
      { id: 5, name: "Emergency Services", address: "City-wide", phone: "911" },
    ],
  },

  London: {
    description:
      "London is famous for its history, royal palaces, museums and iconic red buses.",
    hotels: [
      { id: 1, name: "The Savoy", rating: 4.8, price: 480 },
      { id: 2, name: "The Ritz London", rating: 4.9, price: 550 },
      { id: 3, name: "Premier Inn County Hall", rating: 4.4, price: 180 },
      { id: 4, name: "The Shard - Shangri-La", rating: 4.8, price: 500 },
      { id: 5, name: "Z Hotel Piccadilly", rating: 4.3, price: 160 },
    ],
    cafes: [
      { id: 1, name: "Monmouth Coffee", rating: 4.7, price: 14 },
      { id: 2, name: "The Wolseley", rating: 4.6, price: 28 },
      { id: 3, name: "Sketch London", rating: 4.5, price: 30 },
      { id: 4, name: "Ottolenghi", rating: 4.6, price: 20 },
      { id: 5, name: "Dishoom", rating: 4.7, price: 22 },
    ],
    attractions: ["Big Ben", "Tower of London", "Buckingham Palace", "London Eye", "British Museum"],
    adventure: ["London Eye Ride", "Thames River Cruise", "Cycling Hyde Park", "The O2 Climb", "Ghost Walk Tour"],
    emergency: [
      { id: 1, name: "St Thomas' Hospital", address: "Westminster Bridge", phone: "+44 2070011223" },
      { id: 2, name: "Guy's Hospital", address: "London Bridge", phone: "+44 2070022334" },
      { id: 3, name: "Metropolitan Police", address: "Charing Cross", phone: "+44 2070033445" },
      { id: 4, name: "Royal London Hospital", address: "Whitechapel", phone: "+44 2070044556" },
      { id: 5, name: "Emergency Services", address: "City-wide", phone: "999" },
    ],
  },

  Tokyo: {
    description:
      "Tokyo blends ultramodern skylines with traditional temples, gardens and street food.",
    hotels: [
      { id: 1, name: "The Ritz-Carlton Tokyo", rating: 4.9, price: 480 },
      { id: 2, name: "Park Hyatt Tokyo", rating: 4.8, price: 420 },
      { id: 3, name: "Hotel Gracery Shinjuku", rating: 4.4, price: 180 },
      { id: 4, name: "Aman Tokyo", rating: 4.9, price: 600 },
      { id: 5, name: "Shibuya Stream Excel", rating: 4.5, price: 220 },
    ],
    cafes: [
      { id: 1, name: "Blue Bottle Kiyosumi", rating: 4.6, price: 12 },
      { id: 2, name: "Cafe de l'Ambre", rating: 4.7, price: 14 },
      { id: 3, name: "% Arabica Tokyo", rating: 4.6, price: 13 },
      { id: 4, name: "Streamer Coffee", rating: 4.5, price: 11 },
      { id: 5, name: "Fuglen Tokyo", rating: 4.6, price: 15 },
    ],
    attractions: ["Senso-ji Temple", "Shibuya Crossing", "Tokyo Skytree", "Meiji Shrine", "Ueno Park"],
    adventure: ["Go-Kart Street Tour", "Mount Takao Hike", "Sumida River Cruise", "TeamLab Digital Art", "Robot Show"],
    emergency: [
      { id: 1, name: "Tokyo Medical University Hospital", address: "Shinjuku", phone: "+81 3011223" },
      { id: 2, name: "St. Luke's International", address: "Chuo", phone: "+81 3022334" },
      { id: 3, name: "Tokyo Metropolitan Police", address: "Kasumigaseki", phone: "+81 3033445" },
      { id: 4, name: "Juntendo Hospital", address: "Bunkyo", phone: "+81 3044556" },
      { id: 5, name: "Ambulance & Fire", address: "City-wide", phone: "119" },
    ],
  },

  Dubai: {
    description:
      "Dubai offers luxury shopping, skyscrapers, desert safaris and pristine beaches.",
    hotels: [
      { id: 1, name: "Burj Al Arab", rating: 5.0, price: 600 },
      { id: 2, name: "Atlantis The Palm", rating: 4.9, price: 450 },
      { id: 3, name: "Jumeirah Beach Hotel", rating: 4.7, price: 320 },
      { id: 4, name: "Address Downtown", rating: 4.8, price: 380 },
      { id: 5, name: "Rove Downtown", rating: 4.4, price: 150 },
    ],
    cafes: [
      { id: 1, name: "Arabian Tea House", rating: 4.7, price: 20 },
      { id: 2, name: "Forever Rose Cafe", rating: 4.6, price: 22 },
      { id: 3, name: "Tom & Serg", rating: 4.5, price: 18 },
      { id: 4, name: "Common Grounds", rating: 4.6, price: 19 },
      { id: 5, name: "The Sum of Us", rating: 4.7, price: 21 },
    ],
    attractions: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah", "Dubai Fountain", "Dubai Frame"],
    adventure: ["Skydiving", "Dune Bashing", "Jet Ski", "Desert Safari", "Ziplining"],
    emergency: [
      { id: 1, name: "Dubai Hospital", address: "Al Baraha", phone: "+971 4011223" },
      { id: 2, name: "Rashid Hospital", address: "Oud Metha", phone: "+971 4022334" },
      { id: 3, name: "Dubai Police", address: "Al Twar", phone: "+971 4033445" },
      { id: 4, name: "Mediclinic City Hospital", address: "Dubai Healthcare City", phone: "+971 4044556" },
      { id: 5, name: "Ambulance Services", address: "City-wide", phone: "998" },
    ],
  },
};

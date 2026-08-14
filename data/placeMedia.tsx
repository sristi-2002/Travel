// Category image pools for place-detail screens.
// Each list item picks an image by its index (pool[index % pool.length]),
// so every card gets a category-appropriate stock photo without storing a
// URL on every entry in data/placedetails.tsx.
// Consumed by app/place/*.tsx screens. See also that file for the source data.

export const categoryImages = {
  hotels: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?w=800&q=80",
    "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
  ],

  cafes: [
    "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80",
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
    "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80",
    "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
    "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80",
  ],

  attractions: [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80",
    "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
    "https://images.unsplash.com/photo-1414609245224-afde4d0f70bb?w=800&q=80",
  ],

  adventure: [
    "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&q=80",
    "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80",
    "https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=800&q=80",
    "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&q=80",
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    "https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?w=800&q=80",
    "https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?w=800&q=80",
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
  ],

  emergency: [
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&q=80",
    "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&q=80",
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80",
    "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&q=80",
    "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=800&q=80",
  ],
};

export type PlaceCategory = keyof typeof categoryImages;

// Pick a category-appropriate image for a list item by its position.
export const getPlaceImage = (category: PlaceCategory, index: number) => {
  const pool = categoryImages[category];
  return pool[index % pool.length];
};

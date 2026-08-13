const KEY = "recentlyViewed";
const MAX_ITEMS = 8;

export function recordView(productId) {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY)) || [];
    const updated = [
      productId,
      ...stored.filter((id) => id !== productId),
    ].slice(0, MAX_ITEMS);
    localStorage.setItem(KEY, JSON.stringify(updated));
  } catch (error) {
    console.log(error);
  }
}

export function getRecentlyViewedIds() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch (error) {
    return [];
  }
}
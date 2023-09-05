export const sortArrayByNextField = arr => {
  const sortedArray = [];
  const itemsMap = new Map();

  arr.forEach(item => {
    itemsMap.set(item.id, item);
  });

  let currentItem = arr.find(item => item.prev === null);

  while (currentItem) {
    sortedArray.push(currentItem);
    currentItem = itemsMap.get(currentItem.next);
  }

  return sortedArray;
};

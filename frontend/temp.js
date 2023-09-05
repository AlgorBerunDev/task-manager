/**
My realized linked list:
const a = [
  {id: "a1sdf", title: "Title 1", prev: null, next: "a235sdf"},
  {id: "a235sdf", title: "Title 2", prev: "a1sdf", next: "a1sd5f"},
  {id: "a1sd5f", title: "Title 3", prev: "a235sdf", next: "a1sqdf"},
  {id: "a1sqdf", title: "Title 4", prev: "a1sd5f", next: null},
]
Create function for get before moving calculate new prev and new next and return this prev and next fields by arguments sourceIndex and destinationIndex
 */

const a = [
  { id: "0", title: "Title 1", prev: null, next: "1" },
  { id: "1", title: "Title 2", prev: "0", next: "2" },
  { id: "2", title: "Title 3", prev: "1", next: "3" },
  { id: "3", title: "Title 4", prev: "2", next: null },
];
function moveTask(a) {
  console.log([a.sourceIndex, a.destinationIndex, a.insertAfterTask?.id || null, a.insertBeforeTask?.id || null]);
}

function calculatePrevNext(list, sourceIndex, destinationIndex) {
  if (sourceIndex < destinationIndex) {
    moveTask({
      sourceIndex,
      destinationIndex,
      insertAfterTask: list[destinationIndex],
      insertBeforeTask: list[destinationIndex + 1],
    });
  } else {
    moveTask({
      sourceIndex,
      destinationIndex,
      insertAfterTask: list[destinationIndex - 1],
      insertBeforeTask: list[destinationIndex],
    });
  }
  // if (destinationIndex === 0) {
  //   moveTask({
  //     sourceIndex,
  //     destinationIndex,
  //     insertAfterTask: null,
  //     insertBeforeTask: list[0] || null,
  //   });
  // } else if (destinationIndex < list.length - 1) {
  //   moveTask({
  //     sourceIndex,
  //     destinationIndex,
  //     insertAfterTask:
  //       list[destinationIndex - 1].id === list[destinationIndex].id
  //         ? list[destinationIndex]
  //         : list[destinationIndex - 1],
  //     insertBeforeTask:
  //       list[destinationIndex].id === list[sourceIndex].id ? list[destinationIndex + 1] : list[destinationIndex],
  //   });
  // } else if (destinationIndex === list.length - 1) {
  //   moveTask({
  //     sourceIndex,
  //     destinationIndex,
  //     insertAfterTask: list[destinationIndex],
  //     insertBeforeTask: null,
  //   });
  // } else {
  //   moveTask({
  //     sourceIndex,
  //     destinationIndex,
  //     insertAfterTask: list[list.length - 1],
  //     insertBeforeTask: null,
  //   });
  // }
}
console.log(a);
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    if (i === j) continue;
    calculatePrevNext(a, i, j);
  }
}

export const input = [
  {
    items: [79, 98],
    op: (old) => old * 19,
    divisor: 23,
    count: 0,
    dest: [2, 3],
  },
  {
    items: [54, 65, 75, 74],
    op: (old) => old + 6,
    divisor: 19,
    count: 0,
    dest: [2, 0],
  },
  {
    items: [79, 60, 97],
    op: (old) => old * old,
    divisor: 13,
    count: 0,
    dest: [1, 3],
  },
  {
    items: [74],
    op: (old) => old + 3,
    divisor: 17,
    count: 0,
    dest: [0, 1],
  },
]

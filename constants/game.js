export const centerPoints = [
    {x: 10, y: 10},
    {x: 113, y: 10},
    {x: 213, y: 10},
    {x: 10, y: 113},
    {x: 113, y: 113},
    {x: 213, y: 113},
    {x: 10, y: 213},
    {x: 113, y: 213},
    {x: 213, y: 213},
];
export const areas = [
    { startX: 3, startY: 3, endX: 103, endY: 103, id: 0 },
    { startX: 106, startY: 3, endX: 206, endY: 103, id: 1 },
    { startX: 209, startY: 3, endX: 309, endY: 103, id: 2 },
    { startX: 3, startY: 103, endX: 103, endY: 206, id: 3 },
    { startX: 106, startY: 103, endX: 206, endY: 206, id: 4 },
    { startX: 209, startY: 103, endX: 309, endY: 206, id: 5 },
    { startX: 3, startY: 209, endX: 103, endY: 309, id: 6 },
    { startX: 106, startY: 209, endX: 206, endY: 309, id: 7 },
    { startX: 209, startY: 209, endX: 309, endY: 309, id: 8 },
];
export const  conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
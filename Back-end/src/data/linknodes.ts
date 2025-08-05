export const linkNodes = [
  //1
  { id: "EA-03-node5", x: 368, y: 791, building: "EA", level: "03"},
  { id: "E1A-01-node1", x: 352, y: 1043, building: "E1A", level: "01"},
//2
  { id: "EA-06-node7", x: 124, y: 1051, building: "EA", level: "06" },
  { id: "E1A-03-node2", x: 260, y: 1235, building: "E1A", level: "03" },
//3
  { id: "EA-07-node4", x: 128, y: 1071, building: "EA", level: "07" },
  { id: "E1A-04-node4", x: 84, y: 1223, building: "E1A", level: "04" },
//4
  {id: "E1-04-node5", x: 196, y: 550, building: "E1", level: "04"},//E1A L4
  {id: "E1A-04-node6", x: 2240, y: 670, building: "E1A", level: "04"},//E1 L4
//5
  {id: "E1-05-node3", x: 220, y: 679, building: "E1", level: "05"},//E1A L5
  {id: "E1A-05-node2", x: 2288, y: 411, building: "E1A", level: "05"},//E1 L5
//6
  {id: "E1A-04-node5", x: 686, y: 280, building: "E1A", level: "04"},//E2 B1
  {id: "E2-B1-node2", x: 1620, y: 371, building: "E2", level: "B1"},//E1A L4
//7
  {id: "E1-05-lift2", x: 500, y: 436, building: "E1", level: "05"},//E2 L1
  {id: "E2-01-lift1", x: 480, y: 340, building: "E2", level: "01"},//E1 L5
//8
  {id: "E2-01-node2", x: 720, y: 450, building: "E2", level: "01"},//EA L3
  {id: "EA-03-node6", x: 400, y: 1200, building: "EA", level: "03"},//E2 L1

//9
  {id: "E1-06-lift2", x: 560, y: 450, building: "E1", level: "06"},//E2 L2
  {id: "E2-02-lift1", x: 520, y: 370, building: "E2", level: "02"},//E1 L6
//10
  {id: "E2-02-node2", x: 100, y: 770, building: "E2", level: "02"},//E2A L1
  {id: "E2A-01-node11", x: 2100, y: 650, building: "E2A", level: "01"},//E2 L2
//11
  {id: "E1-07-lift2", x:550, y: 444, building: "E1", level: "07"},//E2 L3
  {id: "E2-03-lift1", x: 524, y: 612, building: "E2", level: "03"},//E1 L7
//12
  {id: "E2-03-node4", x: 124, y: 876, building: "E2", level: "03"},//E2A L2
  {id: "E2A-02-node2", x: 1939, y: 625, building: "E2A", level: "02"},//E2 L3
//13
  {id: "E2-05-node1", x: 604, y: 915, building: "E2", level: "05"},//E2A L4
  {id: "E2A-04-node2", x: 1980, y: 635, building: "E2A", level: "04"},//E2 L5
//14
  {id: "E2-01-node10", x: 188, y: 1000, building: "E2", level: "01"},//E4L4 road
  {id: "E2A-01-node9", x: 1680, y: 1533, building: "E2A", level: "01"},//E2B1/E4L4 road
//15
  {id: "E1-04-02", x: 1004, y: 550, building: "E1", level: "04"},//E2A B1
  {id: "E2A-01-node1", x: 72, y: 982, building: "E2A", level: "01"},//E1|E4 L4 lift2 side

  //？
  {id: "E1-04-node7", x: 400, y: 350},//E2 B1 ??????????????????????????????????
  {id: "E1-08-lift1", x: 571, y: 444},//E2 L4 ???????????????????????????????
  {id: "E2-B2-node1", x: 1036, y: 1275},//LT7,E3L5
  {id: "E2A-01-node2", x: 616, y: 1445},//E4 L4 LT6 side
  
 //E3/E4
  {id: "E1-04-node3", x: 1884, y: 80},//E4 L4
  {id: "E1-04-node4", x: 2172, y: 316},//Techno L3
  {id: "E1-06-node2", x: 2000, y:619},//E4 L6
  {id: "E2-B1-node4", x: 1200, y:1370},//E3 L6
  {id: "E2-01-node8", x: 555, y: 1147},//E4 L4 arise and shine
  {id: "E2-01-node10", x: 188, y: 1000},//E4 L4 LT6
  {id: "E2-01-node11", x: 480, y: 1387},//E4 L5
  {id: "E2-02-node7", x: 650, y: 1400},//E4 L6
  {id: "E1-03-node7", x: 2093, y:423},//TE L3
  {id: "E1-03-node8", x: 1976, y:620},//E4 L4

  //EX
  { id: "E1-04-node3", x: 1982, y: 464, building: "E1", level: "04" },
  { id: "E4-04-node2", x: 655, y: 927, building: "E4", level: "04" },

  { id: "E3-06-node2", x: 800, y: 599, building: "E3", level: "06" },
  { id: "E4-04-node1", x: 356, y: 405, building: "E4", level: "04" },

  { id: "E3-06-node3", x: 1905, y: 329, building: "E3", level: "06" },
  { id: "E2-B1-node4", x: 1661, y: 1184, building: "E2", level: "B1" }
];

export const interlinkEdges = [
  //1
  { from: "EA-03-node5", to: "E1A-01-node1", weight: 1 },
  //2
  { from: "EA-06-node7", to: "E1A-03-node2", weight: 1 },
  //3
  { from: "EA-07-node4", to: "E1A-04-node4", weight: 1 },
  //4
  { from: "E1-04-node5", to: "E1A-04-node6", weight: 1 },
  //5
  { from: "E1-05-node3", to: "E1A-05-node2", weight: 1 },
  //6
  { from: "E1A-04-node5", to: "E2-B1-node2", weight: 1 },
  //7
  { from: "E1-05-lift2", to: "E2-01-lift1", weight: 1 },
  //8
  { from: "E2-01-node2", to: "EA-03-node6", weight: 1 },
  //9
  { from: "E1-06-lift2", to: "E2-02-lift1", weight: 1 },
  //10
  { from: "E2-02-node2", to: "E2A-01-node11", weight: 1 },
  //11
  { from: "E1-07-lift2", to: "E2-03-lift1", weight: 1 },
  //12
  { from: "E2-03-node4", to: "E2A-02-node2", weight: 1 },
  //13
  { from: "E2-05-node1", to: "E2A-04-node2", weight: 1 },
  //14
  { from: "E2-01-node10", to: "E2A-01-node9", weight: 1 },
  //15
  { from: "E1-04-02", to: "E2A-01-node1", weight: 1 },

  //backwards
  //1
  { from: "E1A-01-node1", to: "EA-03-node5", weight: 1 },
  //2
  { from: "E1A-03-node2", to: "EA-06-node7", weight: 1 },
  //3
  { from: "E1A-04-node4", to: "EA-07-node4", weight: 1 },
  //4
  { from: "E1A-04-node6", to: "E1-04-node5", weight: 1 },
  //5
  { from: "E1A-05-node2", to: "E1-05-node3", weight: 1 },
  //6
  { from: "E2-B1-node2", to: "E1A-04-node5", weight: 1 },
  //7
  { from: "E2-01-lift1", to: "E1-05-lift2", weight: 1 },
  //8
  { from: "EA-03-node6", to: "E2-01-node2", weight: 1 },
  //9
  { from: "E2-02-lift1", to: "E1-06-lift2", weight: 1 },
  //10
  { from: "E2A-01-node11", to: "E2-02-node2", weight: 1 },
  //11
  { from: "E2-03-lift1", to: "E1-07-lift2", weight: 1 },
  //12
  { from: "E2A-02-node2", to: "E2-03-node4", weight: 1 },
  //13
  { from: "E2A-04-node2", to: "E2-05-node1", weight: 1 },
  //14
  { from: "E2A-01-node9", to: "E2-01-node10", weight: 1 },
  //15
  { from: "E2A-01-node1", to: "E1-04-02", weight: 1 },
];
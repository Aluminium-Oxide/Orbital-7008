export const linkNodes = [
  { id: "EA-06-node5", x: 136, y: 1051, building: "EA", level: "06" },
  { id: "E1A-03-node2", x: 272, y: 1219, building: "E1A", level: "03" },

  { id: "EA-07-node4", x: 128, y: 1071, building: "EA", level: "07" },
  { id: "E1A-04-node4", x: 76, y: 1223, building: "E1A", level: "04" },

  { id: "E1-04-node5", x: 351, y: 592, building: "E1", level: "04" },
  { id: "E1A-04-node2", x: 2123, y: 427, building: "E1A", level: "04" },

  { id: "E1-04-node3", x: 1982, y: 464, building: "E1", level: "04" },
  { id: "E4-04-node2", x: 655, y: 927, building: "E4", level: "04" },

  { id: "E1A-04-node5", x: 192, y: 977, building: "E1A", level: "04" },
  { id: "EA-07-node6", x: 80, y: 631, building: "EA", level: "07" },

  { id: "E2-B1-node1", x: 2092, y: 623, building: "E2", level: "B1" },
  { id: "E1-04-node4", x: 1392, y: 464, building: "E1", level: "04" },

  { id: "E2-B1-node2", x: 2092, y: 255, building: "E2", level: "B1" },
  { id: "E1A-04-node4", x: 712, y: 64, building: "E1A", level: "04" },

  { id: "E2-03-node3", x: 153, y: 403, building: "E2", level: "03" },
  { id: "E2A-02-node2", x: 1939, y: 625, building: "E2A", level: "02" },

  { id: "E3-06-node2", x: 800, y: 599, building: "E3", level: "06" },
  { id: "E4-04-node1", x: 356, y: 405, building: "E4", level: "04" },

  { id: "E3-06-node3", x: 1905, y: 329, building: "E3", level: "06" },
  { id: "E2-B1-node4", x: 1661, y: 1184, building: "E2", level: "B1" }
];

export const interlinkEdges = [
  { from: "EA-06-node5", to: "E1A-03-node2", weight: 1 },
  { from: "EA-07-node4", to: "E1A-04-node4", weight: 1 },
  
  { from: "E1-04-node5", to: "E1A-04-node2", weight: 1 },
  { from: "E1-04-node3", to: "E4-04-node2", weight: 1 },
  { from: "E1A-04-node5", to: "EA-07-node6", weight: 1 },
  { from: "E2-B1-node1", to: "E1-04-node4", weight: 1 },
  { from: "E2-B1-node2", to: "E1A-04-node4", weight: 1 },
  { from: "E2-03-node3", to: "E2A-02-node2", weight: 1 },
  { from: "E3-06-node2", to: "E4-04-node1", weight: 1 },
  { from: "E3-06-node3", to: "E2-B1-node4", weight: 1 },
  { from: "E4-04-node1", to: "E3-06-node2", weight: 1 }
];
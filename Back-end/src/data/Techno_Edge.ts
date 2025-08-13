import { Building } from './type';

export const Techno_Edge: Building = {
    name: "Techno_Edge",
    floors: 4,
    levels: {
      "B1": {
        image: "/TEB1.png",
        bounds: [[0, 0], [1640, 2360]],
        nodes: [
          {id: "TE-B1-lift1", x: 1296, y: 779},
        ],  
        edges: [
          {from: "TE-B1-lift1", to: "TE-01-lift1", distance: 5000},
          {from: "TE-B1-lift1", to: "TE-03-lift1", distance: 5000},
        ]
      },

      "01": {
        image: "/Techno_Edge01.png",
        bounds: [[0, 0], [1640, 2360]],
        nodes: [
          {id: "TE-01-lift1", x: 1064, y: 1347},
          {id: "TE-01-node1", x: 1128, y: 1331},
          {id: "TE-01-canteen", x: 1128, y: 887},
          {id: "TE-01-node2", x: 1128, y: 548},
          {id: "TE-01-lift2", x: 1064, y: 548},
        ],  
        edges: [
          //lifts
          {from: "TE-01-lift1", to: "TE-B1-lift1", distance: 5000},
          {from: "TE-01-lift1", to: "TE-03-lift1", distance: 5000},
          {from: "TE-01-lift2", to: "TE-02-lift1", distance: 5000},
          {from: "TE-01-lift2", to: "TE-03-lift2", distance: 5000},
          //forwards
          {from: "TE-01-lift1", to: "TE-01-node1", distance: 100},
          {from: "TE-01-node1", to: "TE-01-canteen", distance: 100},
          {from: "TE-01-canteen", to: "TE-01-node2", distance: 100},
          {from: "TE-01-node2", to: "TE-01-lift2", distance: 100},
          //backwards
          {from: "TE-01-node1", to: "TE-01-lift1", distance: 100},
          {from: "TE-01-canteen", to: "TE-01-node1", distance: 100},
          {from: "TE-01-node2", to: "TE-01-canteen", distance: 100},
          {from: "TE-01-lift2", to: "TE-01-node2", distance: 100}, 
        ]
      },
      "02": {
        image: "/Techno_Edge02.png",
        bounds: [[0, 0], [1640, 2360]],
        nodes: [
          {id: "TE-02-lift1", x: 1736, y: 871}
        ],  
        edges: [
          //lifts
          {from: "TE-02-lift1", to: "TE-01-lift2", distance: 5000},
          {from: "TE-02-lift1", to: "TE-03-lift2", distance: 5000},
        ]
      },
      "03": {
        image: "/Techno_Edge03.png",
        bounds: [[0, 0], [1640, 2360]],
        nodes: [
          {id: "TE-03-lift1", x: 1112, y: 1474},
          {id: "TE-03-node1", x: 1196, y: 1478},
          {id: "TE-03-node2", x: 1196, y: 643},
          {id: "TE-03-lift2", x: 1004, y: 643},
          {id: "TE-03-node3", x: 836, y: 643},
          {id: "TE-03-node4", x: 832, y: 495},
          {id: "TE-03-node5", x: 768, y: 180},//E4 L4
        ],  
        edges: [
          //lifts
          {from: "TE-03-lift1", to: "TE-B1-lift1", distance: 5000},
          {from: "TE-03-lift1", to: "TE-01-lift1", distance: 5000},
          {from: "TE-03-lift2", to: "TE-02-lift1", distance: 5000},
          {from: "TE-03-lift2", to: "TE-01-lift2", distance: 5000},
          //forwards
          {from: "TE-03-lift1", to: "TE-03-node1", distance: 50},
          {from: "TE-03-node1", to: "TE-03-node2", distance: 400},
          {from: "TE-03-node2", to: "TE-03-lift2", distance: 50},
          {from: "TE-03-lift2", to: "TE-03-node3", distance: 50},
          {from: "TE-03-node3", to: "TE-03-node4", distance: 100},
          {from: "TE-03-node4", to: "TE-03-node5", distance: 100},
        ]
      }
    }
};

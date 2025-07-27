import { Building } from './type';

export const E2A: Building = {
     name: "E2",
    floors: 7,
    levels:{
    "01":{
        image: "/E2AL1.png",
        bounds: [[0, 0], [1640, 2360]],
        nodes:[],
        edges:[]
    },
    "02":{
        image: "/E2AL2.png",
        bounds: [[0, 0], [1640, 2360]],
        nodes:[
            {id: "E2A-02-lift1", x: 1618, y: 867},
            {id: "E2A-02-node1", x: 1618, y: 625},
            {id: "E2A-02-node2", x: 1939, y: 625},
            {id: "E2A-02-03", x: 1347, y: 625},
            {id: "E2A-02-02", x: 868, y: 625},
            {id: "E2A-02-node3", x: 868, y: 912},
            {id: "E2A-02-01", x: 949, y: 912},
            {id: "E2A-02-02", x: 868, y: 625},
            {id: "E2A-02-node4", x: 1549, y: 984},
        ],
        edges:[
            //lifts
            {from: "E2A-02-lift1", to: "E2A-03-lift1", distance:0},
            {from: "E2A-02-lift1", to: "E2A-04-lift1", distance:0},
            //forwards
            {from: "E2A-02-lift1", to: "E2A-02-node1", distance: 242},
            {from: "E2A-02-node1", to: "E2A-02-03", distance: 271},
            {from: "E2A-02-node1", to: "E2A-02-node2", distance: 321},
            {from: "E2A-02-03", to: "E2A-02-02", distance: 479},
            {from: "E2A-02-02", to: "E2A-02-node3", distance: 287},
            {from: "E2A-02-node3", to: "E2A-02-01", distance: 81},
            {from: "E2A-02-01", to: "E2A-02-node4", distance: 604},
            {from: "E2A-02-node4", to: "E2A-02-lift1", distance: 136},
            //backwards
            {from: "E2A-02-lift1", to: "E2A-02-node4", distance: 136},
            {from: "E2A-02-node4", to: "E2A-02-01", distance: 604},
            {from: "E2A-02-01", to: "E2A-02-node3", distance: 81},
            {from: "E2A-02-node3", to: "E2A-02-02", distance: 287},
            {from: "E2A-02-02", to: "E2A-02-03", distance: 479},
            {from: "E2A-02-03", to: "E2A-02-node1", distance: 271},
            {from: "E2A-02-node1", to: "E2A-02-node2", distance: 321},
            {from: "E2A-02-node1", to: "E2A-02-lift1", distance: 242}
        ]},
        "03": {
        image: "/E2AL3.png",
        bounds: [[0, 0], [1640, 2360]],
        nodes:[
            {id: "E2A-03-lift1", x: 1618, y: 867},
            {id: "E2A-03-node1", x: 1618, y: 625},
            {id: "E2A-03-03", x: 1404, y: 625},
            {id: "E2A-03-node2", x: 841, y: 625},
            {id: "E2A-03-02", x: 812, y: 887},
            {id: "E2A-03-01", x: 1375, y: 984}
        ],
        edges:[
            //lift
            {from: "E2A-03-lift1", to: "E2A-02-lift1", distance:0},
            {from: "E2A-03-lift1", to: "E2A-04-lift1", distance:0},
            //forwards
            {from: "E2A-03-lift1", to: "E2A-03-node1", distance: 242},
            {from: "E2A-03-node1", to: "E2A-03-03", distance: 214},
            {from: "E2A-03-03", to: "E2A-03-node2", distance: 563},
            {from: "E2A-03-node2", to: "E2A-03-02", distance: 265},
            {from: "E2A-03-02", to: "E2A-03-01", distance: 601},
            {from: "E2A-03-01", to: "E2A-03-lift1", distance: 312},
            //backwards
            {from: "E2A-03-lift1", to: "E2A-03-01", distance: 312},
            {from: "E2A-03-01", to: "E2A-03-02", distance: 601},
            {from: "E2A-03-02", to: "E2A-03-node2", distance: 265},
            {from: "E2A-03-node2", to: "E2A-03-03", distance: 563},
            {from: "E2A-03-03", to: "E2A-03-node1", distance: 214},
            {from: "E2A-03-node1", to: "E2A-03-lift1", distance: 242}
        ]},
    "04":{
        image: "/E2AL4.png",
        bounds: [[0, 0], [1640, 2360]],
        nodes:[
            {id: "E2A-04-lift1", x: 1618, y: 867},
            {id: "E2A-04-node1", x: 1618, y: 625},
            {id: "E2A-04-05", x: 1217, y: 625},
            {id: "E2A-04-04", x: 826, y: 625},
            {id: "E2A-04-03", x: 802, y: 887},
            {id: "E2A-04-02", x: 1154, y: 953},
            {id: "E2A-04-01", x: 1513, y:990}
        ],
        edges:[
            //lift
            {from: "E2A-04-lift1", to: "E2A-03-lift1", distance:0},
            {from: "E2A-04-lift1", to: "E2A-02-lift1", distance:0},
            //forwards
            {from: "E2A-04-lift1", to: "E2A-04-node1", distance: 242},
            {from: "E2A-04-node1", to: "E2A-04-05", distance: 401},
            {from: "E2A-04-05", to: "E2A-04-04", distance: 391},
            {from: "E2A-04-04", to: "E2A-04-03", distance: 263},
            {from: "E2A-04-03", to: "E2A-04-02", distance: 360},
            {from: "E2A-04-02", to: "E2A-04-01", distance: 364},
            //backwards
            {from: "E2A-04-lift1", to: "E2A-04-node1", distance: 242},
            {from: "E2A-04-node1", to: "E2A-04-05", distance: 401},
            {from: "E2A-04-05", to: "E2A-04-04", distance: 391},
            {from: "E2A-04-04", to: "E2A-04-03", distance: 263},
            {from: "E2A-04-03", to: "E2A-04-02", distance: 360},
            {from: "E2A-04-02", to: "E2A-04-01", distance: 364}
        ]
    }
}}
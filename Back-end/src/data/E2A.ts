import { Building } from './type';

export const E2A: Building = {
    name: "E2A",
    floors: 4,
    levels:{
    "01":{
        image: "/E2A01.png",
        bounds: [[0, 0], [1640, 2360]],
        nodes:[
            {id: "E2A-01-lift1", x: 1618, y: 867},
            {id: "E2A-01-node1", x: 72, y: 982},//E4 L4 lift2 side
            {id: "E2A-01-node2", x: 616, y: 1445},//E4 L4 LT6 side
            {id: "E2A-01-node3", x: 760, y: 948},
            {id: "E2A-01-node4", x: 984, y: 708},
            {id: "E2A-01-node5", x: 1336, y: 84},//E1 L4
            {id: "E2A-01-node6", x: 1336, y: 374},
            {id: "E2A-01-node7", x: 1552, y: 494},
            {id: "E2A-01-node8", x: 1680, y: 1237},
            {id: "E2A-01-node9", x: 1680, y: 1533},//E2B1/E4L4 road
            {id: "E2A-01-node10", x: 1552, y: 650},
            {id: "E2A-01-node11", x: 2100, y: 650},//E2 L2
            {id: "E2A-01-node12", x: 1520, y: 863},
        ],
        edges:[
            //lifts
            {from: "E2A-01-lift1", to: "E2A-02-lift1", distance:5000},
            {from: "E2A-01-lift1", to: "E2A-03-lift1", distance:5000},
            {from: "E2A-01-lift1", to: "E2A-04-lift1", distance:5000},
            //forwards
            {from: "E2A-01-node1", to: "E2A-01-node4", distance: 5952},
            {from: "E2A-01-node2", to: "E2A-01-node3", distance: 5517},
            {from: "E2A-01-node3", to: "E2A-01-node4", distance: 328},
            {from: "E2A-01-node4", to: "E2A-01-node12", distance: 5654},
            {from: "E2A-01-node5", to: "E2A-01-node6", distance: 5290},
            {from: "E2A-01-node6", to: "E2A-01-node7", distance: 5247},
            {from: "E2A-01-node7", to: "E2A-01-node12", distance: 379},
            {from: "E2A-01-node8", to: "E2A-01-node9", distance: 5296},
            {from: "E2A-01-node8", to: "E2A-01-node12", distance: 375},
            {from: "E2A-01-node7", to: "E2A-01-node10", distance: 150},
            {from: "E2A-01-node10", to: "E2A-01-node11", distance: 5600},
            {from: "E2A-01-node12", to: "E2A-01-node10", distance: 300},
            {from: "E2A-01-node12", to: "E2A-01-lift1", distance: 300},
            //backwards
            {from: "E2A-01-node4", to: "E2A-01-node1", distance: 5952},
            {from: "E2A-01-node3", to: "E2A-01-node2", distance: 5517},
            {from: "E2A-01-node4", to: "E2A-01-node3", distance: 328},
            {from: "E2A-01-node12", to: "E2A-01-node4", distance: 5654},
            {from: "E2A-01-node6", to: "E2A-01-node5", distance: 5290},
            {from: "E2A-01-node7", to: "E2A-01-node6", distance: 5247},
            {from: "E2A-01-node12", to: "E2A-01-node7", distance: 379},
            {from: "E2A-01-node9", to: "E2A-01-node8", distance: 5296},
            {from: "E2A-01-node12", to: "E2A-01-node8", distance: 375},
            {from: "E2A-01-node10", to: "E2A-01-node7", distance: 150},
            {from: "E2A-01-node11", to: "E2A-01-node10", distance: 5600},
            {from: "E2A-01-node10", to: "E2A-01-node12", distance: 300},
            {from: "E2A-01-lift1", to: "E2A-01-node12", distance: 300},
    ]},

    "02":{
        image: "/E2A02.png",
        bounds: [[0, 0], [1640, 2360]],
        nodes:[
            {id: "E2A-02-01", x: 1396, y: 1003},
            {id: "E2A-02-02", x: 940, y: 583},
            {id: "E2A-02-03", x: 1424, y: 607},
            {id: "E2A-02-lift1", x: 1618, y: 867},
            {id: "E2A-02-node1", x: 1618, y: 625},
            {id: "E2A-02-node2", x: 1939, y: 625},//E2 L3
        ],
        edges:[
            //lifts
            {from: "E2A-02-lift1", to: "E2A-01-lift1", distance:5000},
            {from: "E2A-02-lift1", to: "E2A-03-lift1", distance:5000},
            {from: "E2A-02-lift1", to: "E2A-04-lift1", distance:5000},
            //forwards
            {from: "E2A-02-lift1", to: "E2A-02-node1", distance: 242},
            {from: "E2A-02-node1", to: "E2A-02-03", distance: 195},
            {from: "E2A-02-node1", to: "E2A-02-node2", distance: 321},
            {from: "E2A-02-03", to: "E2A-02-02", distance: 485},
            {from: "E2A-02-01", to: "E2A-02-lift1", distance: 260},
            //backwards
            {from: "E2A-02-node1", to: "E2A-02-lift1", distance: 242},
            {from: "E2A-02-03", to: "E2A-02-node1", distance: 195},
            {from: "E2A-02-node2", to: "E2A-02-node1", distance: 321},
            {from: "E2A-02-02", to: "E2A-02-03", distance: 485},
            {from: "E2A-02-lift1", to: "E2A-02-01", distance: 260},]},

    "03": {
        image: "/E2A03.png",
        bounds: [[0, 0], [1640, 2360]],
        nodes:[
            {id: "E2A-03-01", x: 1368, y: 1007},
            {id: "E2A-03-02", x: 812, y: 887},
            {id: "E2A-03-03", x: 1404, y: 625},
            {id: "E2A-03-lift1", x: 1618, y: 867}],
        edges:[
            //lift
            {from: "E2A-03-lift1", to: "E2A-01-lift1", distance:5000},
            {from: "E2A-03-lift1", to: "E2A-02-lift1", distance:5000},
            {from: "E2A-03-lift1", to: "E2A-04-lift1", distance:5000},
            //forwards
            {from: "E2A-03-lift1", to: "E2A-03-03", distance: 806},
            {from: "E2A-03-lift1", to: "E2A-03-01", distance: 287},
            {from: "E2A-03-01", to: "E2A-03-02", distance: 569},
            //backwards
            {from: "E2A-03-03", to: "E2A-03-lift1", distance: 806},
            {from: "E2A-03-01", to: "E2A-03-lift1", distance: 287},
            {from: "E2A-03-02", to: "E2A-03-01", distance: 569}]},

    "04":{
        image: "/E2A04.png",
        bounds: [[0, 0], [1640, 2360]],
        nodes:[
            {id: "E2A-04-01", x: 1513, y:990},
            {id: "E2A-04-02", x: 1154, y: 953},
            {id: "E2A-04-03", x: 802, y: 887},
            {id: "E2A-04-04", x: 826, y: 625},
            {id: "E2A-04-05", x: 1217, y: 625},
            {id: "E2A-04-lift1", x: 1618, y: 867},
            {id: "E2A-04-node1", x: 1618, y: 625},
            {id: "E2A-04-node2", x: 1980, y: 635},//E2 L5
        ],
        edges:[
            //lift
            {from: "E2A-04-lift1", to: "E2A-01-lift1", distance:5000},
            {from: "E2A-04-lift1", to: "E2A-03-lift1", distance:5000},
            {from: "E2A-04-lift1", to: "E2A-02-lift1", distance:5000},
            //forwards
            {from: "E2A-04-lift1", to: "E2A-04-node1", distance: 242},
            {from: "E2A-04-node1", to: "E2A-04-05", distance: 401},
            {from: "E2A-04-05", to: "E2A-04-04", distance: 391},
            {from: "E2A-04-02", to: "E2A-04-03", distance: 360},
            {from: "E2A-04-02", to: "E2A-04-01", distance: 364},
            {from: "E2A-04-01", to: "E2A-04-lift1", distance: 162},
            //backwards
            {from: "E2A-04-node1", to: "E2A-04-lift1", distance: 242},
            {from: "E2A-04-05", to: "E2A-04-node1", distance: 401},
            {from: "E2A-04-04", to: "E2A-04-05", distance: 391},
            {from: "E2A-04-03", to: "E2A-04-02", distance: 360},
            {from: "E2A-04-01", to: "E2A-04-02", distance: 364},
            {from: "E2A-04-lift1", to: "E2A-04-01", distance: 162}]}
}}
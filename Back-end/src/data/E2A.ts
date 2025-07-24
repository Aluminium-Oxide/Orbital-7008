import { Building } from './type';

export const E2: Building = {
     name: "E2",
    floors: 7,
    levels:{
    "L1":{
        image: "/E2AL1.png",
        bounds: [[0, 0], [1640, 2360]],
        nodes:[],
        edges:[]
    },
    "L2":{
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
    "L3": {}
}}
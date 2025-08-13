import { Building } from './type';
export const E1A: Building = {
    name: "E1A",
    floors: 7,
    levels:{
            "01": {
        image: "/E1A01.png",
            bounds: [[0, 0], [1640, 2360]],
            nodes: [
                {id: "E1A-01-05", x: 680, y: 1043},
                {id: "E1A-01-06", x: 680, y: 799},
                {id: "E1A-01-lift1", x: 680, y: 1162},
                {id: "E1A-01-node1", x: 352, y: 1043},//EAL3
            ],
            edges: [
                //lifts
                {from: "E1A-01-lift1", to: "E1A-02-lift1", distance: 5000},
                {from: "E1A-01-lift1", to: "E1A-03-lift1", distance: 5000},
                {from: "E1A-01-lift1", to: "E1A-04-lift1", distance: 5000},
                {from: "E1A-01-lift1", to: "E1A-05-lift1", distance: 5000},
                {from: "E1A-01-lift1", to: "E1A-06-lift1", distance: 5000},
                {from: "E1A-01-lift1", to: "E1A-07-lift1", distance: 5000},
                //forwards
                {from: "E1A-01-lift1", to: "E1A-01-05", distance: 119},
                {from: "E1A-01-05", to: "E1A-01-06", distance: 244},
                {from: "E1A-01-05", to: "E1A-01-node1", distance: 328},
                //backwards
                {from: "E1A-01-06", to: "E1A-01-05", distance: 244},
                {from: "E1A-01-05", to: "E1A-01-lift1", distance: 119},
                {from: "E1A-01-node1", to: "E1A-01-05", distance: 328}]},
            
            "02": {
        image: "/E1A02.png",
            bounds: [[0, 0], [1640, 2360]],
            nodes: [
                {id: "E1A-02-04", x: 612, y: 730},
                {id: "E1A-02-05", x: 900, y: 730},
                {id: "E1A-02-17", x: 1264, y: 730},
                {id: "E1A-02-18", x: 900, y: 730},
                {id: "E1A-02-19", x: 500, y: 947},
                {id: "E1A-02-lift1", x: 500, y: 1146},
                {id: "E1A-02-node1", x: 500, y: 730},
                {id: "E1A-02-node2", x: 1264, y: 550},//E4 L4
            ],
            edges: [
                //lifts
                {from: "E1A-02-lift1", to: "E1A-01-lift1", distance: 5000},
                {from: "E1A-02-lift1", to: "E1A-03-lift1", distance: 5000},
                {from: "E1A-02-lift1", to: "E1A-04-lift1", distance: 5000},
                {from: "E1A-02-lift1", to: "E1A-05-lift1", distance: 5000},
                {from: "E1A-02-lift1", to: "E1A-06-lift1", distance: 5000},
                {from: "E1A-02-lift1", to: "E1A-07-lift1", distance: 5000},
                //forwards
                {from: "E1A-02-lift1", to: "E1A-02-19", distance: 199},
                {from: "E1A-02-19", to: "E1A-02-node1", distance: 217},
                {from: "E1A-02-node1", to: "E1A-02-04", distance: 112},
                {from: "E1A-02-04", to: "E1A-02-05", distance: 288},
                {from: "E1A-02-05", to: "E1A-02-18", distance: 1},
                {from: "E1A-02-18", to: "E1A-02-17", distance: 364},
                {from: "E1A-02-17", to: "E1A-02-node2", distance: 280},
                //backwards
                {from: "E1A-02-19", to: "E1A-02-lift1", distance: 199},
                {from: "E1A-02-node1", to: "E1A-02-19", distance: 217},
                {from: "E1A-02-04", to: "E1A-02-node1", distance: 112},
                {from: "E1A-02-05", to: "E1A-02-04", distance: 288},
                {from: "E1A-02-18", to: "E1A-02-05", distance: 1},
                {from: "E1A-02-17", to: "E1A-02-18", distance: 364},
                {from: "E1A-02-node2", to: "E1A-02-17", distance: 280},
            ]},
           
            "03": {
        image: "/E1A03.png",
            bounds: [[0, 0], [1640, 2360]],
            nodes: [
                {id: "E1A-03-03", x: 728, y: 811},
                {id: "E1A-03-lift1", x: 560, y: 1235},
                {id: "E1A-03-node1", x: 560, y: 811},
                {id: "E1A-03-node2", x: 260, y: 1235},//EA L6
            ],
            edges: [
                //lifts
                {from: "E1A-03-lift1", to: "E1A-01-lift1", distance: 5000},
                {from: "E1A-03-lift1", to: "E1A-02-lift1", distance: 5000},
                {from: "E1A-03-lift1", to: "E1A-04-lift1", distance: 5000},
                {from: "E1A-03-lift1", to: "E1A-05-lift1", distance: 5000},
                {from: "E1A-03-lift1", to: "E1A-06-lift1", distance: 5000},
                {from: "E1A-03-lift1", to: "E1A-07-lift1", distance: 5000},
                //forwards
                {from: "E1A-03-lift1", to: "E1A-03-node1", distance: 424},
                {from: "E1A-03-node1", to: "E1A-03-03", distance: 168},
                {from: "E1A-03-lift1", to: "E1A-03-node2", distance: 300},
                //backwards
                {from: "E1A-03-03", to: "E1A-03-node1", distance: 168},
                {from: "E1A-03-node1", to: "E1A-03-lift1", distance: 424},
                {from: "E1A-03-node2", to: "E1A-03-lift1", distance: 300},]},

            "04": {
        image: "/E1A04.png",
            bounds: [[0, 0], [1640, 2360]],
            nodes: [
                {id: "E1A-04-01", x: 480, y: 935},
                {id: "E1A-04-02", x: 1192, y: 670},
                {id: "E1A-04-03", x: 1600, y: 670},
                {id: "E1A-04-lift1", x: 480, y: 1223},
                {id: "E1A-04-node1", x: 480, y: 670},
                {id: "E1A-04-node2", x: 686, y: 670},
                {id: "E1A-04-node3", x: 1964, y: 670},
                {id: "E1A-04-node4", x: 84, y: 1223},//EA L7
                {id: "E1A-04-node5", x: 686, y: 280},//E2 B1
                {id: "E1A-04-node6", x: 2240, y: 670},//E1 L4
            ],
            edges: [
                //lifts
                {from: "E1A-04-lift1", to: "E1A-01-lift1", distance: 5000},
                {from: "E1A-04-lift1", to: "E1A-02-lift1", distance: 5000},
                {from: "E1A-04-lift1", to: "E1A-03-lift1", distance: 5000},
                {from: "E1A-04-lift1", to: "E1A-05-lift1", distance: 5000},
                {from: "E1A-04-lift1", to: "E1A-06-lift1", distance: 5000},
                {from: "E1A-04-lift1", to: "E1A-07-lift1", distance: 5000},
                //forwards
                {from: "E1A-04-01", to: "E1A-04-lift1", distance: 288},
                {from: "E1A-04-01", to: "E1A-04-node1", distance: 265},
                {from: "E1A-04-node1", to: "E1A-04-node2", distance: 206},
                {from: "E1A-04-node2", to: "E1A-04-02", distance: 506},
                {from: "E1A-04-03", to: "E1A-04-02", distance: 408},
                {from: "E1A-04-03", to: "E1A-04-node3", distance: 364},
                {from: "E1A-04-lift1", to: "E1A-04-node4", distance: 400},
                {from: "E1A-04-node2", to: "E1A-04-node5", distance: 400},
                {from: "E1A-04-node3", to: "E1A-04-node6", distance: 300},
                //backwards
                {from: "E1A-04-lift1", to: "E1A-04-01", distance: 288},
                {from: "E1A-04-node1", to: "E1A-04-01", distance: 265},
                {from: "E1A-04-node2", to: "E1A-04-node1", distance: 206},
                {from: "E1A-04-02", to: "E1A-04-node2", distance: 506},
                {from: "E1A-04-02", to: "E1A-04-03", distance: 408},
                {from: "E1A-04-node3", to: "E1A-04-03", distance: 364},
                {from: "E1A-04-node4", to: "E1A-04-lift1", distance: 400},
                {from: "E1A-04-node5", to: "E1A-04-node2", distance: 400},
                {from: "E1A-04-node6", to: "E1A-04-node3", distance: 300},
                ]},
            
            "05": {
        image: "/E1A05.png",
            bounds: [[0, 0], [1640, 2360]],
            nodes: [
                {id: "E1A-05-03~14", x: 530, y: 560},
                {id: "E1A-05-19", x: 1865, y: 560},
                {id: "E1A-05-20", x: 1484, y: 560},
                {id: "E1A-05-21", x: 1183, y: 560},
                {id: "E1A-05-22", x: 960, y: 560},
                {id: "E1A-05-23", x: 530, y: 711},
                {id: "E1A-05-lift1", x: 530, y: 977},
                {id: "E1A-05-node1", x: 1988, y: 411},
                {id: "E1A-05-node2", x: 2288, y: 411},//E1 L5
            ],
            edges: [
                //lifts
                {from: "E1A-05-lift1", to: "E1A-01-lift1", distance: 5000},
                {from: "E1A-05-lift1", to: "E1A-02-lift1", distance: 5000},
                {from: "E1A-05-lift1", to: "E1A-03-lift1", distance: 5000},
                {from: "E1A-05-lift1", to: "E1A-04-lift1", distance: 5000},
                {from: "E1A-05-lift1", to: "E1A-06-lift1", distance: 5000},
                {from: "E1A-05-lift1", to: "E1A-07-lift1", distance: 5000},
                //forwards
                {from: "E1A-05-lift1", to: "E1A-05-23", distance: 266},
                {from: "E1A-05-23", to: "E1A-05-03~14", distance: 151},
                {from: "E1A-05-03~14", to: "E1A-05-22", distance: 430},
                {from: "E1A-05-22", to: "E1A-05-21", distance: 223},
                {from: "E1A-05-21", to: "E1A-05-20", distance: 301},
                {from: "E1A-05-20", to: "E1A-05-19", distance: 381},
                {from: "E1A-05-19", to: "E1A-05-node1", distance: 200},
                {from: "E1A-05-node1", to: "E1A-05-node2", distance: 300},
                //backwards
                {from: "E1A-05-23", to: "E1A-05-lift1", distance: 266},
                {from: "E1A-05-03~14", to: "E1A-05-23", distance: 151},
                {from: "E1A-05-22", to: "E1A-05-03~14", distance: 430},
                {from: "E1A-05-21", to: "E1A-05-22", distance: 223},
                {from: "E1A-05-20", to: "E1A-05-21", distance: 301},
                {from: "E1A-05-19", to: "E1A-05-20", distance: 381},
                {from: "E1A-05-node1", to: "E1A-05-19", distance: 200},
                {from: "E1A-05-node2", to: "E1A-05-node1", distance: 300},
                ]},
            
            "06": {
        image: "/E1A06.png",
            bounds: [[0, 0], [1640, 2360]],
            nodes: [
                {id: "E1A-06-03~15", x: 530, y: 562},
                {id: "E1A-06-18", x: 1834, y:562},
                {id: "E1A-06-19~20", x: 1583, y:562},
                {id: "E1A-06-21~22", x: 1339, y:562},
                {id: "E1A-06-23~25", x: 786, y:562},
                {id: "E1A-06-lift1", x: 530, y: 977},],
            edges: [
                //lifts
                {from: "E1A-06-lift1", to: "E1A-01-lift2", distance: 5000},
                {from: "E1A-06-lift1", to: "E1A-02-lift1", distance: 5000},
                {from: "E1A-06-lift1", to: "E1A-03-lift1", distance: 5000},
                {from: "E1A-06-lift1", to: "E1A-04-lift1", distance: 5000},
                {from: "E1A-06-lift1", to: "E1A-05-lift1", distance: 5000},
                {from: "E1A-06-lift1", to: "E1A-07-lift1", distance: 5000},
                //forwards
                {from: "E1A-06-lift1", to: "E1A-06-03~15", distance: 415},
                {from: "E1A-06-03~15", to: "E1A-06-23~25", distance: 256},    
                {from: "E1A-06-23~25", to: "E1A-06-21~22", distance: 553},
                {from: "E1A-06-21~22", to: "E1A-06-19~20", distance: 244},
                {from: "E1A-06-19~20", to: "E1A-06-18", distance: 251},
                //backwards
                {from: "E1A-06-18", to: "E1A-06-20", distance: 251},
                {from: "E1A-06-19", to: "E1A-06-22", distance: 244},
                {from: "E1A-06-21", to: "E1A-06-25", distance: 553},
                {from: "E1A-06-23", to: "E1A-06-03", distance: 256},
                {from: "E1A-06-03", to: "E1A-06-lift1", distance: 415},]},

            "07": {
        image: "/E1AL7.png",
            bounds: [[0, 0], [1640, 2360]],
            nodes: [
                {id: "E1A-07-03", x: 500, y: 800},
                {id: "E1A-07-04~16", x: 500, y:620},
                {id: "E1A-07-19~20", x: 1800, y: 620},
                {id: "E1A-07-lift1", x: 500, y: 1050},],
            edges: [    
                //lifts
                {from: "E1A-07-lift1", to: "E1A-01-lift1", distance: 5000},
                {from: "E1A-07-lift1", to: "E1A-02-lift1", distance: 5000},
                {from: "E1A-07-lift1", to: "E1A-03-lift1", distance: 5000},
                {from: "E1A-07-lift1", to: "E1A-04-lift1", distance: 5000},
                {from: "E1A-07-lift1", to: "E1A-05-lift1", distance: 5000},
                {from: "E1A-07-lift1", to: "E1A-06-lift1", distance: 5000},
                //forwards
                {from: "E1A-07-lift1", to: "E1A-07-03", distance: 250},
                {from: "E1A-07-03", to: "E1A-07-04~16", distance: 180},
                {from: "E1A-07-04~16", to: "E1A-07-19~20", distance: 1300},
                //backwards
                {from: "E1A-07-19~20", to: "E1A-07-4~16", distance: 1300},
                {from: "E1A-07-04~16", to: "E1A-07-03", distance: 180},
                {from: "E1A-07-03", to: "E1A-07-lift1", distance: 250},]},
        }
    }

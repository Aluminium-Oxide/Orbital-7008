import { Building } from './type';

export const Techno_Edge: Building = {
    name: "Techno_Edge",
    floors: 4,
    levels: {
      "B1": {
        image: "/TEB1.png",
        bounds: [[0, 0], [1640, 2360]],
        nodes: [
          {id: "EA-01-lift1", x: 1740, y: 512},
          {id: "EA-01-LT7A", x: 1736, y: 871}, ],  
        edges: [
          //lifts
          {from: "EA-01-lift1", to: "EA-02-lift1", distance: 5000},
          //forwards
          {from: "EA-01-lift1", to: "EA-01-05/06", distance: 118},
          {from: "EA-01-stairs2", to: "EA-01-Engineering Auditorium", distance: 189},]},

      "01": {
        image: "/TE01.png",
        bounds: [[0, 0], [1640, 2360]],
        nodes: [
          {id: "EA-01-Engineering Auditorium", x: 1740, y: 512},
          {id: "EA-01-LT7A", x: 1736, y: 871}, ],  
        edges: [
          //lifts
          {from: "EA-01-lift1", to: "EA-02-lift1", distance: 5000},
          //forwards
          {from: "EA-01-lift1", to: "EA-01-05/06", distance: 118},
          {from: "EA-01-stairs2", to: "EA-01-Engineering Auditorium", distance: 189},]},
"02": {
        image: "/TE02.png",
        bounds: [[0, 0], [1640, 2360]],
        nodes: [
          {id: "EA-01-Engineering Auditorium", x: 1740, y: 512},
          {id: "EA-01-LT7A", x: 1736, y: 871}, ],  
        edges: [
          //lifts
          {from: "EA-01-lift1", to: "EA-02-lift1", distance: 5000},
          //forwards
          {from: "EA-01-lift1", to: "EA-01-05/06", distance: 118},
          {from: "EA-01-stairs2", to: "EA-01-Engineering Auditorium", distance: 189},]},
"03": {
        image: "/TE03.png",
        bounds: [[0, 0], [1640, 2360]],
        nodes: [
          {id: "EA-01-Engineering Auditorium", x: 1740, y: 512},
          {id: "EA-01-LT7A", x: 1736, y: 871}, ],  
        edges: [
          //lifts
          {from: "EA-01-lift1", to: "EA-02-lift1", distance: 5000},
          //forwards
          {from: "EA-01-lift1", to: "EA-01-05/06", distance: 118},
          {from: "EA-01-stairs2", to: "EA-01-Engineering Auditorium", distance: 189}
        ]}  }
};

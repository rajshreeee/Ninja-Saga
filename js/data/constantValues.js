
const GAME_WIDTH = 1000;
const GAME_HEIGHT = 700;

const academyJutsuRect = [
     {
         x: 140,
         y: 90,
         width: 460,
         height: 60
            },
     {
         x: 140,
         y: 160,
         width: 460,
         height: 60
            },
     {
         x: 140,
         y: 230,
         width: 460,
         height: 60
            },
     {
         x: 140,
         y: 300,
         width: 460,
         height: 60
            },
     {
         x: 140,
         y: 370,
         width: 460,
         height: 60
            }
        ];

 const petImageRect = [
     {
         x: 166,
         y: 68,
         width: 300,
         height: 80
            },
     {
         x: 166,
         y: 230,
         width: 300,
         height: 80
            },
     {
         x: 166,
         y: 392,
          width: 300,
         height: 80
     }
        ];

 const speedRect = {
     x: 875,
     y: 410,
     width: 112,
     height: 35
 }
 
 
 const enemyOneFixedDaggerPosition = [{
     top: 120,
     bottom: 150
 }];

const enemyPosition = [
            {
                x: 750,
                y: 140
            },

            {
                x: 900,
                y: 190
            },
            {
                x: 900,
                y: 200
            }
        ];

const jutsuCoordinates = [
            {
                x: 300,
                y: 325,
                width: 50,
                height: 50
        }, {
                x: 375,
                y: 325,
                width: 50,
                height: 50
        }, {
                x: 450,
                y: 325,
                width: 50,
                height: 50
        }, {
                x: 525,
                y: 325,
                width: 50,
                height: 50
        }, {
                x: 600,
                y: 325,
                width: 50,
                height: 50
        },
            {
                x: 675,
                y: 325,
                width: 50,
                height: 50
        }

        ];

const healthBarCoordinates = {
            x: 150,
            y: 300
        };

const equipmentJutsuRect = [
            {
                x: 162,
                y: 65
            },
            {
                x: 162,
                y: 142
            },
            {
                x: 162,
                y: 219
            },
            {
                x: 162,
                y: 296
            },
            {
                x: 162,
                y: 373
            }, {
                x: 162,
                y: 450
            },
            {
                x: 406,
                y: 65
            },
            {
                x: 406,
                y: 142
            },
            {
                x: 406,
                y: 219
            },
            {
                x: 406,
                y: 296
            },
            {
                x: 406,
                y: 373
            }, {
                x: 406,
                y: 450
            }
        ];
const missionCoordinates = [
            {
                x: 300,
                y: 200,
                message: "Only level 2+ can accept these missions!",
                width: 313,
                height: 71
        }, {
                x: 300,
                y: 400,
                message: "Only level 1+ can accept these missions!",
                width: 313,
                height: 71
        },
            {
                x: 300,
                y: 600,
                message: "Basic mission that can be accepted by all",
                width: 313,
                height: 71
        }
    ];

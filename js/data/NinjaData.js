let naruto_stand = document.getElementById('naruto_sprite');
let sakura_stand = document.getElementById('sakura_sprite');
let naruto_jutsu1 = document.getElementById('naruto_jutsu1');
let naruto_rasengan = document.getElementById('naruto-rasengan');
let sasuke_stand = document.getElementById('sasuke_sprite');

let sasuke_chidori = document.getElementById('sasuke-chidori');
let sasuke_genjutsu = document.getElementById('sasuke-genjutsu');

let sakura_superChakra = document.getElementById('sakura-superStrength');
let sakura_jutsu2 = document.getElementById('sakura-jutsu2');

let naruto_block = document.getElementById('naruto-block');
let sasuke_block = document.getElementById('sasuke-block');
let sakura_block = document.getElementById('sakura-block');

let sakura_dead = document.getElementById('sakura-dead');

let rasengan = document.getElementById("rasengan");
let shadowClone = document.getElementById("shadowClone");

let genjutsu = document.getElementById("genjutsu");
let chidori = document.getElementById("chidori");

let superStrength = document.getElementById("superStrength");
let superChakra = document.getElementById("superChakra");

let waterBurstImage = document.getElementById('water-burst');

let waterBurstIcon = document.getElementById('waterBurstIcon');
let fireBall = document.getElementById('fireBall');
let fireBallIcon = document.getElementById('fireBallIcon');

let edgeBlow = document.getElementById('edgeBlow');
let edgeBlowIcon = document.getElementById('edgeBlowIcon');

let kinjutsu = document.getElementById('kinjutsu');
let kinjutsuIcon = document.getElementById('kinjutsuIcon');

let earthFist = document.getElementById('earthFist');
let earthFistIcon = document.getElementById('earthFistIcon');

//let imageLoaders = new ImageLoader();


let NinjaData = [
    {
        name: "Sasuke",
        health: 100,
        chakra: 100,
        defense: 3,
        speed: 3,
        imageArray: [{
                image: sasuke_stand,
                width: 46,
                length: 3
        },
            {
                image: sasuke_genjutsu,
                width: 56,
                length: 2
            },
            {
                image: sasuke_chidori,
                width: 54,
                length: 3
            }, {
                image: sasuke_genjutsu,
                width: 56,
                length: 2
            },
            {
                image: sasuke_chidori,
                width: 54,
                length: 3
            }, {
                image: sasuke_genjutsu,
                width: 56,
                length: 2
            },
            {
                image: sasuke_chidori,
                width: 54,
                length: 3
            },
            {
                image: sasuke_block,
                width: 44,
                length: 2
                     }
                    ],
        jutsu: [{
                name: "Chidori",
                power: 35,
                chakraLoss: 30,
                accuracy: .9,
                image: chidori,
                count: 0
                },
            {
                name: "Genjutsu",
                power: 30,
                chakraLoss: 10,
                accuracy: .7,
                image: genjutsu,
                count: 0
        },
            {
                name: "Fat Arm",
                power: 40,
                chakraLoss: 10,
                accuracy: .8,
                image: genjutsu,
                count: 0
        },
            {
                name: "Star Attack",
                power: 40,
                chakraLoss: 10,
                accuracy: .85,
                image: genjutsu,
                count: 0
        },
            {
                name: "Rinnegan",
                power: 30,
                chakraLoss: 10,
                accuracy: .6,
                image: genjutsu,
                count: 0

        },
            {
                name: "High Kick",
                power: 40,
                chakraLoss: 10,
                accuracy: .7,
                image: genjutsu,
                count: 0

        }

               ]
    },

    {
        name: "Naruto",
        health: 100,
        chakra: 100,
        defense: 2,
        speed: 2,
        imageArray: [{
                image: naruto_stand,
                width: 47,
                length: 3

        },
            {
                image: naruto_jutsu1,
                width: 46,
                length: 3

            },
            {
                image: naruto_rasengan,
                width: 48,
                length: 3
            }, {
                image: naruto_jutsu1,
                width: 46,
                length: 3

            },
            {
                image: naruto_rasengan,
                width: 48,
                length: 3
            }, {
                image: naruto_jutsu1,
                width: 46,
                length: 3

            },
            {
                image: naruto_rasengan,
                width: 48,
                length: 3
            },
            {
                image: naruto_block,
                width: 51,
                length: 2
            }

                    ],
        jutsu: [{
                name: "Rasengan",
                power: 40,
                chakraLoss: 90,
                accuracy: .9,
                image: rasengan,
                count: 0

                },
            {
                name: "Clone Jutsu",
                power: 35,
                chakraLoss: 30,
                accuracy: .5,
                image: shadowClone,
                count: 0

        },
            {
                name: "Fly Kick",
                power: 35,
                chakraLoss: 10,
                accuracy: .87,
                image: shadowClone,
                count: 0

        },
            {
                name: "Taijutsu",
                power: 35,
                chakraLoss: 10,
                accuracy: .99,
                image: shadowClone,
                count: 0

        }, {
                name: "Dagger",
                power: 45,
                chakraLoss: 10,
                accuracy: .88,
                image: shadowClone,
                count: 0

        }
             , {
                name: "Lightning",
                power: 40,
                chakraLoss: 10,
                accuracy: .90,
                image: shadowClone,
                count: 0

        }


               ]
    },

    {
        name: "Sakura",
        health: 100,
        chakra: 100,
        defense: 2,
        speed: 1.5,
        imageArray: [{
                image: sakura_stand,
                width: 37,
                length: 3
        },
            {
                image: sakura_jutsu2,
                width: 39,
                length: 3
            },
            {
                image: sakura_superChakra,
                width: 47,
                length: 2
            }, {
                
                image: sakura_jutsu2,
                width: 39,
                length: 3
            }, {
                image: sakura_superChakra,
                width: 47,
                length: 2
            }, {
               
                image: sakura_jutsu2,
                width: 39,
                length: 3
            }, {
                image: sakura_superChakra,
                width: 47,
                length: 2
            },
            {
                image: sakura_dead,
                width: 60,
                length: 1
            },


            {
                image: sakura_block,
                width: 40,
                length: 2
            }],
        jutsu: [{
                name: "Low Kick",
                power: 30,
                chakraLoss: 25,
                accuracy: .9,
                image: superStrength,
                count: 0

                },
            {
                name: "Bounce",
                power: 35,
                chakraLoss: 10,
                accuracy: .8,
                image: superChakra,
                count: 0

        }, {
                name: "Rage Fire",
                power: 45,
                chakraLoss: 10,
                accuracy: .5,
                image: superChakra,
                count: 0

        }, {
                name: "Sharingan",
                power: 45,
                chakraLoss: 10,
                accuracy: .89,
                image: superChakra,
                count: 0

        }, {
                name: "Gold Glove",
                power: 45,
                chakraLoss: 10,
                accuracy: .79,
                image: superChakra,
                count: 0

        }, {
                name: "High Wind",
                power: 35,
                chakraLoss: 10,
                accuracy: .9,
                image: superChakra,
                count: 0

        }
               ]
    }

];


let trainingJutsu = [
    {
        name: "Water Burst",
        power: 60,
        chakraLoss: 25,
        accuracy: .9,
        image: waterBurstIcon,
        count: 0,
        renderDetailImage: false,
        selected: false,
        detailImage: waterBurstImage,
        detailImagePosX: 613,
        detailImagePosY: 76
                },
    {
        name: "Fire Ball",
        power: 55,
        chakraLoss: 10,
        accuracy: .89,
        image: fireBallIcon,
        count: 0,
        renderDetailImage: false,
        selected: false,
        detailImage: fireBall,
        detailImagePosX: 613,
        detailImagePosY: 76


        }, {
        name: "Edge Blow",
        power: 65,
        chakraLoss: 10,
        accuracy: .77,
        image: edgeBlowIcon,
        count: 0,
        renderDetailImage: false,
        selected: false,
        detailImage: edgeBlow,
        detailImagePosX: 613,
        detailImagePosY: 76


        }, {
        name: "Earth Fist",
        power: 65,
        chakraLoss: 10,
        accuracy: .88,
        image: earthFistIcon,
        count: 0,
        renderDetailImage: false,
        selected: false,
        detailImage: earthFist,
        detailImagePosX: 613,
        detailImagePosY: 76


        }, {
        name: "Kinjutsu",
        power: 55,
        chakraLoss: 10,
        accuracy: .98,
        image: kinjutsuIcon,
        count: 0,
        renderDetailImage: false,
        selected: false,
        detailImage: kinjutsu,
        detailImagePosX: 613,
        detailImagePosY: 76


        }
];

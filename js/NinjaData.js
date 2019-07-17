let naruto_stand = document.getElementById('naruto_sprite');
let sakura_stand = document.getElementById('sakura_sprite');
let naruto_jutsu1 = document.getElementById('naruto_jutsu1');
let naruto_rasengan = document.getElementById('naruto-rasengan');
let sasuke_stand = document.getElementById('sasuke_sprite');

let sasuke_chidori = document.getElementById('sasuke-chidori');
let sasuke_genjutsu = document.getElementById('sasuke-genjutsu');

let sakura_superChakra = document.getElementById('sakura-superStrength');
let sakura_jutsu2 = document.getElementById('sakura-jutsu2');

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
                width: 55,
                length: 4
            }],
        jutsu: [{
                name: "chidori",
                power: 25,
                chakraLoss: 20,
                accuracy: .90
                },
            {
                name: "genjutsu",
                power: 20,
                chakraLoss: 10,
                accuracy: .7
        }]
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
            }
                    
                    ],
        jutsu: [{
                name: "rasengan",
                power: 30,
                chakraLoss: 25,
                accuracy: .85
                },
            {
                name: "shadowClone",
                power: 15,
                chakraLoss: 10,
                accuracy: .9
        }]
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
            }],
        jutsu: [{
                name: "superStrength",
                power: 30,
                chakraLoss: 25,
                accuracy: .85
                },
            {
                name: "superChakra",
                power: 15,
                chakraLoss: 10,
                accuracy: .9
        }]
    }

]

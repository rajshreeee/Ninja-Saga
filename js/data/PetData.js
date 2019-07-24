let polar_walk = document.getElementById('polar_walk');
let polar_hunt = document.getElementById('polar_hunt');

let ninjaCat_stand = document.getElementById('ninjaCat_stand');
let ninjaCat_attack = document.getElementById('ninjaCat_attack');

let fox_attack = document.getElementById('fox_attack');
let fox_jump = document.getElementById('fox_jump');

let polarIcon = document.getElementById('polarIcon');
let kyuubiIcon = document.getElementById('kyuubiIcon');
let foxIcon = document.getElementById('foxIcon');


let petData = [
    {
        name: 'Polar',
        icon:   polarIcon,
        imageArray: [{
            image: polar_walk,
            width: 36,
            length: 3,
            height: 100
        },
         {
            image: polar_hunt,
             width: 44,
             length: 2,
             height:100
         }
                    ],
        power: 10,
        accuracy: .9,
        renderDetail: false,
        selected: false,
        speed: 2,
        detailImage: polar_hunt,
         detailImagePosX: 633,
        detailImagePosY: 76,
        detailImageSizeX: 290,
        detailImageSizeY: 60


    },

    {
        name: 'Kyuubi',
        icon: kyuubiIcon,
        imageArray: [{
            image: ninjaCat_stand,
            width: 92,
            length: 4,
            height: 85
        },{
            image: ninjaCat_attack,
            width: 92,
            length: 4,
            height: 85
        }
                    ],
        power: 10,
        accuracy: .9,
        renderDetail: false,
        selected: false,
        speed:1.2,
        detailImage: ninjaCat_attack,
         detailImagePosX: 633,
        detailImagePosY: 76,
        detailImageSizeX: 290,
        detailImageSizeY: 60


    },
    {
        name: 'Nine Tails',
        icon: foxIcon,
        imageArray: [{
            image: fox_attack,
            width: 305,
            length: 2,
            height: 219
        },{
            image: fox_jump,
            width: 305,
            length: 2,
            height: 219
        }
                    ],
        power: 10,
        accuracy: .9,
        renderDetail: false,
        selected: false,
        speed:1.2,
        detailImage: fox_jump,
         detailImagePosX: 633,
        detailImagePosY: 76,
        detailImageSizeX: 290,
        detailImageSizeY: 60


    }
]

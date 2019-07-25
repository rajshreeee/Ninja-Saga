let polar_walk = document.getElementById('polar_walk');
let polar_hunt = document.getElementById('polar_hunt');

let ninjaCat_stand = document.getElementById('ninjaCat_stand');
let ninjaCat_attack = document.getElementById('ninjaCat_attack');

let fox_attack = document.getElementById('fox_attack');
let fox_jump = document.getElementById('fox_jump');

let polarIcon = document.getElementById('polarIcon');
let kyuubiIcon = document.getElementById('kyuubiIcon');
let foxIcon = document.getElementById('foxIcon');

let imageLoaded = new ImageLoader();


let petData = [
    {
        name: 'Polar',
        icon: polarIcon,
        imageArray: [{
                image: polar_walk,
                width: 36,
                length: 3,
                height: 100
        },
            {
                image: polar_hunt,
                width: 46,
                length: 2,
                height: 100
         }
                    ],
        power: 10,
        accuracy: .99,
        renderDetail: false,
        selected: false,
        speed: 2,
        detailImage: polar_hunt,
        detailImagePosX: 680,
        detailImagePosY: 106


    },

    {
        name: 'Kyuubi',
        icon: kyuubiIcon,
        imageArray: [{
                image: imageLoaded.images.kyuubi_walk,
                width: 36,
                length: 3,
                height: 100
        }, {
                image: imageLoaded.images.kyuubi_attack,
                width: 46,
                length: 2,
                height: 100
        }
                    ],
        power: 15,
        accuracy: .85,
        renderDetail: false,
        selected: false,
        speed: 1.2,
        detailImage: imageLoaded.images.kyuubi_attack,
        detailImagePosX: 680,
        detailImagePosY: 106

    },
    {
        name: 'Nine Tails',
        icon: foxIcon,
        imageArray: [{
                image: fox_jump,
                width: 36,
                length: 3,
                height: 100
        }, {
                image: fox_attack,
                width: 46,
                length: 2,
                height: 100
        }
                    ],
        power: 20,
        accuracy: .8,
        renderDetail: false,
        selected: false,
        speed: 1.2,
        detailImage: fox_attack,
        detailImagePosX: 680,
        detailImagePosY: 106


    }
]

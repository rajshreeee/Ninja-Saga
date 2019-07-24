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

/*load_images = [{
    identifier: "ninjaCat_attack",
    source: "../img"
},{},{}]*/

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
        accuracy: .9,
        renderDetail: false,
        selected: false,
        speed: 2,
        detailImage: polar_hunt,
        detailImagePosX: 633,
        detailImagePosY: 76


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
        power: 10,
        accuracy: .9,
        renderDetail: false,
        selected: false,
        speed: 1.2,
        detailImage: imageLoaded.images.kyuubi_attack,
        detailImagePosX: 633,
        detailImagePosY: 76



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
        power: 10,
        accuracy: .9,
        renderDetail: false,
        selected: false,
        speed: 1.2,
        detailImage: fox_attack,
        detailImagePosX: 633,
        detailImagePosY: 76


    }
]

/*fillpetdata(imageloader){
    
}*/

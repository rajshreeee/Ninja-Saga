let polar_walk = document.getElementById('polar_walk');
let polar_hunt = document.getElementById('polar_hunt');

let petData = [
    {
        name: 'polar',
        imageArray: [{
            image: polar_walk,
            width: 36,
            length: 3
        },
         {
            image: polar_hunt,
             width: 44,
             length: 2
         }
                    ],
        power: 10,
        accuracy: .9,
        renderDetail: false,
        selected: false,
        speed: 2,
        detailImage: polar_walk,
         detailImagePosX: 613,
        detailImagePosY: 76


    },

    {
        name: 'polar2',
        imageArray: [{
            image: polar_walk,
            width: 36,
            length: 3
        }],
        power: 10,
        accuracy: .9,
        renderDetail: false,
        selected: false,
        speed:1.2,
        detailImage: polar_walk,
         detailImagePosX: 613,
        detailImagePosY: 76


    }
]

import SwipeCarousel from './carousel-costructor.js'
const carosuel = new SwipeCarousel({   //создаем обтект
    //containerID: '#myslider', 
    slideID: '.item',
    interval: 2000,
    isPlaying: false
 })


carosuel.initApp();


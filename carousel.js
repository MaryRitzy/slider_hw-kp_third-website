function Carousel() {
   
this.container = document.querySelector('#carousel');
this.slides = this.container.querySelectorAll('.slide');
this.indicatorsContainer = this.container.querySelector('#indicators-container');
this.indicatorItems = this.container.querySelectorAll('.indicator');
this.pauseBtn = this.container.querySelector('#pause-btn');
this.prevBtn = this.container.querySelector('#prev-btn');
this.nextBtn = this.container.querySelector('#next-btn');

this.CODE_ARROW_LEFT = 'ArrowLeft';
this.CODE_ARROW_RIGHT = 'ArrowRight';
this.CODE_SPACE = 'Space';
this.SLIDES_COUNT = this.slides.length;

this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
this.FA_PLAY = '<i class="fas fa-play-circle"></i>';

this.currentSlide = 0;
this.timerID = null;
this.isPlaying = true;
this.interval = 2000;
this.startPosX = null;
this.endPosX = null;
}

Carousel.prototype = {
   _gotoNth(n) {
         this.slides[this.currentSlide].classList.toggle('active');
         this.indicatorItems[this.currentSlide].classList.toggle('active');
         this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
         this.slides[this.currentSlide].classList.toggle('active');
         this.indicatorItems[this.currentSlide].classList.toggle('active');
      },
      
      _gotoPrev() {
         this._gotoNth(this.currentSlide - 1);
      },
      
      _gotoNext() {
         this._gotoNth(this.currentSlide + 1);
      },

      _tick() {
         this.timerID = setInterval(this._gotoNext.bind(this), this.interval);
         /*2 вариант - стрелочная ф - this.timerID = setInterval(() => this._gotoNext(), this.interval) */
      },

      _play() {
         this.pauseBtn.innerHTML = this.FA_PAUSE;
         this.isPlaying = true;
         this._tick();
      },
            
      _pause() {
      this.pauseBtn.innerHTML = this.FA_PLAY;
      this.isPlaying = false;
      clearInterval(this.timerID);
      },
      
      pausePlay() {
         return this.isPlaying 
         ? this._pause() 
         : this._play();
      },
      
      prev() {
         this._pause();
         this._gotoPrev();
      },
      
      next() {
         this._pause();
         this._gotoNext();
      },
      
      _indicate(e) {
            const target = e.target;

            if(target && target.classList.contains('indicator')) {
               this._pause();
               this._gotoNth(+target.dataset.slideTo);
            }
      },
      
      _pressKey(e) {
            if(e.code === this.CODE_ARROW_LEFT) this.prev();
            if(e.code === this.CODE_ARROW_RIGHT) this.next();
            if(e.code === this.CODE_SPACE) this.pausePlay();
      },
      
     _swipeStart(e) {
         this.startPosX = e instanceof MouseEvent 
         ? e.pageX 
         : e.changedTouches[0].pageX;
      },
      
      _swipeEnd(e) {
         this.endPosX = e instanceof MouseEvent 
         ? e.pageX 
         : e.changedTouches[0].pageX;

         if (this.endPosX - this.startPosX > 100) this.prev();
         if (this.endPosX - this.startPosX < -100) this.next();
      },
      
      
      _initListerners() {
      this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
      this.prevBtn.addEventListener('click', this.prev.bind(this));
      this.nextBtn.addEventListener('click', this.next.bind(this));
      this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
      
      this.container.addEventListener('touchstart', this._swipeStart.bind(this));
      this.container.addEventListener('mousedown', this._swipeStart.bind(this));
      this.container.addEventListener('mouseup', this._swipeEnd.bind(this));
      this.container.addEventListener('touchend', this._swipeEnd.bind(this));
      document.addEventListener('keydown', this._pressKey.bind(this));
      },
      
      initApp() {
         this._initListerners();
         this._tick();
      }
      
      
};

Carousel.prototype.constructor = Carousel;
const carosuel = new Carousel();
carosuel.initApp();

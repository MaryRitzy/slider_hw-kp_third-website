class Carousel {
constructor(containerID = '#carousel', slideID = '.slide', interval = 2000) {    
   this.container = document.querySelector(containerID); 
   this.slides = this.container.querySelectorAll(slideID);
   this.interval = interval;
   }
   
   _initProps() {

      this.currentSlide = 0;
      this.isPlaying = true;

      this.SLIDES_COUNT = this.slides.length;
      this.CODE_ARROW_LEFT = "ArrowLeft";
      this.CODE_ARROW_RIGHT = "ArrowRight";
      this.CODE_SPACE = "Space";

      this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
      this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
      this.FA_PREV = '<i class="fas fa-angle-left"></i>';
      this.FA_NEXT = '<i class="fas fa-angle-right"></i>';

   }


   _initControls() {
      const controls = document.createElement('div');
      const PAUSE = `<div id="pause-btn" class="control control-pause">${this.FA_PAUSE}</div>`;
      const PREV = `<div id="prev-btn" class="control control-prev">${this.FA_PREV}</div>`;
      const NEXT = `<div id="next-btn" class="control control-next">${this.FA_NEXT}</div>`;

      controls.setAttribute('id', 'controls-container');
      controls.setAttribute('class', 'controls');
      controls.innerHTML = PAUSE + PREV + NEXT;

      this.container.append(controls);  /* метод для добавления div id="controls-container" class="controls, обертка*/

      this.pauseBtn = this.container.querySelector("#pause-btn");
      this.prevBtn = this.container.querySelector("#prev-btn");
      this.nextBtn = this.container.querySelector("#next-btn");
    
   }

   _initIndicators() {
      const indicators = document.createElement('div');

      indicators.setAttribute('id', 'indicators-container'); // создаем атрибуты
      indicators.setAttribute('class', 'indicators');  

      for (let i = 0; i < this.SLIDES_COUNT; i++) {
         const indicator = document.createElement('div');
         indicator.setAttribute('class', i !== 0 ? 'indicator' : 'indicator active'); //создаем класс
         //indicator.dataset.slideTo = i; тоже самое
         indicator.dataset.slideTo = `${i}`;//конвертация в строку
         indicator.innerHTML = `${i + 1}`; //если нужен текст внутри индикатора
         indicators.append(indicator);
      }

      this.container.append(indicators);
      this.indicatorsContainer = this.container.querySelector('#indicators-container');
      this.indicatorItems = this.container.querySelectorAll('.indicator');
   }

   _initListerners() {
      this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
      this.prevBtn.addEventListener('click', this.prev.bind(this));
      this.nextBtn.addEventListener('click', this.next.bind(this));
      this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));

      document.addEventListener('keydown', this._pressKey.bind(this));
   }

   _gotoNth(n) {
      this.slides[this.currentSlide].classList.toggle('active');
      this.indicatorItems[this.currentSlide].classList.toggle('active');
      this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
      this.slides[this.currentSlide].classList.toggle('active');
      this.indicatorItems[this.currentSlide].classList.toggle('active');
   }

   _gotoPrev() {
      this._gotoNth(this.currentSlide - 1);
   }

   _gotoNext() {
      this._gotoNth(this.currentSlide + 1);
   }

   _tick() {
      this.timerID = setInterval(this._gotoNext.bind(this), this.interval);
      /*2 вариант - стрелочная ф - this.timerID = setInterval(() => this._gotoNext(), this.interval) */
   }

   _play() {
      this.pauseBtn.innerHTML = this.FA_PAUSE;
      this.isPlaying = true;
      this._tick();
   }

   _pause() {
      this.pauseBtn.innerHTML = this.FA_PLAY;
      this.isPlaying = false;
      clearInterval(this.timerID);
   }

   pausePlay() {
      return this.isPlaying
         ? this._pause()
         : this._play();
   }

   prev() {
      this._pause();
      this._gotoPrev();
   }

   next() {
      this._pause();
      this._gotoNext();
   }

   _indicate(e) {
      const target = e.target;

      if (target && target.classList.contains('indicator')) {
         this._pause();
         this._gotoNth(+target.dataset.slideTo);
      }
   }

   _pressKey(e) {
      if (e.code === this.CODE_ARROW_LEFT) this.prev();
      if (e.code === this.CODE_ARROW_RIGHT) this.next();
      if (e.code === this.CODE_SPACE) this.pausePlay();
   }

   initApp() {
      this._initProps();
      this._initControls();
      this._initIndicators();
      this._initListerners();
      this._tick();
   }

}


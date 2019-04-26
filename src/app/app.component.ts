import { Component, ElementRef } from '@angular/core';
import {stagger, trigger, style, animate, AnimationBuilder, query, transition} from '@angular/animations';

function checkVisible(elm) {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

// Mouse
const mouse = {
  _x: 0,
  _y: 0,
  x: 0,
  y: 0,
  updatePosition: function(event) {
    var e = event || window.event;
    this.x = e.clientX - this._x;
    this.y = (e.clientY - this._y) * -1;
  },
  setOrigin: function(e) {
    this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
    this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
  },
  show: function() {
    return "(" + this.x + ", " + this.y + ")";
  }
};

export const postsAnimation = query('.chapter', [
  style({ transform: 'translateY(100%)', opacity: 0 }),
  stagger(200, [
  /* initial */
    style({ transform: 'translateY(100%)', opacity: 0 }),
    /* final */
    animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)', style({ transform: 'translateY(0)', opacity: 1 }))
])]);

const getAnimation = (selector, time) => {
  return query(selector, [
  style({ transform: 'translateY(100%)', opacity: 0 }),
  stagger(time, [
  /* initial */
    style({ transform: 'translateY(100%)', opacity: 0 }),
    /* final */
    animate('.6s cubic-bezier(.8, -0.6, 0.2, 1.5)', style({ transform: 'translateY(0)', opacity: 1 }))
])])
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  animations: [
    trigger('details', [
  transition(':enter', [
    /* initial */
    style({ transform: 'translateY(100%)', opacity: 0 }),
    /* final */
    animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)', style({ transform: 'translateY(0)', opacity: 1 }))
  ]),
])
  ]
})
export class AppComponent  {
  name = 'Angular';
  animated = {};
  animatedDetails;
  animation = {
    '.chapters .book-cover img': {
      tag: '.chapter',
      duration: 250},
    '.recommendations .container': {
      tag: '.recommendations .container .flex-1'},
    '.benefits .anim': {
      tag: '.benefit'},
    '.topics': {
      tag: '.topics .flex-1', duration: 150},
    '.justify-content-center': {
      tag: '.justify-content-center img',
      duration: 50},
      '.author': {
        tag: '.author .author-animation',
        duration: 250
      }
  }
  inner;
  selectedChapter: any = {};

  counter = 0;
  updateRate = 10;
  isTimeToUpdate = () => {
    return this.counter++ % this.updateRate === 0;
  };
  startingStyle;

  update = function(event) {
    mouse.updatePosition(event);
    this.updateTransformStyle(
      (mouse.y / this.inner.offsetHeight / 2).toFixed(2),
      (mouse.x / this.inner.offsetWidth / 2).toFixed(2)
    );
  };

  updateTransformStyle = function(x, y) {
    var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    this.inner.style.transform = style;
    this.inner.style.webkitTransform = style;
    this.inner.style.mozTransform = style;
    this.inner.style.msTransform = style;
    this.inner.style.oTransform = style;
  };

  onMouseEnterHandler = function(event) {
    this.update(event);
  };

  onMouseLeaveHandler = function() {
    this.inner.style = "";
  };

  onMouseMoveHandler = function(event) {
    if (this.isTimeToUpdate()) {
      this.update(event);
    }
  };

  chapters = [{
    title: 'Setting up Development Environment'
  }, {
    title: 'Building a Flashcard game using Angular'
  }, {
    title: 'Building a Personal SPA blog using Angular Router and Wordpress'
  }, {
    title: 'Building an Inventory application using Reactive Forms'
  }, {
    title: 'Building a PWA Survey Application using Angular Service Worker'
  }, {
    title: 'Building an Auditing application using Angular and Ionic'
  }, {
    title: 'Server Side Rendering our Personal SPA Blog using Angular Universal'
  }, {
    title: 'Building an enterprise portal using Nx, NgRx and Redux'
  }, {
    title: 'Building cross-platform image processing app using NativeScript and Firebase MLkit'
  }, {
    title: 'Building a Component library using Angular CLI and CDK'
  }, {
    title: 'Testing Angular Application using Jasmine and Jest'
  }];

  topics = [{
    id: 1,
    logo: 'https://angular.io/assets/images/logos/angular/angular.png',
    title: 'Angular'
  }, {
    id: 2,
    logo: 'https://angular.io/generated/images/marketing/concept-icons/animations.png',
    title: 'Animations',
    desc: 'Angular provides Angular Animation package which lets you animate pages, repeated content and conditional content'
  }, {
    id: 3,
    logo: 'https://angular.io/generated/images/marketing/concept-icons/augury.png',
    title: 'Augury'
  }, {
    id: 4,
    logo: 'https://angular.io/generated/images/marketing/concept-icons/cdk.png',
    title: 'CDK'
  }, {
    id: 5,
    logo: 'https://angular.io/generated/images/marketing/concept-icons/cli.svg',
    title: 'CLI'
  }, {
    id: 6,
    logo: 'https://angular.io/generated/images/marketing/concept-icons/forms.png',
    title: 'Forms'
  }, {
    id: 7,
    logo: 'https://angular.io/generated/images/marketing/concept-icons/http.png',
    title: 'HTTP'
  }, {
    id: 8,
    logo: 'https://angular.io/generated/images/marketing/concept-icons/language-services.png',
    title: 'Language Services'
  }, {
    id: 9,
    logo: 'https://angular.io/generated/images/marketing/concept-icons/material.png',
    title: 'Material'
  }, {
    id: 10,
    logo: 'https://angular.io/generated/images/marketing/concept-icons/router.png',
    title: 'Router'
  }, {
    id: 11,
    logo: 'https://angular.io/generated/images/marketing/concept-icons/universal.png',
    title: 'Universal'
  }, {
    id: 12,
    logo: 'https://raw.githubusercontent.com/formly-js/angular-formly/master/other/logo/angular-formly-logo-64px.png',
    title: 'Formly'
  }, {
    id: 13,
    logo: 'https://clarity.design/clarity-logo.3eb8bfa14838aba69688.svg',
    title: 'Clarity Design'
  }, {
    id: 14,
    logo: 'https://avatars1.githubusercontent.com/u/19691026?s=200&v=4',
    title: 'Momentum Design'
  }, {
    id: 15,
    logo: "https://angularconsole.com/assets/img/logo@2x.png",
    title: "Angular Console"
  }, {
    id: 16,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Visual_Studio_Code_1.18_icon.svg/1200px-Visual_Studio_Code_1.18_icon.svg.png",
    title: "VSCode"
  }, {
    id: 17,
    logo: 'https://assets.zeit.co/image/upload/front/assets/design/now-black.svg',
    title: 'Zeit Now'
  }, {
    id: 18,
    logo: "https://docs.humio.com/integrations/auth0.svg",
    title: "Auth 0"
  }, {
    id: 19,
    logo: 'https://png.pngtree.com/svg/20170719/ionic_1307248.png',
    title: "Ionic"
  }, {
    id: 20,
    logo: 'https://avatars0.githubusercontent.com/u/16272733?s=200&v=4',
    title: 'NGRX'
  }, {
    id: 21,
    logo: 'https://images.ctfassets.net/8eyogtwep6d2/6qoOl00vRYyoEk4MI4ae0w/a0bd92966fb8737db6da63ea0afc4646/nx-logo.png',
    title: 'NX'
  }, {
    id: 22,
    logo: 'https://cdn-images-1.medium.com/max/272/1*YVyVa_5CAC_CkhrmgNS2Eg.png',
    title: 'NativeScript'
  }, {
    id: 23,
    logo: 'https://rxjs-dev.firebaseapp.com/generated/images/marketing/home/Rx_Logo-512-512.png',
    title: 'RXJS'
  }, {
    id: 24,
    logo: 'https://avatars1.githubusercontent.com/u/24717852?s=200&v=4',
    title: 'ngx-translate'
  }, {
    id: 25,
    logo: 'https://firebase.google.com/downloads/brand-guidelines/SVG/logo-logomark.svg',
    title: 'Firebase'
  }, {
    id: 26,
    logo: 'https://avatars1.githubusercontent.com/u/24717852?s=200&v=4',
    title: 'ngx-seo'
  }, {
    id: 27,
    logo: 'https://angular.io/generated/images/marketing/concept-icons/pwa.svg',
    title: 'PWA'
  }, {
    id: 28,
    logo: 'https://angular.io/generated/images/marketing/concept-icons/karma.svg',
    title: 'Karma'
  }, {
    id: 29,
    logo: 'https://angular.io/generated/images/marketing/concept-icons/protractor.svg',
    title: 'Protractor'
  }, {
    id: 30,
    logo: 'https://angular.io/generated/images/marketing/concept-icons/components.svg',
    title: 'Element'
  }, {
    id: 31,
    logo: 'https://camo.githubusercontent.com/b5639de5cfa97c51598b60b13a1061498afe2acb/68747470733a2f2f64337676366c703535716a6171632e636c6f756466726f6e742e6e65742f6974656d732f3244324b343533313278304d31713243306133502f6a6573742d6c6f676f2e737667',
    title: 'Jest'
  }, {
    id: 31,
    title: 'Bundle Analyzers'
  }]

  constructor(private el: ElementRef, private animationBuilder: AnimationBuilder) {

  }

  ngOnInit() {

    window.addEventListener('scroll', this.scrollEvent, true);
    const colors = ['#e7692c','#df002a','#112b39'];
var blobs = document.querySelectorAll("#background path");

blobs.forEach((blob: any) => {
    blob.style.fill = colors[Math.floor(Math.random() * colors.length)];
});
  }

  ngAfterViewInit() {
    this.scrollEvent()
    this.inner = this.el.nativeElement.querySelector(".book-cover img");
    const container = this.el.nativeElement.querySelector('.book-cover');
    mouse.setOrigin(container);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollEvent, true);
  }

  buildAnimation(selector, time = 500) {
    return this.animationBuilder.build([
      getAnimation(selector, time)
    ])
  }

  toFullScreen(e: any, chapter) {
    const chapterIndex = this.chapters.indexOf(chapter);
    this.selectedChapter = chapter;
    this.selectedChapter.index = chapterIndex + 1;
    const rect = document.querySelector(`.chapter${chapterIndex}`).getBoundingClientRect();
    console.log(e.target.getBoundingClientRect());
    const details = document.querySelector('.details');
    details.classList.add('animating');
    this.startingStyle = { top: `${rect.top}px`, left: `${rect.left}px`, width: `${rect.width}px`, height: `${rect.height}px` };
    document.querySelector('body').style.overflow = 'hidden';

    const animation = this.animationBuilder.build([
      query('.details', [
        style(this.startingStyle),
        animate('.6s cubic-bezier(0.25, 0.8, 0.25, 1)', style({ top: 0, width: '100vw', height: '100vh', left: 0, borderRadius: 0 }))
      ])
    ])
      this.animatedDetails = true;

    setTimeout(() => {
      details.classList.add('animated');
    }, 600)

    animation.create(this.el.nativeElement).play();
  }

  closeDetails() {
    const details = document.querySelector('.details');

    const animation = this.animationBuilder.build([
      query('.details', [
        style({ top: 0, width: '100vw', height: '100vh', left: 0, borderRadius: 0 }),
        animate('.6s ease', style({...this.startingStyle, borderRadius: '6px'}))
      ])
    ])
    details.classList.remove('animated');
    this.animatedDetails = false;

    setTimeout(() => {
      details.classList.remove('animating');
      document.querySelector('body').style.overflow = 'auto';
    }, 600);

    animation.create(this.el.nativeElement).play();
  }

  scrollEvent = (): void => {
    Object.keys(this.animation).forEach((key)=> {
      const isVisible = checkVisible(this.el.nativeElement.querySelector(key));
      if (isVisible && !this.animated[key]) {
        this.animated[key]= true;
        const animation = this.buildAnimation(this.animation[key].tag, this.animation[key].duration);
        animation.create(this.el.nativeElement).play();
      }
    })
  }
}

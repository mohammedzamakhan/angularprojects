// import { Directive, ElementRef, Renderer2, Input, NgZone, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';

// declare var require: any;

// /**
//  * Angular Lazy Loading Images Directive
//  *
//  * The library allows to lazy load images from your web application
//  * using the MutationObserver and the IntersectionObserver. Images will be loaded as
//  * soon as they enter the viewport in a non-blocking way.
//  */
// @Directive({
//   selector: '[appLazyLoadImage]'
// })
// export class LazyLoadImageDirective implements OnInit, OnDestroy {

//   @Input() appLazyLoadImage: Object;

//   intersectionObserver: IntersectionObserver;
//   rootElement: HTMLElement;

//   constructor(
//     element: ElementRef,
//     public renderer: Renderer2,
//     public ngZone: NgZone,
//     @Inject(PLATFORM_ID) private platformId: any) {
//     this.rootElement = element.nativeElement;
//   }

//   init() {
//     this.registerIntersectionObserver();

//     this.observeDOMChanges(this.rootElement, () => {
//       const imagesFoundInDOM = this.getAllImagesToLazyLoad(this.rootElement);
//       imagesFoundInDOM.forEach((image: HTMLElement) => this.intersectionObserver.observe(image));
//     });
//   }

//   ngOnInit() {
//     if (!this.isBrowser()) {
//       return;
//     }

//     require('intersection-observer');
//     this.ngZone.runOutsideAngular(() => this.init());
//   }

//   ngOnDestroy() {
//     if (this.intersectionObserver) {
//       this.intersectionObserver.disconnect();
//     }
//   }

//   isBrowser(): boolean {
//     return isPlatformBrowser(this.platformId);
//   }

//   registerIntersectionObserver() {
//     this.intersectionObserver = new IntersectionObserver(
//       images => images.forEach(image => this.onIntersectionChange(image)),
//     );

//     return this.intersectionObserver;
//   }

//   observeDOMChanges(rootElement: HTMLElement, onChange: any) {
//     // Create a Mutation Observer instance
//     const observer = new MutationObserver(mutations => onChange(mutations));

//     // Observer Configuration
//     const observerConfig = {
//       attributes: true,
//       characterData: true,
//       childList: true,
//       subtree: true
//     };

//     // Observe Directive DOM Node
//     observer.observe(rootElement, observerConfig);

//     // Fire onChange callback to check current DOM nodes
//     onChange();

//     return observer;
//   }

//   getAllImagesToLazyLoad(pageNode: HTMLElement) {
//     return Array.from(pageNode.querySelectorAll('img[data-src], [data-srcset], [data-background-src]'));
//   }

//   onIntersectionChange(image: any) {
//     if (!image.isIntersecting) {
//       return;
//     }

//     this.onImageAppearsInViewport(image.target);
//   }

//   onImageAppearsInViewport(image: any) {
//     if (image.dataset.src) {
//       this.renderer.setAttribute(image, 'src', image.dataset.src);
//       this.renderer.removeAttribute(image, 'data-src');
//     }

//     if (image.dataset.srcset) {
//       this.renderer.setAttribute(image, 'srcset', image.dataset.srcset);
//       this.renderer.removeAttribute(image, 'data-srcset');
//     }

//     if (image.dataset.backgroundSrc) {
//       this.renderer.setStyle(image, 'background-image', `url(${image.dataset.backgroundSrc})`);
//       this.renderer.removeAttribute(image, 'data-background-src');
//     }

//     // Stop observing the current target
//     if (this.intersectionObserver) {
//       this.intersectionObserver.unobserve(image);
//     }
//   }
// }

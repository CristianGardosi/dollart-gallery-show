// !LAYOUT

let controller;
let slideScene;
let pageScene;

function animateSlides() {
    // Inizializzazione controller
    controller = new ScrollMagic.Controller()
    // Selezione elementi DOM necessari per l'animazione
    const slides = document.querySelectorAll('.slide');
    const header = document.querySelector('header');
    // Looppo sopra ognuna delle tre slides
    slides.forEach( (slide, index) => {
        // Reveal-image e reveal-text sono le due div che inizialmente 'coprono' l'img e il testo delle section
        const revealImage = slide.querySelector('.reveal-image');
        const img = slide.querySelector('img');
        const revealText = slide.querySelector('.reveal-text');
        // Chiamata a GSAP
        // Sintassi per un'animazione singola: l'animazione gsap verrà applicata alla const revealImage (primo parametro), con un tempo di un secondo (secondo parametro) e consiste nello spostamento sull'asse x del 100% fino ad andare fuori dallo schermo a dx (terzo parametro, che è sotto forma di oggetto perchè può contenere molteplici parametri come opacity ecc ecc)

        // gsap.to(revealImage, 1, { x: '100%' });

        // Sintassi per concatenare molteplici animazioni: creo una timeline e ne setto i valori iniziali di default (tempi e tipologia di ease di animazione) dopodichè procedo ad applicare con .fromTo l'animazione al mio oggetto specificato nel primo parametro, da dove deve partire e dove deve concludersi 
        const slideTimeline = gsap.timeline({
            defaults: { duration: 1, ease: 'power2.inOut' }
        });
        slideTimeline.fromTo(revealImage, { x: '0%' }, { x: '100%' });
        slideTimeline.fromTo(img, { scale: 1.5 }, { scale: 1 }, "-=.5");
        slideTimeline.fromTo(revealText, { x: '0%' }, { x: '100%'}, '-=1');
        slideTimeline.fromTo(header, { y: '-150%' }, { y: '0%'}, '-=.5');
        // Creo una SCENE per applicare le animazioni agli elementi in concomitanza dello scroll su di essi (slideScene è stata inizializzata ad inizio documento). 
        slideScene = new ScrollMagic.Scene({
            //Gli elementi 'triggerati' presi come punto di partenza dell'aniamazione sono le tre slide
            triggerElement: slide,
            triggerHook: 0.25,
            reverse: false
        })
        // l'animazione è ovviamente quella settata in precedenza
        .setTween(slideTimeline)
        .addTo(controller);
        // Nuova animazione riferita all'intera pagina di dissolvenza delle slide al passaggio alla successiva (OPZIONALE)
        const pageTimeline = gsap.timeline();
        // Variabile che mi assicura il caricamento di ogni slide e del relativo testo anche a fronte di uno scrolling molto veloce
        let nextSlide = slides.lenght - 1 === index ? 'end' : slides[index + 1]
        pageTimeline.fromTo(nextSlide, {y: '0%'}, {y: '20%'})
        // Dettagli animazione
        pageTimeline.fromTo(slide, {opacity: 1, scale: 1}, {opacity: 0, scale: .5});
        pageTimeline.fromTo(nextSlide, {y: '20%'}, {y: '0%'}, '-=.5')
        // Nuova scena per la pagina
        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            // La durata sarà = all'intera altezza della slide
            duration: '100%',
            triggerHook: 0
        })
        // Pin è il settaggio che permette questo particolare effetto, un trucco che permette la riuscita dell'effetto
        .setPin(slide, {pushFollowers: false})
        .setTween(pageTimeline)
        .addTo(controller)
    });
}
// Invocazione funzione aniamazione pagina/slides
animateSlides();



// !CURSOR
// Animazione di hover sul bottone delle slides (colorazione testo)
function activeCursor(event) {
    const item = event.target;
    if ( item.classList.contains('explore') ) {
        gsap.to('.title-swipe', 1, { y: '0%' })
    }
    else {
        gsap.to('.title-swipe', 1, { y : '100%' })
    }
}
window.addEventListener('mouseover', activeCursor)



// !GALLERY SLIDES ANIMATION
function galleryAnimation() {
    controller = new ScrollMagic.Controller();
    const slides = document.querySelectorAll('.detail')

    slides.forEach( (slide, index, slides) => {
        const slideTimeline = gsap.timeline({defaults: {duration:1}})
        let nextSlide = slides.length - 1 === index ? 'end' : slides[index + 1];
        const title = nextSlide.querySelector('h1')
        slideTimeline.fromTo(slide, {opacity: 1}, {opacity: 0});
        slideTimeline.fromTo(nextSlide, {opacity: 0}, {opacity: 1}, '-=1');
        slideTimeline.fromTo(title, {y: '50%'}, {y: '0%'});
        // Scena
        detailScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: '100%',
            triggerHook: 0
        })
        .setPin(slide, {pushFollowers: false})
        .setTween(slideTimeline)
        .addTo(controller)
    });
}

galleryAnimation()



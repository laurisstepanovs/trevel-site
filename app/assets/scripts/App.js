import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu.js';
import RevealOnScroll from './modules/RevealOnScroll.js';
import StickyHeader from './modules/StickyHeader.js';
import Modal from './modules/Modal';


new StickyHeader();

new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);

new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);

new MobileMenu();

let modal

document.querySelectorAll(".open-modal").forEach(el => {
    el.addEventListener("click", e => {
        e.preventDefault()
        if (typeof modal == "undefined"){
            import (/* webpackChuckName: "modal" */'./modules/Modal.js').then( x => {
                modal = new x.default()
                setTimeout(() => modal.openTheModal(), 20)
            }).catch(() => console.log("There was a problem."))
        }  else {
            modal.openTheModal()
        }
    })
})

if (module.hot) {
    module.hot.accept();
}

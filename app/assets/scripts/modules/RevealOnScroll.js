import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class RevealOnScroll{
    constructor(els, threholdProcents){
        this.threholdProcents = threholdProcents;
        this.itemToReveal = els
        this.browserHeight = window.innerHeight
        this.hideInitially()
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this)
        this.events()
    }

    events(){
        window.addEventListener("scroll", this.scrollThrottle)
        window.addEventListener("resize", debounce(()=> {
            this.browserHeight = window.innerHeight
        }, 333))
    }

    calcCaller(){
        this.itemToReveal.forEach(el => {
            if (el.isRevealed == false){
                this.calculateIfScrollTo(el);
            }
        });
    }

    calculateIfScrollTo(el){
        if (window.scrollY + this.browserHeight > el.offsetTop){
            let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight)*100
            if (scrollPercent<this.threholdProcents){
                el.classList.add("reveal-item--is-visible")
                el.isRevealed = true
                if (el.isLastItem){
                    window.removeEventListener("scroll", this.scrollThrottle);
                }
            }
        }
    }

    hideInitially(){
        this.itemToReveal.forEach(el => {
            el.classList.add("reveal-item")
            el.isRevealed = false
        })
        this.itemToReveal[this.itemToReveal.length-1].isLastItem=true
    }
}

export default RevealOnScroll
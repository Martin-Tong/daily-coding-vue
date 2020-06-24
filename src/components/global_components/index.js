/* let contents = {}
let context = require.context('.', false, /\.vue$/i) //eslint-disable-line
context.keys.forEach(element => {
    context(element).then(x => {
        contents[element] = x.default
    })
}); */

import Carousel from './Carousel.vue'
import CarouselItem from './CarouselItem.vue'
import CustomUpload from './CustomUpload.vue'
import SideWidge from './SideWidge.vue'

export {Carousel}
export {CarouselItem}
export {CustomUpload}
export {SideWidge}

export default {Carousel, CarouselItem, CustomUpload, SideWidge}

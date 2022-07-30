import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import slider1 from '../assets/slider1.webp'
import slider2 from '../assets/slider2.jpg'
import slider3 from '../assets/slider3.jpg'
import slider4 from '../assets/slider4.jpg'

const Slider = () => {
  return (
    <Carousel autoPlay showIndicators={false} showArrows={false} showStatus={false} infiniteLoop showThumbs={false}>
      <div>
        <img src={slider1} className="h-[320px] lg:h-[600px] object-cover object-top" />
      </div>
      <div>
        <img src={slider2} className="h-[320px] lg:h-[600px] object-cover object-top" />
      </div>
      <div>
        <img src={slider3} className="h-[320px] lg:h-[600px] object-cover object-top" />
      </div>
      <div>
        <img src={slider4} className="h-[320px] lg:h-[600px] object-cover object-top" />
      </div>
    </Carousel>
  )
}

export default Slider

import "./Main.scss";
import {React, useState, useContext, useEffect, useRef} from "react";
import {BackgroundMainVideo, Music, test3, CloseSvg, hoodieV, hoodieV2, hoodieV3, hoodieV4} from "../../../images";
import {GlichBtn, PixelInput, ItemModule} from "../../layout/index"
import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};




const bgAnimation = {
  open: { y: "250%" },
  closed: { y: "-200%" },
};




const Main = () => {

  const vidRef = useRef(null);
  const handlePlayVideo = () => {
    setPlayVideo(!playVideo);
    playVideo ? vidRef.current.play() : vidRef.current.pause()
  }
  const handlePlayAudio = () => {
    toggle();
    vidRef.current.pause()
    setIsOpen(true);
  }

  const [isOpen, setIsOpen] = useState(false);
  const [playVideo, setPlayVideo] = useState(true);

  const [playing, toggle] = useAudio(Music);




  return (
    <section className="Full">
      <motion.section className='HoodieSwaper'
              animate={isOpen ? "open" : "closed"}
              variants={bgAnimation}
              transition={{ duration: 2 }}>        

        <motion.img src={hoodieV} alt="" 
                        drag
                        dragConstraints={{
                          top: -250,
                          left: -250,
                          right: 250,
                          bottom: 250,
                        }}
                transition={{
                  default: { duration:1 },
                  type: "spring",}}/>
       <motion.img src={hoodieV3} alt="" 
                        drag
                        dragConstraints={{
                          top: -250,
                          left: -250,
                          right: 250,
                          bottom: 250,
                        }}
                transition={{
                  default: { duration:1 },
                  type: "spring",}}/>
        <motion.img src={hoodieV2} alt="" 
                        drag
                        dragConstraints={{
                          top: -250,
                          left: -250,
                          right: 250,
                          bottom: 250,
                        }}
                transition={{
                  default: { duration:1 },
                  type: "spring",}}/>
        <motion.img src={hoodieV4} alt="" 
                        drag
                        dragConstraints={{
                          top: -250,
                          left: -250,
                          right: 250,
                          bottom: 250,
                        }}
                transition={{
                  default: { duration:1 },
                  type: "spring",}}/>
      </motion.section>
      <motion.section className='Main'>
          <video ref={vidRef} loop>
            <source src={BackgroundMainVideo} type="video/mp4"/>
          </video>
          {/* <div className="background-main">
            
          </div> */}
        <div className="main__label-wrapper">
          {/* <div className="main-label">
            <p>BUHALO</p>
            <p>BUHALO</p>
            <p>BUHALO</p>
            <p>BUHALO</p>
          </div> */}
                      {/* <img src={TestAbaba} alt="" /> */}
          <div className="main-label">
            <p>BUHALO</p>
          </div>
          <div className="main-menu">
            {/* <button id='press' onClick={handlePlayVideo}  class="testing">{playing ? "PAUSE" : "PLAY"}</button> */}

            <GlichBtn  onClick={handlePlayVideo}  text="Music"/>
            <GlichBtn text="Create"/>
            <GlichBtn text="Shop"/>
          </div>

        </div>
        <div className="discont-wrapper">
            <p className="discont-label">NEW DISCOUNTS</p>
            <div className="closeBtn">
              <button onClick={handlePlayAudio}><CloseSvg/></button>
            </div>
            <Swiper
              spaceBetween={300}
              centeredSlides={true} loop={true} autoplay={{delay: 5000, disableOnInteraction: false, }} speed={1600}  
              pagination={{clickable: true,}} navigation={true} modules={[Autoplay, Pagination, Navigation]} className="mySwiper">
              <SwiperSlide><ItemModule class="discont" text="Hoodie Evangelion black oversized" price={"123 UAH"} img={test3} sizes={"XS S XL L"}/></SwiperSlide>
              <SwiperSlide><ItemModule class="discont" text="Hoodie Evangelion black oversized" price={"123 UAH"} img={test3} sizes={"XS S XL L"}/></SwiperSlide>
              <SwiperSlide><ItemModule class="discont" text="Hoodie Evangelion black oversized" price={"123 UAH"} img={test3} sizes={"XS S XL L"}/></SwiperSlide>
              <SwiperSlide><ItemModule class="discont" text="abHoodie Evangelion black oversizedaba" price={"123 UAH"} img={test3} sizes={"XS S XL L"}/></SwiperSlide>
            </Swiper>
          </div>
      </motion.section>
    </section>

  )
}



export default Main;
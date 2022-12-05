import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {RemoveScrollBar} from 'react-remove-scroll-bar';


const Modal = ({
  clickedImg,
  setClickedImg,
  handelRotationRight,
  handelRotationLeft
}) => {
  const handleClick = (e) => {
    if (e.target.classList.contains("dismiss")) {
      setClickedImg(null);
    }
  };
  const close = (e) => {
      setClickedImg(null);
  };

  return (
    <>

      <div className="overlay dismiss">
        <TransformWrapper defaultScale={0.5} defaultPositionX={100} defaultPositionY={200}>
          <TransformComponent>
            <img src={clickedImg} alt="bigger pic"/>
          </TransformComponent>
        </TransformWrapper>
        
        <span className="dismiss" onClick={handleClick}>
          <div>
            <CloseIcon style={{width: '1.302vw',height: '1.563vw', background:'rgba(255, 255, 255, 0.75)'}} onClick={close}/>
          </div>
        </span>
        <div onClick={handelRotationLeft} className="overlay-arrows_left">
          <div>
            <ArrowBackIosNewIcon/>
          </div>
        </div>
        <div onClick={handelRotationRight} className="overlay-arrows_right">
          <div>
            <ArrowForwardIosIcon/>
          </div>
        </div>
        <RemoveScrollBar/>
      </div>
    </>
  );
};

export default Modal;

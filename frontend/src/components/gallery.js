import { useState, useCallback, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "../navbar";
import Gallery from "react-photo-gallery";
import axios from 'axios';
import Carousel, { Modal, ModalGateway } from "react-images";
import { photos1 } from "./photos1";
import { photos2 } from "./photos2";
import FilterBar from "./filterBar";

const GalleryComponent=()=>{
  const navigate=useNavigate();
  
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [imageData, setImageData] =useState([])
  // const imageData= useRef([])
  // console.log("Hey")
  
  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  useEffect(()=>{
    if(localStorage.getItem('jwttoken')==null || localStorage.getItem('username')==null){
        navigate('/login')
    }
  },[])
  
  return (
    <div>
      {/* // FIRST GALLERY */}
      <Navbar></Navbar>
      <FilterBar setImageData={setImageData}></FilterBar>
      <div className="mx-auto my-8 w-10/12">
        <Gallery photos={imageData} onClick={openLightbox} />
      </div>
      
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={imageData.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
            </ModalGateway>
      <div>
        <hr />
      </div>
      {/* // SECOND GALLERY */}
      {/* <Gallery photos={photos2} onClick={openLightbox} /> */}
      {/* <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos2.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway> */}
    </div>
  );
}

export default GalleryComponent;
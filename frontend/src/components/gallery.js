import React, { useState, useCallback } from "react";
import Navbar from "../navbar";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { photos1 } from "./photos1";
import { photos2 } from "./photos2";

const GalleryComponent=()=>{
    const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <div>
      {/* // FIRST GALLERY */}
      <Navbar></Navbar>
      <Gallery photos={photos1} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos1.map(x => ({
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
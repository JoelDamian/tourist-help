import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { MDBIcon } from "mdb-react-ui-kit";

const CustomCarousel = (props) => {
  const { height, images } = props;

  return (
    <div style={{ height: height, width: "100%" }}>
      <Carousel
        showArrows
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        autoPlay
        interval={2000}
        infiniteLoop
        renderArrowNext={(onClickHandler, hasPrev, label) => (
          <div
            onClick={onClickHandler}
            style={{
              position: "absolute",
              top: "50%",
              left: "16px",
              zIndex: 2,
              fontSize: "48px",
              color: "white",
              cursor: "pointer",
            }}
          >
            <MDBIcon fas icon="angle-left" size="2x" />
          </div>
        )}
        renderArrowPrev={(onClickHandler, hasPrev, label) => (
          <div
            onClick={onClickHandler}
            style={{
              position: "absolute",
              top: "50%",
              right: "16px",
              zIndex: 2,
              fontSize: "48px",
              color: "white",
              cursor: "pointer",
            }}
          >
            <MDBIcon fas icon="angle-right" size="2x" />
          </div>
        )}
      >
        {images.map((image, index) => (
          <div key={index} style={{ width: "100%", height: height }}>
            <img
              src={image}
              alt={index}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CustomCarousel;

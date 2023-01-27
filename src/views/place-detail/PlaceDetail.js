import React from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import CustomCarousel from "../custom-carousel/CustomCarousel";

const PlaceDetail = (props) => {
  const { place, setModal, open, handleclosemodal } = props;

  const handleCancelForm = () => {
    handleclosemodal();
  };

  return (
    <MDBModal show={open} setShow={setModal} tabIndex="-1">
      <MDBModalDialog size="lg">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>{place.title}</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={handleCancelForm}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <CustomCarousel height={"500px"} images={place.images} />
            <div style={{ margin: "24px" }}>
              <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                Descripcion:
              </p>
              <p style={{ fontSize: "16px" }}>{place.description}</p>
              <p style={{ fontSize: "16px", fontWeight: "bold" }}>Historia:</p>
              <p style={{ fontSize: "16px" }}>{place.history}</p>
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              onClick={() => handleCancelForm()}
              variant="contained"
              sx={{
                textTransform: "capitalize",
                backgroundColor: "#5dc1b9",
              }}
              size="large"
              color={"error"}
            >
              Cerrar
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default PlaceDetail;

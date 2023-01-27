import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { getAllPlaces, deletePlace } from "../../services/TouristSpotService";
import { deleteImage } from "../../services/ImageService";
import PlaceForm from "../place-form/PlaceForm";
import PlaceDetail from "../place-detail/PlaceDetail";

export default function Places() {
  const [placesList, setPlacesList] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedDetailPlace, setSelectedDetailPlace] = useState(null);
  const [isEditModal, setIsEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fecthPlaces();
  }, []);

  const fecthPlaces = async () => {
    let placesData;
    setIsLoading(true);
    try {
      placesData = await getAllPlaces();
    } catch (error) {
      console.error(error);
    }
    setPlacesList(placesData);
    setIsLoading(false);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  const handleclosemodal = (updatedPlace) => {
    if (updatedPlace !== undefined) {
      if (isEditModal) {
        let newPlaces = placesList.map((place) => {
          if (place.id === updatedPlace.id) {
            return updatedPlace;
          } else {
            return place;
          }
        });
        setPlacesList(newPlaces);
      } else {
        let newProjects = placesList;
        newProjects.push(updatedPlace);
        setPlacesList(placesList);
      }
    }
    setOpen(false);
    setIsLoading(false);
  };

  const enableLoadingMask = () => {
    setIsLoading(!isLoading);
  };

  const editPlace = (place) => {
    setIsEditModal(true);
    setSelectedPlace(place);
    setOpen(true);
  };

  const handleOpenModal = () => {
    setIsEditModal(false);
    setOpen(true);
  };

  const deleteImages = async (images) => {
    images.forEach(async (image) => {
      await deleteImage(image);
    });
  };

  const handleDeletePlace = (place) => {
    deleteImages(place.images);
    deletePlace(place);
    fecthPlaces();
  };

  const handleOpenDetail = (place) => {
    setSelectedDetailPlace(place);
    setOpenDetail(true);
  };

  return (
    <>
      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MDBSpinner
            role="status"
            style={{ width: "3rem", height: "3rem", color: "#5dc1b9" }}
          >
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        </div>
      ) : (
        <div>
          <MDBContainer style={{ marginTop: "40px" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <MDBBtn
                style={{
                  backgroundColor: "#5dc1b9",
                  color: "white",
                  marginBottom: "24px",
                }}
                onClick={handleOpenModal}
              >
                Agregar nuevo
              </MDBBtn>
            </div>
            <MDBTable bordered align="middle">
              <MDBTableHead
                style={{ backgroundColor: "#5dc1b9", color: "white" }}
              >
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Descripcion</th>
                  <th scope="col">Acciones</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {placesList !== undefined && (
                  <>
                    {placesList.map((place, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={place.images[0]}
                              alt=""
                              style={{ width: "45px", height: "45px" }}
                              className="rounded-circle"
                            />
                            <div className="ms-3">
                              <p className="fw-bold mb-1">{place.title}</p>
                              <p className="text-muted mb-0">
                                {place.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="fw-normal mb-1">{place.history}</p>
                        </td>
                        <td>
                          <MDBBtn
                            color="link"
                            rounded
                            size="sm"
                            onClick={() => handleOpenDetail(place)}
                          >
                            <MDBIcon fas size="2x" icon="eye" />
                          </MDBBtn>
                          <MDBBtn
                            color="link"
                            rounded
                            size="sm"
                            onClick={() => editPlace(place)}
                          >
                            <MDBIcon fas icon="pencil-alt" size="2x" />
                          </MDBBtn>
                          <MDBBtn
                            color="link"
                            rounded
                            size="sm"
                            onClick={() => handleDeletePlace(place)}
                          >
                            <MDBIcon fas icon="trash-alt" size="2x" />
                          </MDBBtn>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </MDBTableBody>
            </MDBTable>
          </MDBContainer>
          <PlaceForm
            open={open}
            handleclosemodal={handleclosemodal}
            place={selectedPlace}
            isEdit={isEditModal}
            enableLoadingMask={enableLoadingMask}
            setModal={setOpen}
          />
          {openDetail && (
            <PlaceDetail
              open={openDetail}
              place={selectedDetailPlace}
              setModal={setOpenDetail}
              handleclosemodal={handleCloseDetail}
            />
          )}
        </div>
      )}
    </>
  );
}

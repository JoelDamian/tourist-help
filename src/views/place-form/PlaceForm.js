import React, { useState, useEffect, useCallback } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { postPlace, updatePlace } from "../../services/TouristSpotService";
import { storage } from "../../config/firebase.config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const initialData = {
  title: "",
  description: "",
  history: "",
  latitude: "",
  longitude: "",
  images: [],
};

const PlaceForm = (props) => {
  const { open, handleclosemodal, isEdit, place, enableLoadingMask, setModal } =
    props;
  const [placeToCreate, setPlaceToCreate] = useState(initialData);
  const [temporalImage, setTemporalImage] = useState(null);
  const [imagesUrls, setImagesUrls] = useState([]);

  useEffect(() => {
    if (isEdit) {
      if (place === null) {
        setPlaceToCreate(initialData);
      } else {
        setPlaceToCreate(place);
      }
    } else {
      setPlaceToCreate(initialData);
    }
  }, [isEdit, place]);

  const createPlace = async (images) => {
    const newPlace = { ...placeToCreate };
    newPlace.images = images;
    const response = await postPlace(newPlace);
    setImagesUrls([]);
    setPlaceToCreate(initialData);
    newPlace.id = response.id;
    handleclosemodal(newPlace);
  };

  const handleChangeProject = (text, key) => {
    const newPlace = { ...placeToCreate };
    newPlace[key] = text.target.value;
    setPlaceToCreate(newPlace);
  };

  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };

  const handleChangeStatus = ({ meta, file }, status) => {
    if (status !== "removed") {
      if (status === "preparing") {
        setTemporalImage(file);
      }
      if (status === "done") {
        const newPlace = { ...placeToCreate };
        newPlace.images.push(file);
        setPlaceToCreate(newPlace);
        setTemporalImage(null);
      }
    } else {
      const newPlace = { ...placeToCreate };
      newPlace.images = newPlace.images.filter((img) => img.name !== file.name);
      setPlaceToCreate(newPlace);
    }
  };

  const uploadImages = async () => {
    const { images } = placeToCreate;
    let promises = [];
    images.forEach(async (img, index) => {
      const sotrageRef = ref(storage, `projectImages/${img.name}`);
      const uploadTask = uploadBytesResumable(sotrageRef, img);
      promises.push(uploadTask);
      await uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          console.error(error);
        },
        async () => {
          let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          let newImages = imagesUrls;
          newImages.push(downloadURL);
          if (index === images.length - 1) {
            createPlace(newImages);
          }
        }
      );
    });
  };

  const editProjectToDb = async () => {
    try {
      await updatePlace(placeToCreate);
    } catch (error) {
      console.error(error);
    }
    setPlaceToCreate(initialData);
    handleclosemodal(placeToCreate);
  };

  const hendleClickSubmit = async () => {
    console.log(isEdit);
    enableLoadingMask();
    if (isEdit) {
      console.log("entra edit");
      await editProjectToDb();
    } else {
      console.log("entra add");
      await uploadImages();
    }
  };

  const handleCancelForm = () => {
    setPlaceToCreate(initialData);
    handleclosemodal();
  };

  return (
    <MDBModal show={open} setShow={setModal} tabIndex="-1">
      <MDBModalDialog size="lg">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>
              {isEdit ? "Editar Lugar Turistico" : "Create Lugar Turistico"}
            </MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={handleCancelForm}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBInput
              label="Nombre"
              id="form1"
              type="text"
              style={{ width: "100%", marginBottom: "16px" }}
              value={placeToCreate.title}
              onChange={(text) => handleChangeProject(text, "title")}
            />
            <MDBTextArea
              label="Descripcion"
              id="form1"
              type="text"
              style={{ width: "100%", marginBottom: "16px" }}
              value={placeToCreate.description}
              rows={4}
              onChange={(text) => handleChangeProject(text, "description")}
            />
            <MDBTextArea
              label="Historia"
              id="form1"
              type="text"
              style={{ width: "100%", marginBottom: "16px" }}
              value={placeToCreate.history}
              rows={4}
              onChange={(text) => handleChangeProject(text, "history")}
            />
            <MDBInput
              label="Latitud"
              id="form1"
              type="text"
              style={{ width: "100%", marginBottom: "16px" }}
              value={placeToCreate.latitude}
              onChange={(text) => handleChangeProject(text, "latitude")}
            />
            <MDBInput
              label="Longitud"
              id="form1"
              type="text"
              style={{ width: "100%", marginBottom: "16px" }}
              value={placeToCreate.longitude}
              onChange={(text) => handleChangeProject(text, "longitude")}
            />
            <Dropzone
              getUploadParams={getUploadParams}
              onChangeStatus={handleChangeStatus}
              SubmitButtonComponent={null}
              accept="image/*,audio/*,video/*"
              inputContent={"Drag Project Images or click to browse"}
              styles={{
                dropzone: {
                  width: "100%",
                  height: 300,
                  backgroundColor: "white",
                },
                dropzoneActive: { borderColor: "green" },
                inputLabel: { color: "#cb9c04" },
              }}
            />
          </MDBModalBody>

          <MDBModalFooter>
            <MDBBtn
              onClick={() => handleCancelForm()}
              variant="outlined"
              sx={{
                textTransform: "capitalize",
              }}
              size="large"
              color={"error"}
            >
              Cancelar
            </MDBBtn>
            <MDBBtn
              onClick={() => hendleClickSubmit()}
              variant="contained"
              sx={{
                color: "white",
                textTransform: "capitalize",
                backgroundColor: "#5dc1b9",
              }}
              size="large"
            >
              Guardar
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default PlaceForm;

import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";

const COLLECTION_NAME = "touristSpot"

export const postPlace = async (place) => {
  return await addDoc(collection(db, COLLECTION_NAME), place);
};

export const getAllPlaces = async () => {
  const places = [];
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
  querySnapshot.forEach((doc) => {
    places.push({
      id: doc.id,
      title: doc.data().title,
      latitude: doc.data().latitude,
      longitude: doc.data().longitude,
      description: doc.data().description,
      images: doc.data().images,
      history: doc.data().history,
    });
  });
  return places;
};

export const updatePlace = async (place) => {
  const placeRef = doc(db, COLLECTION_NAME, place.id);
  return await updateDoc(placeRef, place);
}

export const deletePlace = async (place) => {
  return await deleteDoc(doc(db, COLLECTION_NAME, place.id));
}
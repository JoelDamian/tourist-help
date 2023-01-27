import { getStorage, ref, deleteObject } from "firebase/storage";

const storage = getStorage();

export const deleteImage = async (image) => {
  const desertRef = ref(storage, `projectImages/${image}`);
  return deleteObject(desertRef)
    .then(() => {
      console.log("succesfully deleted");
    })
    .catch((error) => {
      console.error(error);
    });
};

import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
} from "react-admin";
import { usePermissions } from "react-admin";
import ImagesUrlsEditField from "../tagsField/ImagesUrlsEditField";
import GifUrlEditField from "../tagsField/GifUrlEditField";

const CollectionEdit = (props) => {
  const { permissions } = usePermissions();
  return permissions === "Admin" ? (
    <Edit {...props} undoable="false" mutationMode="pessimistic">
      <SimpleForm>
        <TextInput fullWidth disabled source="id" />
        <TextInput fullWidth source="name" />
        <TextInput fullWidth source="description" />
        <ImagesUrlsEditField label="imagesUrls"/>
        <GifUrlEditField label="gif"/>
        <ImageInput multiple={true} source="pictures" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Edit>
  ) : (
    <div>No access</div>
  );
};
export default CollectionEdit;

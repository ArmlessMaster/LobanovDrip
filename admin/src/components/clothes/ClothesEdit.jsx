import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
  ArrayInput,
  SimpleFormIterator,
  NumberInput,
  SelectInput,
  required,
  ReferenceInput
} from "react-admin";
import { usePermissions } from "react-admin";
import ImagesUrlsEditField from "../tagsField/ImagesUrlsEditField";
import GifUrlEditField from "../tagsField/GifUrlEditField";

const ClothesEdit = (props) => {
  const { permissions } = usePermissions();
  return permissions === "Admin" || permissions === "Moderator" ? (
    <Edit {...props} undoable="false" mutationMode="pessimistic">
      <SimpleForm>
        <TextInput fullWidth disabled source="id" />
        <TextInput fullWidth source="name" />
        <ArrayInput validate={required()} source="color">
            <SimpleFormIterator inline>
              <SelectInput
                validate={required()}
                choices={[
                  { id: "Black", name: "Black" },
                  { id: "White", name: "White" },
                  { id: "Red", name: "Red" },
                  { id: "Blue", name: "Blue" },
                  { id: "Grey", name: "Grey" },
                  { id: "Green", name: "Green" },
                  { id: "Yellow", name: "Yellow" },
                ]}
              />
            </SimpleFormIterator>
          </ArrayInput>
          <SelectInput
            source="type"
            validate={required()}
            choices={[
              { id: "T-Shirt", name: "T-Shirt" },
              { id: "Hoodie", name: "Hoodie" },
              { id: "Pants", name: "Pants" },
              { id: "Backpack", name: "Backpack" },
              { id: "Case", name: "Case" },
              { id: "Sweatshirt", name: "Sweatshirt" },
            ]}
          />
        <TextInput fullWidth source="price" />
        <TextInput fullWidth source="company" />
        <TextInput fullWidth source="sale" />
        <TextInput fullWidth source="material" />
        <TextInput fullWidth source="care" />
        <TextInput fullWidth source="sex" />
        <TextInput fullWidth disabled source="collection_id._id" />


        <ArrayInput source="clothesCount">
          <SimpleFormIterator inline>
          <SelectInput
            source="size"
            validate={required()}
            choices={[
              { id: "XS", name: "XS" },
              { id: "S", name: "S" },
              { id: "M", name: "M" },
              { id: "L", name: "L" },
              { id: "XL", name: "XL" },
              { id: "XXL", name: "XXL" },
              { id: "UN", name: "UN" },
            ]}
          />
            <NumberInput source="count" helperText={false} />
          </SimpleFormIterator>
        </ArrayInput>

        <ImagesUrlsEditField label="imagesUrls" />
        <GifUrlEditField label="gif" />

        <ImageInput multiple={true} source="pictures" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Edit>
  ) : (
    <div>No access</div>
  );
};
export default ClothesEdit;

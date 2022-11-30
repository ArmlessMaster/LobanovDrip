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
  return permissions === "Admin" ? (
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
          <ReferenceInput
            label="collection"
            source="collection_id._id"
            reference="collection"
          >
            <SelectInput optionText="name" />
          </ReferenceInput>

        <ArrayInput source="clothesCount">
          <SimpleFormIterator inline>
            <TextInput source="size" helperText={false} />
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

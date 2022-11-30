import * as React from "react";
import {
  Create,
  TabbedForm,
  FormTab,
  Edit,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
  ArrayInput,
  SimpleFormIterator,
  NumberInput,
  required,
  SelectInput,
  ReferenceInput,
} from "react-admin";

const ClothesCreate = () => {
  return (
    <Create>
      <TabbedForm>
        <FormTab label="clothes create" sx={{ maxWidth: "40em" }}>
          <TextInput autoFocus fullWidth validate={required()} source="name" />
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
          <TextInput fullWidth validate={required()} source="price" />
          <TextInput fullWidth validate={required()} source="company" />
          <TextInput fullWidth validate={required()} source="sale" />
          <TextInput fullWidth validate={required()} source="material" />
          <TextInput fullWidth validate={required()} source="care" />
          <TextInput fullWidth validate={required()} source="sex" />
          <TextInput fullWidth disabled source="collection_id._id" />
          <ReferenceInput
            label="collection"
            source="collection_id._id"
            reference="collection"
          >
            <SelectInput optionText="name" />
          </ReferenceInput>
          <ArrayInput validate={required()} source="clothesCount">
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

          <ImageInput
            validate={required()}
            multiple={true}
            source="pictures"
            accept="image/*"
          >
            <ImageField source="src" title="title" />
          </ImageInput>
        </FormTab>
      </TabbedForm>
    </Create>
  );
};

export default ClothesCreate;

import React from "react";
import { usePermissions } from "react-admin";
import ImagesUrlsField from "../tagsField/ImagesUrlsField";
import GifUrlField from "../tagsField/GifUrlField";
import StringField from "../tagsField/StringField";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  ArrayField,
} from "react-admin";

const ClothesList = (props) => {
  const { permissions } = usePermissions();

  return permissions === "Admin" || permissions === "Moderator" ? (
    <List 
    // queryOptions={{ refetchInterval: 5000 }} 
    {...props} pagination={false}>
      <Datagrid bulkActionButtons={false}>
        <TextField sortable={false} source="id" />
        <TextField sortable={false} source="name" />
        {/* <TextField sortable={false} source="color" /> */}
        <StringField label="Colors" />
        <TextField sortable={false} source="type" />
        <TextField sortable={false} source="price" />
        <TextField sortable={false} source="company" />
        <TextField sortable={false} source="sale" />
        <TextField sortable={false} source="material" />
        <TextField sortable={false} source="care" />
        {/* <TextField sortable={false} source="clothesCount" /> */}
        <ArrayField source="clothesCount">
          <Datagrid bulkActionButtons={false}>
            <TextField source="size" />
            <TextField source="count" />
          </Datagrid>
        </ArrayField>
        <TextField sortable={false} source="sex" />
        <TextField
          sortable={false}
          source="collection_id.name"
          label="collection"
        />
        {/* <TextField sortable={false} source="imagesUrls" /> */}
        <ImagesUrlsField label="Images" />
        <GifUrlField label="gif" />
        {/* <TextField sortable={false} source="gifUrl" /> */}
        <EditButton />
        <DeleteButton undoable="false" mutationMode="pessimistic" />;
      </Datagrid>
    </List>
  ) : (
    <div>No access</div>
  );
};

export default ClothesList;

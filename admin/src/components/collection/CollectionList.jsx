import React from "react";
import { usePermissions } from "react-admin";
import ImagesUrlsField from "../tagsField/ImagesUrlsField";
import GifUrlField from "../tagsField/GifUrlField";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  ArrayField,
  TextInput ,
  ArrayInput,
  SimpleFormIterator,
  ImageField
} from "react-admin";


const CollectionList = (props) => {
  const { permissions } = usePermissions();

  return permissions === "Admin" ? (
    <List queryOptions={{ refetchInterval: 5000 }} {...props} pagination={false}>
      <Datagrid bulkActionButtons={false}>
        <TextField sortable={false} source="id" />
        <TextField sortable={false} source="name" />
        {/* <TextField sortable={false} source="imagesUrls" /> */}
        {/* <TextField sortable={false} source="gifUrl" /> */}
        <TextField sortable={false} source="description" />
        <ImagesUrlsField label="Images"/>
        <GifUrlField label="gif"/>
        <EditButton />
        <DeleteButton undoable="false" mutationMode="pessimistic" />;
      </Datagrid>
    </List>
  ) : (
    <div>No access</div>
  );
};

export default CollectionList;

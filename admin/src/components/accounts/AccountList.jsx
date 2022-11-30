import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";
import { usePermissions } from "react-admin";

const AccountList = (props) => {
  const { permissions } = usePermissions();

  return permissions === "Admin" ? (
    <List queryOptions={{ refetchInterval: 5000 }} {...props}  pagination={false}>
      <Datagrid bulkActionButtons={false}>
        <TextField sortable={false} source="id" />
        <TextField sortable={false} source="email" />
        <TextField sortable={false} source="role" />
        <EditButton />
        <DeleteButton undoable="false" mutationMode="pessimistic" />;
      </Datagrid>
    </List>
  ) : (
    <div>No access</div>
  );
};

export default AccountList;

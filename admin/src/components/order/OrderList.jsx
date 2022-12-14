import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  ArrayField,
  ImageField,
  SimpleShowLayout,
} from "react-admin";
import { usePermissions } from "react-admin";

const OrderList = (props) => {
  const { permissions } = usePermissions();

  return permissions === "Admin" || permissions === "Moderator" ? (
    <List 
    // queryOptions={{ refetchInterval: 5000 }}
     {...props} pagination={false}>
      <Datagrid bulkActionButtons={false}>
        <TextField sortable={false} source="id" />
        <TextField sortable={false} source="status" />
        <TextField sortable={false} source="status_update" />
        <TextField sortable={false} source="invoice" />
        <SimpleShowLayout label="User">
          <TextField label="id" source="user_info.user_id" />
          <TextField label="email" source="user_info.email" />
          <TextField label="name" source="user_info.name" />
        </SimpleShowLayout>
        <SimpleShowLayout label="Customer">
          <TextField label="email" source="email" />
          <TextField label="phone" source="phone" />
          <TextField label="name" source="name" />
          <TextField label="region" source="region" />
          <TextField label="city" source="city" />
          <TextField label="novaposhta" source="novaposhta" />
        </SimpleShowLayout>
        <ArrayField source="images" label="Products">
          <Datagrid bulkActionButtons={false}>
            <TextField label="id" source="clothes_id" />
            <ImageField source="image" />
            <TextField source="clothes_name" />
            <TextField source="clothes_type" />
            <TextField source="clothes_count" />
            <TextField source="clothes_size" />
            <TextField  source="isModeling" />
          </Datagrid>
        </ArrayField>
        <TextField sortable={false} source="total" />
        <EditButton />
        <DeleteButton undoable="false" mutationMode="pessimistic" />;
      </Datagrid>
    </List>
  ) : (
    <div>No access</div>
  );
};

export default OrderList;

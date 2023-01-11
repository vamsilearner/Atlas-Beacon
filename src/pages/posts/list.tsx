// To list the data we use this file/component
// dispalying hte resources here - by fetching form app.tsx

import { useMany } from "@pankod/refine-core";
import {
  List,
  TextField,
  TagField,
  DateField,
  Table,
  useTable,
  FilterDropdown,
  Select,
  useSelect,
  ShowButton,
  Space,
  EditButton,
  DeleteButton,
} from "@pankod/refine-antd";
// <FilterDropdown> component serves as a bridge between its child input and refine's useTable hook. It passes child's input value to useTable using filterDropdown's embedded props and provides a filter button.
//  useSelect hook populates props for <Select> component from a given resource.
// defaultValue is used to get the value for the current item. It's not affected by search, sort and filter parameter

import { IPost, ICategory } from "../../interfaces/index";

export const PostList: React.FC = () => {
  // to get table data & useTable is prop used
  const { tableProps } = useTable<IPost>();

  // to get category id's data & useMany is prop used
  const categoryIds =
    tableProps?.dataSource?.map((item) => item.category.id) ?? [];
  const { data: categoriesData, isLoading } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });
  // to filter data & useSelect is prop used
  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
  });
  // useShow() is a refine hook used to fetch a single record of data. The queryResult has the response and also isLoading state.
  // To retrieve the category title, we need to make a call to /categories endpoint. This time we used useOne() hook to get a single record from another resource.
  // useShow() is the preferred hook for fetching data from the current resource. To query foreign resources you may use the low-level useOne() hook.

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value) => <TagField value={value} />}
        />
        <Table.Column
          dataIndex="createdAt"
          title="CreatedAt"
          render={(value) => <DateField format="LLL" value={value} />}
        />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return <TextField value="Loading..." />;
            }

            return (
              <TextField
                value={
                  categoriesData?.data.find((item) => item.id === value)?.title
                }
              />
            );
          }}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Category"
                {...categorySelectProps}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          render={(_text, record): React.ReactNode => {
            return (
              <Space>
                {/* showButton to navigate to other details  */}
                <ShowButton size="small" recordItemId={record.id} hideText />
                <EditButton size="small" recordItemId={record.id} hideText />
                <DeleteButton size="small" recordItemId={record.id} hideText />
                {/* to edit data  */}
              </Space>
            );
          }}
        />
      </Table>
    </List>
  );
};

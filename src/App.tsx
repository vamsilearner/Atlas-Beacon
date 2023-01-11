// fetching data here
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ReadyPage,
  notificationProvider,
  ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import "@pankod/refine-antd/dist/reset.css";
import { PostList } from "./pages/posts/list";
import { PostShow } from "./pages/posts/show";
import { PostEdit } from "./pages/posts/edit";
import { PostCreate } from "./pages/posts/create";

import React  from "react";
import MainGrape from "./Main/grape";
import Aggrid from "./Main/Aggrid";

const App: React.FC = () => {

  return (
    <>
  <Aggrid />
  <h1>grapejs Editor</h1>
    <MainGrape />
    <h1>Refine Table - with Crud Operations</h1>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        Layout={Layout}
        ReadyPage={ReadyPage}
        notificationProvider={notificationProvider}
        catchAll={<ErrorComponent />}
        resources={[
          {
            name: "posts",
            list: PostList,
            show: PostShow,
            edit: PostEdit,
            create: PostCreate,
            // canDelete: true, 2nd way
          },
          // post - it is endpoint
          // list - is to list / display data
          // show - it is used to show row data
          // edit  - used to edit the row data
          {
            name: "files",
            list: PostList,
            show: PostShow,
            edit: PostEdit,
            create: PostCreate,
          },
        ]}
      />
    </>
  );
};

export default App;

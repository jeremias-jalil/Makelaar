import React, { useState, useEffect } from "react";
import { Route, useParams } from "react-router";
import { useHistory } from "react-router";

import Dashboard from "../Dashboard/Dashboard";
import UserRegistrationForm from "../UserRegistrationForm/UserRegistrationFrom";
import NewContractForm from "../FormContract/FormContract";
import EditContractForm from "../FormContractEdit/FormContractEdit";
import EditProperty from "../EditProperty/EditProperty";
import TableList from "../TableList/TableList";
import UserDetail from "../UserDetail/UserDetail";
import Logout from "../Logout/Logout";
import FormProperty from "../FormProperty/FormProperty";

import { getAllUserApi } from "../../Functions/api/users";
import { allProperties } from "../../Functions/api/property";
import { getAllContract } from "../../Functions/api/contract";

import { adminConstant } from "./constant";

export default function AdminBody() {
  const [userList, setUserList] = useState([]);
  const [prpList, setPropList] = useState([]);
  const [prpDisp, setPrpDisp] = useState([]);
  const [contList, setContList] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const { columnsUserList, columnsPropertyList, columnsContratList } =
    adminConstant(id, history);
  const [load, setLoad]=useState(true)

  async function get() {
    const allUsersApi = await getAllUserApi();
    setUserList(allUsersApi);
    const allPropsApi = await allProperties();
    setPropList(allPropsApi);
    setPrpDisp(
      allPropsApi.filter((p) => p.status === "activo" && p.Contract === null)
    );
    const allContrApi = await getAllContract();
    setContList(allContrApi);
  }

  useEffect(
    () => {
      get();
    }, // eslint-disable-next-line
    [load]
  );
  
function updateList(){
  setLoad(!load)
}

  return (
    <div>
      <Route path="/admin/:id/dashboard">
        <Dashboard
          inmNum={prpDisp.length}
          userNum={userList.length}
          contNum={contList.length}
          inmTot={prpList.length}
          userList={userList}
          prpList={prpList}
          contList={contList}
        />
      </Route>
      <Route path="/admin/:id/data">
        <UserDetail />
      </Route>

      <Route path="/admin/:id/users">
        <h2>Usuarios</h2>
        <TableList columns={columnsUserList} rows={userList} />
      </Route>
      <Route path="/admin/:id/property">
        <h2>Propiedades</h2>
        <TableList columns={columnsPropertyList} rows={prpList} />
      </Route>
      <Route path="/admin/:id/contrat">
        <h2>Contratos</h2>
        <TableList columns={columnsContratList} rows={contList} />
      </Route>

      <Route path="/admin/:id/newadmin">
        <UserRegistrationForm isAdmin={true} update={updateList}/>
      </Route>
      <Route path="/admin/:id/newproperty">
        <FormProperty update={updateList}/>
      </Route>
      <Route path="/admin/:id/newcontract">
        <NewContractForm update={updateList}/>
      </Route>

      <Route path="/admin/:id/editcontract/:idcont">
        <EditContractForm update={updateList}/>
      </Route>

      <Route path="/admin/:id/editproperty/:idprop">
        <EditProperty update={updateList}/>
      </Route>

      <Route path="/admin/:id/logout">
        <Logout />
      </Route>
    </div>
  );
}

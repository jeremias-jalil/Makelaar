import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";

import { useHistory } from "react-router";

export default function ContractPanel({ columns, rows }) {
  const [userListContract, setUserListContract] = useState([]);
  const history = useHistory();

  const listContract = userListContract.map((e) => {
    if (e.contract) {
      return { ...e, contract: "Ver contrato" };
    }
  });

  const columnsUserList = [
    { field: "name", headerName: "Nombre", width: 150 },
    { field: "startDate", headerName: "Fecha de inicio", width: 250 },
    { field: "endDate", headerName: "Fecha de termino", width: 150 },
    { field: "amount", headerName: "Monto", width: 150 },
    { field: "paymentDate", headerName: "Fecha de firma", width: 150 },
    { field: "contract", headerName: "Contrato", width: 150 },
  ];

  return (
    <div style={{ height: 500, width: "70vw" }}>
      <DataGrid
        onCellClick={(params, event) => {
          if (params.field === "contract") {
            history.push(`/user/:id/${params.row.id}`);
          }
        }}
        rows={listContract}
        columns={columnsUserList}
        pageSize={10}
      />
    </div>
  );
}

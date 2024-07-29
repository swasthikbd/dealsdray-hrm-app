import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CellValueChangedEvent, ColDef, ModuleRegistry, RowValueChangedEvent } from '@ag-grid-community/core';
import React, { StrictMode, useCallback, useMemo, useRef, useState,useEffect } from 'react';

const EmployeeList = () => {
  const [rowData, setRowData] = useState([]);
  const history = useHistory();
  const gridRef = useRef<AgGridReact>(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/employee', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => setRowData(response.data))
    .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const columns = [
    { headerName: "Name", field: "name", sortable: true, filter: true, editable: true },
    { headerName: "Email", field: "email", sortable: true, filter: true, editable: true },
    { headerName: "Mobile", field: "mobile", sortable: true, filter: true, editable: true},
    { headerName: "Designation", field: "designation", sortable: true, filter: true, editable: true, cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
          values: ['HR', 'Manager', 'Sales'],
      }
},
    { headerName: "Gender", field: "gender", sortable: true, filter: true, editable: true, cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
          values: ['Male', 'Female'],
      } },
    { headerName: "Course", field: "course", sortable: true, filter: true,editable: true, cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
          values: ['MCA', 'BCA','BSC'],
      }},
    { headerName: "Create Date", field: "createDate", sortable: true, filter: true },
    {
      headerName: "Actions", field: "actions",
      cellRendererFramework: (params) => (
        <div>
          <button onClick={() => history.push(`/edit-employee/${params.data._id}`)}>Edit</button>
          <button onClick={() => handleDelete(params.data._id)}>Delete</button>
        </div>
      )
    }
  ];
  const onCellValueChanged = useCallback((event) => {
    console.log('onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue);
}, []);

const onRowValueChanged = useCallback((event) => {
    const data = event.data;
    console.log(
        'onRowValueChanged: (' + data.make + ', ' + data.model + ', ' + data.price + ', ' + data.field5 + ')'
    );
}, []);

const onBtStopEditing = useCallback(() => {
    gridRef.current.api.stopEditing();
}, []);

const onBtStartEditing = useCallback(() => {
    gridRef.current.api.setFocusedCell(1, 'make');
    gridRef.current.api.startEditingCell({
        rowIndex: 1,
        colKey: 'make',
    });
}, []);

  
  const paginationPageSizeSelector = useMemo(() => {
    return [10, 20, 50, 100];
  }, []);

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employee/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setRowData(rowData.filter(employee => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      <div>
          <button onClick={() => history.push(`/create-employee`)}>Add Employee</button>
     </div>
    <div className="ag-theme-alpine" style={{ height: 400, width: 1200 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={paginationPageSizeSelector}
        editType={'fullRow'}


      />
    </div>
    </div>
  );
};

export default EmployeeList;

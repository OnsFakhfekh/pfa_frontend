import React, { useEffect, useState } from 'react'
import { useMany } from "@refinedev/core";
import { List, useDataGrid, DateField } from "@refinedev/mui";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { Table, Space } from "antd";
import axios from 'axios';


 function AllDoctors () {
    const [doctors, setDoctors] = useState([]);
useEffect(()=> {
    findAll();
}, []);
const findAll = async()=> {
    try {
        await axios.get("http://localhost:4000/doctor/getalldoctors").then((res)=> {
            setDoctors(res.data);
        })
    } catch (err) {
        console.error(err); 
    }
}

return (
  <List>
    <Table dataSource={doctors} rowKey="id">
      <Table.Column dataIndex="name" title="Name" />
      <Table.Column dataIndex="email" title="Email" />
      <Table.Column dataIndex="numTel" title="Numero Telephone" />
    </Table>
  </List>
);
};
export default AllDoctors
/*const [doctors, setDoctors] = useState([]);

useEffect(()=> {
findAll();
}, []);

const findAll = async()=> {
try {
    await axios.get("http://localhost:4000/doctor/getalldoctors").then((res)=> {
        setDoctors(res.data);
    })
} catch (err) {
   console.error(err); 
}
}
console.log(doctors);
const { dataGridProps } = useDataGrid();

const { data: doctorData, isLoading: doctorIsLoading } = useMany({
    resource: "doctors",
    ids: dataGridProps?.rows?.map((item: any) => item?.id) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });


const columns = React.useMemo<GridColumns<any>>(
    () => [
        {
            field: "id",
            headerName: "Id",
            type: "number",
            minWidth: 50,
            valueGetter: ({ row }) => {
                const value = row?.doctors?.id;

                return value;
            },
            renderCell: function render({ value }) {
                return doctorIsLoading ? (
                    <>Loading...</>
                ) : (
                    doctorData?.data?.find((item) => item.id === value)
                        ?.id
                );
            },
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 300,
            renderCell: function render({ value }) {
                return doctorIsLoading ? (
                    <>Loading...</>
                ) : (
                    doctorData?.data?.find((item) => item.id === value)
                        ?.name
                );
            },
        },
     {
            field: "specialite",
            headerName: "Specialité",
            minWidth: 250,
            renderCell: function render({ value }) {
                return doctorIsLoading ? (
                    <>Loading...</>
                ) : (
                    doctorData?.data?.find((item) => item.id === value)
                        ?.specialite
                );
            },
        },
        {
            field: "adresse",
            headerName: "Adresse",
            minWidth: 250,
            renderCell: function render({ value }) {
                return doctorIsLoading ? (
                    <>Loading...</>
                ) : (
                    doctorData?.data?.find((item) => item.id === value)
                        ?.adresse
                );
            },
        },
    ],
    [doctorData?.data],
);

return (
   
    <List title="Liste des docteurs">
        <DataGrid  {...dataGridProps} columns={columns} autoHeight />
        
           
    </List>
);*/
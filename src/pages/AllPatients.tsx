import React from 'react';
import { useEffect, useState } from 'react';
import { useMany } from "@refinedev/core";
import { List, useDataGrid, DateField } from "@refinedev/mui";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import axios from 'axios';
import { Ipatient } from 'interfaces';
import { useTable } from '@pankod/refine-core';
import { Table } from 'antd';


const AllPatients: React.FC = () => {


const [patients, setPatients] = useState([]);
useEffect(()=> {
    findAll();
}, []);
const findAll = async()=> {
    try {
        await axios.get("http://localhost:4000/patient/getallpatients").then((res)=> {
            setPatients(res.data);
        })
    } catch (err) {
        console.error(err); 
    }
}

return (
  <List>
    <Table dataSource={patients} rowKey="id">
      <Table.Column dataIndex="name" title="Name" />
      <Table.Column dataIndex="email" title="Email" />
      <Table.Column dataIndex="numTel" title="Numero Telephone" />
    </Table>
  </List>
);



};

export default AllPatients;



  /*  const [patients, setPatients] = useState<Ipatient[]>([]);
    
    useEffect(()=> {
        findAll();
    }, []);
    
        const findAll = async()=> {
        try {
            await axios.get("http://localhost:4000/patient/getallpatients").then((res)=> {
                setPatients(res.data);
            })
        } catch (err) {
           console.error(err); 
        }
        
        }
        console.log(patients);
    
    const { dataGridProps } = useDataGrid();
    
    const { data: PatientData, isLoading: PatientIsLoading } = useMany({
        resource: "patients",
        ids: patients.map((item: any) => item?.id) ?? [],
        queryOptions: {
            enabled: !!dataGridProps.rows,
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
                    const value = row?.patients?.id;
    
                    return value;
                },
                renderCell: function render({ value }) {
                    return PatientIsLoading ? (
                        <>Loading...</>
    
                    ) : (
                        patients?.find((item) => item.id === value)
                        ?.id
                    );
                },
            },
            {
                field: "name",
                headerName: "Name",
                minWidth: 200,
                valueGetter: ({ row }) => {
                    const value = row?.patients?.id;
    
                    return value;
                },
                renderCell: function render({ value }) {
                    return PatientIsLoading ? (
                        <>Loading...</>
                    ) : (
                        patients?.find((item) => item.id === value)
                            ?.name
                    );
                },
            },
            /*{
                field: "age",
                headerName: "Age",
                valueGetter: ({ row }) => {
                    const value = row?.Patient?.id;
    
                    return value;
                },
                minWidth: 300,
                renderCell: function render({ value }) {
                    return PatientIsLoading ? (
                        <>Loading...</>
                    ) : (
                        patients?.find((item) => item.id === value)
                            ?.dateNaissance
                    );
                },
            },
            {
                field: "numTel",
                headerName: "Numero de Telephone",
                valueGetter: ({ row }) => {
                    const value = row?.Patient?.id;
    
                    return value;
                },
                minWidth: 250,
                renderCell: function render({ value }) {
                    return PatientIsLoading ? (
                        <>Loading...</>
                    ) : (
                        patients?.find((item) => item.id === value)
                            ?.numTel
                    );
                }, 
                
            },
        ],
        [patients],
    );
    
    return (
        <List title="Liste des patients">
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
            <button onClick={findAll}>click heere </button>
        </List>
        
    );

};
    
    
    export default AllPatients;
    
    /*     const { dataGridProps } = useDataGrid();
         const [patients, setPatients] = useState([]);
         const [isLoading, setIsLoading] = useState(false);
     
         useEffect(() => {
             setIsLoading(true);
             axios
                 .get("http://localhost:4000/patient/getallpatients")
                 .then((res) => {
                     setPatients(res.data);
                     setIsLoading(false);
                 })
                 .catch((err) => {
                     console.error(err);
                     setIsLoading(false);
                 });
         }, []);
     
         const columns = React.useMemo<GridColumns<any>>(
             () => [
                 {
                     field: "id",
                     headerName: "Id",
                     type: "String",
                     minWidth: 50,
                     valueGetter: ({ row }) => {
                         const value = row?.setPatients?.id;
     
                         return value;
                     },
                     renderCell: function render({ value }) {
                         return isLoading ? (
                             <>Loading...</>
     
                         ) : (
                             patients.find((item) => item === value)
                             
                         );
                     },
                 },
                 {
                     field: "name",
                     headerName: "Name",
                     minWidth: 200,
                     valueGetter: ({ row }) => {
                         const value = row?.patients?.id;
     
                         return value;
                     },
                     renderCell: function render({ value }) {
                         return isLoading ? (
                             <>Loading...</>
                         ) : (
                             patients?.find((item) => item === value)
                                
                         );
                     },
                 },
                 {
                     field: "age",
                     headerName: "Age",
                     valueGetter: ({ row }) => {
                         const value = row?.Patient?.id;
     
                         return value;
                     },
                     minWidth: 300,
                     renderCell: function render({ value }) {
                         return isLoading ? (
                             <>Loading...</>
                         ) : (
                             patients?.find((item) => item === value)
                                 
                         );
                     },
                 },
                 {
                     field: "numTel",
                     headerName: "Numero de Telephone",
                     valueGetter: ({ row }) => {
                         const value = row?.Patient?.id;
     
                         return value;
                     },
                     minWidth: 250,
                     renderCell: function render({ value }) {
                         return isLoading ? (
                             <>Loading...</>
                         ) : (
                             patients?.find((item) => item === value)
                                 
                         );
                     }, 
                     
                 },
             ],
             [patients],
         );
     
         return (
             <List title="Liste des patients">
                 {isLoading ? (
                     <>Loading...</>
                 ) : (
                     <>
                         <DataGrid {...dataGridProps} columns={columns} autoHeight />
                         <button >click heere </button>
                     </>
                 )}
             </List>
         );
     };*/












     
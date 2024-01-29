"use client";
import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import Link from "next/link";

type Person = {
  firstName: string;
  lastName: string;
  email: string;
  fathersName: string;
  mothersName: string;
  address: string;
  pincode: string;
  country: string;
};

const UserData = () => {
  const [userData, setUserData] = useState<Person[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const getResponse: any = await fetch("api/getUser", {
          method: "GET",
        });
        const res = await getResponse.json();
        console.log(res)
        setUserData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "fathersName",
        header: "FathersName",
        size: 150,
      },
      {
        accessorKey: "mothersName",
        header: "MothersName",
        size: 200,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 150,
      },
      {
        accessorKey: "pincode",
        header: "Pincode",
        size: 150,
      },
      {
        accessorKey: "country",
        header: "Country",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: userData,
  });

  return (
    <div>
      <MaterialReactTable table={table} />
      <div style={{ textAlign: "center" }}>
        <Link href={"/"}>
          <button
            style={{
              width: "100px",
              padding: "5px",
              marginTop: "5px",
              backgroundColor: "black",
              color: "white",
              cursor: "pointer",
            }}
          >
            Back To Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserData;

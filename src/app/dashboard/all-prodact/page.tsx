import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";

import data from ".././data.json";

type DataItem = {
  id: number;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
};

const columns: ColumnDef<DataItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "header",
    header: "Header",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "target",
    header: "Target",
  },
  {
    accessorKey: "limit",
    header: "Limit",
  },
  {
    accessorKey: "reviewer",
    header: "Reviewer",
  },
];

export default function Page() {
  return (
    <>
      <DataTable data={data} columns={columns} />
    </>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  //   ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Header from "./Header";
import { motion } from "motion/react";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

const UncommingAppointmentsTable = ({
  data,
  columns,
  headerLabel,
  DetailLink,
  headers = true,
  role="Patient"
}) => {
  console.log(role)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-md border p-10 bg-white overflow-hidden shadow-md"
    >
      {headers && (
        <div className="flex justify-between">
          <Header role={role} label={headerLabel} />
          <Link
            to={DetailLink}
            className="text-gray-500 flex gap-2 hover:scale-105 transition-all cursor-pointer"
          >
            Details
            <MoveRight />
          </Link>
        </div>
      )}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              className="border-none h-16 rounded-lg"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  className={`${role=="Patient"?"bg-Primary-dark-Green":"bg-Primary-dark-blue"} font-semibold text-center text-white `}
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.Header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="border-none h-16"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className="text-gray-600 text-base text-center"
                    key={cell.id}
                  >
                  {  flexRender(cell.column.columnDef.cell,cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center font-bold text-3xl text-Additional-dark-gray"
              >
                No Results
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default UncommingAppointmentsTable;

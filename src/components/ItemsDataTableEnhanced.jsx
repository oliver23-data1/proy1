import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

export function ItemsDataTableEnhanced({ data }) {
  const [filter, setFilter] = React.useState("");
  const [sorting, setSorting] = React.useState([]);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);

  const columns = React.useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Nombre" },
      { accessorKey: "description", header: "Descripción" },
      { accessorKey: "created_at", header: "Creado" },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: filter,
      sorting,
      pagination: { pageIndex, pageSize },
    },
    onGlobalFilterChange: setFilter,
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      const next = typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater;
      setPageIndex(next.pageIndex);
      setPageSize(next.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      // Filtra por nombre y descripción
      if (!filterValue) return true;
      return (
        String(row.getValue("name")).toLowerCase().includes(filterValue.toLowerCase()) ||
        String(row.getValue("description")).toLowerCase().includes(filterValue.toLowerCase())
      );
    },
  });

  return (
    <div className="rounded-md border p-4 bg-white">
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Filtrar por nombre o descripción..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        />
      </div>
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b p-2 text-left cursor-pointer select-none"
                  onClick={() => header.column.getCanSort() && header.column.toggleSorting()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() ? (header.column.getIsSorted() === "asc" ? " ▲" : " ▼") : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border-b p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between mt-4">
        <button
          className="px-2 py-1 border rounded mr-2"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </button>
        <span className="text-sm">
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </span>
        <button
          className="px-2 py-1 border rounded ml-2"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

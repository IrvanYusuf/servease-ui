"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  OnChangeFn,
  RowSelectionState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { generatePageNumbers } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, MoreHorizontal } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useSearchParams, usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface Identifiable {
  _id: string;
}

interface DataTableProps<TData extends Identifiable, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  onPageChange: (page: number) => void;
  currentPage: number;
  page: number;
  limit: number;
  totalPages: number;
  total: number;
  title?: string;
  description?: string;
  emptyMessage?: string;
  isLoading?: boolean;
  columnsLength: number;
  enableCrawlableLinks?: boolean;
  onBulkDelete?: (selectedIds: string[]) => void;
  bulkDeleteLabel?: string;
  showBulkActions?: boolean;
  variant?: "default" | "minimal" | "bordered";
}

export function DataTable<TData extends Identifiable, TValue>({
  columns,
  data,
  rowSelection,
  onRowSelectionChange,
  page,
  limit,
  total,
  totalPages,
  onPageChange,
  currentPage,
  emptyMessage = "No data available",
  title = "Data Table",
  description,
  isLoading = false,
  columnsLength = 6,
  enableCrawlableLinks = true,
  onBulkDelete,
  bulkDeleteLabel = "Delete Selected",
  showBulkActions = true,
  variant = "default",
}: DataTableProps<TData, TValue>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isRowSelectionEnabled =
    rowSelection !== undefined && onRowSelectionChange !== undefined;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: isRowSelectionEnabled,
    onRowSelectionChange: isRowSelectionEnabled
      ? onRowSelectionChange
      : undefined,
    state: {
      ...(isRowSelectionEnabled && { rowSelection }),
    },
  });

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageClick = (pageNumber: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    onPageChange(pageNumber);
  };

  const TableRowSkeleton = ({ columns }: { columns: number }) => (
    <TableRow className="hover:bg-transparent">
      {Array.from({ length: columns }).map((_, index) => (
        <TableCell key={index} className="py-4">
          <Skeleton className="h-4 w-full rounded-md" />
        </TableCell>
      ))}
    </TableRow>
  );

  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = total === 0 ? 0 : Math.min(page * limit, total);

  const pageNumbers = generatePageNumbers(currentPage, totalPages!);

  const selectedItems =
    isRowSelectionEnabled && rowSelection
      ? Object.keys(rowSelection)
          .filter((key) => rowSelection[key])
          .map((index) => data[parseInt(index)]?._id)
          .filter(Boolean)
      : [];

  const handleBulkDelete = () => {
    if (onBulkDelete && selectedItems.length > 0) {
      onBulkDelete(selectedItems);
    }
  };

  const renderPaginationItem = (pageNum: number | string, isActive = false) => {
    if (pageNum === "...") {
      return (
        <PaginationItem key={`ellipsis-${Math.random()}`}>
          <PaginationEllipsis className="text-muted-foreground" />
        </PaginationItem>
      );
    }

    const pageNumber = Number(pageNum);

    return (
      <PaginationItem key={pageNumber}>
        <PaginationLink
          href={enableCrawlableLinks ? createPageUrl(pageNumber) : undefined}
          isActive={isActive}
          onClick={(e) => handlePageClick(pageNumber, e)}
          className={`cursor-pointer transition-all duration-200 ${
            isActive
              ? "bg-primary text-primary-foreground shadow-sm"
              : "hover:bg-muted hover:text-foreground"
          }`}
        >
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );
  };

  const cardVariants = {
    default: "border shadow-sm",
    minimal: "border-0 shadow-none bg-transparent",
    bordered: "border-2 shadow-md",
  };

  return (
    <Card className={`${cardVariants[variant]} transition-all duration-200`}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold tracking-tight">
              {title}
            </CardTitle>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>

          {isRowSelectionEnabled &&
            selectedItems.length > 0 &&
            showBulkActions && (
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="px-3 py-1">
                  {selectedItems.length} item
                  {selectedItems.length > 1 ? "s" : ""} selected
                </Badge>
                {onBulkDelete && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleBulkDelete}
                    className="h-8 gap-2 transition-all duration-200 hover:shadow-md"
                  >
                    <Trash2 className="w-4 h-4" />
                    {bulkDeleteLabel}
                  </Button>
                )}
              </div>
            )}
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6 w-full">
        <div className="rounded-lg border bg-card">
          <ScrollArea className="w-full">
            <Table className="min-w-max">
              <TableHeader className="bg-muted/50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-transparent border-b"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="font-medium text-foreground py-4 px-4 first:pl-6 last:pr-6"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: columnsLength }).map((_, index) => (
                    <TableRowSkeleton key={index} columns={columns.length} />
                  ))
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, index) => (
                    <TableRow
                      key={row.id}
                      data-state={
                        isRowSelectionEnabled && row.getIsSelected()
                          ? "selected"
                          : undefined
                      }
                      className={`
                        transition-colors duration-200 
                        hover:bg-muted/50 
                        ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}
                        ${
                          isRowSelectionEnabled && row.getIsSelected()
                            ? "bg-muted border-l-4 border-l-primary"
                            : ""
                        }
                      `}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="py-4 px-4 first:pl-6 last:pr-6"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="hover:bg-transparent">
                    <TableCell
                      colSpan={columns.length}
                      className="h-32 text-center"
                    >
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                          <MoreHorizontal className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">
                            {emptyMessage}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Data will appear here when available
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
            <div className="text-sm text-muted-foreground flex-1/2">
              Showing{" "}
              <span className="font-medium text-foreground">{start}</span> to{" "}
              <span className="font-medium text-foreground">{end}</span> of{" "}
              <span className="font-medium text-foreground">{total}</span>{" "}
              results
            </div>

            <Pagination className="flex sm:justify-end">
              <PaginationContent className="gap-1">
                {/* Previous Button */}
                <PaginationItem>
                  <PaginationPrevious
                    href={
                      enableCrawlableLinks
                        ? createPageUrl(Math.max(currentPage - 1, 1))
                        : undefined
                    }
                    onClick={(e) => {
                      handlePageClick(Math.max(currentPage - 1, 1), e);
                    }}
                    className={`
                      transition-all duration-200
                      ${
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer hover:bg-muted hover:text-foreground"
                      }
                    `}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>

                {/* Page Numbers */}
                {pageNumbers.map((pageNum) =>
                  renderPaginationItem(pageNum, currentPage === pageNum)
                )}

                {/* Next Button */}
                <PaginationItem>
                  <PaginationNext
                    href={
                      enableCrawlableLinks
                        ? createPageUrl(Math.min(currentPage + 1, totalPages!))
                        : undefined
                    }
                    onClick={(e) => {
                      handlePageClick(
                        Math.min(currentPage + 1, totalPages!),
                        e
                      );
                    }}
                    className={`
                      transition-all duration-200
                      ${
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer hover:bg-muted hover:text-foreground"
                      }
                    `}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

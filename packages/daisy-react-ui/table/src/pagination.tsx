import { type RowData, type Table } from "@tanstack/react-table"

import { Button, PageButton } from "./button"
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "./icons"

interface IPaginationProps<TData extends RowData> {
  table: Table<TData>
}

export const Pagination = <TData extends RowData>({
  table,
}: IPaginationProps<TData>) => {
  const {
    previousPage,
    nextPage,
    getPageOptions,
    setPageIndex,
    getCanNextPage,
    getCanPreviousPage,
    setPageSize,
    getState,
  } = table
  const pageOptions = getPageOptions()
  const canNextPage = getCanNextPage()
  const canPreviousPage = getCanPreviousPage()
  const { pageIndex, pageSize } = getState().pagination

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </Button>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="flex items-baseline gap-x-2">
          <label className="label text-sm">
            <span className=" mr-2">Page</span>
            <span className="mr-1 font-medium">{pageIndex + 1}</span> of{" "}
            <span className="ml-1 font-medium"> {pageOptions?.length}</span>
          </label>
          <label>
            <select
              className="select select-bordered   mt-1 block w-full "
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[5, 10, 20].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </label>
        </div>
        <nav
          className=" relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <PageButton
            className="rounded-l-md"
            onClick={() => setPageIndex(0)}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">First</span>
            <ChevronDoubleLeftIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </PageButton>
          <PageButton
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </PageButton>
          <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
            <span className="sr-only">Next</span>
            <ChevronRightIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </PageButton>
          <PageButton
            className="rounded-r-md"
            onClick={() => setPageIndex((page) => page - 1)}
            disabled={!canNextPage}
          >
            <span className="sr-only">Last</span>
            <ChevronDoubleRightIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </PageButton>
        </nav>
      </div>
    </div>
  )
}

export default Pagination

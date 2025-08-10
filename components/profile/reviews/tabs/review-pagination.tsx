import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FC } from "react";

interface ReviewPaginationProps {
  handlePageChange: (tab: string, page: number) => void;
  totalPagesPagination: number;
  selectedTab: string;
  pageMap: Record<string, number>;
}

const ReviewPagination: FC<ReviewPaginationProps> = ({
  handlePageChange,
  totalPagesPagination,
  pageMap,
  selectedTab,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() =>
              handlePageChange(
                selectedTab,
                Math.max(1, pageMap[selectedTab] - 1)
              )
            }
          />
        </PaginationItem>

        {Array.from({ length: totalPagesPagination }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={pageMap[selectedTab] === i + 1}
              onClick={() => handlePageChange(selectedTab, i + 1)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() =>
              handlePageChange(
                selectedTab,
                Math.min(totalPagesPagination, pageMap[selectedTab] + 1)
              )
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ReviewPagination;

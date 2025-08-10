import { FC, Fragment } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

type SkeletonTableProps = {
  length?: number;
  column?: number;
};

const SkeletonTable: FC<SkeletonTableProps> = ({ length = 3, column = 6 }) => {
  return (
    <Fragment>
      {Array.from({ length }).map((_, index) => (
        <TableRow key={index} className="w-full">
          {Array.from({ length: column }).map((_, idx) => (
            <TableCell key={idx}>
              <Skeleton className="h-8 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </Fragment>
  );
};

export default SkeletonTable;

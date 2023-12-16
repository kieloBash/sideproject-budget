"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetchAllSavings from "@/hooks/useAllSavings";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import dayjs from "dayjs";
import { Loader2 } from "lucide-react";

export function RecordsTable() {
  const list = useFetchAllSavings();

  if (!list.data) return null;

  const total = list.data.reduce((acc, record) => acc + record.savedAmount, 0);

  return (
    <>
      {list.isLoading || list.data === undefined ? (
        <div className="w-[280px] h-[calc(100vh-18rem)] flex justify-center items-center">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        <>
          <ScrollArea className="w-[280px] h-[calc(100vh-18rem)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead>Met</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.data.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      {dayjs(record.date).format("MMM DD")}
                    </TableCell>
                    <TableCell>{record.metGoal ? "Paid" : "Unpaid"}</TableCell>
                    <TableCell className="text-right">
                      {record.savedAmount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell className="text-right">
                    ${total.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </ScrollArea>
        </>
      )}
    </>
  );
}

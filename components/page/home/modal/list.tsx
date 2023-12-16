"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { RecordsTable } from "../table";
import { Menu } from "lucide-react";

export function ListModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="py-6 aspect-square p-2">
          <Menu className="w-full h-full" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[320px]">
        <DialogHeader>
          <DialogTitle>Records</DialogTitle>
          <DialogDescription>Here are your records.</DialogDescription>
        </DialogHeader>
        <RecordsTable />
      </DialogContent>
    </Dialog>
  );
}

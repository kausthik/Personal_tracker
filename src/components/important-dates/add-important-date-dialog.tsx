"use client";

import { CalendarPlus } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ImportantDateForm from "./important-date-form";

export default function AddImportantDateDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg text-xs">
          <CalendarPlus className="size-3.5" />
          Add date
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Add Important Date
          </DialogTitle>

          <DialogDescription>
            Add an upcoming interview, exam, contest,
            deadline or personal reminder.
          </DialogDescription>
        </DialogHeader>

        <ImportantDateForm mode="create" />
      </DialogContent>
    </Dialog>
  );
}
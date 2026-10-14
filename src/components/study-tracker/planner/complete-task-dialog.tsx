"use client";

import { useState, useTransition } from "react";

import { completePlannerTaskAction } from "@/src/actions/planner.action";

import { SourceType } from "@/src/types/study";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { WantRevisionType } from "@/src/types/revision";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";

interface CompleteTaskDialogProps {
  taskId: string;
}

export default function CompleteTaskDialog({
  taskId,
}: CompleteTaskDialogProps) {
  const [open, setOpen] = useState(false);

  const [type, setType] =
    useState<SourceType>(SourceType.YOUTUBE);

  const [wantRevision, setWantRevision] = useState<WantRevisionType>(WantRevisionType.YES);

  const [name, setName] = useState("");

  const [url, setUrl] = useState("");

  const [isPending, startTransition] =
    useTransition();

  function handleSubmit() {
    startTransition(async () => {
      try {
        await completePlannerTaskAction(taskId, [
          {
            type,
            name,
            url: url || undefined,
          },
        ], wantRevision);

        toast.success("Task completed.");

        setOpen(false);

        setName("");
        setUrl("");
        setType(SourceType.YOUTUBE);
        setWantRevision(WantRevisionType.YES)
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Something went wrong.");
        }
      }
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 shrink-0 rounded-lg text-xs">
          Mark done
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Complete Task
          </DialogTitle>

          <DialogDescription>
            Add the source from which you studied
            this topic.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between">
            <div>
            <Label>Source Type</Label>
            <Select
              value={type}
              onValueChange={(value) =>
                setType(value as SourceType)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {
             Object.values(SourceType).map((key) => {
              return (
              <SelectItem key={key} value={key}>
              {key}
              </SelectItem>
              );
              })
            }
              </SelectContent>
            </Select>
          </div>
          <div>
              <Label>Put in Revision??</Label>
            <Select
              value={wantRevision}
              onValueChange={(value) =>
                setWantRevision(value as WantRevisionType)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="YES">
                  YES
                </SelectItem>

                <SelectItem value="NO">
                  NO
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          </div>
          <div>
            <Label>Source Name</Label>

            <Input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Abdul Bari"
            />
          </div>

          <div>
            <Label>URL</Label>

            <Input
              value={url}
              onChange={(e) =>
                setUrl(e.target.value)
              }
              placeholder="https://..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            disabled={isPending}
            onClick={handleSubmit}
          >
            Complete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTaskAction } from "@/src/actions/task.action";

export default function AddTaskForm() {
  const [title, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    startTransition(async () => {
      try {
        await createTaskAction({ title, frozen: false });
        setTitle("");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to add task");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 px-1">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task..."
        maxLength={200}
        aria-label="New task"
      />
      <Button type="submit" size="icon" disabled={isPending || !title.trim()} aria-label="Add task">
        <Plus className="size-4" />
      </Button>
    </form>
  );
}

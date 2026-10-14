"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { createStudyAction } from "@/src/actions/study.action"
import { Difficulty, SourceType, Subject } from "@/src/types/study"

export function RegisterStudiedTopic() {

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  const form = e.currentTarget;

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  await createStudyAction({
    subject: data.subject as Subject,
    title: data.title as string,
    difficulty: data.difficulty as Difficulty,
    sources: data.sourceName
      ? [
          {
            type: data.sourceType as SourceType,
            name: data.sourceName as string,
            url: (data.sourceUrl as string) || undefined,
          },
        ]
      : [],
  });

  form.reset();
};

  return (
    <Dialog>
  <DialogTrigger asChild>
    <Button className="gap-2">
      <Plus className="size-4" />
      Log study
    </Button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-2xl">
    <form
      onSubmit={handleSubmit}
    >
      <DialogHeader>
        <DialogTitle>Add Study Topic</DialogTitle>

        <DialogDescription>
          Add a topic that you've studied manually.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-6">

        {/* Study Details */}

        <FieldGroup>

          <Field>
            <Label htmlFor="subject">
              Subject
            </Label>

            <Select name="subject">
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>

              <SelectContent>
                {
                Object.values(Subject).map((subject) => (
              <SelectItem key={subject} value={subject}>
              {subject}
                </SelectItem>
                ))
              }
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <Label htmlFor="title">
              Topic
            </Label>

            <Input
              id="title"
              name="title"
              placeholder="e.g. Binary Search"
            />
          </Field>

          <Field>
            <Label>
              Difficulty
            </Label>

            <RadioGroup
              name="difficulty"
              defaultValue="MEDIUM"
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="EASY"
                  id="easy"
                />
                <Label htmlFor="easy">Easy</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="MEDIUM"
                  id="medium"
                />
                <Label htmlFor="medium">Medium</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="HARD"
                  id="hard"
                />
                <Label htmlFor="hard">Hard</Label>
              </div>
            </RadioGroup>
          </Field>

        </FieldGroup>

        <Separator />

        {/* Sources */}

        <div className="space-y-4">

          <div className="flex items-center justify-between">
            <h3 className="font-medium">
              Sources
            </h3>

            <Button
              type="button"
              variant="outline"
              size="sm"
            >
              + Add Source
            </Button>
          </div>

          <FieldGroup>

            <Field>
              <Label>Source Type</Label>

              <Select name="sourceType">
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="YOUTUBE">
                    YouTube
                  </SelectItem>

                  <SelectItem value="WEBSITE">
                    Website
                  </SelectItem>

                  <SelectItem value="BOOK">
                    Book
                  </SelectItem>

                  <SelectItem value="COURSE">
                    Course
                  </SelectItem>

                  <SelectItem value="NOTES">
                    Notes
                  </SelectItem>

                  <SelectItem value="LEETCODE">
                    LeetCode
                  </SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Label>Source Name</Label>

              <Input
                name="sourceName"
                placeholder="Abdul Bari"
              />
            </Field>

            <Field>
              <Label>URL (Optional)</Label>

              <Input
                name="sourceUrl"
                placeholder="https://..."
              />
            </Field>

          </FieldGroup>

        </div>

      </div>

      <DialogFooter className="mt-8">

        <DialogClose asChild>
          <Button
            variant="outline"
            type="button"
          >
            Cancel
          </Button>
        </DialogClose>

        <Button type="submit">
          Add Topic
        </Button>

      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
  )
}

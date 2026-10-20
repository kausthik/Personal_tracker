import { InferSchemaType, model, models, Schema } from "mongoose";

const taskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Frozen tasks stay pinned and come back unchecked every day
    frozen: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export type TaskDocument = InferSchemaType<typeof taskSchema>;

export const Task = models.Task || model("Task", taskSchema);

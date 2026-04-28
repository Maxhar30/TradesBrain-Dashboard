"use client";

import { useCallback } from "react";
import { useSocket } from "@/hooks/use-socket";
import { type Job, type JobStatus } from "@/types";

export interface JobUpdatedPayload {
  id: string;
  status: JobStatus;
  technicianId?: string;
  technicianName?: string;
  updatedAt: string;
}

type JobCreatedPayload = Job;

interface UseJobUpdatesOptions {
  onJobUpdated?: (payload: JobUpdatedPayload) => void;
  onJobCreated?: (job: JobCreatedPayload) => void;
  onJobDeleted?: (id: string) => void;
}

export function useJobUpdates({
  onJobUpdated,
  onJobCreated,
  onJobDeleted,
}: UseJobUpdatesOptions) {
  const handleUpdated = useCallback(
    (...args: unknown[]) => onJobUpdated?.(args[0] as JobUpdatedPayload),
    [onJobUpdated]
  );
  const handleCreated = useCallback(
    (...args: unknown[]) => onJobCreated?.(args[0] as JobCreatedPayload),
    [onJobCreated]
  );
  const handleDeleted = useCallback(
    (...args: unknown[]) => onJobDeleted?.(args[0] as string),
    [onJobDeleted]
  );

  useSocket({
    "job:updated": handleUpdated,
    "job:created": handleCreated,
    "job:deleted": handleDeleted,
  });
}

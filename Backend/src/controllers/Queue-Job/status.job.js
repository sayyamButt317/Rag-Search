// backend: job.controller.js
import BullQueue from "../../Config/BullQueue.js";
import { Job } from "bullmq";

export async function JobStatus(req, res) {
  const { jobId } = req.params;

  const job = await Job.fromId(BullQueue, jobId);
  if (!job) return res.status(404).json({ status: "not-found" });

  const state = await job.getState(); // waiting, active, completed, failed, delayed
  res.json({ status: state, progress: job.progress });
};

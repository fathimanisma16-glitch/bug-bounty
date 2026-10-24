import { z } from "zod";
import { ok } from "../utils/response.js";
import { createUser, listUsers } from "../services/userService.js";

// Validation schema for incoming user creation payloads
export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("A valid email is required"),
  password: z.string().min(6).optional(),
  role: z.enum(["client", "freelancer"]).optional().default("client"),
});

export async function getUsers(req, res) {
  return ok(res, await listUsers());
}

export async function postUser(req, res) {
  // Parses and validates req.body; throws validation error if schema fails
  const data = createUserSchema.parse(req.body);
  return ok(res, await createUser(data), 201);
}
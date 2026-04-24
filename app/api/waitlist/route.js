import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const waitlistFilePath = path.join(process.cwd(), "data", "waitlist-submissions.json");
const allowedRoles = new Set(["renter", "landlord"]);

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function readWaitlistEntries() {
  try {
    const raw = await readFile(waitlistFilePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const role = typeof body.role === "string" ? body.role.trim().toLowerCase() : "";
    const schoolOrCity =
      typeof body.schoolOrCity === "string" ? body.schoolOrCity.trim() : "";

    if (!email || !isValidEmail(email)) {
      return Response.json(
        {
          error: "A valid email address is required."
        },
        { status: 400 }
      );
    }

    if (!allowedRoles.has(role)) {
      return Response.json(
        {
          error: "Role must be renter or landlord."
        },
        { status: 400 }
      );
    }

    const entries = await readWaitlistEntries();
    const nextEntry = {
      id: randomUUID(),
      email,
      role,
      schoolOrCity,
      submittedAt: new Date().toISOString()
    };
    const dedupedEntries = entries.filter((entry) => entry.email !== email);

    await mkdir(path.dirname(waitlistFilePath), { recursive: true });
    await writeFile(waitlistFilePath, JSON.stringify([nextEntry, ...dedupedEntries], null, 2));

    return Response.json({
      success: true,
      entry: nextEntry
    });
  } catch {
    return Response.json(
      {
        error: "Unable to save the waitlist submission right now."
      },
      { status: 500 }
    );
  }
}

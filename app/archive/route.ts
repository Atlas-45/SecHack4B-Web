import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const TEXT_EXTENSIONS = new Set([
  ".txt",
  ".md",
  ".log",
  ".tree",
  ".ts",
  ".tsx",
  ".json",
]);
const TREE_CONTENT = `GLASS KEY Photo Archive - Internal Tree (excerpt)

/
|-- app/
|   |-- core/
|   |   |-- sessions.log
|   |-- press/
|       |-- page.tsx
|-- public/
    |-- press/
        |-- kit-alpha/
        |-- kit-beta/
        |-- kit-gamma/
        |-- .tree
`;

const SESSIONS_LOG = `GLASS KEY Photo Archive - Session Log
========================================
Generated: ${new Date().toISOString()}

[ACTIVE SESSIONS]
SID: xK9mPq2L | Role: user  | IP: 192.168.1.███ | UA: Mozilla/5.0 | Started: 2026-02-23T09:14:22Z
SID: Tn4wR8yJ | Role: user  | IP: 10.0.0.███   | UA: Mozilla/5.0 | Started: 2026-02-23T10:32:05Z
SID: Hf7cB3nM | Role: admin | IP: 172.16.███.█ | UA: Mozilla/5.0 | Started: 2026-02-23T11:45:18Z
SID: Qw2xL6pK | Role: user  | IP: 192.168.0.██ | UA: Mozilla/5.0 | Started: 2026-02-23T12:08:41Z
SID: Vb9sD4tY | Role: user  | IP: 10.10.██.███ | UA: Mozilla/5.0 | Started: 2026-02-23T13:22:09Z
SID: PNtHwU37 | Role: user  | IP: 203.141.██.█ | UA: Mozilla/5.0 | Started: 2026-02-23T14:05:33Z

[EXPIRED SESSIONS - Last 24h]
SID: Zm5rE1uP | IP: 192.168.2.██ | Ended: 2026-02-22T18:45:33Z | Duration: 2h14m
SID: Jc8nG7wA | IP: 10.0.1.███   | Ended: 2026-02-22T21:12:07Z | Duration: 45m
SID: Ux3kF9mS | IP: 172.16.█.███ | Ended: 2026-02-23T02:33:51Z | Duration: 1h22m

[STATISTICS]
Total Sessions (24h): 9
Active: 6
Expired: 3
Avg Duration: 1h24m

========================================
WARNING: This file contains sensitive session data.
Unauthorized access is prohibited.
`;

export async function GET(request: NextRequest) {
  const rawPath = request.nextUrl.searchParams.get("path");

  if (!rawPath) {
    return new NextResponse("path is required", { status: 400 });
  }

  const basePath = process.cwd();
  const normalizedPath = rawPath.replace(/\\/g, "/").replace(/^\/+/, "");

  if (normalizedPath === "public/press/.tree") {
    return new NextResponse(TREE_CONTENT, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": 'inline; filename=".tree"',
      },
    });
  }

  if (normalizedPath === "app/core/sessions.log") {
    return new NextResponse(SESSIONS_LOG, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": 'inline; filename="sessions.log"',
      },
    });
  }

  const puzzlePrefix = "public/press/../";
  const mappedPath = normalizedPath.startsWith(puzzlePrefix)
    ? normalizedPath.slice(puzzlePrefix.length)
    : normalizedPath;
  const resolvedPath = path.resolve(basePath, mappedPath);
  const relative = path.relative(basePath, resolvedPath);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return new NextResponse("not found", { status: 404 });
  }

  try {
    const file = await readFile(resolvedPath);
    const ext = path.extname(resolvedPath).toLowerCase();
    const fileName = path.basename(resolvedPath);
    const isTree = fileName === ".tree";
    const shouldInline = fileName === "ArtKey.ts" || isTree;
    const contentType =
      isTree || TEXT_EXTENSIONS.has(ext)
        ? "text/plain; charset=utf-8"
        : "application/octet-stream";

    return new NextResponse(file, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `${shouldInline ? "inline" : "attachment"}; filename="${fileName}"`,
      },
    });
  } catch {
    return new NextResponse("not found", { status: 404 });
  }
}

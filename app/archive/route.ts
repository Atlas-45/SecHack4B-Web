import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const TEXT_EXTENSIONS = new Set([".txt", ".md", ".log", ".tree", ".ts", ".tsx", ".json"]);

export async function GET(request: NextRequest) {
  const rawPath = request.nextUrl.searchParams.get("path");

  if (!rawPath) {
    return new NextResponse("path is required", { status: 400 });
  }

  const basePath = process.cwd();
  const normalizedPath = rawPath.replace(/\\/g, "/").replace(/^\/+/, "");
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
    const contentType = isTree || TEXT_EXTENSIONS.has(ext)
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

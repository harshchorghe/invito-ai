import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { NextResponse } from "next/server";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import type { InvitationPreviewData } from "@/components/InvitationScene";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RenderRequestBody = {
  type?: string;
  data?: InvitationPreviewData;
};

const compositionId = "InvitationVideo";
const entryPoint = path.join(process.cwd(), "remotion", "Root.tsx");

let bundledServeUrlPromise: Promise<string> | null = null;

async function getServeUrl() {
  if (!bundledServeUrlPromise) {
    bundledServeUrlPromise = bundle({
      entryPoint,
      onProgress: () => undefined,
      ignoreRegisterRootWarning: true,
    });
  }

  return bundledServeUrlPromise;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RenderRequestBody;

    if (!body.type || !body.data) {
      return NextResponse.json({ error: "Missing invitation data." }, { status: 400 });
    }

    const serveUrl = await getServeUrl();
    const composition = await selectComposition({
      serveUrl,
      id: compositionId,
      inputProps: {
        data: body.data,
        type: body.type,
      },
      timeoutInMilliseconds: 120000,
      logLevel: "error",
    });

    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "invito-render-"));
    const outputFile = path.join(tempDir, `invito-${body.type}-${Date.now()}.mp4`);

    await renderMedia({
      serveUrl,
      composition,
      codec: "h264",
      outputLocation: outputFile,
      inputProps: {
        data: body.data,
        type: body.type,
      },
      overwrite: true,
      logLevel: "error",
      chromiumOptions: {
        disableWebSecurity: true,
      },
    });

    const videoBuffer = await fs.readFile(outputFile);
    await fs.rm(tempDir, { recursive: true, force: true });

    return new NextResponse(videoBuffer, {
      status: 200,
      headers: {
        "Content-Type": "video/mp4",
        "Content-Length": String(videoBuffer.byteLength),
        "Content-Disposition": `attachment; filename=invito-${body.type}.mp4`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Video render failed", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to render video.",
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { works } from "../../data/works";
import sharp from "sharp";

// 場所に応じた緯度経度マッピング
const locationCoordinates: Record<string, { lat: number; lng: number }> = {
  横浜: { lat: 35.45, lng: 139.65 },
  代官山: { lat: 35.65, lng: 139.7 },
  竹芝: { lat: 35.66, lng: 139.76 },
  神田: { lat: 35.69, lng: 139.77 },
  新木場: { lat: 35.64, lng: 139.83 },
  根岸: { lat: 35.43, lng: 139.64 },
  天王洲: { lat: 35.62, lng: 139.75 },
  上野: { lat: 35.71, lng: 139.78 },
  芝浦: { lat: 35.64, lng: 139.75 },
  "██████": { lat: 35.68, lng: 139.65 },
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing id parameter" },
      { status: 400 },
    );
  }

  const work = works.find((w) => w.id === id);
  if (!work) {
    return NextResponse.json({ error: "Work not found" }, { status: 404 });
  }

  try {
    // 画像を取得
    const response = await fetch(work.image);
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }
    const imageBuffer = await response.arrayBuffer();

    const coords = locationCoordinates[work.location] || {
      lat: 35.6762,
      lng: 139.6503,
    };

    // sharpでJPEG形式に変換し、基本的なEXIFを追加
    const jpegBuffer = await sharp(Buffer.from(imageBuffer))
      .jpeg({ quality: 95 })
      .withMetadata({
        exif: {
          IFD0: {
            Make: "Glass Key Photography",
            Model: "Leica M10-R",
            Software: "Glass Key Archive v1.0",
            ImageDescription: work.title,
            Artist: "Redacted",
            Copyright: "Glass Key / All Rights Reserved",
          },
          IFD2: {
            DateTimeOriginal: "2024:06:15 14:30:00",
            LensModel: "Summilux-M 35mm f/1.4 ASPH.",
          },
          IFD3: {
            GPSLatitudeRef: coords.lat >= 0 ? "N" : "S",
            GPSLatitude: `${Math.abs(coords.lat)}`,
            GPSLongitudeRef: coords.lng >= 0 ? "E" : "W",
            GPSLongitude: `${Math.abs(coords.lng)}`,
          },
        },
      })
      .toBuffer();

    const filename = `${work.id}_${work.title.replace(/[^\w\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, "_")}.jpg`;

    return new NextResponse(jpegBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 },
    );
  }
}

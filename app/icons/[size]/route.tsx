import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ size: "192" }, { size: "512" }];
}

export async function GET(_request: Request, { params }: { params: Promise<{ size: string }> }) {
  const { size } = await params;
  const pixels = size === "512" ? 512 : 192;
  const mark = Math.round(pixels * 0.44);
  const dot = Math.max(6, Math.round(pixels * 0.035));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#060A12",
          position: "relative",
        }}
      >
        <div
          style={{
            width: mark,
            height: mark,
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,.16)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: Math.round(pixels * 0.34),
            fontWeight: 700,
            color: "#19E3A6",
            letterSpacing: -3,
            fontFamily: "sans-serif",
          }}
        >
          B
        </div>
        <div
          style={{
            position: "absolute",
            bottom: Math.round(pixels * 0.18),
            width: dot,
            height: dot,
            borderRadius: 999,
            background: "#19E3A6",
          }}
        />
      </div>
    ),
    { width: pixels, height: pixels },
  );
}

import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const alt = "BALANS AI";

export default function AppleIcon() {
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
            position: "absolute",
            width: 132,
            height: 132,
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,.16)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 96,
            fontWeight: 700,
            color: "#19E3A6",
            letterSpacing: -4,
            fontFamily: "sans-serif",
          }}
        >
          B
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 46,
            width: 10,
            height: 10,
            borderRadius: 999,
            background: "#19E3A6",
          }}
        />
      </div>
    ),
    size,
  );
}

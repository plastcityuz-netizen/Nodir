import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "BALANS AI — Raqamlarni emas, qarorlarni boshqaring";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#060A12",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -80,
            width: 620,
            height: 620,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(25,227,166,.30), rgba(6,10,18,0) 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -60,
            width: 560,
            height: 560,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(124,92,255,.28), rgba(6,10,18,0) 68%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,.16)",
              background: "rgba(255,255,255,.04)",
              color: "#19E3A6",
              fontSize: 26,
            }}
          >
            B
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#EAF0FA",
              fontSize: 26,
              letterSpacing: 4,
              fontWeight: 700,
            }}
          >
            BALANS
            <span
              style={{
                background: "rgba(25,227,166,.14)",
                color: "#19E3A6",
                borderRadius: 8,
                padding: "4px 10px",
                fontSize: 20,
                letterSpacing: 1,
              }}
            >
              AI
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ color: "#EAF0FA", fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
              Raqamlarni emas,
            </div>
            <div style={{ color: "#19E3A6", fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
              qarorlarni boshqaring.
            </div>
          </div>
          <div style={{ color: "#8B97AD", fontSize: 26, maxWidth: 820, lineHeight: 1.4 }}>
            AI buxgalteriya va biznes boshqaruv platformasi · Birinchi oy bepul
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.18)" }} />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#19E3A6",
              boxShadow: "0 0 32px 8px rgba(25,227,166,.45)",
            }}
          />
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.18)" }} />
        </div>
      </div>
    ),
    size,
  );
}

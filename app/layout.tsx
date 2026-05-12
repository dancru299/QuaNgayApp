import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuàNgay - Gợi ý quà cho crush và người yêu",
  description:
    "Tìm quà cho crush hoặc người yêu khó chọn trong dưới 30 giây, rồi mua ngay trên Shopee.",
  metadataBase: new URL("https://quangay.vn"),
  openGraph: {
    title: "QuàNgay",
    description: "Gợi ý quà romantic gifting nhanh, dễ mua, ít fail.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}

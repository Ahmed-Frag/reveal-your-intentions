import "./globals.css";

export const metadata = {
  title: "افضح نيتك | تحليل النوايا",
  description:
    "أداة ذكية لتحليل المواقف الاجتماعية وكشف المعاني الخفية خلف الكلام",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

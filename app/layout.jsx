import "./globals.css";

export const metadata = {
  title: "افضح نيتهم | تحليل النوايا",
  description:
    "أداة ذكية لتحليل المواقف الاجتماعية وكشف المعاني الخفية خلف الكلام",
};

const themeScript = `
(function () {
  try {
    var saved = localStorage.getItem('theme');
    var darkMode = saved ? saved === 'dark' : true;
    document.documentElement.classList.toggle('dark', darkMode);
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

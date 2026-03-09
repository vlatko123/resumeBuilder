export async function exportToPdf(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Collect all <style> tags from the current document
  const styles = Array.from(document.querySelectorAll("style"))
    .map((s) => s.outerHTML)
    .join("\n");

  // Collect all <link rel="stylesheet"> hrefs
  const links = Array.from(
    document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')
  )
    .map((l) => `<link rel="stylesheet" href="${l.href}">`)
    .join("\n");

  const printWindow = window.open("", "_blank", "width=900,height=1200");
  if (!printWindow) {
    alert("Pop-up blocked. Please allow pop-ups for this site and try again.");
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${filename}</title>
        ${links}
        ${styles}
        <style>
          @page { margin: 0; size: A4 portrait; }
          html, body { margin: 0; padding: 0; background: white; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        </style>
      </head>
      <body>${element.innerHTML}</body>
    </html>
  `);

  printWindow.document.close();

  // Wait for resources (fonts, styles) to load before printing
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 400);
  };
}

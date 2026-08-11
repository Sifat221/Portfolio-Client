/**
 * Utility function to handle downloading or opening files,
 * including base64 Data URLs, Blob URLs, and static/HTTP asset URLs.
 */
export function downloadResume(url: string, filename: string = 'Sifat_Khan_CV.pdf') {
  if (!url) return;

  const targetName = filename || 'Sifat_Khan_CV.pdf';

  // Handle base64 Data URL (e.g. data:application/pdf;base64,JVBERi...)
  if (url.startsWith('data:')) {
    try {
      const parts = url.split(';base64,');
      const contentType = parts[0].replace('data:', '') || 'application/pdf';
      const base64Data = parts[1];

      if (!base64Data) {
        window.open(url, '_blank');
        return;
      }

      const binaryString = window.atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: contentType });
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = targetName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up object URL after download starts
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    } catch (err) {
      console.error('Failed to convert base64 to Blob for download:', err);
      // Fallback: anchor click
      const link = document.createElement('a');
      link.href = url;
      link.download = targetName;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } else {
    // Normal URL e.g. /assets/resume/Sifat_Khan_CV.pdf or http(s)://...
    const link = document.createElement('a');
    link.href = url;
    link.download = targetName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

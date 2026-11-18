/**
 * Utility function to handle downloading or opening files cleanly
 * across Desktop Web, Android Chrome/WebView, and iOS Safari/Chrome.
 */
function isIOSDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

export function downloadResume(url: string, filename: string = 'Sifat_Khan_CV.pdf') {
  if (!url) return;

  const targetName = filename || 'Sifat_Khan_CV.pdf';
  const ios = isIOSDevice();

  // Handle base64 Data URL (e.g. data:application/pdf;base64,JVBERi...)
  if (url.startsWith('data:')) {
    try {
      const parts = url.split(';base64,');
      const contentType = parts[0].replace('data:', '') || 'application/pdf';
      const base64Data = parts[1];

      if (!base64Data) {
        window.open(url, '_blank', 'noopener,noreferrer');
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

      if (ios) {
        // iOS Safari opens PDF blobs reliably in a new tab/viewer (a[download] on blobs is unreliable on iOS)
        const opened = window.open(blobUrl, '_blank');
        if (!opened) {
          window.location.href = blobUrl;
        }
      } else {
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = targetName;
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      // Keep Object URL alive long enough for iOS/Android native PDF viewer or download manager
      setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
    } catch (err) {
      console.error('Failed to convert base64 to Blob for download:', err);
      const opened = window.open(url, '_blank', 'noopener,noreferrer');
      if (!opened) {
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
  } else {
    // Normal URL e.g. /assets/resume/Sifat_Khan_CV.pdf or http(s)://...
    if (ios) {
      const opened = window.open(url, '_blank', 'noopener,noreferrer');
      if (!opened) {
        window.location.href = url;
      }
      return;
    }

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

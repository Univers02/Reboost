import { useState, useEffect } from 'react';
import { Loader, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getApiUrl } from '@/lib/queryClient';

interface PdfViewerProps {
  storagePath: string;
  fileName: string;
  onClose?: () => void;
}

export function PdfViewer({ storagePath, fileName, onClose }: PdfViewerProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPresignedUrl = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${getApiUrl('/api/chat/file/presign')}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ storagePath }),
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to get preview URL');
        }

        const data = await response.json();
        setPreviewUrl(data.url);
      } catch (err) {
        console.error('Error getting presigned URL:', err);
        setError('Could not load PDF preview');
      } finally {
        setLoading(false);
      }
    };

    getPresignedUrl();
  }, [storagePath]);

  return (
    <div className="bg-background rounded-lg border overflow-hidden flex flex-col max-h-96">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex-1 truncate">
          <p className="text-sm font-medium truncate">{fileName}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {previewUrl && (
            <Button
              size="sm"
              variant="ghost"
              asChild
              data-testid="btn-download-pdf-viewer"
            >
              <a href={previewUrl} download={fileName}>
                <Download className="h-4 w-4" />
              </a>
            </Button>
          )}
          {onClose && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              data-testid="btn-close-pdf-viewer"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden bg-slate-50 dark:bg-slate-950">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        )}
        
        {error && (
          <div className="flex items-center justify-center h-full p-4">
            <p className="text-sm text-destructive text-center">{error}</p>
          </div>
        )}
        
        {previewUrl && !loading && (
          <embed
            src={previewUrl}
            type="application/pdf"
            className="w-full h-full"
            data-testid="embed-pdf-preview"
          />
        )}
      </div>
    </div>
  );
}

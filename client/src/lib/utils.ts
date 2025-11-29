import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getApiUrl } from "./queryClient"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFileUrl(fileUrl?: string | null): string | undefined {
  if (!fileUrl) return undefined;
  
  if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
    return fileUrl;
  }
  
  // Backend returns full path: "/uploads/chat/[UUID]_[filename]"
  // Use PUBLIC endpoint (no auth required) for images/PDFs already validated on upload
  if (fileUrl.startsWith('/uploads/chat/')) {
    // Extract filename from path: "/uploads/chat/UUID_filename" -> "UUID_filename"
    const filename = fileUrl.split('/').pop() || fileUrl;
    return getApiUrl(`/api/chat/file/public/${filename}`);
  }
  
  // Fallback for legacy messages with just filename
  return getApiUrl(`/api/chat/file/${fileUrl}`);
}

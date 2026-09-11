import { useEffect } from 'react';

export function useDocumentTitle(title: string): void {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} | Rasadnik Zeleni Kutak`;

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}
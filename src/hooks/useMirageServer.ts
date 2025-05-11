import { makeServer } from '@/utils/mirage';

export default function useMirageServer() {
  if (process.env.NODE_ENV === 'development') {
    makeServer();
  }
 }

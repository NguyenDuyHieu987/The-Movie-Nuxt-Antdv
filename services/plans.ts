import { makeRequest } from './makeRequest';
import type { plan } from '@/types';

export function getAllPlan() {
  return makeRequest(`/plan/get`);
}

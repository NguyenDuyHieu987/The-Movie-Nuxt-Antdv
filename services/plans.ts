import { makeRequest } from './makeRequest';
import type { plan } from '@/types';

export function getAllPlan() {
  return makeRequest(`/plan/get`);
}

export function registerPlan(id: string) {
  return makeRequest(`/plan/register/${id}`, {
    method: 'POST',
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Review, ReviewStats } from '@/types';
import { useAdminStore } from '@/store';

// ── Public queries ────────────────────────────────────────────────────────────
export const useReviewStats = () =>
  useQuery<ReviewStats>({
    queryKey: ['review-stats'],
    queryFn: () => fetch('/api/reviews/stats').then((r) => r.json()),
    staleTime: 5 * 60 * 1000,
  });

export const useApprovedReviews = () =>
  useQuery<Review[]>({
    queryKey: ['reviews'],
    queryFn: () => fetch('/api/reviews').then((r) => r.json()),
    staleTime: 5 * 60 * 1000,
  });

export const useFeaturedReview = () =>
  useQuery<Review | null>({
    queryKey: ['featured-review'],
    queryFn: () => fetch('/api/reviews/featured').then((r) => r.json()),
    staleTime: 5 * 60 * 1000,
  });

// ── Admin queries ─────────────────────────────────────────────────────────────
function authHeaders(token: string | null) {
  return { Authorization: `Bearer ${token ?? ''}`, 'Content-Type': 'application/json' };
}

export const useAdminReviews = () => {
  const token = useAdminStore((s) => s.token);
  return useQuery<Review[]>({
    queryKey: ['admin-reviews'],
    queryFn: () =>
      fetch('/api/admin/reviews', { headers: authHeaders(token) }).then((r) => {
        if (!r.ok) throw new Error('Unauthorized');
        return r.json();
      }),
    enabled: !!token,
    retry: false,
  });
};

export const useUpdateReview = () => {
  const qc    = useQueryClient();
  const token = useAdminStore((s) => s.token);
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Review> }) =>
      fetch(`/api/admin/reviews/${id}`, {
        method: 'PUT',
        headers: authHeaders(token),
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-reviews'] }),
  });
};

export const useDeleteReview = () => {
  const qc    = useQueryClient();
  const token = useAdminStore((s) => s.token);
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/admin/reviews/${id}`, {
        method: 'DELETE',
        headers: authHeaders(token),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-reviews'] }),
  });
};

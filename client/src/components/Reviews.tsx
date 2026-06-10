import { useApprovedReviews, useFeaturedReview, useReviewStats } from '@/hooks/useReviews';
import ReviewForm from './ReviewForm';
import type { Review } from '@/types';

function ReviewCard({ review }: { review: Review }) {
  const stars = Math.round(review.rating);
  return (
    <div className="bg-cream border border-border rounded-[18px] p-6 flex flex-col gap-[0.45rem] transition-all duration-[250ms] hover:shadow-card hover:-translate-y-[3px]">
      <div className="flex items-start justify-between mb-[0.45rem]">
        <p className="font-bold text-[0.9rem] text-ink">{review.display_name}</p>
        <span className="text-[0.73rem] text-muted flex-shrink-0 ml-2">
          {new Date(review.date_submitted).toLocaleDateString('ro-RO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.')}
        </span>
      </div>
      {review.location && (
        <div className="flex items-center gap-[0.25rem] text-[0.76rem] font-semibold text-green mb-[0.45rem]">
          📍 {review.location}
        </div>
      )}
      <div className="text-orange text-[0.8rem] tracking-[0.08em] mb-[0.5rem]">
        {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
      </div>
      <p className="text-[0.85rem] text-muted leading-[1.55]">{review.text}</p>
      {review.owner_reply && (
        <div className="bg-green/5 border-l-4 border-green rounded-r-xl p-3 mt-1">
          <p className="text-xs font-bold text-green mb-1">Răspuns Newpod:</p>
          <p className="text-xs text-ink">{review.owner_reply}</p>
        </div>
      )}
    </div>
  );
}

export default function Reviews() {
  const { data: stats }    = useReviewStats();
  const { data: featured } = useFeaturedReview();
  const { data: reviews, isLoading } = useApprovedReviews();

  return (
    <section id="recenzii" className="py-24 px-[5%] bg-paper">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <p className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-orange mb-2">Ce spun clienții</p>
        <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-[-0.03em] text-ink leading-[1.12] mb-[0.9rem]">Recenzii</h2>

        {stats && stats.count > 0 && (
          <div className="flex items-center gap-4 mb-[1.8rem]">
            <span className="font-sans text-[3.2rem] font-bold text-ink leading-none">{stats.avg.toFixed(1)}</span>
            <div>
              <div className="text-orange text-[1.1rem] tracking-[0.08em]">{'★'.repeat(Math.round(stats.avg))}{'☆'.repeat(5 - Math.round(stats.avg))}</div>
              <div className="text-[0.78rem] text-muted mt-[0.2rem]">Bazat pe {stats.count} recenzii</div>
            </div>
          </div>
        )}

        <p className="text-muted text-[0.97rem] max-w-[520px] mb-[3rem]">
          Proiecte realizate în toată țara. Iată câteva dintre experiențele clienților noștri.
        </p>

        {/* Featured review */}
        {featured && (
          <div
            className="relative rounded-[24px] p-[3rem_3.5rem] mb-[1.4rem] overflow-hidden text-white"
            style={{ background: 'linear-gradient(135deg, #1c2e19 0%, #2a8f4f 100%)' }}
          >
            <div className="text-orange2 text-[1.1rem] tracking-[0.1em] mb-4 relative">
              {'★'.repeat(Math.round(featured.rating))}
            </div>
            <blockquote className="font-sans italic font-light text-[clamp(1rem,2vw,1.3rem)] text-white/[0.92] mb-8 relative leading-relaxed">
              „{featured.text}"
            </blockquote>
            <div className="flex items-center gap-4 relative">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xl flex-shrink-0">👤</div>
              <div>
                <div className="font-bold text-[0.95rem]">
                  {featured.display_name}{featured.label && featured.label !== featured.display_name ? ` — ${featured.label}` : ''}
                </div>
                {featured.location && (
                  <div className="text-[0.79rem] text-white/50 mt-[0.1rem]">📍 {featured.location}</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Reviews grid */}
        {isLoading ? (
          <div className="text-center text-muted py-12">Se încarcă recenziile…</div>
        ) : reviews && reviews.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1.1rem] mb-12">
            {reviews.map((r) => <ReviewCard key={r._id} review={r} />)}
          </div>
        ) : (
          <p className="text-center text-muted py-12">
            Nu există recenzii aprobate încă. <span className="text-green font-semibold">Fii primul!</span>
          </p>
        )}

        <ReviewForm />
      </div>
    </section>
  );
}

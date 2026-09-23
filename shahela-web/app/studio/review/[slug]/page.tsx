import ReviewClient from './review-client';

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ReviewClient slug={slug} />;
}

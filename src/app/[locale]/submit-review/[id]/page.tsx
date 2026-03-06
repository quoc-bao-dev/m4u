import SubmitReview from '@/modules/submit-review'

interface SubmitReviewPageProps {
    params: Promise<{
        id: number;
    }>;
}

const SubmitReviewPage = async ({ params }: SubmitReviewPageProps) => {
    const { id } = await params
    return (
        <SubmitReview id={id} />
    )
}

export default SubmitReviewPage

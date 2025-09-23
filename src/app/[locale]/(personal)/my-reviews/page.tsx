import {
  MyReviewHeader,
  MyReviewTabs,
  MyReviewTable,
} from '@/modules/my-reviews'

const Page = () => {
  return (
    <>
      <MyReviewHeader />
      <MyReviewTabs className="mt-4" />
      <div className="mt-8 relative z-10">
        <MyReviewTable />
      </div>
    </>
  )
}

export default Page

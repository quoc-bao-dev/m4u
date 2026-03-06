import {
  MyReviewHeader,
  MyReviewTabs,
  MyReviewTable,
} from '@/modules/my-reviews'

const Page = () => {
  return (
    <>
      <MyReviewHeader />
      <MyReviewTabs className="mt-4 h-fit" />
      <div className="mt-8 relative z-10 flex-1 min-h-0 h-full">
        <MyReviewTable />
      </div>
    </>
  )
}

export default Page

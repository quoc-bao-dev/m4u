import { Header, Tabs, Table } from '@/modules/my-reviews'

const Page = () => {
  return (
    <>
      <Header />
      <Tabs className="mt-4" />
      <div className="mt-8 relative z-10">
        <Table />
      </div>
    </>
  )
}

export default Page

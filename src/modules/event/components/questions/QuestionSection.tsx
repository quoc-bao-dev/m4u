import { Container } from '@/core/components'
import { AccordionItem } from '@/modules/trial-registration'

const QuestionSection = () => {
  return (
    <section className=" pb-[60px] md:py-[96px]">
      <Container className="space-y-3 xl:px-[200px]">
        <h2 className="text-title-sect font-bold text-gray-400 pb-5">
          <span className="text-gray-900">Frequently Asked </span> & Questions
        </h2>

        <AccordionItem
          title="Perks of a reviewer member"
          defaultOpen={true}
          className="bg-white"
        >
          <div className="space-y-2 pl-5">
            <p>When you join, you’ll enjoy exclusive perks:</p>
            <ul className="list-disc space-y-2">
              <li>
                <strong>Free product trials:</strong> Try today’s hottest beauty
                picks at no cost.
              </li>
              <li>
                <strong>Attractive earnings:</strong> Earn commission on every
                eligible order made via your referral link.
              </li>
              <li>
                <strong>Early access:</strong> Be among the first to test new
                and limited releases from leading brands.
              </li>
              <li>
                <strong>Support &amp; guidance:</strong> Get step-by-step
                playbooks and pro tips to level up your reviews and build
                credibility.
              </li>
              <li>
                <strong>Community:</strong> Connect with beauty lovers, share
                experiences, and learn together.
              </li>
            </ul>
          </div>
        </AccordionItem>

        <AccordionItem title="Perks of a reviewer member" className="bg-white">
          <p>
            Nội dung minh hoạ: Bạn có thể thay thế bằng nội dung thật khi có dữ
            liệu.
          </p>
        </AccordionItem>

        <AccordionItem title="Perks of a reviewer member" className="bg-white">
          <p>
            Nội dung minh hoạ: Thành viên nhận thêm quyền lợi khi tham gia các
            hoạt động.
          </p>
        </AccordionItem>
      </Container>
    </section>
  )
}

export default QuestionSection

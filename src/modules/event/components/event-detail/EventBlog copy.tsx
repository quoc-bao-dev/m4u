import Image from 'next/image'

const sectionIds = {
  eventRules: 'event-rules',
  eligibility: 'eligibility',
  newUserTask: 'new-user-task',
}

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-gray-700 leading-7">{children}</p>
)

const Divider = () => <div className="h-px bg-gray-200" />

const EventBlog = () => {
  return (
    <article className="flex flex-col gap-8 py-6">
      {/* Hero Image */}
      <Paragraph>
        Semper vel adipiscing laoreet iaculis sed at. Ac urna nibh scelerisque
        congue velit. Quam eget quisque interdum dictumst eleifend venenatis
        cras feugiat. Nunc diam risus sagittis in adipiscing nunc. Pharetra
        aliquam gravida bibendum orci diam nisi sem id. Id commodo volutpat
        platea nisi, nec venenatis pulvinar neque, ac. Odio dolor id potenti
        aliquam mi in nunc at sollicitudin. Magna felis, leo sed nec.
      </Paragraph>
      <div className="w-full h-auto overflow-hidden rounded-xl">
        <Image
          src="/image/donation/event1.jpg"
          alt="Event preview"
          width={1280}
          height={720}
          className="w-full object-cover aspect-[4/3]"
          priority
        />
      </div>
      <p className="text-xs text-gray-500 -mt-6">
        Image courtesy via{' '}
        <a
          href="https://www.designspiration.com/"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-gray-700"
        >
          Designspiration
        </a>
      </p>

      <Divider />

      <section id={sectionIds.eventRules} className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-gray-900">Event Rules</h2>
        <Paragraph>
          Semper vel adipiscing laoreet iaculis sed at. Ac urna nibh scelerisque
          congue velit. Quam eget quisque interdum dictumst eleifend venenatis
          cras feugiat. Nunc diam risus sagittis in adipiscing nunc. Pharetra
          aliquam gravida bibendum orci diam sem id id. Id commodo volutpat
          platea nisi, nec venenatis pulvinar neque, ac. Odio dolor id potenti
          aliquam in nunc at sollicitudin. Magna felis, leo sed nec.
        </Paragraph>
        <Paragraph>
          Here’s what dolor id potenti aliquam in nunc at sollicitudin:
        </Paragraph>
        <ul className="list-disc pl-6 flex flex-col gap-4 text-gray-700">
          <li>
            <span className="font-semibold">Sit mauris proin:</span> The quam
            dignissim nisi gravida pellentesque porta. Scelerisque porta ipsum
            non mattis nisi.
          </li>
          <li>
            <span className="font-semibold">Sit mauris proin:</span> The quam
            dignissim nisi gravida pellentesque porta. Scelerisque porta ipsum
            non mattis nisi. The quam dignissim nisi gravida pellentesque porta.
          </li>
          <li>
            <span className="font-semibold">Sit mauris proin:</span> The quam
            dignissim nisi gravida pellentesque porta. Scelerisque porta ipsum
            non mattis nisi. Scelerisque porta ipsum non mattis nisi. The quam
            dignissim nisi gravida pellentesque porta. Scelerisque porta ipsum
            non mattis nisi.
          </li>
        </ul>
        <Paragraph>
          Semper vel adipiscing laoreet iaculis sed at. Ac urna nibh scelerisque
          congue velit. Quam eget quisque interdum dictumst eleifend venenatis
          cras feugiat. Nunc diam risus sagittis in adipiscing nunc.
        </Paragraph>
      </section>

      <Divider />

      <section id={sectionIds.eligibility} className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-gray-900">Eligibility</h2>
        <Paragraph>
          Semper vel adipiscing laoreet iaculis sed at. Ac urna nibh scelerisque
          congue velit. Quam eget quisque interdum dictumst eleifend venenatis
          cras feugiat.
        </Paragraph>
        <blockquote className="border-l-4 border-pink-100 pl-4 italic text-gray-800 font-medium">
          “Semper vel adipiscing laoreet iaculis sed at. Ac urna nibh
          scelerisque congue velit. Quam eget quisque interdum dictumst eleifend
          venenatis cras feugiat. Nunc diam risus sagittis in adipiscing nunc.”
          <footer className="mt-2 not-italic text-gray-600">
            — By Loki Bright
          </footer>
        </blockquote>
      </section>

      <Divider />

      <section id={sectionIds.newUserTask} className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-gray-900">New User Task</h2>
        <div className="flex items-start gap-3 rounded-md bg-gray-100 p-4">
          <Paragraph>
            🔥 Semper vel adipiscing laoreet iaculis sed at. Ac urna nibh
            scelerisque congue velit. Quam eget quisque interdum dictumst
            eleifend venenatis cras feugiat.
          </Paragraph>
        </div>
        <ol className="list-decimal pl-6 flex flex-col gap-6 text-gray-700">
          <li>
            <span className="font-semibold">Sit mauris proin:</span> The quam
            dignissim nisi gravida pellentesque porta. Scelerisque porta ipsum
            non mattis nisi.
          </li>
          <li>
            <span className="font-semibold">Sit mauris proin:</span> The quam
            dignissim nisi gravida pellentesque porta. Scelerisque porta ipsum
            non mattis nisi.
          </li>
          <li>
            <span className="font-semibold">Sit mauris proin:</span> The quam
            dignissim nisi gravida pellentesque porta. Scelerisque porta ipsum
            non mattis nisi. Scelerisque porta ipsum non mattis nisi.
          </li>
        </ol>
      </section>
    </article>
  )
}

export default EventBlog

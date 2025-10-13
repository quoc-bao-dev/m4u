import { Share } from '@/modules/product'
import EventServerBadge from '../event/EventServerBadge'

type HeaderEventProps = {
  name: string
  content: string
  date: string
  status: {
    id: number
    name: string
    color: string
    type: 'coming' | 'happening' | 'ended'
  }
}

const HeaderEvent = ({ name, content, date, status }: HeaderEventProps) => {
  return (
    <div className="">
      <div className="w-fit">
        <EventServerBadge
          id={status.id}
          name={status.name}
          color={status.color}
          showIcon={status.type === 'happening'}
        />
      </div>
      <div className="pt-5">
        <h1 className="text-title-sect font-bold leading-[120%]">{name}</h1>
        <p className="pt-4">{content}</p>
      </div>
      <div className="pt-1 flex justify-between items-end">
        <p className="text-gray-600">{date}</p>
        <Share />
      </div>
    </div>
  )
}

export default HeaderEvent

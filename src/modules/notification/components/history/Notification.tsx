import NotifyHeader from './NotifyHeader'
import NotifyList from './NotifyList'
import NotifyTabs from './NotifyTabs'

const Notification = () => {
  return (
    <div className="flex flex-col h-full min-h-full">
      <NotifyHeader />
      <NotifyTabs />
      <div className="flex-1">
        <NotifyList />
      </div>
    </div>
  )
}

export default Notification

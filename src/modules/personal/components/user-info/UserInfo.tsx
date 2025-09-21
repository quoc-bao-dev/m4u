import UserGeneralForm from './UserGeneralForm'
import UserSecurityForm from './UserSecurityForm'

const UserInfo = () => {
  return (
    <div>
      <div className="py-2">
        <h1 className="text-2xl font-bold">Account preferences</h1>
      </div>
      <UserGeneralForm />
      <UserSecurityForm />
    </div>
  )
}

export default UserInfo

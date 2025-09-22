import React from 'react'

const referralUsers = [
  {
    id: 1,
    name: 'Võ Phương',
    date: '06/09/2025',
    amount: ' - đ',
    avatar: 'VP',
  },
  {
    id: 1,
    name: 'Võ Phương',
    date: '06/09/2025',
    amount: ' - đ',
    avatar: 'VP',
  },
  {
    id: 1,
    name: 'Võ Phương',
    date: '06/09/2025',
    amount: ' - đ',
    avatar: 'VP',
  },
  {
    id: 1,
    name: 'Võ Phương',
    date: '06/09/2025',
    amount: ' - đ',
    avatar: 'VP',
  },
  {
    id: 1,
    name: 'Võ Phương',
    date: '06/09/2025',
    amount: ' - đ',
    avatar: 'VP',
  },
  {
    id: 2,
    name: 'Phạm Thảo',
    date: '06/09/2025',
    amount: ' - đ',
    avatar: 'PT',
  },
  {
    id: 3,
    name: 'Bùi Đào',
    date: '06/09/2025',
    amount: ' - đ',
    avatar: 'BĐ',
  },
  {
    id: 4,
    name: 'Phan My',
    date: '06/09/2025',
    amount: ' - đ',
    avatar: 'PM',
  },
  {
    id: 5,
    name: 'Nguyễn An',
    date: '06/09/2025',
    amount: ' - đ',
    avatar: 'NA',
  },
  {
    id: 6,
    name: 'Quách Nhi',
    date: '06/09/2025',
    amount: ' - đ',
    avatar: 'QN',
  },
  {
    id: 7,
    name: 'Trần Khánh',
    date: '06/09/2025',
    amount: ' - đ',
    avatar: 'TK',
  },
]
const ReferralUsers = () => {
  return (
    <div className="space-y-4 xl:max-h-full overflow-y-auto">
      {referralUsers.map((user) => (
        <div key={user.id} className="flex items-center justify-between pr-0 ">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user.avatar}
            </div>
            <div>
              <div className="text-gray-900 text-base font-medium">
                {user.name}
              </div>
              <div className="text-gray-600 text-sm">{user.date}</div>
            </div>
          </div>
          <div className="text-blue-400 text-base font-medium">
            {user.amount}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ReferralUsers

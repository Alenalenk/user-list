import { memo } from "react";
import { User } from "../../types/User";
import './UserRow.scss'

type Props = {
  user: User,
}
export const UserRow: React.FC<Props> = memo(({ user }) => {
  const { name, username, phone, email } = user;
  return(
    <div className="user">
      <p className="user__cell"> {name} </p>
      <p className="user__cell"> {username} </p>
      <p className="user__cell"> {email} </p>
      <p className="user__cell"> {phone} </p>
    </div>
  )
}
)
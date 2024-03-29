const Notification = ({notifMessage, notifType}) => {

  if (notifMessage == null) {
    return null
  }

  return (
    <div className={notifType}>
      {notifMessage}
    </div>
  )
}

export default Notification
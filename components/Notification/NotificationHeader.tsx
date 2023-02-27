

export default function notificationHeader({Notification:notif}) {
  return (
    <div className="flex start"> 
      <img
          className="p-2 h-25 min-h-[2rem] w-8 min-w-[2rem] rounded-full md:h-12 md:w-12"
          src={
            notif.sender.profilePicture ||
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
              }>
        </img>
        <div>
          <p>{notif.sender.name}</p>
          <p>{/*notif.notifTime*/}</p>
        </div>
    </div>
  );
}
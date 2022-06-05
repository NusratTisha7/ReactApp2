
function ChatItem({  user, msg, image }) {

  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat__item ${user ? user : ""}`}
    >
      <div className="chat__item__content mt-3">
        <div className="chat__msg">{msg}</div>
      </div>
     
      <div className="avatar">
        <img src={image} className='avatar_img' alt="#" />
      </div>
    </div>
  );
}

export default ChatItem;

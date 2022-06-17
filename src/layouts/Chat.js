import ChatContent from '../components/Chat/ChatContent'

function Chat() {
    console.log("2")
    return (
        <div style={{ background: "#fff" }}>
            <div style={{ background: '#f4f3f8', display: 'flex' }}>
                <ChatContent />
            </div>
        </div>
    );
}

export default Chat;

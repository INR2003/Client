import Routes from './Routers/Routes';
import ChatBot from './commonComponent/ChatBox'; // import the ChatBot component

const App = () => {
  return (
    <div className='w-screen flex relative'>
      {/* Your existing routed content */}
      <Routes />

      {/* Chatbot floating at bottom-left */}
      <ChatBot />
    </div>
  );
}

export default App;

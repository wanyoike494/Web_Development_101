import UserGreeting from './UserGreeting.tsx'
import UserGreeting2 from './UserGreeting2.jsx'

function App() {
  return(
    <>
      <UserGreeting isLoggedIn = {false} username="Joseph"></UserGreeting>
      <UserGreeting2 isLoggedIn = {true} username="Wanyoike"></UserGreeting2>
    </>
  );
}

export default App

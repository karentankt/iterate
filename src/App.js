import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import './App.css';
import {useAuthContext} from './hooks/useAuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Create from './pages/create/Create';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login'
import Project from './pages/project/Project';
import Chat from './pages/chat/Chat';
import Signup from './pages/signup/signup';
import OnlineUsers from './components/OnlineUsers'

function App() {
  const {authReady, user} = useAuthContext();
  return (
    <div className='App'>
      {authReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path="/">
                {!user && <Redirect to="/login" />}
                {user && <Dashboard />}
              </Route>
              <Route path="/create">
                {!user && <Redirect to="/login" />}
                {user && <Create />}
              </Route>
              <Route path="/projects/:id">
                {!user && <Redirect to="/login" />}
                {user && <Project/>}
              </Route>
              <Route path="/chat">
                {!user && <Redirect to="/login" />}
                {user && <Chat />}
              </Route>
              <Route path="/login">
                {user && <Redirect to="/" />}
                {!user && <Login />}
              </Route>
              <Route path="/signup">
                {user && <Redirect to="/" />}
                {!user && <Signup />}
              </Route>
            </Switch>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;

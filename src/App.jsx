import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { PageProvider } from './context/PageContext.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/globalvars.css';
import './index.css';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import TopbarP from './components/TopbarP';


import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

import HomePageD from './pages/dashboard/HomePageD.jsx';
import LiveChat from './pages/dashboard/LiveChat.jsx';
import ControlP from './pages/dashboard/ControlP.jsx';

import Chat from './components/controlpanel/Chat.jsx';
import ScoreBoard from './components/ScoreBoard.jsx';
import Form from './components/controlpanel/Form.jsx';
import SoccerPanel from './components/controlpanel/SoccerPanel.jsx';

import ObsPanel from './components/ObsPanel.jsx'

import DashboardLayout from './layouts/DashboardLayout.jsx'; // Importa el nuevo layout

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <PageProvider>
            <div className="container-app container-fluid flex-fill">
              <TopbarP />
              <div>
                <Routes>
                  <Route path="*" element={<h1>Pagina no encontrada</h1>} />
                  <Route path="/" element={<Home />} />
                  <Route path="" element={<HomePageD />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/soccerpanel" element={<SoccerPanel />} />

                  <Route path="/form" element={<Form />} />
                  {/* {
              <Route path="/justchat" element={<Chat />} />} */}

                  {/* Rutas del dashboard */}

                  
              <Route path="/scoreboard" element={<ScoreBoard />} />
                  <Route element={<ProtectedRoute />}>
                    <Route
                      path="/dashboard/*"
                      element={
                        <DashboardLayout>
                          <Routes>
                            <Route path="*" element={<h1 className='text-center'>Pagina no encontrada </h1>} />
                            <Route exact path='home' element={<HomePageD />} />
                            <Route path="/obs" element={<ObsPanel />} />
                            <Route path="control-panel" element={<ControlP />} />
                            <Route path="chat" element={<LiveChat />} />
                            <Route path="scoreboard" element={<ScoreBoard />} />
                          </Routes>
                        </DashboardLayout>
                      }
                    />
                  </Route>
                </Routes>
              </div>
            </div>
          </PageProvider>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;



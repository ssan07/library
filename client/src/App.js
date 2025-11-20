

import { Route, Routes } from 'react-router-dom';
import Library from './Library';
import LoginPage from './Pages/Login/Login';
import RegisterPage from './Pages/Register/Register';

function App() {
  return (
    <>
    <Routes>
      <Route path="/library" element={<Library />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<RegisterPage />} />
    </Routes>
    </>
  );
}

export default App;

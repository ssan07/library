

import { Route, Routes } from 'react-router-dom';
import Library from './Library';
import AdminLibrary from './AdminLibrary';
import LoginPage from './Pages/Login/Login';
import RegisterPage from './Pages/Register/Register';
import EditBooks from './Pages/EditBooks/EditBooks';
import AddBooks from './Pages/AddBooks/AddBooks';

function App() {
  return (
    <>
    <Routes>
      <Route path="/admin/library" element={localStorage.getItem("permission") === "admin" ? <AdminLibrary /> : <LoginPage />} />
      <Route path="/admin/addbook" element={localStorage.getItem("permission") === "admin" ? <AddBooks /> : <LoginPage />} />
      <Route path="/admin/editbook" element={localStorage.getItem("permission") === "admin" ? <EditBooks /> : <LoginPage />} />
      <Route path="/library" element={<Library />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<RegisterPage />} />
    </Routes>
    </>
  );
}

export default App;

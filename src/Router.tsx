import { Routes, Route } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

export default function Router() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </AuthProvider>
  );
}

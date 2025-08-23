import { Routes, Route, Navigate } from 'react-router-dom';
import { HomeView } from '../views/HomeView';
import { CreateMarcaView } from '../views/CreateMarcaView';
import { ViewMarcaView } from '../views/ViewMarcaView';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/marcas" element={<HomeView />} />
      <Route path="/marcas/crear" element={<CreateMarcaView />} />
      <Route path="/marcas/edit/:id" element={<CreateMarcaView />} />
      <Route path="/marcas/:id" element={<ViewMarcaView />} />
      <Route path="/" element={<Navigate to="/marcas" replace />} />
      <Route path="*" element={<Navigate to="/marcas" replace />} />
    </Routes>
  );
};
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import LandingPage from '@pages/LandingPage';
import ProjectsPage from '@pages/ProjectsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#090A0F]">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
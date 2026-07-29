import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Download, ChevronDown, Globe, Smartphone } from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

interface NavSubLink {
  label: string;
  href: string;
  page: string;
}

interface NavLink {
  label: string;
  href: string;
  sub?: NavSubLink[];
}

const navLinks: NavLink[] = [
  { label: 'الرئيسية', href: '/' },
  { label: 'خدماتنا', href: 'services' },
  { label: 'أعمالنا', href: '/projects', sub: [
    { label: 'المواقع الإلكترونية', href: 'projects-websites', page: '/projects' },
    { label: 'التطبيقات', href: 'projects-apps', page: '/projects' },
  ]},
  { label: 'من نحن', href: 'about' },
  { label: 'تواصل معنا', href: 'contact' },
];

const sectionObserve = ['', 'services', '', 'about', 'contact'];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/projects') {
      setActiveIndex(2);
      return;
    }

    if (location.pathname === '/') {
      const scrollState = location.state?.scrollTo as string | undefined;
      if (scrollState === 'services') setActiveIndex(1);
      else if (scrollState === 'about') setActiveIndex(3);
      else if (scrollState === 'contact') setActiveIndex(4);
      else setActiveIndex(0);
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname !== '/') return;

    const ids = sectionObserve.filter(Boolean) as string[];
    const elements = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === 'services') setActiveIndex(1);
            else if (id === 'about') setActiveIndex(3);
            else if (id === 'contact') setActiveIndex(4);
          }
        }
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );

    elements.forEach(el => observer.observe(el));

    const onScroll = () => {
      if (window.scrollY < 100) setActiveIndex(0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      elements.forEach(el => observer.unobserve(el));
      window.removeEventListener('scroll', onScroll);
    };
  }, [location.pathname]);

  const handleNavClick = (link: NavLink) => {
    setMobileOpen(false);
    setProjectsOpen(false);

    if (link.href === '/') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (link.href === '/projects') {
      navigate('/projects');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetPage = link.href.startsWith('/') ? link.href : '/';
      navigate(targetPage, { state: { scrollTo: link.href } });
    }
  };

  const handleSubClick = (sub: NavSubLink) => {
    setMobileOpen(false);
    setProjectsOpen(false);
    navigate(sub.page, { state: { scrollTo: sub.href } });
  };

  const isActive = (link: NavLink) => {
    if (link.href === '/') return activeIndex === 0 && location.pathname === '/';
    if (link.href === '/projects') return location.pathname === '/projects';
    if (link.href === 'services') return activeIndex === 1;
    if (link.href === 'about') return activeIndex === 3;
    if (link.href === 'contact') return activeIndex === 4;
    return false;
  };

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex items-center justify-between px-6 py-3 rounded-xl glass bg-[#0F111A]/70 border border-white/[0.08]"
      >
        <button
          onClick={() => {
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigate('/');
            }
          }}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#d0bcff]/10 flex items-center justify-center">
            <span className="font-syne font-bold text-lg text-[#d0bcff]">Z</span>
          </div>
          <span className="font-syne font-bold text-xl text-[#e3e1e9]">
            Zodex
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          <LayoutGroup>
            {navLinks.map((link) =>
              link.sub ? (
                <div key={link.href} className="relative">
                  <div className="relative group/btn">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setProjectsOpen(!projectsOpen)}
                      className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-[#cbc3d7] hover:text-[#e3e1e9] hover:bg-white/[0.06]"
                    >
                      {link.label}
                      <motion.div
                        animate={{ rotate: projectsOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-3.5 h-3.5" strokeWidth={2} />
                      </motion.div>
                    </motion.button>
                    <div className="absolute -bottom-[3px] left-2 right-2 h-[2px] rounded-full bg-[#d0bcff]/40 scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] origin-center" />
                    {isActive(link) && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute -bottom-[3px] left-2 right-2 h-[2px] rounded-full bg-[#d0bcff]"
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      />
                    )}
                  </div>
                  <AnimatePresence>
                    {projectsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute top-full right-0 mt-1.5 w-52 rounded-xl border border-white/[0.08] bg-[#0F111A]/95 backdrop-blur-xl overflow-hidden shadow-xl"
                        style={{ transformOrigin: 'top center' }}
                      >
                        {link.sub.map((subItem) => (
                          <motion.button
                            key={subItem.href}
                            whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                            onClick={() => handleSubClick(subItem)}
                            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-right text-sm font-medium text-[#cbc3d7] hover:text-[#e3e1e9] transition-colors duration-200"
                          >
                            {subItem.label === 'المواقع الإلكترونية' ? (
                              <Globe className="w-3.5 h-3.5 text-[#d0bcff]" strokeWidth={1.5} />
                            ) : (
                              <Smartphone className="w-3.5 h-3.5 text-[#4cd7f6]" strokeWidth={1.5} />
                            )}
                            {subItem.label}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div key={link.href} className="relative group/btn">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavClick(link)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-[#cbc3d7] hover:text-[#e3e1e9] hover:bg-white/[0.06]"
                  >
                    {link.label}
                  </motion.button>
                  <div className="absolute -bottom-[3px] left-2 right-2 h-[2px] rounded-full bg-[#d0bcff]/40 scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] origin-center" />
                  {isActive(link) && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -bottom-[3px] left-2 right-2 h-[2px] rounded-full bg-[#d0bcff]"
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  )}
                </div>
              )
            )}
          </LayoutGroup>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/Ezzaldin_Elsadat_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 bg-[#d0bcff]/10 text-[#d0bcff] hover:bg-[#d0bcff]/20 mr-2"
          >
            <Download className="w-3.5 h-3.5" strokeWidth={2} />
            السيرة الذاتية
          </motion.a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-[#cbc3d7] hover:text-[#e3e1e9] hover:bg-white/[0.06]"
          aria-label="القائمة"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 rounded-xl border glass bg-[#0F111A]/90 border-white/[0.08] overflow-hidden"
          >
            <div className="p-2 flex flex-col gap-1">
              {navLinks.map((link, i) =>
                link.sub ? (
                  <div key={link.href}>
                    <motion.button
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setProjectsOpen(!projectsOpen)}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-right text-sm font-medium text-[#cbc3d7] hover:text-[#e3e1e9] hover:bg-white/[0.06]"
                    >
                      {link.label}
                      <motion.div
                        animate={{ rotate: projectsOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-3.5 h-3.5" strokeWidth={2} />
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {projectsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pr-4 flex flex-col gap-1 pb-1">
                            {link.sub.map((subItem) => (
                              <motion.button
                                key={subItem.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                onClick={() => handleSubClick(subItem)}
                                className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-right text-sm font-medium text-[#cbc3d7] hover:text-[#e3e1e9] hover:bg-white/[0.06]"
                              >
                                {subItem.label === 'المواقع الإلكترونية' ? (
                                  <Globe className="w-3.5 h-3.5 text-[#d0bcff]" strokeWidth={1.5} />
                                ) : (
                                  <Smartphone className="w-3.5 h-3.5 text-[#4cd7f6]" strokeWidth={1.5} />
                                )}
                                {subItem.label}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(link)}
                    className="px-4 py-3 rounded-lg text-right text-sm font-medium text-[#cbc3d7] hover:text-[#e3e1e9] hover:bg-white/[0.06]"
                  >
                    {link.label}
                  </motion.button>
                )
              )}
              <motion.a
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                href="/Ezzaldin_Elsadat_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-3 rounded-lg text-right text-sm font-semibold transition-all duration-300 bg-[#d0bcff]/10 text-[#d0bcff] hover:bg-[#d0bcff]/20"
              >
                <Download className="w-3.5 h-3.5" strokeWidth={2} />
                السيرة الذاتية
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
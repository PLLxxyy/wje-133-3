import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  Building2,
  Camera,
  Cuboid,
  MessageSquare,
  Moon,
  Scissors,
  Sun
} from 'lucide-react';
import { useThemeStore } from './stores/themeStore';
import { db, persistCollection } from './utils/db';
import {
  annotations,
  buildingElements,
  modelLayers,
  sectionPlanes,
  viewpointSeeds
} from './api/mockData';

const navItems = [
  { to: '/viewer', label: '3D 主视图', icon: Building2 },
  { to: '/viewpoints', label: '视角', icon: Camera },
  { to: '/elements', label: '构件', icon: Cuboid },
  { to: '/annotations', label: '标注', icon: MessageSquare },
  { to: '/sections', label: '剖面', icon: Scissors }
];

export function AppShell() {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    void Promise.all([
      persistCollection(db.layers, modelLayers, 'wje-133-layers'),
      persistCollection(db.elements, buildingElements, 'wje-133-elements'),
      persistCollection(db.viewpoints, viewpointSeeds, 'wje-133-viewpoints'),
      persistCollection(db.annotations, annotations, 'wje-133-annotations'),
      persistCollection(db.sections, sectionPlanes, 'wje-133-sections')
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-[color:var(--app-bg)] text-[color:var(--text-primary)]">
      <header className="app-header">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
            wje-133 · BIM Review Console
          </p>
          <h1 className="text-xl font-semibold leading-tight text-[color:var(--text-primary)]">
            建筑信息模型 3D 可视化查看器
          </h1>
        </div>
        <button className="icon-button h-10 w-10" onClick={toggleTheme} type="button" title="切换主题">
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </header>

      <div className="app-layout">
        <nav className="app-nav" aria-label="主导航">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className="nav-link">
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <main className="min-w-0 flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

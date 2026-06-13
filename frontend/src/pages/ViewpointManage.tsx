import { Plus } from 'lucide-react';
import { ViewpointCard } from '../components/common/ViewpointCard';
import { useViewpointStore } from '../stores/viewpointStore';
import type { Viewpoint } from '../types';

export function ViewpointManage() {
  const {
    viewpoints,
    activeViewpointId,
    setActiveViewpoint,
    setDefaultViewpoint,
    deleteViewpoint,
    addViewpoint
  } = useViewpointStore();

  const handleSaveViewpoint = () => {
    const createdAt = new Date().toISOString();
    const next: Viewpoint = {
      id: `vp-custom-${Date.now()}`,
      name: `审阅视角 ${viewpoints.length + 1}`,
      cameraPosition: {
        x: 12 + viewpoints.length,
        y: 10,
        z: 14 - viewpoints.length * 0.6
      },
      target: { x: 0, y: 3, z: 0 },
      fov: 44,
      isDefault: false,
      createdAt
    };
    addViewpoint(next);
    setActiveViewpoint(next.id);
  };

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <h1 className="page-title">视角管理</h1>
          <p className="page-subtitle">保存、切换、删除或设定默认审阅视角。</p>
        </div>
        <button className="primary-button" onClick={handleSaveViewpoint} type="button">
          <Plus className="h-4 w-4" />
          保存当前视角
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {viewpoints.map((viewpoint) => (
          <ViewpointCard
            key={viewpoint.id}
            viewpoint={viewpoint}
            active={activeViewpointId === viewpoint.id}
            onActivate={setActiveViewpoint}
            onSetDefault={setDefaultViewpoint}
            onDelete={deleteViewpoint}
          />
        ))}
      </div>
    </div>
  );
}

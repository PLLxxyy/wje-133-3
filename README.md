# wje-133 BIM 3D 可视化查看器

这是一个基于 React 18、TypeScript、Vite、Three.js 与 Tailwind CSS 的纯前端建筑信息模型（BIM）查看器。项目面向建筑、结构与 BIM 协调人员，提供楼层切换、构件属性查看、视角管理、标注管理和剖切分析能力，数据通过 Dexie IndexedDB 写入并带 localStorage 降级。

## 功能列表

- `/viewer`：3D 主视图，支持楼层显隐、透明度调整、构件点击选中、标注定位和剖面显示。
- `/viewpoints`：视角管理，支持保存当前视角、切换视角、设置默认视角和删除视角。
- `/elements`：构件浏览器，按楼层分组展示构件，支持搜索和跳转定位。
- `/annotations`：标注管理，支持按问题、说明、变更筛选，添加和删除标注。
- `/sections`：剖面分析，支持创建剖面、激活停用和调整剖切距离。
- 深色/浅色主题切换，场景背景和页面 CSS 变量同步。
- 全局 ErrorBoundary、IndexedDB 异常 fallback、Three.js 渲染配置封装。

## 启动方式

```bash
cd frontend
npm install
npm run dev
```

访问地址：http://localhost:18703

构建命令：

```bash
npm run build
```

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 前端框架 | React 18 + TypeScript |
| 构建工具 | Vite |
| 3D 引擎 | Three.js + @react-three/fiber + @react-three/drei |
| UI 样式 | Tailwind CSS + CSS Variables |
| 状态管理 | Zustand |
| 本地存储 | Dexie.js IndexedDB + localStorage fallback |
| 路由 | React Router v6 |

## 目录结构

```text
frontend/src/
├── api/                    # mockData.ts 模拟建筑模型数据
├── stores/                 # layer/element/viewpoint/annotation/section/theme stores
├── types/                  # model/element/viewpoint/annotation/section/enums 类型
├── components/common/      # LayerTree、PropertyPanel、AnnotationMarker 等共享组件
├── components/scene/       # SceneContainer、FloorGroup、ElementMesh 等 3D 场景组件
├── hooks/                  # useSceneManager、useLocalStorage、useRaycaster
├── pages/                  # Viewer、ViewpointManage、ElementBrowser 等页面
├── router/                 # React Router 配置
├── utils/                  # Dexie、颜色工具、threeUtils
├── constants/              # DEFAULT_VIEWPOINTS、ELEMENT_COLORS
└── styles/                 # theme.css、global.css
```

## 枚举出现位置

### ElementType

- `frontend/src/types/enums.ts`：枚举定义。
- `frontend/src/types/element.ts`：`BuildingElement.type` 字段类型。
- `frontend/src/api/mockData.ts`：模拟构件数据类型赋值。
- `frontend/src/constants/elementColors.ts`：按构件类型映射默认颜色。

### AnnotationType

- `frontend/src/types/enums.ts`：枚举定义。
- `frontend/src/types/annotation.ts`：`Annotation.type` 字段类型。
- `frontend/src/api/mockData.ts`：模拟标注数据类型赋值。
- `frontend/src/stores/annotationStore.ts`：标注筛选状态类型。
- `frontend/src/components/common/AnnotationMarker.tsx`：标注列表图标和中文标签映射。
- `frontend/src/components/scene/AnnotationBillboard.tsx`：3D 标注 Billboard 短标识映射。
- `frontend/src/pages/AnnotationManage.tsx`：标注筛选按钮和新增标注类型。

## License

MIT

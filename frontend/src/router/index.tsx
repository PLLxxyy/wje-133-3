import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AnnotationManage } from '../pages/AnnotationManage';
import { ElementBrowser } from '../pages/ElementBrowser';
import { SectionAnalysis } from '../pages/SectionAnalysis';
import { Viewer } from '../pages/Viewer';
import { ViewpointManage } from '../pages/ViewpointManage';
import { AppShell } from '../App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/viewer" replace /> },
      { path: 'viewer', element: <Viewer /> },
      { path: 'viewpoints', element: <ViewpointManage /> },
      { path: 'elements', element: <ElementBrowser /> },
      { path: 'annotations', element: <AnnotationManage /> },
      { path: 'sections', element: <SectionAnalysis /> },
      { path: '*', element: <Navigate to="/viewer" replace /> }
    ]
  }
]);

import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // /students/3 and /students/7 are different pages made from one route.
  // The build cannot prerender them without a list of every id, so the
  // server builds these pages when somebody asks for them.
  {
    path: 'students/:id',
    renderMode: RenderMode.Server,
  },
  // These pages depend on the browser (cookies and storage), so the server
  // does not draw them. The browser does. Explained in a later lab.
  { path: 'login', renderMode: RenderMode.Client },
  { path: 'profile', renderMode: RenderMode.Client },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];

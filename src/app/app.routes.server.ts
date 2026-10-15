import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // The story page has a route parameter (:id), which cannot be prerendered
  // without a list of ids, so it is rendered in the browser instead.
  {
    path: 'students/:id',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];

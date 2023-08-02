import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'categoria/:categoria',
    loadChildren: () => import('./pages/categoria/categoria.module').then( m => m.CategoriaPageModule)
  },
  {
    path: 'detalles/:id',
    loadChildren: () => import('./pages/detalles/detalles.module').then(m => m.DetallesPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./pages/favoritos/favoritos.module').then( m => m.FavoritosPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./pages/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'offline',
    loadChildren: () => import('./pages/offline/offline.module').then( m => m.OfflinePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'direcciones',
    loadChildren: () => import('./pages/perfil/direccion/direcciones/direcciones.module').then( m => m.DireccionesPageModule)
  },
  {
    path: 'agregar-direcciones',
    loadChildren: () => import('./pages/perfil/direccion/agregar-direcciones/agregar-direcciones.module').then( m => m.AgregarDireccionesPageModule)
  },
  {
    path: 'datos',
    loadChildren: () => import('./pages/perfil/dato/datos/datos.module').then( m => m.DatosPageModule)
  },
  {
    path: 'tarjetas',
    loadChildren: () => import('./pages/perfil/tarjeta/tarjetas/tarjetas.module').then( m => m.TarjetasPageModule)
  },
  {
    path: 'pruebas-paginas',
    loadChildren: () => import('./pruebas/pruebas-paginas/pruebas-paginas.module').then( m => m.PruebasPaginasPageModule)
  },
  {
    path: 'compras',
    loadChildren: () => import('./pages/compras/compras.module').then( m => m.ComprasPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'actualizar-contra',
    loadChildren: () => import('./pages/actualizar-contra/actualizar-contra.module').then( m => m.ActualizarContraPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./pages/categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'comentarios',
    loadChildren: () => import('./pages/perfil/comentarios/comentarios.module').then( m => m.ComentariosPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/perfil/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'lista-busqueda/:busqueda',
    loadChildren: () => import('./pages/lista-busqueda/lista-busqueda.module').then( m => m.ListaBusquedaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

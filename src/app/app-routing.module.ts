import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AplicacionListComponent } from './components/aplicacion/aplicacion-list/aplicacion-list.component';
import { AplicacionDetailsComponent } from './components/aplicacion/aplicacion-details/aplicacion-details.component';
import { AddAplicacionComponent } from './components/aplicacion/add-aplicacion/add-aplicacion.component';
import { InfraestructuraAplicacionComponent } from './components/aplicacion/infraestructura-aplicacion/infraestructura-aplicacion.component';
import { CatalogoComponent } from './components/catalogo/catalogo-maestro/catalogo.component';
import { ServidorComponent } from './components/servidor/servidor.component';
import { EmpleadoComponent } from './components/rrhh/empleado/empleado.component';
import { LogsComponent } from './components/logs/logs.component';
import { RecursoAplicacionComponent } from './components/aplicacion/recurso-aplicacion/recurso-aplicacion.component';
import { RecursosComponenteComponent } from './components/arquitectura/recursos-componente/recursos-componente.component';
import { TecnologiaAplicacionComponent } from './components/aplicacion/tecnologia-aplicacion/tecnologia-aplicacion.component';
import { DocumentacionComponent } from './components/documentacion/documentacion/documentacion.component';
import { DocumentacionArquitecturaComponent } from './components/documentacion/documentacion-arquitectura/documentacion-arquitectura.component';
import { ArquitecturaEstandarComponent } from './components/arquitectura/arquitectura-estandar/arquitectura-estandar.component';
import { DocumentacionAplicacionComponent } from './components/documentacion/documentacion-aplicacion/documentacion-aplicacion.component';
import { HitoRequerimientoComponent } from './components/arquitectura/hito-requerimiento/hito-requerimiento.component';
import { LoginComponent } from './components/generic/login/login.component';
import { LogoutComponent } from './components/generic/logout/logout.component';
import { AdminUsuariosComponent } from './components/usuarios/admin-usuarios/admin-usuarios.component';
import { RegisterComponent } from './components/usuarios/register/register.component';
import { EcrComponent } from './components/arquitectura/ecr/ecr.component';
//import { AuthGaurdService } from './services/generico/auth-gaurd.service';

const routes: Routes = [
  { path: '', redirectTo: 'aplicacion', pathMatch: 'full' },
  { path: 'aplicacionTecnologia', component: TecnologiaAplicacionComponent },
  { path: 'adminUser', component: AdminUsuariosComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'aplicacion', component: AddAplicacionComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'servidor', component: ServidorComponent },
  { path: 'empleado', component: EmpleadoComponent },
  { path: 'documentacion', component: DocumentacionComponent },
  { path: 'documentacionArq', component: DocumentacionArquitecturaComponent },
  { path: 'arquitecturaRecurso', component: RecursosComponenteComponent },
  { path: 'documentacionApp', component: DocumentacionAplicacionComponent },
  { path: 'hitoRequerimiento', component: HitoRequerimientoComponent },
  { path: 'estandar', component: ArquitecturaEstandarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent},
  { path: 'ecr', component: EcrComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

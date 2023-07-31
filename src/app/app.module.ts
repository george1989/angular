import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAplicacionComponent } from './components/aplicacion/add-aplicacion/add-aplicacion.component';
import { AplicacionListComponent } from './components/aplicacion/aplicacion-list/aplicacion-list.component';
import { AplicacionDetailsComponent } from './components/aplicacion/aplicacion-details/aplicacion-details.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CatalogoComponent } from './components/catalogo/catalogo-maestro/catalogo.component';
import { CatalogoDetalleComponent } from './components/catalogo/catalogo-detalle/catalogo-detalle.component';
import { MatTableModule } from '@angular/material/table';
import { ServidorComponent } from './components/servidor/servidor.component' 
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatNativeDateModule} from '@angular/material/core';
import { MatSelectModule} from '@angular/material/select';
import { LogsComponent, LogsDialog } from './components/logs/logs.component';
import { InformacionAplicacionComponent } from './components/aplicacion/informacion-aplicacion/informacion-aplicacion.component';
import { InfraestructuraAplicacionComponent,InfraestructuraAplicacionDialog } from './components/aplicacion/infraestructura-aplicacion/infraestructura-aplicacion.component';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { RecursoAplicacionComponent,RecursoDialog } from './components/aplicacion/recurso-aplicacion/recurso-aplicacion.component';
///////////////////////////////////////////////////////
import {A11yModule} from '@angular/cdk/a11y';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import {CdkMenuModule} from '@angular/cdk/menu';
import {DialogModule} from '@angular/cdk/dialog';
import { TecnologiaAplicacionComponent } from './components/aplicacion/tecnologia-aplicacion/tecnologia-aplicacion.component';
import { FooterComponent } from './components/generic/footer/footer.component';
import { DocumentacionArquitecturaComponent,DocumentacionArquitecturaDialog } from './components/documentacion/documentacion-arquitectura/documentacion-arquitectura.component';
import { DocumentacionComponent } from './components/documentacion/documentacion/documentacion.component';
import { DocumentacionDialog } from './components/documentacion/documentacion/documentacion.component';
import { DocumentacionAplicacionComponent,DocumentacionAplicacionDialog } from './components/documentacion/documentacion-aplicacion/documentacion-aplicacion.component';
import { ComponenteAplicacionComponent } from './components/aplicacion/componente-aplicacion/componente-aplicacion.component';
import { InfraestructuraComponenteComponent } from './components/aplicacion/infraestructura-componente/infraestructura-componente.component';
import { RecursosComponenteComponent, RecursosComponenteDialog } from './components/arquitectura/recursos-componente/recursos-componente.component';
import { HitoRequerimientoComponent } from './components/arquitectura/hito-requerimiento/hito-requerimiento.component';
import { TareaRequerimientoComponent } from './components/arquitectura/tarea-requerimiento/tarea-requerimiento.component';
import { IntegracionAplicacionComponent } from './components/aplicacion/integracion-aplicacion/integracion-aplicacion.component';
import { ArquitecturaEstandarComponent } from './components/arquitectura/arquitectura-estandar/arquitectura-estandar.component';
import { EstandarLogicaComponent } from './components/arquitectura/estandar-logica/estandar-logica.component';
import { EstandarRecursoComponent } from './components/arquitectura/estandar-recurso/estandar-recurso.component';
import { HeaderComponent } from './components/generic/header/header.component';
import { LoginComponent } from './components/generic/login/login.component';
import { LogoutComponent } from './components/generic/logout/logout.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { RegisterComponent } from './components/usuarios/register/register.component';
import { AdminUsuariosComponent } from './components/usuarios/admin-usuarios/admin-usuarios.component';
import { EmpleadoComponent } from './components/rrhh/empleado/empleado.component';
import { EcrComponent,EcrComponentDialog } from './components/arquitectura/ecr/ecr.component';

/////////////////////////////////////////////////////////////




@NgModule({
  declarations: [
    AppComponent,
    AddAplicacionComponent,
    AplicacionListComponent,
    AplicacionDetailsComponent,
    CatalogoComponent,
    CatalogoDetalleComponent,
    ServidorComponent,
    LogsComponent,
    LogsDialog,
    InformacionAplicacionComponent,
    InfraestructuraAplicacionComponent,
    InfraestructuraAplicacionDialog,
    RecursoAplicacionComponent,
    RecursoDialog,
    TecnologiaAplicacionComponent,
    FooterComponent,
    DocumentacionArquitecturaComponent,
    DocumentacionArquitecturaDialog,
    DocumentacionComponent,
    DocumentacionDialog,
    DocumentacionAplicacionComponent,
    DocumentacionAplicacionDialog,
    ComponenteAplicacionComponent,
    InfraestructuraComponenteComponent,
    RecursosComponenteComponent,
    RecursosComponenteDialog,
    EcrComponentDialog,
    HitoRequerimientoComponent,
    TareaRequerimientoComponent,
    IntegracionAplicacionComponent,
    ArquitecturaEstandarComponent,
    EstandarLogicaComponent,
    EstandarRecursoComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    AdminUsuariosComponent,
    EmpleadoComponent,
    EcrComponent
  ],
  imports: [
    CdkTableModule,
    CdkTreeModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    A11yModule,
    CdkAccordionModule,
    ClipboardModule,
    DragDropModule,
    PortalModule,
    ScrollingModule,
    CdkStepperModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    CdkMenuModule,
    DialogModule
/////////////////////
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
  entryComponents: [
    RecursoAplicacionComponent
  ]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { BannerComponent } from './banner/banner.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { ItemCarrouselComponent } from './item-carrousel/item-carrousel.component';
import { PromocionesComponent } from './promociones/promociones.component';
import { FooterComponent } from './footer/footer.component';
import { ContenidoCategoriaComponent } from './contenido-categoria/contenido-categoria.component';
import { CarrouselCategoriasComponent } from './carrousel-categorias/carrousel-categorias.component';
import { CarrouselImagenesDetallesComponent } from './carrousel-imagenes-detalles/carrousel-imagenes-detalles.component';
import { EstrellasComponent } from './estrellas/estrellas.component';
import { MaterialModule } from '../material.module';
import { CompDireccionesComponent } from './direccion/comp-direcciones/comp-direcciones.component';
import { CompAgregarDireccionesComponent } from './direccion/comp-agregar-direcciones/comp-agregar-direcciones.component';
import { CompTarjetasComponent } from './tarjeta/comp-tarjetas/comp-tarjetas.component';
import { CompAgregarTarjetasComponent } from './tarjeta/comp-agregar-tarjetas/comp-agregar-tarjetas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaypalComponent } from './paypal/paypal.component';
import { HeaderbackComponent } from './headerback/headerback.component';
import { EstrellasCommentariosComponent } from './estrellas-commentarios/estrellas-commentarios.component';
import { ItemCarrouselCategoriasComponent } from './item-carrousel-categorias/item-carrousel-categorias.component';



@NgModule({
  declarations: [
    HeaderComponent,
    BannerComponent,
    CarrouselComponent,
    ItemCarrouselComponent,
    PromocionesComponent,
    FooterComponent,
    ContenidoCategoriaComponent,
    CarrouselCategoriasComponent,
    CarrouselImagenesDetallesComponent,
    EstrellasComponent,
    CompDireccionesComponent,
    CompAgregarDireccionesComponent,
    CompTarjetasComponent,
    CompAgregarTarjetasComponent,
    PaypalComponent,
    HeaderbackComponent,
    EstrellasCommentariosComponent,
    ItemCarrouselCategoriasComponent
  ],
  exports: [
    HeaderComponent,
    BannerComponent,
    CarrouselComponent,
    ItemCarrouselComponent,
    PromocionesComponent,
    FooterComponent,
    ContenidoCategoriaComponent,
    CarrouselCategoriasComponent,
    CarrouselImagenesDetallesComponent,
    EstrellasComponent,
    CompDireccionesComponent,
    CompAgregarDireccionesComponent,
    CompTarjetasComponent,
    CompAgregarTarjetasComponent,
    PaypalComponent,
    HeaderbackComponent,
    EstrellasCommentariosComponent,
    ItemCarrouselCategoriasComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule 
  ]
})
export class ComponentsModule { }

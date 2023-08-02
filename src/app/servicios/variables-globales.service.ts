import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap,timeout, catchError } from 'rxjs/operators';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariablesGlobalesService {

  logeado: any;

  public appConfig = {
    flagProduccion      : false,                                         // Bandera para indica si está en producción o en QA
    url          : 'https://richpdx.bsite.net/api/',  // URL de API PROD

    urlConfig          : 'https://richpdx.bsite.net/api/AppConfig/',  // URL de API PROD

    urlClient          : 'https://richpdx.bsite.net/api/client/',  // URL de API PROD

    urlCart          : 'https://richpdx.bsite.net/api/Cart/',  // URL de API PROD

    urlFavorito          : 'https://richpdx.bsite.net/api/Favorites/',  // URL de API PROD

    urlProducts          : 'https://richpdx.bsite.net/api/Products/',  // URL de API PROD

    urlRating          : 'https://richpdx.bsite.net/api/Rating/',  // URL de API PROD
  
    versionIos          : '1.0.5',                                  // Versión de iOS en APP
    versionAndroid      : '1.0.15',                                  // Versión de Android en APP
    buildIos            : '202303171033',                           // Versión del Build de iOS en APP
    buildAndroid        : '202303171033',                           // Versión del Build de Android en APP

    // oneSignaEnable      : true,                                     // Habilita el uso de oneSignal en la APP
    // oneSignalKey        : 'a4c7ada1-2205-48ab-958c-e5479deed8d2',   // Key de OneSignal
    // oneSignalUnsuscribe : true,                                     // [true]: Usa el método de OneSignal. [false]: Usa Settings

    loginProd           : false,                                     // true: El login busca la info en producción. false: Usa la base de QA
    tiempoConexion      : 60000,                                    // Tiempo para los timeOut de los servicios (ms)
    //tiempoIntervalo: 60000                                        //Tiempo para los intervalos de recarga en permisos
    tiempoIntervalo     : 600000                                    //Tiempo para los intervalos de recarga en permisos
  };

  private userID: any;

  public rutasImagenes = {
    logo                 : 'assets/logos/paradox-transparent.png',           // Logo principal de la empresa
    producto                 : 'assets/productos/tenis.png',           // Logo principal de la empresa
  };

  toast: HTMLIonToastElement | null = null;

  constructor(public http: HttpClient,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    private toastController: ToastController) { }


  public getHttpHeaders(){
    return new HttpHeaders({
      'content-Type':'application/x-www-form-urlencoded',
      'Content-Type': 'application/json'
    });


  }





  ///////CONFIGURACION////////////7
  obtenerConfiguracion()
  {
    const endPoint = 'GetAppConfig';

    return this.http.get(this.appConfig.urlConfig + endPoint, { headers: this.getHttpHeaders() }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((err) => {
        this.errorServer(err.error);
        throw err;
      })
    );

  }

  actualizarConfiguracion(dataToSend: any) {
    const endPoint = 'UpdateColors?';

    
  
    const url = this.appConfig.urlConfig + endPoint + dataToSend;
    const headers = this.getHttpHeaders();

    
    return this.http.put(url, null, { headers: headers, responseType: 'text' }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
  
        throw error;
      })
    );
  }


  actualizarSlider(id: any, formData: FormData) {
    const endPoint = 'UpdateSlider?';
    const url = this.appConfig.urlConfig + endPoint + 'idslider=' + id;
    const headers = this.getHttpHeaders();


    console.log('---------formData',url+formData);


    
  
    return this.http.put(url, formData, { responseType: 'text' }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
        throw error;
      })
    );



    
    
  }
  
  actualizarBanner(id: any, formData: FormData) {
    const endPoint = 'UpdateBanner?';
    const url = this.appConfig.urlConfig + endPoint + 'idbanner=' + id;
    const headers = this.getHttpHeaders();


    console.log('---------formData',url+formData);


    
  
    return this.http.put(url, formData, { responseType: 'text' }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
        throw error;
      })
    );



    
    
  }



  ///////CLIENT/////////
  /**
   *
   */
  login(dataToSend:any)
  {
    const endPoint = 'Login?';
    const slug = 'client/';

    return this.http.post(this.appConfig.urlClient + endPoint + dataToSend, { headers: this.getHttpHeaders() }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((err) => {
        
        this.errorServer(err.error);

        throw err;
      })
    );
  }

  registro(dataToSend: any) {
    const endPoint = 'Register?';
  
    const url = this.appConfig.urlClient + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.post(url, null, { headers: headers, responseType: 'text' }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
  
        throw error;
      })
    );
  }

  obtenerInfoUser(dataToSend: any) {
    

    const endPoint = 'GetInfoUser?';
  
    const url = this.appConfig.urlClient + endPoint + dataToSend;

    // console.log(url);
    
    const headers = this.getHttpHeaders();
  
    return this.http.get(url, { headers: headers }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
        throw error;
      })
    );
  }

  actualizarInfoUser(dataToSend: any) {
    const endPoint = 'UpdateUserData?';
  
    const url = this.appConfig.urlClient + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.put(url, null, { headers: headers, responseType: 'text' }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
  
        throw error;
      })
    );
  }

  obtenerCodigo(dataToSend: any) {

    const endPoint = 'SendRecoveryCode?';
  
    const url = this.appConfig.urlClient + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.post(url, null, { headers: headers, responseType: 'text' }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
  
        throw error;
      })
    );
  }

  actualizarContra(dataToSend: any) {

    const endPoint = 'UpdatePassword?';
  
    const url = this.appConfig.urlClient + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.put(url, null, { headers: headers, responseType: 'text' }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
  
        throw error;
      })
    );
  }

  


  ///////////CARRITO///////////////

  agregarCarrito(dataToSend: any) {

    const endPoint = 'insertItem?';
  
    const url = this.appConfig.urlCart + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.post(url, null, { headers: headers, responseType: 'text' }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
  
        throw error;
      })
    );
  }


  obtenerCarrito(dataToSend: any) {
    const endPoint = 'GetItem?';
  
    const url = this.appConfig.urlCart + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.get(url, { headers: headers }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
        throw error;
      })
    );
  }
  

  eliminarItemCarrito(dataToSend: any) {
    const endPoint = 'DeleteItem?';
  
    const url = this.appConfig.urlCart + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.delete(url, { headers: headers, responseType: 'text' }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
  
        throw error;
      })
    );
  }
  
  actualizarItemCarrito(dataToSend: any) {
    const endPoint = 'UpdateCartItem?';
  
    const url = this.appConfig.urlCart + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.put(url, null, { headers: headers, responseType: 'text' }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
  
        throw error;
      })
    );
  }


  agregarCompraRealizada(dataToSend: any, IdDomicilio: any) {


    const id = 'userid=' + localStorage.getItem('id');

    const idDomicilio = '&idAddress=' + IdDomicilio

    const endPoint = 'insertPurchase?';
  
    const url = this.appConfig.urlCart + endPoint + id + idDomicilio;
    const headers = this.getHttpHeaders();
  
    return this.http.post(url, dataToSend, { headers: headers, responseType: 'text' }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
  
        throw error;
      })
    );
  }

  obtenerTotalCompras(dataToSend: any) {
    const endPoint = 'GetCartItemsTotalSum?';
  
    const url = this.appConfig.urlCart + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.get(url, { headers: headers, responseType: 'text' }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
  
        throw error;
      })
    );
  }

  obtenerCompras(dataToSend: any) {
    const endPoint = 'GetPurchases?';
  
    const url = this.appConfig.urlCart + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.get(url, { headers: headers }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
        throw error;
      })
    );
  }

  eliminarCarrito(dataToSend: any) {
    const endPoint = 'DeleteCart?';
  
    const url = this.appConfig.urlCart + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.delete(url, { headers: headers, responseType: 'text' }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
  
        throw error;
      })
    );
  }


  ////////FAVORITOS/////////

  agregarFavorito(dataToSend: any) {
    const endPoint = 'InsertItem?';
  
    const url = this.appConfig.urlFavorito + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.post(url, null, { headers: headers, responseType: 'text' }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
  
        throw error;
      })
    );
  }


  obtenerFavoritos(dataToSend: any) {

    const endPoint = 'GetFavoriteItems?';
  
    const url = this.appConfig.urlFavorito + endPoint + dataToSend;

    // console.log(url);
    
    const headers = this.getHttpHeaders();
  
    return this.http.get(url, { headers: headers }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
        throw error;
      })
    );
  }

  eliminarItemFavorito(dataToSend: any) {
    const endPoint = 'DeleteItem?';
  
    const url = this.appConfig.urlFavorito + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.delete(url, { headers: headers, responseType: 'text' }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
  
        throw error;
      })
    );
  }


  eliminarFavoritos(dataToSend: any) {
    const endPoint = 'DeleteCart?';
  
    const url = this.appConfig.urlFavorito + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.delete(url, { headers: headers, responseType: 'text' }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
  
        throw error;
      })
    );
  }

  obtenerIsFavorite(dataToSend: any) {

    const endPoint = 'GetIsFavorite?';
  
    const url = this.appConfig.urlFavorito + endPoint + dataToSend;

    // console.log(url);
    
    const headers = this.getHttpHeaders();
  
    return this.http.get(url, { headers: headers }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
        throw error;
      })
    );
  }

  
  //////////DIRECCIONES////////

  agregarDireccion(dataToSend: any) {
    const endPoint = 'InsertAddress';
    const url = this.appConfig.urlClient + endPoint;
    const headers = this.getHttpHeaders();
  
    return this.http.post(url, dataToSend, { headers: headers, responseType: 'text' }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          console.error('Ocurrió un error:', error.error.message);
        } else {
          // Error del lado del servidor
          console.error('Error en la solicitud:', error);
          try {
            const errorJson = JSON.parse(error.error);
            // console.log('Errores:', errorJson.errors);
            // Accede a los errores específicos aquí, por ejemplo:
            // console.log('Error en domicilio:', errorJson.errors.domicilio);
            // console.log('Error en cp:', errorJson.errors['$.cp']);
          } catch (e) {
            console.error('Error al analizar la respuesta:', e);
          }
        }
        return throwError(error);
      })
    );
  }

  eliminarDireccion(dataToSend: any) {
    const endPoint = 'DeleteAddress?';
  
    const url = this.appConfig.urlClient + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.delete(url, { headers: headers, responseType: 'text' }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
  
        throw error;
      })
    );
  }

  
  obtenerDirecciones(dataToSend: any) {

    const endPoint = 'GetAddress?';
  
    const url = this.appConfig.urlClient + endPoint + dataToSend;

    // console.log(url);
    
    const headers = this.getHttpHeaders();
  
    return this.http.get(url, { headers: headers }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
        throw error;
      })
    );
  }



  //////PRODUCTOS//////

  obtenerProductosPDX(dataToSend?: any) {
    const endPoint = 'GetProducts?';
  
    const url = this.appConfig.urlProducts + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.get(url, { headers: headers }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
        throw error;
      })
    );
  }

  obtenerProductoPDX(dataToSend?: any) {
    const endPoint = 'GetProduct/';
  
    const url = this.appConfig.urlProducts + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.get(url, { headers: headers }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
        throw error;
      })
    );
  }
  
  obtenerCategoria(dataToSend?: any) {
    const endPoint = 'GetProductsByCategory/';
  
    const url = this.appConfig.urlProducts + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.get(url, { headers: headers }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
        throw error;
      })
    );
  }

  buscarProductosPDX(dataToSend?: any) {
    const endPoint = 'SearchItems?';
  
    const url = this.appConfig.urlProducts + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.get(url, { headers: headers }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
        throw error;
      })
    );
  }
  buscarProductosCompletosPDX(dataToSend?: any) {
    const endPoint = 'SearchComplete?';
  
    const url = this.appConfig.urlProducts + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.get(url, { headers: headers }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
        throw error;
      })
    );
  }




  //////COMENTARIOS//////////

  obtenerComentario(dataToSend?: any) {
    const endPoint = 'GetComments?';
  
    const url = this.appConfig.urlRating + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.get(url, { headers: headers }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
        throw error;
      })
    );
  }

  insertarComentario(dataToSend: any) {
    const endPoint = 'InsertComment?';
  
    const url = this.appConfig.urlRating + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.post(url, null, { headers: headers, responseType: 'text' }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((err) => {
        
        this.errorServer(err.error);

        throw err;
      })
    );
  }

  obtenerComentarioEspecifico(dataToSend?: any) {
    const endPoint = 'GetCommentsByUser?';
  
    const url = this.appConfig.urlRating + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.get(url, { headers: headers }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
        throw error;
      })
    );
  }

  eliminarComentario(dataToSend: any) {
    const endPoint = 'DeleteCommentsUser?';
  
    const url = this.appConfig.urlRating + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.delete(url, { headers: headers, responseType: 'text' }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
  
        throw error;
      })
    );
  }

  actualizarComentario(dataToSend: any) {
    const endPoint = 'UpdateCommentsUser?';
  
    const url = this.appConfig.urlRating + endPoint + dataToSend;
    const headers = this.getHttpHeaders();
  
    return this.http.put(url, null, { headers: headers, responseType: 'text' }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((error: any) => {
        this.errorServer(error);
  
        throw error;
      })
    );
  }




  //////////
  //Metodos generales
  /////////





  /**
  * Log
  */
      public log(...args: any[]): void {
        if (!this.appConfig.flagProduccion) {
          // en produccion se deshabitan logs
          console.log(...args);
        }
      }

    /**
   * Muestra una alerta con un retraso
   *
   */
    async showAlert(properties: any, timer?: number){

      if (typeof timer === 'undefined') {
        timer = 700;
      }
  
      // Agrego la propiedad para que no se cierre la ventana
      if(typeof properties.backdropDismiss === 'undefined'){
        properties.backdropDismiss = false;
      }
  
      setTimeout(async ()=>{
          const alert = await this.alertController.create(properties);
          alert.present();
      }, timer);
    }

    /**
     * Muestra el loder cuando se llama un servicio
     *
     * @param texto Texto del mensaje
     */
    public showLoader(texto: any) {
      // this.log('Abriendo Spiner..........', texto);
      this.loadingCtrl.create({
        message: texto,
      }).then((res) => {
        res.present();
    });
  }

    /**
    * Oculta el Loader
    */
    public hideLoader(goTo?: string, timer?: number){

      if (typeof timer === 'undefined') {
        timer = 700;
      }

      // this.log('Ocultando Spiner..........', goTo, timer);

      setTimeout(()=>{
        this.loadingCtrl.dismiss().then((response: any) => {
          // this.log('RESPUESTA de hideLoader: ', response);

          if(typeof goTo !== 'undefined' && goTo !==''){
            window.location.href = goTo;
          }

        }).catch((err) => {
            // this.log('ERROR en hideLoader: ', err);
        });
      }, timer);
    }


    async errorServer(error: any){

      this.hideLoader('');

      this.error('ERROR DE SERVICIO::::', error);

      let headerTxt = '';
      let texto = '';

        
        texto = error;


      //.................................
      // ALERTA
      //.................................

      this.showAlert({
        // header: headerTxt,
        subHeader: texto,
        buttons: [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            
          }
        }],
      });

    }

    
  public async presentAlert(titulo: any, mensaje: any) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

    /**
   * Error Log
   */
    public error(...args: any[]): void {
      if (!this.appConfig.flagProduccion) {
        // en produccion se deshabitan logs
        console.error(...args);
      }
    }


     /**
   * Muestra un alert con un texto dinamico
   *
   * @param txt Texto del mensaje
   */
  async mensaje(txt: string){

    this.showAlert({
      header: 'Aviso',
      subHeader: txt,
      buttons: ['OK'],
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }


  public checkLogin(){
    this.logeado = localStorage.getItem('id');
    
    if(this.logeado){
      this.logeado = true
    }
    else{
      this.logeado = false;
    }

    return this.logeado

    // console.log('----------Contenido del LS log',this.logeado);
    
  }

}

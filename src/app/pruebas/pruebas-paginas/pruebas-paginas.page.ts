import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';

@Component({
  selector: 'app-pruebas-paginas',
  templateUrl: './pruebas-paginas.page.html',
  styleUrls: ['./pruebas-paginas.page.scss'],
})
export class PruebasPaginasPage implements OnInit {
  contenidoCarrito: any;

  public progress = 0;

  dataFromService: any;
  datosPersonales: any;
  idUsuario: any;
  datosPDX: any;
  datos: any;

  selectedColor: any;

  mostrarNombre1: string | undefined;
  mostrarNombre2: string | undefined;
  mostrarNombre3: string | undefined;
  mostrarNombre4: string | undefined;
  mostrarNombre5: string | undefined;

  loadingProgress1: number = 0;
  loadingProgress2: number = 0;
  loadingProgress3: number = 0;
  loadingProgress4: number = 0;
  loadingProgress5: number = 0;


  percentLoaded: any;
  direccionElegida: any;
  idElegida: any;

  selectedFile: File | null = null;
  previewImage1: string | ArrayBuffer | null = null;
  previewImage2: string | ArrayBuffer | null = null;
  previewImage3: string | ArrayBuffer | null = null;
  previewImage4: string | ArrayBuffer | null = null;
  previewImage5: string | ArrayBuffer | null = null;



  constructor(public variables: VariablesGlobalesService,
    private alertController: AlertController) { }

  async onFileSelected(event: any, id: any, direccion: any) {

    this.direccionElegida = direccion;
    this.idElegida = id;

    console.log('------------a donde irá', direccion);


    this.selectedFile = event.target.files[0];

    console.log(this.selectedFile);

    if (this.selectedFile) {
      const reader = new FileReader();

      reader.onloadstart = (event) => {
        console.log('Carga de imagen iniciada');
      };
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          this.percentLoaded = Math.round((event.loaded / event.total) * 100);



        }
      };


      reader.onload = () => {


        if (direccion == 'banner') {
          console.log('Banner');
          this.validateImageDimensionsBanners(id, reader.result);
        } else {
          console.log('Slider');

          this.validateImageDimensionsSliders(id, reader.result);
        }


      };

      reader.onloadend = (event) => {
        console.log('Carga de imagen finalizada');
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  triggerFileInput(fileInput: any) {
    fileInput.click();
  }


  validateImageDimensionsSliders(id: any, imageData: string | ArrayBuffer | any) {
    const img = new Image();
    img.onload = () => {
      const width = img.width;
      const height = img.height;


      console.log('Validacion sliders', width, height);

      if (width !== 1280 || height !== 640) {
        this.variables.presentToast('La imagen seleccionada no cumple con las dimensiones requeridas.');
        // No cumple con las dimensiones, establecer previewImage como null
        this.selectedFile = null; // Restablecer el valor de selectedFile a null

      } else {
        // this.previewImage = imageData; // Cumple con las dimensiones, establecer previewImage con el imageData
        this.cargarNombre(this.selectedFile?.name);
        this.actualizarSlider(id, this.selectedFile);
        this.cargarProgressBar(imageData);
      }
    };
    img.src = imageData as string;
  }



  validateImageDimensionsBanners(id: any, imageData: string | ArrayBuffer | any) {
    const img = new Image();
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      if (width !== 1920 || height !== 650) {
        this.variables.presentToast('La imagen seleccionada no cumple con las dimensiones requeridas.');
        this.selectedFile = null; // Restablecer el valor de selectedFile a null
      } else {// Cumple con las dimensiones, establecer previewImage con el imageData
        this.cargarNombre(this.selectedFile?.name);
        this.actualizarBanner(id, this.selectedFile);
        this.cargarProgressBar(imageData);
      }
    };
    img.src = imageData as string;
  }


  cargarNombre(nombre: any) {
    if (this.idElegida == '1' && this.direccionElegida == 'banner') {
      this.mostrarNombre1 = nombre;
    }
    if (this.idElegida == '2' && this.direccionElegida == 'banner') {
      this.mostrarNombre2 = nombre;
    }
    if (this.idElegida == '1' && this.direccionElegida == 'slider') {
      this.mostrarNombre3 = nombre;
    }
    if (this.idElegida == '2' && this.direccionElegida == 'slider') {
      this.mostrarNombre4 = nombre;
    }
    if (this.idElegida == '3' && this.direccionElegida == 'slider') {
      this.mostrarNombre5 = nombre;
    }
  }

  cargarProgressBar(img: any) {
    if (this.idElegida == '1' && this.direccionElegida == 'banner') {
      this.loadingProgress1 = this.percentLoaded;
      this.previewImage1 = img
    }
    if (this.idElegida == '2' && this.direccionElegida == 'banner') {
      this.loadingProgress2 = this.percentLoaded;
      this.previewImage2 = img
    }
    if (this.idElegida == '1' && this.direccionElegida == 'slider') {
      this.loadingProgress3 = this.percentLoaded;
      this.previewImage3 = img
    }
    if (this.idElegida == '2' && this.direccionElegida == 'slider') {
      this.loadingProgress4 = this.percentLoaded;
      this.previewImage4 = img
    }
    if (this.idElegida == '3' && this.direccionElegida == 'slider') {
      this.loadingProgress5 = this.percentLoaded;
      this.previewImage5 = img
    }
  }


  cargarProgressBarCero() {
    if (this.idElegida == '1' && this.direccionElegida == 'banner') {
      this.loadingProgress1 = 0;
    }
    if (this.idElegida == '2' && this.direccionElegida == 'banner') {
      this.loadingProgress2 = 0;
    }
    if (this.idElegida == '1' && this.direccionElegida == 'slider') {
      this.loadingProgress3 = 0;
    }
    if (this.idElegida == '2' && this.direccionElegida == 'slider') {
      this.loadingProgress4 = 0;
    }
    if (this.idElegida == '3' && this.direccionElegida == 'slider') {
      this.loadingProgress5 = 0;
    }
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
      this.obtenerConfiguracion();
    }, 1000);
  }



  actualizarSlider(id: any, imagen: any) {

    const formData = new FormData();
    formData.append('imagen', imagen);


    this.variables.actualizarSlider(id, formData).subscribe(
      (response: any) => {
        // this.variables.log('Registro exitoso:', response);
        // this.obtenerConfiguracion();

        this.variables.presentToast('Slider actualizado!')

        this.cargarProgressBarCero();
      },
      (error: any) => {
        console.error('Error al registrar:', error);
        // Realiza las acciones necesarias en caso de error
      }
    );




  }

  actualizarBanner(id: any, imagen: any) {

    const formData = new FormData();
    formData.append('imagen', imagen);


    this.variables.actualizarBanner(id, formData).subscribe(
      (response: any) => {
        // this.variables.log('Registro exitoso:', response);
        // this.obtenerConfiguracion();

        this.variables.presentToast('Banner actualizado!')

        this.cargarProgressBarCero();
      },
      (error: any) => {
        console.error('Error al registrar:', error);
        // Realiza las acciones necesarias en caso de error
      }
    );




  }

  ngOnInit() {
    this.obtenerConfiguracion();

    window.addEventListener('beforeunload', () => {
      localStorage.clear();
    });
  }

  getColor() {

    this.datos = "primary=" + this.datosPDX.primarycolor.replace('#', '%23') + "&secondary=" + this.datosPDX.secondarycolor.replace('#', '%23');


    this.actualizarInfoConfig(this.datos);
  }


  ionViewDidEnter() {
    this.obtenerConfiguracion();
  }


  obtenerConfiguracion() {

    
    // this.previewImage1 = null;
    // this.previewImage2 = null;

    // this.previewImage3 = null;
    // this.previewImage4 = null;
    // this.previewImage5 = null;

    // this.datosPDX = null;


    // console.log('NULL',this.previewImage1,this.previewImage2,this.previewImage3,this.previewImage4,this.previewImage5,this.datosPDX);
    

    this.variables.obtenerConfiguracion().subscribe(
      async (dataReturnFromService: any) => {
        this.datosPDX = (dataReturnFromService);


        // console.log('-----Configuracion', this.datosPDX);


        document.documentElement.style.setProperty('--primary', this.datosPDX.primarycolor);
        document.documentElement.style.setProperty('--secondary', this.datosPDX.secondarycolor);

        this.previewImage1 = this.datosPDX.banners.banner1 + '?timestamp=' + Date.now();
        this.previewImage2 = this.datosPDX.banners.banner2 + '?timestamp=' + Date.now();

        this.previewImage3 = this.datosPDX.slider.slide1 + '?timestamp=' + Date.now();
        this.previewImage4 = this.datosPDX.slider.slide2 + '?timestamp=' + Date.now();
        // this.previewImage5 = this.datosPDX.slider.slide3;

        this.previewImage5 = this.datosPDX.slider.slide3 + '?timestamp=' + Date.now();


        // console.log('Con datos',this.previewImage1,this.previewImage2,this.previewImage3,this.previewImage4,this.previewImage5,this.datosPDX);

        

        this.mostrarNombre1 = 'Banner1 (1920x650)'
        this.mostrarNombre2 = 'Banner2 (1920x650)'

        this.mostrarNombre3 = 'Slider1 (1280x640)'
        this.mostrarNombre4 = 'Slider2 (1280x640)'
        this.mostrarNombre5 = 'Slider3 (1280x640)'
      }
    );


  }

  actualizarInfoConfig(data: any) {


    this.variables.actualizarConfiguracion(data).subscribe(
      (response: any) => {
        console.log('Registro exitoso:', response);
        this.obtenerConfiguracion();

        this.variables.presentToast('¡Informacion actualizada!')

      },
      (error: any) => {
        console.error('Error al registrar:', error);
        // Realiza las acciones necesarias en caso de error
      }
    );

  }







  ngOnDestroy(){
    localStorage.clear();
  }


  ionViewDidLeave(){
    localStorage.clear();
  }






}

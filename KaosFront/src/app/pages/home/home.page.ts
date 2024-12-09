import { Component, OnInit } from '@angular/core';
import SwiperCore, {
  Autoplay,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom,
} from 'swiper';
import { IonicSlides } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../model/user';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  slideOpts = {
    direction: 'vertical',
  };

  user: User;

  listEvents = [
    {
      name: 'Pachá Ibiza',
      image: '../../../assets/images/disco1.jpg',
    },
    {
      name: 'Ikebana',
      image: '../../../assets/images/disco2.jpg',
    },
    {
      name: 'La Antigua Estación',
      image: '../../../assets/images/torre_iffel.jpeg',
    },
    {
      name: 'HC',
      image: '../../../assets/images/disco1.jpg',
    },
  ];
  constructor(private _authService: AuthService) {}

  ngOnInit() {
    //Cargamos el usuario del localStorage
    this.user = this._authService.getUser();

    /*
      REVISAR COMO MANEJAR EL USUARIO LOGGEADO

    Para manejar el usuario no se si es mejor usar el localStorage y el Observable o únicamente el observable

    */
  }
}

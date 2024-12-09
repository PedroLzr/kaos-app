import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { IonItemGroup, IonModal } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CountriesService } from 'src/app/services/countries.service';

import { User } from 'src/app/model/user';
import { Country } from 'src/app/model/country';
import { element } from 'protractor';

@Component({
  selector: 'app-sign-phone',
  templateUrl: './sign-phone.page.html',
  styleUrls: ['./sign-phone.page.scss'],
})
export class SignPhonePage implements OnInit {
  user: User = new User();
  invalidForm: boolean;
  countries: any[];
  selectedCountry: Country = new Country();
  selectedCountryDefault: string;
  searchText: string;

  @ViewChild(IonModal) modal: IonModal;
  @ViewChildren(IonItemGroup, { read: ElementRef }) itemGroups: QueryList<any>;

  scroll = false;

  constructor(
    private router: Router,
    private _authService: AuthService,
    private _countriesService: CountriesService
  ) {}

  ngOnInit() {
    this.searchText = '';
    this.invalidForm = true;
    this.selectedCountryDefault = 'ES';
    this.countries = [];

    this._authService.getObjectSource
      .subscribe((data) => {
        this.user = data;
        console.log(this.user);
      })
      .unsubscribe();

    /* Lista de paises ordenaga y agrupada por la primera letra de su nombre */
    this._countriesService.getCountries().subscribe((data: Country[]) => {
      const countriesSorted = data.sort((a, b) => {
        if (a.name_es < b.name_es) {
          return -1;
        }
        if (a.name_es > b.name_es) {
          return 1;
        }
        return 0;
      });

      let last = null;
      for (let i = 0; i < countriesSorted.length; i++) {
        const country = countriesSorted[i];
        country.flag =
          'https://flagcdn.com/16x12/' + country.code_2.toLowerCase() + '.png';

        if (country.code_2 == this.selectedCountryDefault) {
          this.selectedCountry = country;
        }
        if (!last || last != country.name_es[0]) {
          last = country.name_es[0];

          this.countries.push({ key: last, countries: [] });
        }
        this.countries[this.countries.length - 1].countries.push(country);
      }
    });
  }

  validateInput(event) {
    var input: string = event.detail.value;

    if ('' != input) {
      this.invalidForm = false;
    } else {
      this.invalidForm = true;
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  selectCountry(countryNameEs) {
    var aux: any = this.countries.filter((x) => x.key == countryNameEs[0])[0];
    var newCountry: any = Object.values(aux.countries).filter(
      (x: any) => x.name_es == countryNameEs
    )[0];
    this.selectedCountry = newCountry;
    this.cancel();
  }

  scrollToLetter(letter) {
    for (let i = 0; i < this.countries.length; i++) {
      const group = this.countries[i];
      if (group.key == letter) {
        const group = this.itemGroups.filter((element, index) => index == i);
        if (group && group.length > 0) {
          const el = group[0];
          el.nativeElement.scrollIntoView();
        }
        return;
      }
    }
  }

  scrollActivated(event) {
    this.scroll = event;
  }

  inputSearchChange(event) {
    this.searchText = event.detail.value;
  }

  async checkUser() {
    this.user.phone = this.selectedCountry.dial_code + this.user.phone;

    //COMPROBAMOS SI LA PETICION NOS DEVUELVE UN TOKEN VALIDO O NO
    this._authService.login(this.user.userName, this.user.phone).subscribe(
      (resp) => {
        if (resp) {
          //Obtenemos el usuario que nos devuelve el login
          this._authService.getObjectSource
            .subscribe((data) => {
              this.user = data;
            })
            .unsubscribe();

          //Enviamos el usuario a la siguiente pantalla
          this._authService.sendObjectSource(this.user);

          this.router.navigate(['/tabs']);
        }
      },
      (err) => {
        if (err) {
          this._authService.getObjectSource
            .subscribe((data) => {
              this.user = data;
            })
            .unsubscribe();

          //Enviamos el usuario a la siguiente pantalla
          this._authService.sendObjectSource(this.user);

          this.router.navigate(['/sign-name']);
        }
      }
    );

    this._authService.getObjectSource
      .subscribe((data) => {
        this.user = data;
      })
      .unsubscribe();

    //Enviamos el usuario a la siguiente pantalla
    this._authService.sendObjectSource(this.user);
  }
}

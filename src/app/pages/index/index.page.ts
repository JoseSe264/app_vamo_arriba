import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  email!: string;
  password!: string;
  usuario!: string;

  constructor(
    private router: Router
  ) {
    if (this.router.getCurrentNavigation()?.extras.state){
      const datos = this.router.getCurrentNavigation()?.extras.state;
      this.email = datos?.['email'];
      this.password = datos?.['password'];
      this.usuario = datos?.['usuario'];
    }
  }

  ngOnInit() {
  }

}

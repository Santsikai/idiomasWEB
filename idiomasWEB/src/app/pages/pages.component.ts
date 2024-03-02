import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { UserService } from '../services/users/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  animations: [
    trigger('slidein', [
      transition(':enter', [
        // when ngif has true
        style({ transform: 'translateX(-100%)' }),
        animate(250, style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        // when ngIf has false
        animate(250, style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class PagesComponent {
  expanded: boolean = false;
  constructor(
    private userSV:UserService,
    private router:Router
    ){}
  logOut(){
    //cerrarsesion
    localStorage.clear();
    this.userSV.SignOut();
    this.router.navigate(['/']);
  }
}

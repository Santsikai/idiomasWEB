import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from '../services/users/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  expanded: boolean = false;
  userRol = localStorage.getItem('rol_Id');

  constructor(
    private userSV: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  toggleMenu() {
    this.expanded = !this.expanded;
    const menu = document.querySelector('#menu') as HTMLElement;
    const nav = document.querySelector('#nav') as HTMLElement;
    const menuToggle = document.querySelector('.nav__toggle') as HTMLElement;

    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', String(this.expanded));
    }
    if (menu) {
      menu.hidden = !this.expanded;
    }
    if (nav) {
      nav.classList.toggle('nav--open');
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvents(event: KeyboardEvent) {
    const menu = document.querySelector('#menu') as HTMLElement;
    const menuToggle = document.querySelector('.nav__toggle') as HTMLElement;

    if (!this.expanded || event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }

    const menuLinks = menu.querySelectorAll('.nav__link') as NodeListOf<HTMLAnchorElement>;
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === menuLinks[0]) {
          menuToggle?.focus();
          event.preventDefault();
        }
      } else if (document.activeElement === menuToggle) {
        menuLinks[0]?.focus();
        event.preventDefault();
      }
    }
  }
  closeMenu(): void {
    this.expanded = false;
  }
  logOut() {
    localStorage.clear();
    this.userSV.SignOut();
    this.router.navigate(['/']);
  }
}

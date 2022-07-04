import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'Usuário',  icon:'person', class: '' },
    { path: '/pesquisaIngredienteAtivo', title: 'Ingrediente Ativo',  icon:'content_paste', class: '' },
    { path: '/registroAmostra', title: 'Registro de Amostra',  icon:'science', class: '' },
    { path: '/', title: 'Relatório de Ensaio',  icon:'assessment', class: '' },
    //{ path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    //{ path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    //{ path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    //{ path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    //{ path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    //{ path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {/*
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  */
  return true;
};
}

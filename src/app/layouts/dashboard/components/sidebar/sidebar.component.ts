import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  collapsed = false;

  @Output()
    collapsedChange = new EventEmitter<boolean>();

  toogleCollapse(){
    this.collapsed = !this.collapsed;
  }

  closeSidebar(){
    this.collapsed = false;
  }
}

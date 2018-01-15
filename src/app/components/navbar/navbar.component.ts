import { Component, OnInit, Input } from '@angular/core';
import { Base64Service } from '../../_services/index';
@Component({
  moduleId: module.id,
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private base64Service: Base64Service) { }

  public currentUser: string = '';

  ngOnInit() {
    this.getCurrentUser();
  }
  @Input() balance: any;

  private getCurrentUser(): void {
    let authData = JSON.parse(localStorage.getItem('currentSession')),
        userData = this.base64Service.encode(authData.token);
    this.currentUser = userData.split(':')[0]
  }

}

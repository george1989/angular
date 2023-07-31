import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../../services/generico/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginInit=true;
  isLoginAdmin = false;
  user ='';
  email = '';
  roles: string[] = [];
  constructor( private tokenStorage: TokenStorageService,
    private router: Router){ }
  ngOnInit() {
    var currentDateObj = new Date();
    console.log(currentDateObj.getTime().toString());
    console.log(this.tokenStorage.getTimer());
    if(isNaN(this.tokenStorage.getTimer()))
    {
      this.tokenStorage.signOut();
      this.loginInit=false;
      this.router.navigate(['login']);
    }
    if(currentDateObj.getTime()>this.tokenStorage.getTimer())
    {
      this.tokenStorage.signOut();
      this.loginInit=false;
      this.router.navigate(['login']);
    }
    if(this.tokenStorage.getToken()=='' || this.tokenStorage.getToken()==null)
    {
      this.loginInit=false;
      this.router.navigate(['login']);
    }
    else{
      if(this.tokenStorage.getUser().state==2 || this.tokenStorage.getUser().state=='2'){
        this.router.navigate(['register']);
      }
      this.roles = this.tokenStorage.getUser().roles;
      if(this.roles.includes('ROLE_ADMIN'))
      {
        this.isLoginAdmin=true;
      }
    }
    this.user =this.tokenStorage.getUser().username;
    this.email =this.tokenStorage.getUser().email;
  }

}

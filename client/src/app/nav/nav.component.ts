import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgIf, TitleCasePipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule,BsDropdownModule,RouterLink,RouterLinkActive, TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountServices = inject(AccountService);
  private router = inject(Router)
  private toastr = inject(ToastrService)
  model: any = {};

  login(){
    this.accountServices.login(this.model).subscribe({
      next: response =>{
       this.router.navigateByUrl('/members')
        
      },
      error:error=> this.toastr.error(error.error)
    });
  }
  logout(){
    this.accountServices.logout();
    this.router.navigateByUrl('/')
  }
}

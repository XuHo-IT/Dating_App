import { Component } from '@angular/core';
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   regiterMode = false;
  
   registerToogle(){
    this.regiterMode = !this.regiterMode
   }
   cancelRegisterMode(event:boolean){
    this.regiterMode=event;
   }
  
}

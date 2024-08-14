import { HttpClient} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_model/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private http = inject(HttpClient);
  baseUrl =environment.apiUrl;

  getMembers(){
     return this.http.get<Member[]>(this.baseUrl+ 'user');
   }
   getMember(username:string){
     return this.http.get<Member>(this.baseUrl+'user/'+username);
   }
   
}
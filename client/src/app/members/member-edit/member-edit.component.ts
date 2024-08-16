import { Component, Host, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_model/member';
import { AccountService } from '../../_services/account.service';
import { MemberService } from '../../_services/member.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule,FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm?:NgForm
  @HostListener('window:beforeunload',['$event']) notify($event:any){
      if(this.editForm?.dirty){
        $event.returnValue = true;
      }
  }
  member?:Member;
  private accountService = inject(AccountService);
  private memberService = inject(MemberService);
  private toastr = inject(ToastrService);
  
  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){  
    const user = this.accountService.currentUser();
    if (!user) return;
    this.memberService.getMember(user.username).subscribe({
      next:member =>this.member = member
    })
  } 
  updateMember() {
    if (this.member) {  
      this.memberService.updateMember(this.member).subscribe({
        next: () => {
          this.toastr.success('Profile updated successfully');
          this.editForm?.reset(this.member);
        },
        error: () => {
          this.toastr.error('Failed to update profile');
        }
      });
    } else {
      this.toastr.error('Member data is unavailable');
    }
  }
  
}

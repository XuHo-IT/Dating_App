import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
 busyReuqestCount =0;
 private spinnerService = inject(NgxSpinnerService);

 busy(){
  this.busyReuqestCount++;
  this.spinnerService.show(undefined,{
    type:'line-scale-party',
    bdColor: 'rgba(255,255,255,0)',
    color:'white',
  })
 }
 idle(){
  this.busyReuqestCount--;
  if(this.busyReuqestCount <=0){
    this.busyReuqestCount =0;
    this.spinnerService.hide();
  }
 }
}

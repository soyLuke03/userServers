import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServersComponent } from './servers/servers.component';



@NgModule({
  declarations: [
    ServersComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ServersComponent
  ]
})
export class ServersModule { }

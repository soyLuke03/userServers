import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Server } from '../interfaces/server.interfaces';
import { ServersService } from '../services/servers.service';



@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html'
})
export class EditServerComponent implements OnInit {
  server!: Server;
  serverName = '';
  serverStatus = '';

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    Swal.fire({
      icon: 'success',
      title: 'Updated succefully',
      timer: 3000,
      timerProgressBar: true
    })
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
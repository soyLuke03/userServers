import { Injectable } from '@angular/core';
import { Server } from '../interfaces/server.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServersService {
  private _servers: Server[] = [
    {
    id: 1,
    name: 'Productionserver',
    status: 'online'
    },
    {
    id: 2,
    name: 'Testserver',
    status: 'offline'
    },
    {
    id: 3,
    name: 'Devserver',
    status: 'offline'
    }
    ]
  constructor() { }

  get servers(): Server[]{
    return [...this._servers]
  }
}

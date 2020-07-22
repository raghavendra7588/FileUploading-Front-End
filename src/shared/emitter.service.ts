import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {
  public name = 'raghavendraa';

  public isRecord: EventEmitter<boolean>;
  constructor() {
    this.isRecord = new EventEmitter();
  }
}

import {
  Component,
  Input,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
})
export class UserInputComponent {

  @Output() userEq = new EventEmitter<string>();
  @Output() userXl = new EventEmitter<number>();
  @Output() userXr = new EventEmitter<number>();


  sendUserEq(e: string) {
    this.userEq.emit(e);
  }
  sendUserXl(e: string) {
    this.userXl.emit(Number(e));
  }
  sendUserXr(e: string) {
    this.userXr.emit(Number(e));
  }

}

import { Component } from '@angular/core';
import { NumerapiService } from './service/numerapi.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NumerProject';

  constructor(private _service: NumerapiService) {
    this._service.getTest().subscribe(data => {console.log(data)})
  }

}

import { Component } from '@angular/core';
import { ErrorService } from '../../../services/error.service';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-error-block',
  standalone: true,
  imports: [ErrorComponent],
  templateUrl: './error-block.component.html',
  styleUrl: './error-block.component.css'
})
export class ErrorBlockComponent {
  public isError:boolean=false;
  public text:String="";

  constructor (private errorService:ErrorService){
    errorService.errorEmitter.subscribe((text)=>{
      this.text=text;
      this.isError=true;
      setTimeout(() => {
        this.isError=false;
      }, 10000);
    })
  }
}

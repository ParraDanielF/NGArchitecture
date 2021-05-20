import { Component, OnInit, Input } from "@angular/core";
import { ClinicManagerService } from "src/app/services/clinic-manager.service";

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
})
export class CardTableComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";


  private dummieData : string = '';

  constructor(private service : ClinicManagerService) {}
  ngOnInit(): void {
  }


  myFunnyMethod(){
    console.log(this.dummieData);
    //this.service.aws(this.dummieData);
  }

}

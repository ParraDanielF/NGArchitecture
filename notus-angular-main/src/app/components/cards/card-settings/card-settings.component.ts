import { Component, OnInit } from "@angular/core";
import { ClinicManagerService } from "src/app/services/clinic-manager.service";

@Component({
  selector: "app-card-settings",
  templateUrl: "./card-settings.component.html",
  providers : [ClinicManagerService]
})
export class CardSettingsComponent implements OnInit {
  constructor(private service : ClinicManagerService) {}

  ngOnInit(): void {}

  sendMessage() : void {
    console.log("PASS")
    this.service.sendMessage();
  }
}

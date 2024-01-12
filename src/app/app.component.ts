import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";

import { HttpServiceService } from "./http-service.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  private httpService = inject(HttpServiceService);

  title = "cors-testing";

  constructor() {
    this.httpService.getClasses().subscribe((res) => {
      console.log("Classes: ", res);
    });

    this.httpService.flagToInvestigate().subscribe((res) => {
      console.log("Flag: ", res);
    });
  }
}

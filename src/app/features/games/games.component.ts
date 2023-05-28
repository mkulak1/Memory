import { Component } from "@angular/core";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: "app-games",
  templateUrl: "./games.component.html",
  styleUrls: ["./games.component.css"],
})
export class GamesComponent {
  mode = "flashcard";


  constructor(private route: Router, private activatedRouter: ActivatedRoute) {
  }

  startGame() {
    this.route.navigate([this.mode], {relativeTo: this.activatedRouter});
  }
}

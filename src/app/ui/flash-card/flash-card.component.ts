import { Component, EventEmitter, Input, Output } from "@angular/core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-flash-card",
  templateUrl: "./flash-card.component.html",
  styleUrls: ["./flash-card.component.css"],
})
export class FlashCardComponent {
  @Input() word = "";
  @Input() translation = "";
  @Output() removeClicked = new EventEmitter<void>();
  iconTrash = faTrash;

  emitRemove() {
    this.removeClicked.emit();
  }
}

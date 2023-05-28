import { Component, OnInit } from "@angular/core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { CategoryService } from "../../services/category.service";
import { FlashCardService } from "../../services/flash-card.service";
import { ActivatedRoute } from "@angular/router";
import { Category } from "../../models/category";
import { FlashCard } from "../../models/flash-card";

@Component({
  selector: "app-flash-cards",
  templateUrl: "./flash-cards.component.html",
  styleUrls: ["./flash-cards.component.css"],
})
export class FlashCardsComponent implements OnInit {
  plusIcon = faPlus;
  category?: Category;
  flashCards: FlashCard[] = [];

  word = "";
  translation = "";

  constructor(
    private categoryService: CategoryService,
    private flashCardsService: FlashCardService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      const idString = param.get("category-id");
      if (idString) {
        const id = Number.parseInt(idString);

        this.categoryService
          .getCategory(id)
          .subscribe(c => (this.category = c));

        this.flashCardsService
          .getCards(id)
          .subscribe(f => (this.flashCards = f));
      }
    });
  }

  addFlashCard() {
    if (this.category?.id) {
      this.flashCardsService
        .addCard(this.category.id, {
          word: this.word,
          translation: this.translation,
        })
        .subscribe(f => {
          this.flashCards.push(f);
          this.word = "";
          this.translation = "";
        });
    }
  }

  removeFlashCard(flashCard: FlashCard) {
    if (flashCard.id && this.category?.id) {
      this.flashCardsService
        .removeCard(this.category.id, flashCard.id)
        .subscribe(() =>
          this.flashCards.splice(this.flashCards.indexOf(flashCard), 1)
        );
    }
  }
}

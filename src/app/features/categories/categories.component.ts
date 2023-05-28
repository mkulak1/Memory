import { Component, OnInit } from "@angular/core";
import {
  faComments,
  faPlay,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Category } from "../../models/category";
import { CategoryService } from "../../services/category.service";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"],
})
export class CategoriesComponent implements OnInit {
  plusIcon = faPlus;
  categories: Category[] = [];
  categoryName = "";

  addCategory() {
    this.categoryService
      .addCategory({ name: this.categoryName })
      .subscribe(c => this.categories.push(c));
    this.categoryName = "";
  }

  removeCategory(category: Category): void {
    if (category.id) {
      this.categoryService
        .removeCategory(category.id)
        .subscribe(() =>
          this.categories.splice(this.categories.indexOf(category), 1)
        );
    }
  }

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(c => (this.categories = c));
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FlashCard } from "../models/flash-card";
import { Observable } from "rxjs";

const BASE_API_URL = "http://localhost::8080/categories";
@Injectable({
  providedIn: "root",
})
export class FlashCardService {
  constructor(private httpClient: HttpClient) {}

  getCards(categoryId: number): Observable<FlashCard[]> {
    return this.httpClient.get<FlashCard[]>(
      `${BASE_API_URL}/${categoryId}/cards`
    );
  }
  addCard(categoryId: number, card: FlashCard): Observable<FlashCard> {
    return this.httpClient.post<FlashCard>(
      `${BASE_API_URL}/${categoryId}/cards`,
      card
    );
  }

  removeCard(categoryId: number, cardId: number): Observable<any> {
    return this.httpClient.delete(
      `${BASE_API_URL}/${categoryId}/cards/${cardId}`
    );
  }
}

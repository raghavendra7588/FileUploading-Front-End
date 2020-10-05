import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css']
})
export class SubCategoriesComponent implements OnInit {
  products: any = [];

  constructor() { }

  ngOnInit(): void {
    this.products = [
      {
        "id": 1, "name": "Milk", "description": "Incidunt et magni", "price": "170.00", "quantity": 56840,
        "representation": 'https://placeimg.com/500/300/tech/4'
      },
      {
        "id": 2, "name": "Wheat", "description": "Sint libero mollitia", "price": "302.00", "quantity": 9358,
        "representation": 'https://placeimg.com/500/300/tech/4'
      },
      {
        "id": 3, "name": "Dal and pulses", "description": "In consequuntur cupiditat", "price": "279.00", "quantity": 90316,
        "representation": 'https://placeimg.com/500/300/tech/4'
      },
      {
        "id": 4, "name": "Tooth Paste", "description": "Saepe nemo praesentium", "price": "760.00", "quantity": 5899,
        "representation": 'https://placeimg.com/500/300/tech/4'
      },
      {
        "id": 5, "name": "Milk", "description": "Incidunt et magni", "price": "170.00", "quantity": 56840,
        "representation": 'https://placeimg.com/500/300/tech/4'
      },
      {
        "id": 6, "name": "Wheat", "description": "Sint libero mollitia", "price": "302.00", "quantity": 9358,
        "representation": 'https://placeimg.com/500/300/tech/4'
      },
      {
        "id": 7, "name": "Dal and pulses", "description": "In consequuntur cupiditat", "price": "279.00", "quantity": 90316,
        "representation": 'https://placeimg.com/500/300/tech/4'
      },
      {
        "id": 8, "name": "Tooth Paste", "description": "Saepe nemo praesentium", "price": "760.00", "quantity": 5899,
        "representation": 'https://placeimg.com/500/300/tech/4'
      },
      {
        "id": 9, "name": "Tooth Paste", "description": "Saepe nemo praesentium", "price": "760.00", "quantity": 5899,
        "representation": 'https://placeimg.com/500/300/tech/4'
      },
      {
        "id": 10, "name": "Milk", "description": "Incidunt et magni", "price": "170.00", "quantity": 56840,
        "representation": 'https://placeimg.com/500/300/tech/4'
      },
      {
        "id": 11, "name": "Wheat", "description": "Sint libero mollitia", "price": "302.00", "quantity": 9358,
        "representation": 'https://placeimg.com/500/300/tech/4'
      },
      {
        "id": 12, "name": "Dal and pulses", "description": "In consequuntur cupiditat", "price": "279.00", "quantity": 90316,
        "representation": 'https://placeimg.com/500/300/tech/4'
      },
      {
        "id": 13, "name": "Tooth Paste", "description": "Saepe nemo praesentium", "price": "760.00", "quantity": 5899,
        "representation": 'https://placeimg.com/500/300/tech/4'
      }
    ];

  }

  onCardClick(response) {
    console.log('i m clicked', response);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {

  slides = [
    { img: "https://cn-e-pic.itoon.org/pictures_library/c34377d815ee318ee6a465b6fa41a4ef.webp" },
    { img: "https://cn-e-pic.itoon.org/homepage-banners/82-a139.webp" },
    { img: "https://cn-e-pic.itoon.org/pictures_library/c34377d815ee318ee6a465b6fa41a4ef.webp" },
    { img: "https://cn-e-pic.itoon.org/homepage-banners/82-a139.webp" }
  ];
  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,

    dots: true,
    arrows: true,

  };
  array = [1, 2, 3, 4];
  effect = 'scrollx';


}

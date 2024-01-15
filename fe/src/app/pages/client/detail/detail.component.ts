import { Component } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  isThirdParagraphVisible: boolean = true;
  buttonText: string = 'Hiện thêm';

  toggleThirdParagraph() {
    this.isThirdParagraphVisible = !this.isThirdParagraphVisible;
    this.buttonText = this.isThirdParagraphVisible ? 'Hiện thêm' : 'Ẩn đi';
  }
}

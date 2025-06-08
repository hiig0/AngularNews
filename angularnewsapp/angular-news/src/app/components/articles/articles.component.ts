import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ArticleComponent } from '../article/article.component';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [ CommonModule, IonicModule, ArticleComponent],
  templateUrl: './articles.component.html',
})
export class ArticlesComponent {
  @Input() articles: any[] = [];
}


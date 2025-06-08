import { Component, OnInit, ViewChild } from '@angular/core';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { NewsService } from '../services/news.service';
import { Article } from '../interfaces/types';
import { IonicModule, IonInfiniteScroll } from '@ionic/angular';
import { ArticlesComponent } from '../components/articles/articles.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    IonicModule,
    ArticlesComponent,
    CommonModule
  ],
})
export class Tab2Page implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll!: IonInfiniteScroll;

  public categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];
  public selectedCategory: string = this.categories[0];
  public articles: Article[] = [];

  showToast: boolean = false;
  toastMessage: string = '';
  toastColor: string = 'success';

  constructor(private newService: NewsService) {}

  ngOnInit(): void {
    this.loadArticlesByCategory(this.selectedCategory);
  }

  segmentChanged(event: Event) {
    this.selectedCategory = (event as CustomEvent).detail.value;
    this.infiniteScroll.disabled = false;
    this.loadArticlesByCategory(this.selectedCategory);
  }

  loadArticlesByCategory(category: string) {
    this.newService.getTopHeadLinesByCategory(category).subscribe({
      next: (articles) => {
        this.articles = [...articles];
        this.presentToast('Notícias carregadas com sucesso!', 'success');
      },
      error: () => {
        this.presentToast('Erro ao carregar notícias.', 'danger');
      },
    });
  }

  loadData() {
    this.newService
      .getTopHeadLinesByCategory(this.selectedCategory, true)
      .subscribe({
        next: (articles) => {
          if (articles.length === this.articles.length) {
            this.infiniteScroll.disabled = true;
            return;
          }

          this.articles = articles;
          this.infiniteScroll.complete();
        },
        error: () => {
          this.presentToast('Erro ao carregar mais notícias.', 'danger');
          this.infiniteScroll.complete();
        },
      });
  }

  handleRefresh(event: any) {
    this.articles = [];
    this.infiniteScroll.disabled = false;
    this.newService.getTopHeadLinesByCategory(this.selectedCategory).subscribe({
      next: (articles) => {
        this.articles = [...articles];
        event.target.complete();
        this.presentToast('Atualizado com sucesso!', 'success');
      },
      error: () => {
        event.target.complete();
        this.presentToast('Erro ao atualizar.', 'danger');
      },
    });
  }

  presentToast(message: string, color: string = 'primary') {
    this.toastMessage = message;
    this.toastColor = color;
    this.showToast = true;
  }
}

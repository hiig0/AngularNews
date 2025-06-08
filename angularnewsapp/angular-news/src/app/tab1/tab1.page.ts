import { Component, OnInit, ViewChild } from '@angular/core';

import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonicModule, IonInfiniteScroll, IonRefresher } from '@ionic/angular';
import { Article } from 'src/app/interfaces/types';
import { NewsService } from 'src/app/services/news.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from '../components/articles/articles.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonicModule,
    IonicModule,
    CommonModule,
    FormsModule,
    ArticlesComponent,
  ],
})
export class Tab1Page implements OnInit {
  public articles: Article[] = [];
  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll!: IonInfiniteScroll;

  showToast: boolean = false;
  toastMessage: string = '';
  toastColor: string = 'success';

  constructor(private newService: NewsService, private router: Router) {}

  ngOnInit() {
    this.loadInitialArticles();
  }

  loadInitialArticles() {
    this.newService.getTopHeadLines().subscribe({
      next: (articles) => {
        this.articles = articles;
        this.presentToast('Notícias carregadas com sucesso!', 'success');
      },
      error: () => {
        this.presentToast('Erro ao carregar notícias.', 'danger');
      },
    });
  }

  loadData() {
    this.newService.getTopHeadLinesByCategory('business', true).subscribe({
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
    this.newService.getTopHeadLines().subscribe({
      next: (articles) => {
        this.articles = articles;
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

  goToProfile() {
    this.router.navigate(['/perfil']);
  }
}

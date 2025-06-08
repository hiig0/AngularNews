import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/types';
import { NewsService } from 'src/app/services/news.service';
import {
  Platform,
  ToastController,
  AlertController,
  IonicModule,
} from '@ionic/angular';
import { Browser } from '@capacitor/browser';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ], 
})
export class Tab3Page implements OnInit {
  favorites: Article[] = [];

  constructor(
    private newsService: NewsService,
    private platform: Platform,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favorites = this.newsService.getFavorites();
  }

  async openArticle(url: string) {
    if (this.platform.is('ios') || this.platform.is('android')) {
      await Browser.open({ url });
    } else {
      window.open(url, '_blank');
    }
  }

  async confirmRemoveFavorite(article: Article) {
    const alert = await this.alertController.create({
      header: 'Remover favorito',
      message: 'Tem certeza que deseja remover esta notícia dos favoritos?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Remover',
          handler: () => this.removeFavorite(article),
        },
      ],
    });

    await alert.present();
  }

  async removeFavorite(article: Article) {
    this.newsService.removeFavorite(article);
    this.loadFavorites();

    const toast = await this.toastController.create({
      message: 'Notícia removida dos favoritos',
      duration: 1500,
      color: 'danger',
    });
    toast.present();
  }
}

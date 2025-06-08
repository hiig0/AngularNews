import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';
import { ActionSheetButton, ActionSheetController, IonicModule, Platform } from '@ionic/angular';
import { colorFill } from 'ionicons/icons';
import { Article } from 'src/app/interfaces/types';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  imports: [CommonModule, IonicModule],
  styleUrls: ['./article.component.scss'],
  standalone: true,
})


export class ArticleComponent {
  @Input() article!: Article;
  @Input() index!: number;

  
  constructor(
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private newsService: NewsService
  ) {}

  async openArticle() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      await Browser.open({ url: this.article.url });
    } else {
      window.open(this.article.url, '_blank');
    }
  }

  async openMenu(ev: Event) {
    const buttons: ActionSheetButton[] = [
      
      {
        text: 'Favoritar',
        icon: 'heart-outline',
        handler: () => this.favoriteArticle(),
      },
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel',
      },
    ];

    if (this.platform.is('capacitor')) {
      buttons.unshift({
        text: 'Compartilhar',
        icon: 'share-outline',
        handler: () => this.shareArticle(),
      });
    }


    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opções',
      buttons,
      
    });

    await actionSheet.present();
  }

 async shareArticle() {
    await Share.share({
      title: this.article.title,
      text: this.article.content,
      url: this.article.url,
      dialogTitle: 'Compartilhar notícia',
    });
  }

  favoriteArticle() {
    this.newsService.addFavorite(this.article);
    console.log('Notícia adicionada aos favoritos:', this.article.title);
  }
}

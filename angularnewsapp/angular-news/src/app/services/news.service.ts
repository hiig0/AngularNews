import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Article, NewsResponse, ArticlesByCategoryAndPage } from '../interfaces/types';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const urlBack = environment.urlBack;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {};
  private favorites: Article[] = [];
  private favoritesKey = 'favorites';

  constructor(private http: HttpClient) {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const favs = localStorage.getItem(this.favoritesKey);
    if (favs) {
      this.favorites = JSON.parse(favs);
    }
  }

  private saveFavorites(): void {
    localStorage.setItem(this.favoritesKey, JSON.stringify(this.favorites));
  }

  // ✅ Registro de novo usuário
  register(userData: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${urlBack}/register`, userData);
  }

  // ✅ Login de usuário
 login(userData: { email: string; password: string }): Observable<any> {
  return this.http.post(`${urlBack}/login`, userData).pipe(
    map((response: any) => {
       localStorage.setItem('token', response.token);
      const user = {
        name: response.user?.name || 'Usuário',
        email: response.user?.email || userData.email,
      };

      localStorage.setItem('user', JSON.stringify(user));
      return response;
    })
  );
}


  // ✅ Adicionar artigo aos favoritos
  addFavorite(article: Article): void {
    if (!this.favorites.some(fav => fav.title === article.title)) {
      this.favorites.push(article);
      this.saveFavorites();
      console.log('Artigo adicionado aos favoritos:', article.title);
    }
  }

  // ✅ Obter artigos favoritos
  getFavorites(): Article[] {
    return this.favorites;
  }

  // ✅ Remover artigo dos favoritos
  removeFavorite(article: Article): void {
    this.favorites = this.favorites.filter(fav => fav.title !== article.title);
    this.saveFavorites();
    console.log('Artigo removido dos favoritos:', article.title);
  }

  // ✅ Requisição à API de notícias com chave e país
  private executeQuery<T>(endpoint: string) {
    return this.http.get<T>(`${apiUrl}${endpoint}`, {
      params: {
        apiKey: apiKey,
        country: 'us',
      },
    });
  }

  // ✅ Retorna manchetes de negócios (padrão inicial)
  getTopHeadLines(): Observable<Article[]> {
    return this.getTopHeadLinesByCategory('business');
  }

  // ✅ Retorna manchetes por categoria (cache e paginação)
  getTopHeadLinesByCategory(category: string, loadMore: boolean = false): Observable<Article[]> {
    if (loadMore) {
      return this.getArticlesByCategory(category);
    }

    if (this.articlesByCategoryAndPage[category]) {
      return of(this.articlesByCategoryAndPage[category].articles);
    }

    return this.getArticlesByCategory(category);
  }

  // ✅ Busca paginada de artigos por categoria
  private getArticlesByCategory(category: string): Observable<Article[]> {
    if (!Object.keys(this.articlesByCategoryAndPage).includes(category)) {
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: [],
      };
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.executeQuery<NewsResponse>(`/top-headlines?category=${category}&page=${page}`)
      .pipe(
        map(({ articles }) => {
          if (articles.length === 0) {
            return this.articlesByCategoryAndPage[category].articles;
          }

          this.articlesByCategoryAndPage[category] = {
            page: page,
            articles: [
              ...this.articlesByCategoryAndPage[category].articles,
              ...articles,
            ],
          };

          return this.articlesByCategoryAndPage[category].articles;
        })
      );
  }
}

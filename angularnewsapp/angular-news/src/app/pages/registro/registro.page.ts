import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NewsService } from 'src/app/services/news.service';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class RegistroPage implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private newService: NewsService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async presentToast(message: string, color: 'success' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color,
    });
    toast.present();
  }

  onRegister() {
    if (!this.username || !this.email || !this.password) {
      this.presentToast('Preencha todos os campos!', 'danger');
      return;
    }

    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.newService.register(userData).subscribe({
      next: (response) => {
        console.log('Registro bem-sucedido:', response);
        this.presentToast('Registro realizado com sucesso!', 'success');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erro ao registrar:', error);
        this.presentToast('Erro ao registrar. Tente novamente.', 'danger');
      },
    });
  }


  onLoginNavigate(){
    this.router.navigate(['/login']);
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsService } from '../../services/news.service';
import { Router } from '@angular/router';
import { ToastController, Platform, IonicModule } from '@ionic/angular';
import { PushNotifications, Token, PushNotification, PushNotificationActionPerformed } from '@capacitor/push-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private authService: NewsService,
    private router: Router,
    private toastController: ToastController,
    private platform: Platform
  ) {}

  ngOnInit() {
    if (this.platform.is('capacitor')) {
      this.registerPushNotifications();
    }
  }

  async presentToast(message: string, color: 'success' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color,
    });
    toast.present();
  }

  login() {
    const userData = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(userData).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.presentToast('Login realizado com sucesso!', 'success');
        this.router.navigate(['/tabs']);
      },
      error: (error) => {
        this.presentToast('Credenciais inválidas. Tente novamente.', 'danger');
      },
    });
  }

  goToRegister() {
    this.router.navigate(['/registro']);
  }

  registerPushNotifications() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      console.log('Push registration success, token: ', token.value);
      // Você pode enviar o token ao backend aqui, se desejar
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('Erro ao registrar notificações:', error);
    });

    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
      this.presentToast(`Nova notificação: ${notification.title}`, 'success');
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: PushNotificationActionPerformed) => {
      console.log('Ação de notificação:', notification);
    });
  }
}

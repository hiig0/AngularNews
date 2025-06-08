import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PerfilPage implements OnInit {

  userName: string = '';
  userEmail: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.name || 'Usuário Desconhecido';
    this.userEmail = user.email || 'Email não cadastrado';
  }

  logout() {
    localStorage.removeItem('user');
    this.userName = '';
    this.userEmail = '';
    this.router.navigate(['/login']);
  }

  home() {
    this.router.navigate(['/tabs']);
  }
}

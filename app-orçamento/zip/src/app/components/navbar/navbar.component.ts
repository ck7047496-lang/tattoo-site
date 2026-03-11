import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, CommonModule],
  template: `
    <nav class="fixed top-0 left-0 w-full z-50 glass-panel border-x-0 border-t-0 rounded-none px-6 py-4 flex items-center justify-between transition-all duration-300">
      <a routerLink="/" class="flex items-center gap-2 group" (click)="closeMenu()">
        <div class="w-8 h-8 rounded-lg bg-brand-vibrant flex items-center justify-center text-black font-display font-bold text-xl group-hover:scale-105 transition-transform">
          C
        </div>
        <span class="font-display font-bold text-xl tracking-tight">Clayton<span class="text-white/50">Santos</span></span>
      </a>

      <div class="hidden md:flex items-center gap-8">
        <a routerLink="/" routerLinkActive="text-brand-vibrant" [routerLinkActiveOptions]="{exact: true}" class="text-sm font-medium text-white/70 hover:text-white transition-colors">Início</a>
        <a routerLink="/tattoo-ai" routerLinkActive="text-brand-vibrant" class="text-sm font-medium text-white/70 hover:text-white transition-colors">Tattoo IA</a>
        <a routerLink="/traffic" routerLinkActive="text-brand-vibrant" class="text-sm font-medium text-white/70 hover:text-white transition-colors">Simulador de Tráfego</a>
        <a routerLink="/automation" routerLinkActive="text-brand-vibrant" class="text-sm font-medium text-white/70 hover:text-white transition-colors">Automações</a>
        <a routerLink="/video-portfolio" routerLinkActive="text-brand-vibrant" class="text-sm font-medium text-white/70 hover:text-white transition-colors">Vídeos</a>
      </div>

      <div class="flex items-center gap-4">
        <a routerLink="/contact" class="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
          <mat-icon class="text-[18px] w-[18px] h-[18px]">chat</mat-icon>
          Fale Comigo
        </a>
        <button class="md:hidden text-white p-2" (click)="toggleMenu()">
          <mat-icon>{{ isMobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu Overlay -->
    @if (isMobileMenuOpen()) {
      <div class="fixed inset-0 z-40 bg-brand-black/95 backdrop-blur-xl pt-24 px-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
        <div class="flex flex-col gap-6">
          <a routerLink="/" routerLinkActive="text-brand-vibrant" [routerLinkActiveOptions]="{exact: true}" class="text-2xl font-display font-medium text-white/70 hover:text-white transition-colors" (click)="closeMenu()">Início</a>
          <a routerLink="/tattoo-ai" routerLinkActive="text-brand-vibrant" class="text-2xl font-display font-medium text-white/70 hover:text-white transition-colors" (click)="closeMenu()">Tattoo IA</a>
          <a routerLink="/traffic" routerLinkActive="text-brand-vibrant" class="text-2xl font-display font-medium text-white/70 hover:text-white transition-colors" (click)="closeMenu()">Simulador de Tráfego</a>
          <a routerLink="/automation" routerLinkActive="text-brand-vibrant" class="text-2xl font-display font-medium text-white/70 hover:text-white transition-colors" (click)="closeMenu()">Automações</a>
          <a routerLink="/video-portfolio" routerLinkActive="text-brand-vibrant" class="text-2xl font-display font-medium text-white/70 hover:text-white transition-colors" (click)="closeMenu()">Vídeos</a>
          
          <div class="h-px w-full bg-white/10 my-4"></div>
          
          <a routerLink="/contact" class="flex items-center gap-2 bg-brand-vibrant text-black px-6 py-4 rounded-full text-lg font-semibold transition-colors justify-center" (click)="closeMenu()">
            <mat-icon>chat</mat-icon>
            Fale Comigo
          </a>
        </div>
      </div>
    }
  `
})
export class NavbarComponent {
  isMobileMenuOpen = signal(false);

  toggleMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMobileMenuOpen.set(false);
  }
}

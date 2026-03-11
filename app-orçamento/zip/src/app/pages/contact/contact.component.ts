import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, HttpClientModule],
  template: `
    <div class="min-h-screen pt-24 pb-32 px-6">
      <div class="max-w-5xl mx-auto">
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <!-- Info -->
          <div>
            <h1 class="text-4xl md:text-6xl font-display font-bold mb-6">Vamos construir algo <span class="text-brand-vibrant">extraordinário.</span></h1>
            <p class="text-white/50 text-lg mb-12">Seja um sistema de automação com IA, uma campanha de marketing de alta conversão ou um design de tatuagem exclusivo, estou pronto para ajudar.</p>
            
            <div class="space-y-8">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-vibrant shrink-0">
                  <mat-icon>email</mat-icon>
                </div>
                <div>
                  <h4 class="text-sm font-bold uppercase tracking-wider text-white/50 mb-1">E-mail</h4>
                  <a href="mailto:claytoncelula075@gmail.com" class="text-lg font-medium hover:text-brand-vibrant transition-colors">claytoncelula075&#64;gmail.com</a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0">
                  <mat-icon>chat</mat-icon>
                </div>
                <div>
                  <h4 class="text-sm font-bold uppercase tracking-wider text-white/50 mb-1">WhatsApp</h4>
                  <a href="https://wa.me/5511999999999" target="_blank" class="text-lg font-medium hover:text-[#25D366] transition-colors">+55 11 99999-9999</a>
                </div>
              </div>
            </div>
            
            <div class="mt-16 p-6 rounded-2xl bg-gradient-to-br from-brand-vibrant/20 to-transparent border border-brand-vibrant/30">
              <h4 class="font-display font-bold text-xl mb-2">Resposta Rápida</h4>
              <p class="text-white/70 text-sm mb-4">Clique abaixo para iniciar uma conversa diretamente no WhatsApp. Meu assistente de IA irá coletar seus requisitos iniciais.</p>
              <button (click)="openWhatsApp()" class="w-full py-4 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.3)]">
                <mat-icon>chat</mat-icon>
                Mensagem no WhatsApp
              </button>
            </div>
          </div>

          <!-- Form -->
          <div class="glass-panel p-8 md:p-10">
            <h3 class="text-2xl font-display font-bold mb-8">Enviar Solicitação</h3>
            
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-white/70 mb-2">Nome</label>
                  <input id="firstName" type="text" formControlName="firstName" class="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-vibrant focus:ring-1 focus:ring-brand-vibrant outline-none transition-all" placeholder="João">
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-white/70 mb-2">Sobrenome</label>
                  <input id="lastName" type="text" formControlName="lastName" class="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-vibrant focus:ring-1 focus:ring-brand-vibrant outline-none transition-all" placeholder="Silva">
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-white/70 mb-2">E-mail</label>
                <input id="email" type="email" formControlName="email" class="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-vibrant focus:ring-1 focus:ring-brand-vibrant outline-none transition-all" placeholder="joao@exemplo.com">
              </div>

              <div>
                <label for="projectType" class="block text-sm font-medium text-white/70 mb-2">Tipo de Projeto</label>
                <select id="projectType" formControlName="projectType" class="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-vibrant focus:ring-1 focus:ring-brand-vibrant outline-none appearance-none">
                  <option value="automation">Sistema de IA & Automação</option>
                  <option value="marketing">Campanha de Tráfego Pago</option>
                  <option value="tattoo">Design de Tatuagem & Agendamento</option>
                  <option value="web">Desenvolvimento de Site</option>
                  <option value="other">Outro</option>
                </select>
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-white/70 mb-2">Mensagem</label>
                <textarea id="message" formControlName="message" rows="4" class="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-vibrant focus:ring-1 focus:ring-brand-vibrant outline-none transition-all resize-none" placeholder="Conte-me sobre o seu projeto..."></textarea>
              </div>

              <button type="submit" [disabled]="contactForm.invalid || isSubmitting()" class="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                @if (isSubmitting()) {
                  <mat-icon class="animate-spin">autorenew</mat-icon>
                  Enviando...
                } @else if (submitSuccess()) {
                  <mat-icon>check_circle</mat-icon>
                  Solicitação Enviada
                } @else {
                  Enviar Solicitação
                  <mat-icon>send</mat-icon>
                }
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  `
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = signal(false);
  submitSuccess = signal(false);
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      projectType: ['automation', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      
      this.http.post('/api/contact', this.contactForm.value).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.submitSuccess.set(true);
          this.contactForm.reset({ projectType: 'automation' });
          
          setTimeout(() => {
            this.submitSuccess.set(false);
          }, 3000);
        },
        error: (err) => {
          console.error('Error submitting form', err);
          this.isSubmitting.set(false);
          // Fallback to WhatsApp if API fails
          this.sendToWhatsApp(this.contactForm.value);
        }
      });
    }
  }

  sendToWhatsApp(vals: { firstName: string, lastName: string, email: string, projectType: string, message: string }) {
    const text = `New Request from ${vals.firstName} ${vals.lastName}
Email: ${vals.email}
Project: ${vals.projectType}

Message:
${vals.message}`;

    const encoded = encodeURIComponent(text);
    if (isPlatformBrowser(this.platformId)) {
      window.open(`https://wa.me/5511999999999?text=${encoded}`, '_blank');
    }
    this.contactForm.reset({ projectType: 'automation' });
  }

  openWhatsApp() {
    if (isPlatformBrowser(this.platformId)) {
      window.open('https://wa.me/5511999999999?text=Hi%20Clayton!%20I%20would%20like%20to%20discuss%20a%20project.', '_blank');
    }
  }
}

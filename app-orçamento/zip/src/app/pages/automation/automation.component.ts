import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { animate, inView } from 'motion';

@Component({
  selector: 'app-automation',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="min-h-screen pt-24 pb-32 px-6">
      <div class="max-w-6xl mx-auto">
        
        <div class="mb-16 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-400 mb-6">
            <mat-icon class="scale-150">account_tree</mat-icon>
          </div>
          <h1 class="text-4xl md:text-5xl font-display font-bold mb-4">Sistemas de Automação</h1>
          <p class="text-white/50 text-lg max-w-2xl mx-auto">Fluxos de trabalho inteligentes projetados para escalar seu negócio, capturar leads e fornecer atendimento ao cliente com IA 24/7.</p>
        </div>

        <div class="space-y-24" #workflowsContainer>
          
          <!-- Workflow 1: WhatsApp AI -->
          <div class="workflow-item grid grid-cols-1 lg:grid-cols-2 gap-12 items-center opacity-0">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/10 text-[#25D366] text-sm font-medium mb-6">
                <mat-icon class="text-[18px] w-[18px] h-[18px]">chat</mat-icon> Integração WhatsApp
              </div>
              <h2 class="text-3xl font-display font-bold mb-4">Bot de Atendimento com IA</h2>
              <p class="text-white/50 mb-6">Um agente de WhatsApp totalmente autônomo que responde a perguntas frequentes, qualifica leads e agenda compromissos diretamente no seu calendário sem intervenção humana.</p>
              
              <ul class="space-y-4 mb-8">
                <li class="flex items-start gap-3">
                  <mat-icon class="text-brand-vibrant">check_circle</mat-icon>
                  <span class="text-white/70">Compreensão de linguagem natural via Gemini AI</span>
                </li>
                <li class="flex items-start gap-3">
                  <mat-icon class="text-brand-vibrant">check_circle</mat-icon>
                  <span class="text-white/70">Sincronização automática de calendário</span>
                </li>
                <li class="flex items-start gap-3">
                  <mat-icon class="text-brand-vibrant">check_circle</mat-icon>
                  <span class="text-white/70">Suporte multilíngue</span>
                </li>
              </ul>
            </div>
            
            <div class="glass-panel p-8 relative">
              <!-- Animated Diagram -->
              <div class="flex flex-col items-center gap-4">
                <div class="w-full flex justify-between items-center">
                  <div class="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 z-10">
                    <mat-icon>person</mat-icon>
                  </div>
                  <div class="flex-1 h-0.5 bg-gradient-to-r from-white/10 via-brand-vibrant to-white/10 relative">
                    <div class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-brand-black px-2 text-xs text-white/50">Mensagem</div>
                    <div class="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-brand-vibrant -translate-y-1/2 animate-[ping_2s_infinite]"></div>
                  </div>
                  <div class="w-16 h-16 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center border border-[#25D366]/30 z-10">
                    <mat-icon>chat</mat-icon>
                  </div>
                </div>
                
                <div class="h-16 w-0.5 bg-gradient-to-b from-white/10 via-brand-vibrant to-white/10 relative">
                  <div class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-brand-black py-1 text-xs text-white/50">Webhook</div>
                </div>
                
                <div class="w-full flex justify-center">
                  <div class="w-24 h-24 rounded-2xl bg-brand-vibrant/10 text-brand-vibrant flex flex-col items-center justify-center border border-brand-vibrant/30 z-10">
                    <mat-icon class="scale-150 mb-2">auto_awesome</mat-icon>
                    <span class="text-xs font-bold">Gemini AI</span>
                  </div>
                </div>
                
                <div class="h-16 w-0.5 bg-gradient-to-b from-white/10 via-brand-vibrant to-white/10 relative">
                  <div class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-brand-black py-1 text-xs text-white/50">Ação</div>
                </div>
                
                <div class="w-full flex justify-between items-center">
                  <div class="w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30 z-10">
                    <mat-icon>event</mat-icon>
                  </div>
                  <div class="flex-1 h-0.5 bg-white/10"></div>
                  <div class="w-16 h-16 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30 z-10">
                    <mat-icon>storage</mat-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Workflow 2: Lead Capture -->
          <div class="workflow-item grid grid-cols-1 lg:grid-cols-2 gap-12 items-center opacity-0">
            <div class="order-2 lg:order-1 glass-panel p-8 relative">
              <!-- Animated Diagram -->
              <div class="flex flex-col items-center gap-4">
                <div class="w-full flex justify-center">
                  <div class="w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30 z-10">
                    <mat-icon>campaign</mat-icon>
                  </div>
                </div>
                
                <div class="h-12 w-0.5 bg-gradient-to-b from-white/10 via-blue-400 to-white/10 relative">
                  <div class="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-blue-400 -translate-x-1/2 animate-[ping_2s_infinite]"></div>
                </div>
                
                <div class="w-full flex justify-center">
                  <div class="w-48 h-16 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 z-10">
                    <span class="text-sm font-medium">Formulário Landing Page</span>
                  </div>
                </div>
                
                <div class="h-12 w-0.5 bg-gradient-to-b from-white/10 via-brand-vibrant to-white/10"></div>
                
                <div class="w-full flex justify-between items-center">
                  <div class="w-16 h-16 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30 z-10">
                    <mat-icon>email</mat-icon>
                  </div>
                  <div class="flex-1 h-0.5 bg-white/10"></div>
                  <div class="w-16 h-16 rounded-full bg-brand-vibrant/20 text-brand-vibrant flex items-center justify-center border border-brand-vibrant/30 z-10">
                    <mat-icon>analytics</mat-icon>
                  </div>
                  <div class="flex-1 h-0.5 bg-white/10"></div>
                  <div class="w-16 h-16 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30 z-10">
                    <mat-icon>group</mat-icon>
                  </div>
                </div>
              </div>
            </div>

            <div class="order-1 lg:order-2">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
                <mat-icon class="text-[18px] w-[18px] h-[18px]">filter_alt</mat-icon> Geração de Leads
              </div>
              <h2 class="text-3xl font-display font-bold mb-4">Funis de Captura Inteligentes</h2>
              <p class="text-white/50 mb-6">Capture leads de tráfego pago, enriqueça automaticamente seus dados e direcione-os para a sequência de vendas apropriada com base em seu perfil e comportamento.</p>
              
              <ul class="space-y-4 mb-8">
                <li class="flex items-start gap-3">
                  <mat-icon class="text-brand-vibrant">check_circle</mat-icon>
                  <span class="text-white/70">Integração instantânea com CRM</span>
                </li>
                <li class="flex items-start gap-3">
                  <mat-icon class="text-brand-vibrant">check_circle</mat-icon>
                  <span class="text-white/70">Acompanhamentos automatizados por e-mail e SMS</span>
                </li>
                <li class="flex items-start gap-3">
                  <mat-icon class="text-brand-vibrant">check_circle</mat-icon>
                  <span class="text-white/70">Pontuação e qualificação de leads</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  `
})
export class AutomationComponent implements AfterViewInit {
  @ViewChild('workflowsContainer') workflowsContainer!: ElementRef;

  ngAfterViewInit() {
    if (this.workflowsContainer) {
      const items = this.workflowsContainer.nativeElement.querySelectorAll('.workflow-item');
      
      items.forEach((item: HTMLElement) => {
        inView(item, () => {
          animate(
            item,
            { opacity: [0, 1], y: [50, 0] },
            { duration: 0.8, ease: "easeOut" }
          );
        });
      });
    }
  }
}

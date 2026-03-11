import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-traffic',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  template: `
    <div class="relative min-h-screen w-full overflow-hidden pt-24 pb-32 px-6">
      <!-- Video Background -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-brand-black/80 z-10 backdrop-blur-sm"></div>
        <iframe 
          src="https://player.vimeo.com/video/1172275673?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1" 
          frameborder="0" 
          allow="autoplay; fullscreen; picture-in-picture" 
          class="absolute top-1/2 left-1/2 w-[100vw] h-[100vh] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none opacity-30"
          style="width: 100vw; height: 56.25vw; min-height: 100vh; min-width: 177.77vh;"
        ></iframe>
      </div>

      <div class="relative z-20 max-w-6xl mx-auto">
        
        <div class="mb-12 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 mb-6">
            <mat-icon class="scale-150">insights</mat-icon>
          </div>
          <h1 class="text-4xl md:text-5xl font-display font-bold mb-4">Simulador de Tráfego Pago</h1>
          <p class="text-white/50 text-lg max-w-2xl mx-auto">Calcule o ROI da sua campanha de marketing e preveja o volume de vendas com nosso mecanismo de simulação avançado.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- Inputs -->
          <div class="lg:col-span-4 space-y-6">
            <div class="glass-panel p-6 md:p-8">
              <h3 class="text-xl font-display font-semibold mb-6 flex items-center gap-2">
                <mat-icon class="text-brand-vibrant">tune</mat-icon> Parâmetros da Campanha
              </h3>
              
              <form [formGroup]="calcForm" class="space-y-6">
                
                <div>
                  <div class="flex justify-between mb-2">
                    <label for="budget" class="text-sm font-medium text-white/70">Orçamento (R$)</label>
                    <span class="text-sm font-bold text-brand-vibrant">R$ {{ calcForm.value.budget | number }}</span>
                  </div>
                  <input id="budget" type="range" formControlName="budget" min="100" max="50000" step="100" class="w-full accent-brand-vibrant">
                </div>

                <div>
                  <div class="flex justify-between mb-2">
                    <label for="cpc" class="text-sm font-medium text-white/70">Custo por Clique (CPC)</label>
                    <span class="text-sm font-bold text-white">R$ {{ calcForm.value.cpc | number:'1.2-2' }}</span>
                  </div>
                  <input id="cpc" type="range" formControlName="cpc" min="0.10" max="5.00" step="0.10" class="w-full accent-blue-500">
                </div>

                <div>
                  <div class="flex justify-between mb-2">
                    <label for="conversionRate" class="text-sm font-medium text-white/70">Taxa de Conversão (%)</label>
                    <span class="text-sm font-bold text-white">{{ calcForm.value.conversionRate }}%</span>
                  </div>
                  <input id="conversionRate" type="range" formControlName="conversionRate" min="0.5" max="10" step="0.5" class="w-full accent-purple-500">
                </div>

                <div>
                  <div class="flex justify-between mb-2">
                    <label for="productPrice" class="text-sm font-medium text-white/70">Preço do Produto (R$)</label>
                    <span class="text-sm font-bold text-white">R$ {{ calcForm.value.productPrice | number }}</span>
                  </div>
                  <input id="productPrice" type="range" formControlName="productPrice" min="50" max="5000" step="50" class="w-full accent-emerald-500">
                </div>

              </form>
            </div>
          </div>

          <!-- Dashboard -->
          <div class="lg:col-span-8">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              
              <!-- Metric Cards -->
              <div class="glass-panel p-6 relative overflow-hidden group">
                <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <mat-icon class="scale-[3]">ads_click</mat-icon>
                </div>
                <p class="text-sm text-white/50 uppercase tracking-wider mb-2">Cliques Estimados</p>
                <p class="text-4xl font-display font-bold text-white">{{ results().clicks | number:'1.0-0' }}</p>
              </div>

              <div class="glass-panel p-6 relative overflow-hidden group">
                <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <mat-icon class="scale-[3]">group_add</mat-icon>
                </div>
                <p class="text-sm text-white/50 uppercase tracking-wider mb-2">Leads Estimados (20%)</p>
                <p class="text-4xl font-display font-bold text-white">{{ results().leads | number:'1.0-0' }}</p>
              </div>

              <div class="glass-panel p-6 relative overflow-hidden group">
                <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <mat-icon class="scale-[3]">shopping_cart</mat-icon>
                </div>
                <p class="text-sm text-white/50 uppercase tracking-wider mb-2">Vendas Estimadas</p>
                <p class="text-4xl font-display font-bold text-brand-vibrant">{{ results().sales | number:'1.0-0' }}</p>
              </div>

              <div class="glass-panel p-6 relative overflow-hidden group border-brand-vibrant/30 bg-brand-vibrant/5">
                <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-brand-vibrant">
                  <mat-icon class="scale-[3]">account_balance_wallet</mat-icon>
                </div>
                <p class="text-sm text-brand-vibrant/70 uppercase tracking-wider mb-2">Receita Estimada</p>
                <p class="text-4xl font-display font-bold text-brand-vibrant">R$ {{ results().revenue | number:'1.2-2' }}</p>
              </div>

            </div>

            <!-- ROI Banner -->
            <div class="glass-panel p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-l-4" [ngClass]="results().roi > 0 ? 'border-l-brand-vibrant' : 'border-l-red-500'">
              <div>
                <p class="text-sm text-white/50 uppercase tracking-wider mb-1">Retorno sobre Investimento (ROI)</p>
                <div class="flex items-baseline gap-4">
                  <p class="text-5xl font-display font-bold" [ngClass]="results().roi > 0 ? 'text-brand-vibrant' : 'text-red-500'">
                    {{ results().roi | number:'1.0-0' }}%
                  </p>
                  <p class="text-sm text-white/50">
                    Lucro: R$ {{ results().profit | number:'1.2-2' }}
                  </p>
                </div>
              </div>
              
              <button class="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors whitespace-nowrap">
                Iniciar Campanha
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  `
})
export class TrafficComponent {
  calcForm: FormGroup;
  private fb = inject(FormBuilder);

  constructor() {
    this.calcForm = this.fb.group({
      budget: [5000],
      cpc: [1.50],
      conversionRate: [2.0],
      productPrice: [297]
    });
  }

  // Computed signal for results based on form values
  results = computed(() => {
    // We need to trigger change detection when form changes. 
    // In a real app, we'd use toSignal from @angular/core/rxjs-interop
    // For simplicity here, we'll just read the values directly and rely on Angular's CD
    const vals = this.calcForm.value;
    
    const clicks = vals.budget / vals.cpc;
    const leads = clicks * 0.20; // Assuming 20% landing page conversion
    const sales = clicks * (vals.conversionRate / 100);
    const revenue = sales * vals.productPrice;
    const profit = revenue - vals.budget;
    const roi = vals.budget > 0 ? (profit / vals.budget) * 100 : 0;

    return {
      clicks,
      leads,
      sales,
      revenue,
      profit,
      roi
    };
  });
}

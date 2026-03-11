import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AiService } from '../../services/ai.service';
interface Tattoo {
  id: number;
  url: string;
}
@Component({
  selector: 'app-tattoo-ai',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  template: `
    <div class="min-h-screen pt-24 pb-32 px-6">
      <div class="max-w-5xl mx-auto">
        
        <div class="mb-12 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-vibrant/10 text-brand-vibrant mb-6">
            <mat-icon class="scale-150">auto_fix_high</mat-icon>
          </div>
          <h1 class="text-4xl md:text-5xl font-display font-bold mb-4">Simulador de Tatuagem com IA</h1>
          <p class="text-white/50 text-lg max-w-2xl mx-auto">Envie suas fotos e deixe nossa IA gerar uma pré-visualização realista e uma estimativa de preço instantânea para sua próxima tatuagem.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- Form Section -->
          <div class="lg:col-span-5 space-y-6">
            <div class="glass-panel p-6 md:p-8">
              
              <!-- Stepper -->
              <div class="flex items-center justify-between mb-8 relative">
                <div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/10 z-0"></div>
                <div class="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-brand-vibrant z-0 transition-all duration-300" [style.width]="(currentStep() - 1) * 25 + '%'"></div>
                
                <div class="relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors" [ngClass]="currentStep() >= 1 ? 'bg-brand-vibrant text-black' : 'bg-brand-gray text-white/50 border border-white/10'">1</div>
                <div class="relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors" [ngClass]="currentStep() >= 2 ? 'bg-brand-vibrant text-black' : 'bg-brand-gray text-white/50 border border-white/10'">2</div>
                <div class="relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors" [ngClass]="currentStep() >= 3 ? 'bg-brand-vibrant text-black' : 'bg-brand-gray text-white/50 border border-white/10'">3</div>
                <div class="relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors" [ngClass]="currentStep() >= 4 ? 'bg-brand-vibrant text-black' : 'bg-brand-gray text-white/50 border border-white/10'">4</div>
                <div class="relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors" [ngClass]="currentStep() >= 5 ? 'bg-brand-vibrant text-black' : 'bg-brand-gray text-white/50 border border-white/10'">5</div>
              </div>

              <form [formGroup]="tattooForm">
                
                <!-- Step 1: Reference Image -->
                @if (currentStep() === 1) {
                  <div class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <h3 class="text-xl font-display font-semibold mb-2">1. Foto de Referência</h3>
                      <p class="text-sm text-white/50 mb-4">Envie o desenho ou imagem de referência para a sua tatuagem.</p>
                      
                      <label class="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:border-brand-vibrant/50 hover:bg-white/5 transition-all" [ngClass]="{'border-brand-vibrant bg-brand-vibrant/5': refImagePreview()}">
                        @if (!refImagePreview()) {
                          <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <mat-icon class="text-white/50 mb-3 scale-150">image</mat-icon>
                            <p class="mb-2 text-sm text-white/70"><span class="font-semibold">Clique para enviar</span> ou arraste</p>
                          </div>
                        }
                        @if (refImagePreview()) {
                          <img [src]="refImagePreview()" alt="Reference preview" class="w-full h-full object-cover rounded-2xl p-1" />
                        }
                        <input type="file" class="hidden" accept="image/*" (change)="onFileSelected($event, 'ref')" />
                      </label>
                    </div>
                    <button type="button" class="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" [disabled]="!refImagePreview()" (click)="nextStep()">Próximo Passo</button>
                  </div>
                }

                <!-- Step 2: Body Part -->
                @if (currentStep() === 2) {
                  <div class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <h3 class="text-xl font-display font-semibold mb-4">2. Parte do Corpo</h3>
                      <p class="text-sm text-white/50 mb-4">Onde você quer fazer a tatuagem?</p>
                      
                      <div class="space-y-4">
                        <div>
                          <label for="location" class="block text-sm font-medium text-white/70 mb-2">Local do Corpo</label>
                          <select id="location" formControlName="location" class="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-vibrant focus:ring-1 focus:ring-brand-vibrant outline-none appearance-none">
                            <option value="braço">Braço</option>
                            <option value="antebraço">Antebraço</option>
                            <option value="perna">Perna</option>
                            <option value="peito">Peito</option>
                            <option value="costas">Costas</option>
                            <option value="mão">Mão</option>
                            <option value="pescoço">Pescoço</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="flex gap-4">
                      <button type="button" class="px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors" (click)="prevStep()">Voltar</button>
                      <button type="button" class="flex-1 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" [disabled]="tattooForm.get('location')?.invalid" (click)="nextStep()">Próximo Passo</button>
                    </div>
                  </div>
                }

                <!-- Step 3: Size -->
                @if (currentStep() === 3) {
                  <div class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <h3 class="text-xl font-display font-semibold mb-4">3. Tamanho Aproximado</h3>
                      <p class="text-sm text-white/50 mb-4">Qual o tamanho estimado da tatuagem?</p>
                      
                      <div class="space-y-4">
                        <div>
                          <label for="size" class="block text-sm font-medium text-white/70 mb-2">Tamanho</label>
                          <select id="size" formControlName="size" class="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-vibrant focus:ring-1 focus:ring-brand-vibrant outline-none appearance-none">
                            <option value="Pequena">Pequena</option>
                            <option value="Média">Média</option>
                            <option value="Grande">Grande</option>
                            <option value="Fechamento">Fechamento</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="flex gap-4">
                      <button type="button" class="px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors" (click)="prevStep()">Voltar</button>
                      <button type="button" class="flex-1 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" [disabled]="tattooForm.get('size')?.invalid" (click)="nextStep()">Próximo Passo</button>
                    </div>
                  </div>
                }

                <!-- Step 4: Description -->
                @if (currentStep() === 4) {
                  <div class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <h3 class="text-xl font-display font-semibold mb-4">4. Descrição</h3>
                      <p class="text-sm text-white/50 mb-4">Descreva como você quer a tatuagem.</p>
                      
                      <div class="space-y-4">
                        <div>
                          <label for="description" class="block text-sm font-medium text-white/70 mb-2">Detalhes</label>
                          <textarea id="description" formControlName="description" rows="4" placeholder="Ex: Quero um leão realista com relógio" class="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-vibrant focus:ring-1 focus:ring-brand-vibrant outline-none resize-none"></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="flex gap-4">
                      <button type="button" class="px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors" (click)="prevStep()">Voltar</button>
                      <button type="button" class="flex-1 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" [disabled]="tattooForm.get('description')?.invalid" (click)="nextStep()">Próximo Passo</button>
                    </div>
                  </div>
                }

                <!-- Step 5: Body Photo -->
                @if (currentStep() === 5) {
                  <div class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <h3 class="text-xl font-display font-semibold mb-2">5. Foto do Local (Opcional)</h3>
                      <p class="text-sm text-white/50 mb-4">Envie uma foto da parte do corpo para a IA gerar a pré-visualização na sua pele.</p>
                      
                      <label class="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:border-brand-vibrant/50 hover:bg-white/5 transition-all" [ngClass]="{'border-brand-vibrant bg-brand-vibrant/5': bodyImagePreview()}">
                        @if (!bodyImagePreview()) {
                          <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <mat-icon class="text-white/50 mb-3 scale-150">add_a_photo</mat-icon>
                            <p class="mb-2 text-sm text-white/70"><span class="font-semibold">Clique para enviar</span> ou arraste</p>
                            <p class="text-xs text-white/40">PNG, JPG até 10MB</p>
                          </div>
                        }
                        @if (bodyImagePreview()) {
                          <img [src]="bodyImagePreview()" alt="Body preview" class="w-full h-full object-cover rounded-2xl p-1" />
                        }
                        <input type="file" class="hidden" accept="image/*" (change)="onFileSelected($event, 'body')" />
                      </label>
                    </div>
                    
                    <div class="flex gap-4">
                      <button type="button" class="px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors" (click)="prevStep()">Voltar</button>
                      <button type="button" class="flex-1 py-3 rounded-xl bg-brand-vibrant text-black font-semibold hover:bg-emerald-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2" [disabled]="tattooForm.invalid || isGenerating()" (click)="generateMockup()">
                        @if (isGenerating()) {
                          <mat-icon class="animate-spin">autorenew</mat-icon>
                        }
                        {{ isGenerating() ? 'Gerando...' : 'Gerar Orçamento e Mockup' }}
                      </button>
                    </div>
                  </div>
                }

              </form>
            </div>
          </div>

          <!-- Result Section -->
          <div class="lg:col-span-7">
            <div class="glass-panel p-6 md:p-8 h-full flex flex-col">
              
              <div class="flex-grow flex flex-col items-center justify-center min-h-[400px] border border-white/5 rounded-2xl bg-brand-black/50 relative overflow-hidden">
                
                <!-- Empty State -->
                @if (!generatedImage() && !isGenerating()) {
                  <div class="text-center p-8">
                    <mat-icon class="text-white/20 scale-[3] mb-6 block mx-auto">wallpaper</mat-icon>
                    <p class="text-white/40 font-medium">Complete os passos para gerar o orçamento e a pré-visualização</p>
                  </div>
                }

                <!-- Loading State -->
                @if (isGenerating()) {
                  <div class="absolute inset-0 flex flex-col items-center justify-center bg-brand-black/80 backdrop-blur-sm z-10">
                    <div class="w-16 h-16 border-4 border-white/10 border-t-brand-vibrant rounded-full animate-spin mb-4"></div>
                    <p class="text-brand-vibrant font-medium animate-pulse">A IA está processando...</p>
                  </div>
                }

                <!-- Result Image -->
                @if (generatedImage()) {
                  <img [src]="generatedImage()" alt="Generated tattoo mockup" class="w-full h-full object-contain rounded-xl animate-in fade-in zoom-in duration-500" />
                }
              </div>

              <!-- Estimation Results -->
              @if (estimationResult()) {
                <div class="mt-6 grid grid-cols-2 gap-4 animate-in slide-in-from-bottom-4 duration-500">
                  <div class="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p class="text-xs text-white/50 uppercase tracking-wider mb-1">Preço Estimado</p>
                    <p class="text-2xl font-display font-bold text-brand-vibrant">{{ estimationResult()?.price }}</p>
                  </div>
                  <div class="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p class="text-xs text-white/50 uppercase tracking-wider mb-1">Tempo Estimado</p>
                    <p class="text-2xl font-display font-bold text-white">{{ estimationResult()?.time }}</p>
                  </div>
                  
                  <button class="col-span-2 mt-2 py-4 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2" (click)="sendToWhatsApp()">
                    <mat-icon>chat</mat-icon>
                    ENVIAR PARA O WHATSAPP
                  </button>
                </div>
              }

            </div>
          </div>

        </div>

        <!-- Educational Section -->
        <div class="mt-24 max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-display font-bold mb-8">Por que o preço da tatuagem muda?</h2>
          <p class="text-white/70 text-lg mb-12">Cada tatuagem é única. O valor depende do tamanho, nível de detalhe e da área do corpo onde será feita.</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
              <mat-icon class="text-brand-vibrant mb-4 scale-150 block mx-auto">aspect_ratio</mat-icon>
              <h4 class="font-bold mb-2">Tamanho</h4>
              <p class="text-sm text-white/50">Tatuagens maiores exigem mais tempo e material.</p>
            </div>
            <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
              <mat-icon class="text-brand-vibrant mb-4 scale-150 block mx-auto">brush</mat-icon>
              <h4 class="font-bold mb-2">Detalhes</h4>
              <p class="text-sm text-white/50">Realismo e traços finos exigem mais técnica e tempo.</p>
            </div>
            <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
              <mat-icon class="text-brand-vibrant mb-4 scale-150 block mx-auto">accessibility</mat-icon>
              <h4 class="font-bold mb-2">Área do Corpo</h4>
              <p class="text-sm text-white/50">Algumas áreas são mais sensíveis ou difíceis de tatuar.</p>
            </div>
            <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
              <mat-icon class="text-brand-vibrant mb-4 scale-150 block mx-auto">schedule</mat-icon>
              <h4 class="font-bold mb-2">Tempo de Sessão</h4>
              <p class="text-sm text-white/50">O valor final é proporcional às horas de trabalho.</p>
            </div>
          </div>
        </div>

        <!-- Tattoo Gallery -->
        <div class="mt-24">
          <h2 class="text-3xl font-display font-bold mb-12 text-center">Galeria de Tatuagens</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            @for (tattoo of tattooGallery; track tattoo.id) {
              <button type="button" class="group cursor-pointer rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-500 border-none p-0" (click)="openTattooModal(tattoo)">
                <img [src]="tattoo.url" alt="Tatuagem" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </button>
            }
          </div>
        </div>

      </div>
    </div>

    @if (activeTattoo()) {
      <button type="button" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 border-none w-full" (click)="closeTattooModal()">
        <div class="bg-brand-gray rounded-3xl p-6 max-w-lg w-full animate-in zoom-in duration-300" (click)="$event.stopPropagation()">
          <img [src]="activeTattoo()!.url" alt="Tatuagem" class="w-full rounded-2xl mb-6" />
          <div class="grid grid-cols-1 gap-3">
            <button type="button" class="w-full py-3 rounded-xl bg-brand-vibrant text-black font-bold hover:bg-emerald-400 transition-colors" (click)="useAsReference(activeTattoo()!)">Usar como referência</button>
            <button type="button" class="w-full py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors" (click)="saveReference()">Salvar referência</button>
            <button type="button" class="w-full py-3 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2" (click)="sendQuoteWhatsApp()">
              <mat-icon>chat</mat-icon> Enviar para orçamento no WhatsApp
            </button>
          </div>
        </div>
      </button>
    }
  `
})
export class TattooAiComponent {
  currentStep = signal(1);
  bodyImagePreview = signal<string | null>(null);
  refImagePreview = signal<string | null>(null);
  isGenerating = signal(false);
  generatedImage = signal<string | null>(null);
  estimationResult = signal<{price: string, time: string} | null>(null);
  activeTattoo = signal<Tattoo | null>(null);

  tattooGallery: Tattoo[] = [
    { id: 1, url: 'https://picsum.photos/seed/tattoo1/600/800' },
    { id: 2, url: 'https://picsum.photos/seed/tattoo2/600/800' },
    { id: 3, url: 'https://picsum.photos/seed/tattoo3/600/800' },
    { id: 4, url: 'https://picsum.photos/seed/tattoo4/600/800' },
    { id: 5, url: 'https://picsum.photos/seed/tattoo5/600/800' },
    { id: 6, url: 'https://picsum.photos/seed/tattoo6/600/800' },
  ];

  tattooForm: FormGroup;
  private fb = inject(FormBuilder);
  private aiService = inject(AiService);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    this.tattooForm = this.fb.group({
      location: ['braço', Validators.required],
      size: ['Média', Validators.required],
      description: ['', Validators.required]
    });
  }

  onFileSelected(event: Event, type: 'body' | 'ref') {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'body') this.bodyImagePreview.set(reader.result as string);
        else this.refImagePreview.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  nextStep() {
    if (this.currentStep() < 5) {
      this.currentStep.update(s => s + 1);
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
    }
  }

  async generateMockup() {
    if (this.tattooForm.invalid || !this.refImagePreview()) return;

    this.isGenerating.set(true);
    this.generatedImage.set(null);
    this.estimationResult.set(null);

    try {
      const vals = this.tattooForm.value;
      
      // Run generation and estimation in parallel
      const promises: [Promise<{ price: string; time: string }>, Promise<string | null>] = [
        this.aiService.estimateTattoo(vals.size, vals.description, vals.location),
        this.bodyImagePreview() 
          ? this.aiService.generateTattooMockup(this.bodyImagePreview()!, this.refImagePreview()!, vals.location)
          : Promise.resolve(null)
      ];

      const results = await Promise.all(promises);
      
      this.estimationResult.set(results[0]);
      if (results[1]) {
        this.generatedImage.set(results[1]);
      } else {
        // If no body image, just show the reference image as the result for now
        this.generatedImage.set(this.refImagePreview());
      }
    } catch (error) {
      console.error("Failed to generate", error);
      alert("Falha ao gerar o orçamento. Tente novamente.");
    } finally {
      this.isGenerating.set(false);
    }
  }

  sendToWhatsApp() {
    const vals = this.tattooForm.value;
    const est = this.estimationResult();
    
    const message = `Olá Clayton! Usei o Simulador de Tatuagem com IA.
    
*Detalhes:*
Local: ${vals.location}
Tamanho: ${vals.size}
Descrição: ${vals.description}

*Estimativa da IA:*
Preço: ${est?.price}
Tempo: ${est?.time}

Gostaria de agendar uma sessão!`;

    const encodedMessage = encodeURIComponent(message);
    if (isPlatformBrowser(this.platformId)) {
      window.open(`https://wa.me/5511959142483?text=${encodedMessage}`, '_blank');
    }
  }

  openTattooModal(tattoo: Tattoo) {
    this.activeTattoo.set(tattoo);
  }

  closeTattooModal() {
    this.activeTattoo.set(null);
  }

  useAsReference(tattoo: Tattoo) {
    // Logic to set this tattoo as reference image
    this.refImagePreview.set(tattoo.url);
    this.closeTattooModal();
    // Scroll to form if needed
  }

  saveReference() {
    // Logic to save reference
    if (isPlatformBrowser(this.platformId)) {
      alert('Referência salva!');
    }
  }

  sendQuoteWhatsApp() {
    const message = "Olá, vi essa tatuagem no site e queria usar como referência para um orçamento.";
    const encodedMessage = encodeURIComponent(message);
    if (isPlatformBrowser(this.platformId)) {
      window.open(`https://wa.me/5511959142483?text=${encodedMessage}`, '_blank');
    }
  }
}

import { Component, ElementRef, ViewChild, AfterViewInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { animate, scroll, stagger, inView } from 'motion';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatIconModule, CommonModule],
  template: `
    <div class="relative w-full bg-brand-black">
      <!-- Fixed Background Video for About Section -->
      <div class="fixed inset-0 pointer-events-none overflow-hidden" style="z-index: 0;">
        <div style="position: absolute; top: 50%; left: 50%; width: 100vw; height: 180.77vw; min-height: 100vh; min-width: 55.31vh; transform: translate(-50%, -50%); pointer-events: none;">
          <iframe 
            src="https://player.vimeo.com/video/1163658521?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&autopause=0" 
            frameborder="0" 
            allow="autoplay; fullscreen; picture-in-picture" 
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
          ></iframe>
        </div>
        <div class="absolute inset-0 bg-brand-black/60"></div>
      </div>

      <!-- Hero Section -->
      <section class="relative h-screen w-full overflow-hidden flex items-center justify-center z-10 bg-brand-black">
        <!-- Background Video -->
        <div class="absolute inset-0 z-0 overflow-hidden bg-brand-black">
          <div style="position: absolute; top: 50%; left: 50%; width: 100vw; height: 177.89vw; min-height: 100vh; min-width: 56.21vh; transform: translate(-50%, -50%); pointer-events: none;">
            <iframe 
              #heroVideo
              src="https://player.vimeo.com/video/1172339149?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&autopause=0" 
              frameborder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
            ></iframe>
          </div>
          <div class="absolute inset-0 bg-brand-black/40 z-10"></div>
          <div class="absolute inset-0 bg-gradient-to-b from-transparent via-brand-black/80 to-brand-black z-10"></div>
        </div>

        <!-- Hero Content -->
        <div class="relative z-20 text-center px-6 max-w-5xl mx-auto mt-20" #heroContent>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8 hero-item opacity-0">
            <span class="w-2 h-2 rounded-full bg-brand-vibrant animate-pulse"></span>
            <span class="text-xs font-medium tracking-wider uppercase text-white/80">Disponível para novos projetos</span>
          </div>
          
          <h1 class="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter mb-6 hero-item opacity-0">
            Clayton <span class="text-transparent bg-clip-text bg-gradient-to-r from-white/50 to-white/10">Santos</span>
          </h1>
          
          <div class="flex flex-wrap justify-center gap-4 md:gap-8 text-lg md:text-2xl font-light text-white/70 hero-item opacity-0">
            <span>Engenheiro de Automação</span>
            <span class="hidden md:inline text-brand-vibrant">•</span>
            <span>Sistemas de IA</span>
            <span class="hidden md:inline text-brand-vibrant">•</span>
            <span>Marketing Digital</span>
          </div>

          <div class="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 hero-item opacity-0">
            <a routerLink="/tattoo-ai" class="px-8 py-4 rounded-full bg-brand-vibrant text-black font-semibold hover:bg-emerald-400 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
              Fazer orçamento de tatuagem
              <mat-icon>arrow_forward</mat-icon>
            </a>
            <a href="https://wa.me/5511959142483" target="_blank" class="px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
              <mat-icon>chat</mat-icon>
              Falar no WhatsApp
            </a>
            <a routerLink="/video-portfolio" class="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-md transition-colors flex items-center gap-2 w-full sm:w-auto justify-center border border-white/10">
              Ver Portfólio
            </a>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span class="text-xs uppercase tracking-widest font-medium">Scroll</span>
          <mat-icon>keyboard_arrow_down</mat-icon>
        </div>
      </section>

      <!-- Scrolling Text Sections -->
      <section class="py-32 px-6 relative z-10 bg-brand-black">
        <div class="max-w-4xl mx-auto space-y-48">
          
          <div class="scroll-text-container min-h-[50vh] flex items-center">
            <h2 class="text-4xl md:text-6xl font-display font-medium leading-tight text-white/20 scroll-text">
              "Eu construo <span class="text-white">sistemas inteligentes</span> e <span class="text-brand-vibrant">plataformas de automação</span>."
            </h2>
          </div>

          <div class="scroll-text-container min-h-[50vh] flex items-center">
            <h2 class="text-4xl md:text-6xl font-display font-medium leading-tight text-white/20 scroll-text">
              "Soluções com IA para <span class="text-white">marketing</span>, <span class="text-white">design de tatuagens</span> e <span class="text-brand-vibrant">automação de negócios</span>."
            </h2>
          </div>

          <div class="scroll-text-container min-h-[50vh] flex items-center">
            <h2 class="text-4xl md:text-6xl font-display font-medium leading-tight text-white/20 scroll-text">
              "Da arte criativa da <span class="text-white">tatuagem</span> a avançadas <span class="text-brand-vibrant">plataformas digitais</span>."
            </h2>
          </div>

        </div>
      </section>

      <!-- About Me Section -->
      <section class="py-32 px-6 relative z-10 border-t border-white/5 bg-transparent min-h-[80vh] flex items-center">
        <div class="max-w-7xl mx-auto w-full">
          <div class="max-w-3xl backdrop-blur-md bg-brand-black/40 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
            <h2 class="text-sm font-mono text-brand-vibrant uppercase tracking-widest mb-4">Sobre Mim</h2>
            <h3 class="text-4xl md:text-5xl font-display font-bold mb-8">Criador de Soluções Digitais</h3>
            <p class="text-xl text-white/90 leading-relaxed mb-8">
              "Sou Clayton, tatuador e criador de soluções digitais. Além da arte da tatuagem, também trabalho com automação, criação de vídeos e identidade visual."
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <a routerLink="/contact" class="px-8 py-4 rounded-full bg-brand-vibrant text-black font-semibold hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2">
                <mat-icon>chat</mat-icon> Falar no WhatsApp
              </a>
              <a routerLink="/tattoo-ai" class="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-md transition-colors flex items-center justify-center gap-2 border border-white/10">
                <mat-icon>brush</mat-icon> Agendar Tatuagem
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section (Scroll Left) -->
      <section class="py-16 bg-brand-black relative z-10 border-t border-white/5 overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h3 class="text-3xl font-display font-bold">Depoimentos</h3>
        </div>
        <div class="relative w-full overflow-hidden flex group" (mouseenter)="pauseTestimonials()" (mouseleave)="resumeTestimonials()" (touchstart)="pauseTestimonials()" (touchend)="resumeTestimonials()">
          <div class="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none"></div>
          <div class="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none"></div>
          <div class="animate-marquee-left gap-6 px-3" [class.pause-animation]="isTestimonialsPaused()">
            @for (video of testimonialVideosExtended; track $index) {
              <div class="w-[280px] md:w-[350px] shrink-0 rounded-3xl overflow-hidden border border-white/10 bg-brand-gray relative cursor-pointer flex flex-col group/card" (click)="openTestimonial(video)">
                <div class="relative aspect-[9/16] w-full overflow-hidden">
                  <img [src]="'https://vumbnail.com/' + video + '.jpg'" alt="Depoimento" class="absolute top-0 left-0 w-full h-full object-cover opacity-80 group-hover/card:opacity-100 transition-opacity duration-500" loading="lazy">
                  <div class="absolute inset-0 bg-black/40 group-hover/card:bg-black/20 transition-colors flex items-center justify-center">
                    <div class="w-16 h-16 rounded-full bg-brand-vibrant/90 text-black flex items-center justify-center shadow-xl group-hover/card:scale-110 transition-transform">
                      <mat-icon class="scale-150 ml-1">play_arrow</mat-icon>
                    </div>
                  </div>
                </div>
                <div class="p-6 bg-brand-gray flex flex-col gap-3">
                  <div class="flex text-brand-vibrant">
                    <mat-icon class="text-[20px] w-[20px] h-[20px]">star</mat-icon>
                    <mat-icon class="text-[20px] w-[20px] h-[20px]">star</mat-icon>
                    <mat-icon class="text-[20px] w-[20px] h-[20px]">star</mat-icon>
                    <mat-icon class="text-[20px] w-[20px] h-[20px]">star</mat-icon>
                    <mat-icon class="text-[20px] w-[20px] h-[20px]">star</mat-icon>
                  </div>
                  <p class="text-white/80 font-medium whitespace-normal line-clamp-3">"Trabalho excepcional! Superou todas as minhas expectativas, recomendo de olhos fechados."</p>
                  <p class="text-white/50 text-sm font-mono">Cliente Satisfeito</p>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Projects Section (Scroll Right) -->
      <section class="py-16 bg-brand-black relative z-10 border-t border-white/5 overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h3 class="text-3xl font-display font-bold">Projetos de Logos e Apresentações</h3>
        </div>
        <div class="relative w-full overflow-hidden flex group" (mouseenter)="pauseProjects()" (mouseleave)="resumeProjects()" (touchstart)="pauseProjects()" (touchend)="resumeProjects()">
          <div class="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none"></div>
          <div class="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none"></div>
          <div class="animate-marquee-right gap-6 px-3" [class.pause-animation]="isProjectsPaused()">
            @for (video of projectVideosExtended; track $index) {
              <div class="w-[280px] md:w-[350px] shrink-0 rounded-3xl overflow-hidden border border-white/10 bg-brand-gray relative cursor-pointer flex flex-col group/card" (click)="openTestimonial(video)">
                <div class="relative aspect-[9/16] w-full overflow-hidden">
                  <img [src]="'https://vumbnail.com/' + video + '.jpg'" alt="Projeto" class="absolute top-0 left-0 w-full h-full object-cover opacity-80 group-hover/card:opacity-100 transition-opacity duration-500" loading="lazy">
                  <div class="absolute inset-0 bg-black/40 group-hover/card:bg-black/20 transition-colors flex items-center justify-center">
                    <div class="w-16 h-16 rounded-full bg-brand-vibrant/90 text-black flex items-center justify-center shadow-xl group-hover/card:scale-110 transition-transform">
                      <mat-icon class="scale-150 ml-1">play_arrow</mat-icon>
                    </div>
                  </div>
                </div>
                <div class="p-6 bg-brand-gray flex flex-col gap-3">
                  <p class="text-white/80 font-medium whitespace-normal line-clamp-3">"Apresentação de marca e animação de logo desenvolvida com foco em impacto visual."</p>
                  <p class="text-white/50 text-sm font-mono">Projeto de Design</p>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Testimonial Modal -->
      @if (activeTestimonial()) {
        <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200">
          <button class="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10" (click)="closeTestimonial()">
            <mat-icon class="scale-150">close</mat-icon>
          </button>
          
          <div class="w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden relative shadow-2xl border border-white/10">
            <iframe [src]="getSafeUrl(activeTestimonial()!, false)" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" class="absolute top-0 left-0 w-full h-full"></iframe>
          </div>
        </div>
      }

      <!-- Skills Platform Grid -->
      <section class="py-32 px-6 bg-brand-gray relative z-10 border-t border-white/5">
        <div class="max-w-7xl mx-auto">
          <div class="mb-16 md:mb-24">
            <h2 class="text-sm font-mono text-brand-vibrant uppercase tracking-widest mb-4">Capacidades da Plataforma</h2>
            <h3 class="text-4xl md:text-5xl font-display font-bold">Soluções Interativas com IA</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" #skillsGrid>
            
            <!-- Skill Card 1 -->
            <a routerLink="/tattoo-ai" class="skill-card group block p-8 rounded-3xl bg-brand-black border border-white/5 hover:border-brand-vibrant/50 transition-all duration-500 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-brand-vibrant/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative z-10">
                <div class="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-brand-vibrant group-hover:scale-110 transition-transform duration-500">
                  <mat-icon class="scale-150">brush</mat-icon>
                </div>
                <h4 class="text-2xl font-display font-semibold mb-3">Tatuagem com IA</h4>
                <p class="text-white/50 mb-6 line-clamp-2">Sistema de estimativa e geração de pré-visualização de tatuagens com IA.</p>
                <div class="flex items-center text-sm font-medium text-brand-vibrant">
                  Acessar App <mat-icon class="ml-1 text-[16px] w-[16px] h-[16px]">arrow_forward</mat-icon>
                </div>
              </div>
            </a>

            <!-- Skill Card 2 -->
            <a routerLink="/traffic" class="skill-card group block p-8 rounded-3xl bg-brand-black border border-white/5 hover:border-brand-vibrant/50 transition-all duration-500 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-brand-vibrant/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative z-10">
                <div class="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-brand-vibrant group-hover:scale-110 transition-transform duration-500">
                  <mat-icon class="scale-150">trending_up</mat-icon>
                </div>
                <h4 class="text-2xl font-display font-semibold mb-3">Simulador de Tráfego</h4>
                <p class="text-white/50 mb-6 line-clamp-2">Calculadora avançada de campanhas de marketing e previsora de ROI.</p>
                <div class="flex items-center text-sm font-medium text-brand-vibrant">
                  Acessar App <mat-icon class="ml-1 text-[16px] w-[16px] h-[16px]">arrow_forward</mat-icon>
                </div>
              </div>
            </a>

            <!-- Skill Card 3 -->
            <a routerLink="/automation" class="skill-card group block p-8 rounded-3xl bg-brand-black border border-white/5 hover:border-brand-vibrant/50 transition-all duration-500 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-brand-vibrant/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative z-10">
                <div class="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-brand-vibrant group-hover:scale-110 transition-transform duration-500">
                  <mat-icon class="scale-150">smart_toy</mat-icon>
                </div>
                <h4 class="text-2xl font-display font-semibold mb-3">Sistemas de Automação</h4>
                <p class="text-white/50 mb-6 line-clamp-2">Bots de WhatsApp, captura de leads e fluxos de atendimento com IA.</p>
                <div class="flex items-center text-sm font-medium text-brand-vibrant">
                  Explorar Sistemas <mat-icon class="ml-1 text-[16px] w-[16px] h-[16px]">arrow_forward</mat-icon>
                </div>
              </div>
            </a>

            <!-- Skill Card 4 -->
            <a routerLink="/gallery" class="skill-card group block p-8 rounded-3xl bg-brand-black border border-white/5 hover:border-brand-vibrant/50 transition-all duration-500 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-brand-vibrant/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative z-10">
                <div class="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-brand-vibrant group-hover:scale-110 transition-transform duration-500">
                  <mat-icon class="scale-150">code</mat-icon>
                </div>
                <h4 class="text-2xl font-display font-semibold mb-3">Desenvolvimento Web</h4>
                <p class="text-white/50 mb-6 line-clamp-2">Plataformas SaaS de alta performance e aplicações web modernas.</p>
                <div class="flex items-center text-sm font-medium text-brand-vibrant">
                  Ver Projetos <mat-icon class="ml-1 text-[16px] w-[16px] h-[16px]">arrow_forward</mat-icon>
                </div>
              </div>
            </a>

            <!-- Skill Card 5 -->
            <a routerLink="/gallery" class="skill-card group block p-8 rounded-3xl bg-brand-black border border-white/5 hover:border-brand-vibrant/50 transition-all duration-500 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-brand-vibrant/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative z-10">
                <div class="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-brand-vibrant group-hover:scale-110 transition-transform duration-500">
                  <mat-icon class="scale-150">movie</mat-icon>
                </div>
                <h4 class="text-2xl font-display font-semibold mb-3">Edição de Vídeo</h4>
                <p class="text-white/50 mb-6 line-clamp-2">Produção de vídeos cinematográficos e criação de conteúdo dinâmico.</p>
                <div class="flex items-center text-sm font-medium text-brand-vibrant">
                  Assistir Reel <mat-icon class="ml-1 text-[16px] w-[16px] h-[16px]">arrow_forward</mat-icon>
                </div>
              </div>
            </a>

            <!-- Skill Card 6 -->
            <a routerLink="/contact" class="skill-card group block p-8 rounded-3xl bg-brand-black border border-white/5 hover:border-brand-vibrant/50 transition-all duration-500 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-brand-vibrant/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative z-10">
                <div class="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-brand-vibrant group-hover:scale-110 transition-transform duration-500">
                  <mat-icon class="scale-150">campaign</mat-icon>
                </div>
                <h4 class="text-2xl font-display font-semibold mb-3">Marketing de Afiliados</h4>
                <p class="text-white/50 mb-6 line-clamp-2">Funis estratégicos e campanhas de marketing otimizadas para conversão.</p>
                <div class="flex items-center text-sm font-medium text-brand-vibrant">
                  Saber Mais <mat-icon class="ml-1 text-[16px] w-[16px] h-[16px]">arrow_forward</mat-icon>
                </div>
              </div>
            </a>

          </div>
        </div>
      </section>
    </div>
  `
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('heroContent') heroContent!: ElementRef;
  @ViewChild('skillsGrid') skillsGrid!: ElementRef;
  @ViewChild('heroVideo') heroVideo!: ElementRef;
  @ViewChild('testimonialsContainer') testimonialsContainer!: ElementRef;

  activeTestimonial = signal<string | null>(null);
  isTestimonialsPaused = signal(false);
  isProjectsPaused = signal(false);

  testimonialVideos = [
    '1163616658',
    '1163616693',
    '1163616724',
    '1163616577',
    '1163616531',
    '1163616473'
  ];

  get testimonialVideosExtended() { return [...this.testimonialVideos, ...this.testimonialVideos]; }

  projectVideos = [
    '1163848089',
    '1163841134',
    '1163841113',
    '1163841086',
    '1163841068',
    '1163841056',
    '1163841034'
  ];

  get projectVideosExtended() { return [...this.projectVideos, ...this.projectVideos]; }

  constructor(private sanitizer: DomSanitizer) {}

  getSafeUrl(vimeoId: string, background: boolean): SafeResourceUrl {
    let url = `https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`;
    if (background) {
      url += '&background=1&muted=1&loop=1&autoplay=1';
    } else {
      url += '&autoplay=1';
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openTestimonial(vimeoId: string) {
    this.activeTestimonial.set(vimeoId);
    this.isTestimonialsPaused.set(true);
    this.isProjectsPaused.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeTestimonial() {
    this.activeTestimonial.set(null);
    this.isTestimonialsPaused.set(false);
    this.isProjectsPaused.set(false);
    document.body.style.overflow = 'auto';
  }

  pauseTestimonials() { this.isTestimonialsPaused.set(true); }
  resumeTestimonials() { if (!this.activeTestimonial()) this.isTestimonialsPaused.set(false); }
  pauseProjects() { this.isProjectsPaused.set(true); }
  resumeProjects() { if (!this.activeTestimonial()) this.isProjectsPaused.set(false); }

  ngAfterViewInit() {
    // Hero Animation
    if (this.heroContent) {
      const items = this.heroContent.nativeElement.querySelectorAll('.hero-item');
      animate(
        items,
        { opacity: [0, 1], y: [30, 0] },
        { delay: stagger(0.15), duration: 0.8, ease: "easeOut" }
      );
    }

    // Parallax effect for hero video
    if (this.heroVideo) {
      scroll(
        animate(this.heroVideo.nativeElement, { y: [0, 200] }),
        { target: document.body, offset: ["start start", "end start"] }
      );
    }

    // Scroll Text Animation
    const scrollTexts = document.querySelectorAll('.scroll-text');
    scrollTexts.forEach((text) => {
      scroll(
        animate(text, { opacity: [0.2, 1, 0.2], scale: [0.95, 1, 0.95] }),
        {
          target: text.parentElement as HTMLElement,
          offset: ["start end", "center center", "end start"]
        }
      );
    });

    // Skills Grid Animation
    if (this.skillsGrid) {
      const cards = this.skillsGrid.nativeElement.querySelectorAll('.skill-card');
      inView(this.skillsGrid.nativeElement, () => {
        animate(
          cards,
          { opacity: [0, 1], y: [50, 0] },
          { delay: stagger(0.1), duration: 0.6, ease: "easeOut" }
        );
      });
    }
  }
}

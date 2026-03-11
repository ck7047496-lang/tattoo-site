import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  vimeoId: string;
  category: string;
}

@Component({
  selector: 'app-video-portfolio',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="min-h-screen bg-brand-black text-white pt-24 pb-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 class="text-4xl sm:text-5xl font-display font-bold mb-6">Portfólio de <span class="text-brand-vibrant">Vídeos</span></h1>
          <p class="text-lg text-white/70 leading-relaxed">
            Uma coleção das minhas edições de vídeo, motion graphics e produções cinematográficas.
          </p>
        </div>

        <!-- Video Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          @for (video of videos; track video.id) {
            <div class="bg-brand-gray border border-white/5 rounded-3xl overflow-hidden group hover:border-brand-vibrant/30 transition-all duration-500 animate-in fade-in zoom-in duration-700">
              
              <!-- Video Container (16:9 Aspect Ratio) -->
              <button type="button" class="relative w-full pt-[56.25%] bg-black cursor-pointer group/vid border-none p-0" (click)="activeVideo.set(video.vimeoId)">
                <img [src]="'https://vumbnail.com/' + video.vimeoId + '.jpg'" alt="Thumbnail" class="absolute top-0 left-0 w-full h-full object-cover opacity-70 group-hover/vid:opacity-100 transition-opacity duration-500" loading="lazy">
                <div class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/vid:bg-transparent transition-colors duration-500">
                  <div class="w-16 h-16 rounded-full bg-brand-vibrant/90 text-black flex items-center justify-center scale-90 group-hover/vid:scale-110 transition-transform shadow-xl">
                    <mat-icon class="scale-150 ml-1">play_arrow</mat-icon>
                  </div>
                </div>
              </button>

              <!-- Content -->
              <div class="p-6 sm:p-8">
                <div class="flex items-center justify-between mb-4">
                  <span class="inline-block px-3 py-1 rounded-full bg-brand-vibrant/10 text-brand-vibrant text-xs font-bold uppercase tracking-wider">
                    {{ video.category }}
                  </span>
                </div>
                <h3 class="text-2xl font-display font-bold mb-3 group-hover:text-brand-vibrant transition-colors">{{ video.title }}</h3>
                <p class="text-white/60 leading-relaxed">{{ video.description }}</p>
              </div>
            </div>
          }
        </div>

        <!-- Modal -->
        @if (activeVideo()) {
          <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200">
            <button class="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10" (click)="activeVideo.set(null)">
              <mat-icon class="scale-150">close</mat-icon>
            </button>
            
            <div class="w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden relative shadow-2xl border border-white/10">
              <iframe [src]="getSafeUrl(activeVideo()!)" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" class="absolute top-0 left-0 w-full h-full"></iframe>
            </div>
          </div>
        }

      </div>
    </div>
  `,
  styles: []
})
export class VideoPortfolioComponent {
  private sanitizer = inject(DomSanitizer);
  activeVideo = signal<string | null>(null);

  videos: VideoItem[] = [
    {
      id: '1',
      title: 'Identidade Visual • Moda',
      description: 'Produção de vídeo focada em identidade visual para o setor de moda.',
      vimeoId: '1163848089',
      category: 'Moda'
    },
    {
      id: '2',
      title: 'Hambúrgueres Gourmet Burg & Craft',
      description: 'Vídeo promocional destacando a qualidade e o preparo de hambúrgueres artesanais.',
      vimeoId: '1163841134',
      category: 'Gastronomia'
    },
    {
      id: '3',
      title: 'PET SHOP',
      description: 'Apresentação de serviços e produtos para pet shop com um visual acolhedor.',
      vimeoId: '1163841113',
      category: 'Pet Shop'
    },
    {
      id: '4',
      title: 'TECNOLOGIA & STARTUP',
      description: 'Vídeo corporativo dinâmico para startups e empresas de tecnologia.',
      vimeoId: '1163841086',
      category: 'Tecnologia'
    },
    {
      id: '5',
      title: 'MODA',
      description: 'Campanha de moda com foco em tendências e estilo de vida.',
      vimeoId: '1163841068',
      category: 'Moda'
    },
    {
      id: '6',
      title: 'Identidade Visual • Construção & Engenharia',
      description: 'Apresentação institucional para empresas do setor de construção civil e engenharia.',
      vimeoId: '1163841056',
      category: 'Engenharia'
    },
    {
      id: '7',
      title: 'Identidade Visual • Automação & Robótica',
      description: 'Vídeo focado em inovação, automação industrial e robótica avançada.',
      vimeoId: '1163841034',
      category: 'Tecnologia'
    }
  ];

  getSafeUrl(vimeoId: string): SafeResourceUrl {
    const url = `https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0&autoplay=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

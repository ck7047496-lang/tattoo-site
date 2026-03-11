import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="border-t border-white/10 bg-brand-black pt-16 pb-8 px-6 md:px-12">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded-lg bg-brand-vibrant flex items-center justify-center text-black font-display font-bold text-xl">
              C
            </div>
            <span class="font-display font-bold text-xl tracking-tight">Clayton<span class="text-white/50">Santos</span></span>
          </div>
          <p class="text-white/50 text-sm max-w-md mb-6">
            Construindo sistemas inteligentes e plataformas de automação. Soluções com IA para marketing, design de tatuagens e automação de negócios.
          </p>
        </div>
        
        <div>
          <h4 class="font-display font-semibold mb-4 text-white">Plataforma</h4>
          <ul class="space-y-2">
            <li><a href="/tattoo-ai" class="text-white/50 hover:text-brand-vibrant text-sm transition-colors">Simulador Tattoo IA</a></li>
            <li><a href="/traffic" class="text-white/50 hover:text-brand-vibrant text-sm transition-colors">Calculadora de Tráfego</a></li>
            <li><a href="/automation" class="text-white/50 hover:text-brand-vibrant text-sm transition-colors">Sistemas de Automação</a></li>
            <li><a href="/gallery" class="text-white/50 hover:text-brand-vibrant text-sm transition-colors">Galeria de Projetos</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-display font-semibold mb-4 text-white">Conectar</h4>
          <ul class="space-y-2">
            <li><a href="https://wa.me/5511959142483" target="_blank" class="text-white/50 hover:text-brand-vibrant text-sm transition-colors">WhatsApp</a></li>
            <li><a href="/contact" class="text-white/50 hover:text-brand-vibrant text-sm transition-colors">Fale Comigo</a></li>
            <li><a href="#" class="text-white/50 hover:text-brand-vibrant text-sm transition-colors">LinkedIn</a></li>
            <li><a href="#" class="text-white/50 hover:text-brand-vibrant text-sm transition-colors">Instagram</a></li>
          </ul>
        </div>
      </div>
      
      <div class="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-white/30 text-xs">© 2026 Clayton Santos. Todos os direitos reservados.</p>
        <div class="flex items-center gap-4 text-white/30 text-xs">
          <a href="#" class="hover:text-white transition-colors">Política de Privacidade</a>
          <a href="#" class="hover:text-white transition-colors">Termos de Serviço</a>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}

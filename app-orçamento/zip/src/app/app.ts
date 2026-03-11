import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-brand-black text-white selection:bg-brand-vibrant selection:text-black">
      <app-navbar />
      <main class="flex-grow pt-[72px]">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
})
export class App {}

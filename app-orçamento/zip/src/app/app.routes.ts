import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TattooAiComponent } from './pages/tattoo-ai/tattoo-ai.component';
import { TrafficComponent } from './pages/traffic/traffic.component';
import { AutomationComponent } from './pages/automation/automation.component';
import { ContactComponent } from './pages/contact/contact.component';
import { VideoPortfolioComponent } from './pages/video-portfolio/video-portfolio.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tattoo-ai', component: TattooAiComponent },
  { path: 'traffic', component: TrafficComponent },
  { path: 'automation', component: AutomationComponent },
  { path: 'video-portfolio', component: VideoPortfolioComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];

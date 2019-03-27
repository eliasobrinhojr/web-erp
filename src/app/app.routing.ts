import { Routes } from '@angular/router';
import { ListagemComponent } from './view/nota/listagem/listagem.component';
import { CadastroComponent } from './view/nota/cadastro/cadastro.component';

export const appRoutes: Routes = [
    { path: '', component: ListagemComponent },
    { path: 'form',      component: CadastroComponent },
    { path: 'form/:id',      component: CadastroComponent },
    { path: '**', component: ListagemComponent }
  ];

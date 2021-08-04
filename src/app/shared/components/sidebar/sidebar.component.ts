import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { Menu } from '@app/shared/models/menu.interface';
import { UtilsService } from '@app/shared/services/util.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<any>();
  lstMenu: Menu[] = [];

  constructor(private authSvc: AuthService, private utilsSvc: UtilsService) {}

  ngOnInit(): void {
    {
      this.lstMenu = [
        {
          nombre: 'Añadir Categoria',
          icono: 'add_circle_outline',
          ruta: '/Category/add',
        },
        {
          nombre: 'Ver categorias',
          icono: 'Category',
          ruta: '/Category',
        }
      ];
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onClose(): void {
    this.utilsSvc.openSidebar(false);
  }

  onExit(): void {
    this.authSvc.logout();
    this.onClose();
  }
}

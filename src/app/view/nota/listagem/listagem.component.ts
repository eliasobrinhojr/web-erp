import { EmpresaService } from './../../../service/empresa/empresa.service';
import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { FeedbackService } from '../../../service/feedback/feedback.service';
import { Nota } from '../../../model/nota.model';
import { NotaService } from '../../../service/nota/nota.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit, AfterViewInit {

  private displayedColumns = ['cdtri', 'cdcgc', 'cddoc', 'serie', 'dtdoc', 'vldes', 'obser'];
  private dataSource: MatTableDataSource<Nota>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() descEmpresa: string;


  constructor(
    private service: EmpresaService,
    private serviceNota: NotaService,
    private router: Router,
    private feedback: FeedbackService
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Nota>();
    this.dataSource.data = [];
    this.paginator.pageSize = 10;
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getNotas(cdtri: string): void {
    this.serviceNota.getAllNotasPorEmpresa(cdtri).subscribe(
      (success: any) => {
        console.log(success);
        this.dataSource.data = success.notas;
      },
      error => {
        console.log(error);
      }
    );
  }

  maskCnpj(value: string){
    return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }


  editThis(id: string): void {
    this.router.navigate([`/form/${id}`]);
  }

  applyFilter(filterValue: string): void {

    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  buscaPorEmpresa(cdtri: string) {
    if (cdtri != '') {


      this.service.getOne(cdtri).subscribe(
        (success: any) => {
          if (success.empresas[0] != undefined) {
            this.descEmpresa = success.empresas[0].dsemp;
            this.getNotas(cdtri);
          } else if (success.empresas.length == 0) {
            this.descEmpresa = 'Empresa não Encontrada';
          } else {
            this.descEmpresa = '';
          }

        }, error => {
          this.descEmpresa = '';
          console.log(error);
        });
    } else {
      this.descEmpresa = '';
    }
  }

}

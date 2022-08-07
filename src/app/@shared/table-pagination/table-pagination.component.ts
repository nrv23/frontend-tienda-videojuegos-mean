import { ITableColumns } from './../../interface/table-columns.interface';
import { ResultInfo, IResultData } from './../../interface/ResultInfo';
import { USERS } from './../../@graphql/operations/query/users';
import { TablePaginationService } from './table-pagination.service';
import { DocumentNode } from '@apollo/client';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit {


  @Input() query: DocumentNode = USERS;
  @Input() context: object;
  @Input() itemsPage: number = 20;
  @Input() include: boolean = true;
  @Input() resultData: IResultData;
  @Input() columns: ITableColumns[];


  infoPage: ResultInfo;
  data$: Observable<any>; // se va trabajar paginando muchos tipos de datos

  constructor(private tablePaginationService: TablePaginationService) {

  }

  loadData() {
    const variables =  {
      page: this.infoPage.page,
      items: this.infoPage.itemsPage,
      include: this.include
    }

    console.log({variables});

    this.data$ = this.tablePaginationService.getCollectionData(this.query,variables,this.context)
      .pipe(
        map((response: any) => {
          

          const data = response[this.resultData.definitionKey];
          this.infoPage = {
            page: data.info.page,
            totalPages: data.info.totalPages,
            itemsPage: this.infoPage.itemsPage,
            total: data.info.total
          };

          console.log("info",this.infoPage);

          return data[this.resultData.listKey];
        })
      )
  }

  pageChange(event: Event) {
    this.loadData()
  }

  ngOnInit(): void {

    if(!this.query) {
      throw new Error("Query parameter is undefined");
    }

    if(!this.resultData) {
      throw new Error("ResulData parameter is undefined");
    }

    if(!this.columns) {
      throw new Error("Columns parameter is undefined");
    }

   this.infoPage = {
      page: 1,
      totalPages: 1 ,
      itemsPage: this.itemsPage,
      total: 1
    };

    this.loadData()
  }

}

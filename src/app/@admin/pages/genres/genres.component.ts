import { ITableColumns } from './../../../interface/table-columns.interface';
import { GENRES } from './../../../@graphql/operations/query/genre';
import { IResultData } from './../../../interface/ResultInfo';
import { DocumentNode } from '@apollo/client';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  query: DocumentNode = GENRES;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  include: boolean ;
  columns: ITableColumns[];

  ngOnInit(): void {

    this.context = { };
    this.itemsPage = 5;
    this.resultData =  {
      listKey: 'genre',
      definitionKey: 'genres'
    };

    this.include = false;
    this.columns = [ 
      {
        property: "id",
        label: "#"
      },
      {
        property: "name",
        label: "Nombre del género"
      },
      {
        property: "slug",
        label: "Slug"
      }
    ]
  }
}

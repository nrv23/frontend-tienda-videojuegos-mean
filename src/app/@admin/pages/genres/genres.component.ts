import { IGenre } from './../../../interface/IGenre';
import { basicAlert } from 'src/app/@shared/alerts/toast';
import { GenresService } from './genres.service';
import { basicFormDialog, infoDetailsBasic } from './../../../@shared/alerts/alerts';
import { ITableColumns } from './../../../interface/table-columns.interface';
import { GENRES } from './../../../@graphql/operations/query/genre';
import { IResultData } from './../../../interface/ResultInfo';
import { DocumentNode } from '@apollo/client';
import { Component, OnInit } from '@angular/core';
import { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  query: DocumentNode = GENRES;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  include: boolean;
  columns: ITableColumns[];

  constructor(private genreService: GenresService) {}

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 5;
    this.resultData = {
      listKey: 'genre',
      definitionKey: 'genres',
    };

    this.include = false;
    this.columns = [
      // tablas con columnas dinamicas
      {
        property: 'id',
        label: '#',
      },
      {
        property: 'name',
        label: 'Nombre del género',
      },
      {
        property: 'slug',
        label: 'Slug',
      },{
        property: "active",
        label: "Estado"
      }
    ];
  }

  async takeAction(event: Array<any>) {
    // leer los datos que vienen del componentehijo

    let defaultValue = "";
    let [action, data] = event; // desctructuring de arrays

    if(data.name) {
      defaultValue = data.name as string;
    }

    const html = `<input id="name" value="${defaultValue}" class="swal2-input" required>`;

    if (String(action) === 'add') {
      const { value: genre }: SweetAlertResult<string> = await basicFormDialog(
        'Agregar género',
        html,
        'name'
      );

      if (!genre) return;

      this.addGenre(genre);
      return;

    } else if (String(action) === 'edit') {

      const { value: genre }: SweetAlertResult<string> = await basicFormDialog(
        'Actualizar género',
        html,
        'name'
      );

      if(!genre) return;

      let { id,name,slug } = data as IGenre;      
      name = genre;

      this.updateGenre({ id,name,slug });

    } else if (String(action) === 'info') {

      infoDetailsBasic('Detalles de Género',`${data.name} (${data.slug})`)
      return;

    } else {
      // opcion de bloquear
      let resp = data as IGenre; 
      const activeUpdated : boolean = !resp.active? true: !resp.active;
      
      const newGenre = {
        id: resp.id,
        name: resp.name,
        slug: resp.slug,
        active: activeUpdated
      };

      data.active = activeUpdated

      data = newGenre;

      //this.blockGenre(Number(data.id), activeUpdated );
    }
  }

  private addGenre(genre: string) {
    this.genreService.addGenre(genre).subscribe(
      (response) => {
        const {
          addGenre: { status, message, genre },
        } = response;

        console.log({ genre });

        if (!status) {
          basicAlert('warning', 'Agregar género', message, 'Ok', true);
        } else {
          basicAlert('success', 'Agregar género', message, 'Ok', true);
        }
      },
      (err: Error) => {
        basicAlert('error', 'Agregar género', err.message, 'Ok', true);
      }
    );
  }

  private updateGenre(genre: IGenre) {
    this.genreService.updateGenre(genre).subscribe(
      (response) => {
        const {
          updateGenre: { status, message, genre },
        } = response;

        console.log({ genre });

        if (!status) {
          basicAlert('warning', 'Actualizar género', message, 'Ok', true);
        } else {
          basicAlert('success', 'Actualizar género', message, 'Ok', true);
        }
      },
      (err: Error) => {
        basicAlert('error', 'Actualizar género', err.message, 'Ok', true);
      }
    );
  }

  private blockGenre(id: number, active: boolean) {

    console.log({id,active});

    this.genreService.blockGenre(id,active).subscribe(
      (response) => {
        const {
          blockGenre: { status, message, genre },
        } = response;

        console.log({ genre });

        if (!status) {
          basicAlert('warning', 'Bloquear género', message, 'Ok', true);
        } else {
          basicAlert('success', 'Bloquear género', message, 'Ok', true);
        }
      },
      (err: Error) => {
        basicAlert('error', 'Bloquear género', err.message, 'Ok', true);
      }
    );
  }
}

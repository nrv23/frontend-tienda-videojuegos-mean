import { IBlockGenreResult, IUpdateGenreResult } from './../../../interface/ResponseGenre';
import { ADD_GENRE } from './../../../@graphql/operations/mutation/genre';
import { ApiService } from './../../../@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { IGenreResult } from 'src/app/interface/ResponseGenre';
import { map } from 'rxjs/internal/operators/map';
import { UPDATE_GENRE } from 'src/app/@graphql/operations/mutation/updateGenre';
import { BLOCK_USER } from 'src/app/@graphql/operations/mutation/blockGenre';
import { Genre } from 'src/app/models/genre.mode';

@Injectable({
  providedIn: 'root'
})
export class GenresService extends ApiService{

  constructor(apollo: Apollo) {
    super(apollo)
  }

  addGenre(genre: string) {
    return this.mutation(ADD_GENRE,{genre},{})
      .pipe(map(response => response as IGenreResult))
  }

  updateGenre(genre: Genre) {
    return this.mutation(UPDATE_GENRE,{genre},{})
    .pipe(map(response => response as IUpdateGenreResult))
  }

  blockGenre(id: number, active: boolean) {
    //return this.mutation

    return this.mutation(BLOCK_USER,{id,active},{})
      .pipe(map(response => response as IBlockGenreResult))
  }
}

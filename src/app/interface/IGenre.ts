import { Genre } from '../models/genre.mode';
import { IResponse } from './Response';
export interface IGenre {
    id: string;
    name: string;
    slug: string;
    active?: boolean;
}

export interface ResponseGenre extends IResponse {
    genre: Genre[];
}
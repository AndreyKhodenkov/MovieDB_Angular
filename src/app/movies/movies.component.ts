import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit{
  genre: any;
  constructor(private api: ServicesService) { }
  linkImage = 'https://image.tmdb.org/t/p/original/'
  id: any;
  title: any;
  image: any;
  vote: any;
  overview: any;
  release_date: any;
  movieArray = []
  count = 1
  movieItem
  movieResults
  element
  apigenre
incr(){
  this.count++
  this.api.getDiscoverMovies(this.count)
  .subscribe(item=>{
    this.movieItem = item
    this.movieResults = this.movieItem.results
    this.movieResults.forEach(element => {
      this.element = element
      this.id = this.element.id
      this.title = this.element.title
      this.vote = this.element.vote_average
      this.image = this.linkImage + this.element.poster_path
      this.overview = this.element.overview
      this.release_date = this.element.release_date
      this.movieArray.push({
        title:this.title,id:this.id,vote:this.vote,image:this.image,overview:this.overview,date:this.release_date
      })
    });
  })
}
ngOnInit(): void {
  this.api.getDiscoverMovies(this.count)
  .subscribe(item =>{
    this.movieItem = item
    this.movieResults = this.movieItem.results
    this.movieResults.forEach(element => {
      this.id = element.id
      this.title = element.title
      this.vote = element.vote_average
      this.image = this.linkImage + element.poster_path
      this.overview = element.overview
      this.genre = element.genre_ids
      this.apigenre = this.api.getArrayGenre(this.genre)
      console.log(this.apigenre);

      this.release_date = element.release_date
      this.movieArray.push({
        title:this.title,id:this.id,vote:this.vote,image:this.image,overview:this.overview,date:this.release_date,genre:this.apigenre
      })
    });
  })
}
}

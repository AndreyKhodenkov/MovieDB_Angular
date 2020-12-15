import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from '../services.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

  link
  resultsMovie
  itemLinkMovie
  movieAraay = []
  title
  poster
  linkPoster = 'https://image.tmdb.org/t/p/original/'
  imagePoter=[]
  overview

  releaseDate
  popularity
  voteAverage
  id
  backgroundImage
  constructor(private apiLink: ServicesService,
              private config:NgbCarouselConfig)
               {
                config.showNavigationArrows = false;
               }

  ngOnInit(): void {
    this.apiLink.getApiPopular()
    .subscribe(item=>{
      this.itemLinkMovie = item
      this.resultsMovie = this.itemLinkMovie.results
      this.resultsMovie.forEach(element => {
        this.title = element.title
        this.poster = element.backdrop_path
        this.overview = element.overview
        this.releaseDate = element.release_date
        this.releaseDate = this.releaseDate.split('-').join('.')
        this.popularity = element.popularity*1000
        this.voteAverage = element.vote_average
        this.id = element.id
        this.backgroundImage =this.linkPoster + this.poster
        this.movieAraay.push(
          {title:this.title,
          poster:this.linkPoster + this.poster,
          overview:this.overview,
          release:this.releaseDate,
          popularity:this.popularity,
          vote:this.voteAverage,
          id:this.id
        })
      });
    })
  }
}

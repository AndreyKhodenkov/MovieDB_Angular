import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { AddMovieService } from '../movie.service';
import { ServicesService } from '../api-service.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  linkYouTube = 'https://www.youtube.com/embed/';
  linkImage = 'https://image.tmdb.org/t/p/original/';
  trailerResults;
  itemTrailer;
  tralerLinkArray;
  trailerKey;
  linkTrailer;
  videoUrl;
  movieItem;
  title: string;
  image;
  date;
  backdrop;
  overview;
  productionCoutry;
  productionCompany;
  homepage;
  spoken;
  revenue;
  vote;
  toggle = true;
  heart = true;
  movie;
  dateTime = new Date();
  id: any;
  array: any[];
  genre: any;
  constructor(
    private route: ActivatedRoute,
    private service: ServicesService,
    private safeVideo: DomSanitizer,
    public add: AddMovieService
  ) {}
  addMovie(movie) {
    this.add.addToCart(movie);
  }
  ngOnInit(): void {
    this.array = this.add.getItems();
    this.route.params.subscribe((params: Params) => {
      this.service.getMovieDetail(params.id).subscribe((item) => {
        this.movieItem = item;
        this.id = this.movieItem.id;
        this.title = this.movieItem.title;
        this.image = this.linkImage + this.movieItem.poster_path;
        this.date = this.movieItem.release_date;
        this.backdrop = this.linkImage + this.movieItem.backdrop_path;
        this.overview = this.movieItem.overview;
        this.productionCoutry = this.movieItem.production_countries[0];
        this.productionCoutry = this.productionCoutry.name;
        this.productionCompany = this.movieItem.production_companies[0];
        this.productionCompany = this.productionCoutry.name;
        this.homepage = this.movieItem.homepage;
        this.spoken = this.movieItem.spoken_languages[0].name;
        this.revenue = this.movieItem.revenue;
        this.vote = this.movieItem.vote_average;
        this.genre = this.movieItem.genres;
        this.movie = {
          type: 'movie',
          id: this.id,
          name: this.title,
          image: this.image,
          date: this.date,
          backdrop: this.backdrop,
          overview: this.overview,
          productionCoutry: this.productionCoutry,
          productionCompany: this.productionCompany,
          homepage: this.homepage,
          spoken: this.spoken,
          revenue: this.revenue,
          vote: this.vote,
          genre: this.genre,
        };
      });
      this.service.getTrailer(params.id).subscribe((item) => {
        this.itemTrailer = item;
        this.trailerResults = this.itemTrailer.results;
        this.tralerLinkArray = this.trailerResults[0];
        this.trailerKey = this.tralerLinkArray.key;
        this.linkTrailer =
          this.linkYouTube +
          this.trailerKey +
          '?controls=0&iv_load_policy=3&autoplay=1&mute=1&';
        this.videoUrl = this.safeVideo.bypassSecurityTrustResourceUrl(
          this.linkTrailer
        );
      });
    });
  }
}

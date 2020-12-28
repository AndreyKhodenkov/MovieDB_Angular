import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { textSpanIntersectsWithPosition } from 'typescript';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-detail-tv',
  templateUrl: './detail-tv.component.html',
  styleUrls: ['./detail-tv.component.scss'],
})
export class DetailTvComponent implements OnInit {
  linkYouTube = 'https://www.youtube.com/embed/';
  linkImage = 'https://image.tmdb.org/t/p/original/';
  trailerResults;
  itemTrailer;
  tralerLinkArray;
  trailerKey;
  linkTrailer;
  videoUrl;
  tvItem;
  title;
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
  toogle = true;
  runTime;
  lastEpisode;
  lastEpisodeName;
  lastEpisodeNumber;
  lastEpisodeSeason;
  lastEpisodeOverview;
  airDate;
  numberEpisode;
  numberSeasons;
  productianCompany = [];
  nextEpisode;
  seasons = [];
  seasonsPoster;
  seasonsName;
  seasonsEpisode;
  seasonsDate;
  seasonsId;
  seasonsOut = [];
  public isCollapsed = true;
  public isCollapsedSecond = false;

  productionCompanyIcon: any;
  iconCompany: any;
  nextEpisodeDate: any;

  constructor(private rote: ActivatedRoute, private service: ServicesService) {
  }
  ngOnInit(): void {
    this.rote.params.subscribe((params: Params) => {
      this.service.getTvDetail(params.id).subscribe((item) => {
        this.tvItem = item;
        this.title = this.tvItem.name;
        this.image = this.linkImage + this.tvItem.poster_path;
        this.date = this.tvItem.first_air_date;
        this.backdrop = this.linkImage + this.tvItem.backdrop_path;
        this.overview = this.tvItem.overview;
        this.productionCoutry = this.tvItem.production_countries[0].name;
        this.productionCompany = this.tvItem.production_companies[0].name;
        this.productionCompanyIcon = this.tvItem.production_companies[0].logo_path;
        this.iconCompany = this.linkImage + this.productionCompanyIcon;
        this.homepage = this.tvItem.homepage;
        this.spoken = this.tvItem.spoken_languages[0].name;
        this.revenue = this.tvItem.revenue;
        this.vote = this.tvItem.vote_average;
        this.runTime = this.tvItem.episode_run_time[0];
        this.lastEpisode = this.tvItem.last_episode_to_air;
        this.airDate = this.lastEpisode.air_date;
        this.lastEpisodeName = this.lastEpisode.name;
        this.lastEpisodeNumber = this.lastEpisode.episode_number;
        this.lastEpisodeSeason = this.lastEpisode.season_number;
        this.lastEpisodeOverview = this.lastEpisode.overview;
        this.numberEpisode = this.tvItem.number_of_episodes;
        this.numberSeasons = this.tvItem.number_of_seasons;
        this.nextEpisode = this.tvItem.next_episode_to_air;
        this.nextEpisodeDate = this.nextEpisode.air_date
        this.seasons = this.tvItem.seasons;
        this.seasons.forEach((item) => {
          this.seasonsDate = item.air_date;
          this.seasonsEpisode = item.episode_count;
          this.seasonsPoster = this.linkImage + item.poster_path;
          this.seasonsName = item.name;
          this.seasonsOut.push({
            name: this.seasonsName,
            image: this.seasonsPoster,
            date: this.seasonsDate,
            episode: this.seasonsEpisode,
            id:this.seasonsId
          });
        });
        console.log(this.tvItem);
      });
    });
  }
}
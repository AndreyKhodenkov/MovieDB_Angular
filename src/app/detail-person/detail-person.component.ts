import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ActivatedRoute, Params } from '@angular/router';
import { ServicesService } from '../api-service.service';

@Component({
  selector: 'app-detail-person',
  templateUrl: './detail-person.component.html',
  styleUrls: ['./detail-person.component.scss'],
})
export class DetailPersonComponent implements OnInit {
  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'determinate';
  value;
  constructor(private http: ServicesService, private route: ActivatedRoute) {}
  linkImage = 'https://image.tmdb.org/t/p/original/';
  item;
  biography;
  name;
  birthday;
  gender;
  job;
  photo;
  popularity;
  person;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.http.getAboutPerson(params.id).subscribe((item) => {
        this.item = item;
        this.biography = this.item.biography;
        this.name = this.item.name;
        this.birthday = this.item.birthday;
        this.gender = this.item.gender;
        this.job = this.item.known_for_department;
        this.photo = this.linkImage + this.item.profile_path;
        this.popularity = this.item.popularity;
        this.person = {
          name: this.name,
          biography: this.biography,
          birthday: this.birthday,
          gen: this.gender,
          job: this.job,
          photo: this.photo,
          popularity: this.popularity,
        };
      });
    });
  }
}

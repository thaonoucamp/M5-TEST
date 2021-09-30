import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bookForm!: FormGroup;
  id!: number;
  URL_API: string = 'http://localhost:3000/books/';

  constructor(private http: HttpClient,
              private activeRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      id: new FormControl(),
      title: new FormControl('', Validators.minLength(1)),
      author: new FormControl('', Validators.minLength(3)),
      description: new FormControl('', Validators.minLength(6)),
    })
    this.activeRoute.params.subscribe((data) => this.id = data.id);
    this.showEditBook(this.id);
  }

  saveBook() {
    this.http.post<Book>(this.URL_API, this.bookForm.value).subscribe((data) => {
      alert("created successfully " + data.title);
      this.router.navigate([""]);
    })
  }

  showEditBook(id: number) {
    this.http.get<Book>(this.URL_API + id).subscribe((data) => {
      this.bookForm.get('id')?.setValue(data.id);
      this.bookForm.get('title')?.setValue(data.title);
      this.bookForm.get('author')?.setValue(data.author);
      this.bookForm.get('description')?.setValue(data.description);
    })
  }
}

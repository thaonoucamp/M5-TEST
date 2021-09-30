import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
  URL_API: string = 'http://localhost:3000/books';
  bookForm!: FormGroup;

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.minLength(1)),
      author: new FormControl('', Validators.minLength(3)),
      description: new FormControl('', Validators.minLength(6)),
    })
  }

  createBook() {
    this.http.post<Book>(this.URL_API, this.bookForm.value).subscribe((data) => {
      alert("create successfully " + data.title)
      this.router.navigate([""])
    })
  }
}

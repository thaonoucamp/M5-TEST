import {Component, OnInit} from '@angular/core';
import {Book} from "../../model/book";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books!: Book[];
  URL_API: string = 'http://localhost:3000/books/';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.http.get<Book[]>(this.URL_API).subscribe((data) => {
      this.books = data;
    })
  }

  deleteBook(id?: number) {
    this.http.delete<Book>(this.URL_API + id).subscribe((data) => {
      alert("Delete successfully !");
      this.getBooks();
    })
  }
}

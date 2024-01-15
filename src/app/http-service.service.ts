import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpServiceService {
  private http = inject(HttpClient);

  getClasses() {
    const httpOptions = {
      withCredentials: true,
    };
    return this.http
      .get(
        "https://thirdp-test.telicent.live/api/write-back/buildings/states/classes",
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  flagToInvestigate() {
    const httpHeaders = new HttpHeaders({
      "Access-Control-Allow-Origin": "http://localhost:4200",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    });

    return this.http
      .post(
        "https://thirdp-test.telicent.live/api/write-back/flag-to-investigate",
        { uri: "http://nationaldigitaltwin.gov.uk/data#building_10094231272" },
        {
          headers: httpHeaders,
          withCredentials: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error("Something bad happened; please try again later.")
    );
  }
}

import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Country } from '../../interfaces/country.interface';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  query = signal('');

    countryResource = rxResource<Country[], { query: string }>({
    params: () => ({ query: this.query().trim() }),
    // En Angular 20 la clave es "stream" (antes "loader")
    stream: ({ params }) => {
      if (!params.query) return of([]);             // evita llamadas en vacío
      return this.countryService.searchByCapital(params.query);
    },
    defaultValue: [],                                // opcional pero útil
  });

  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async({ params }) => {
  //     if (!params.query) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(params.query)
  //     );
  //   },
  // });

      // isLoading = signal(false);
      // isError = signal<string | null>(null);
      // countries = signal<Country[]>([]);

      // onSearch(query: string) {

      //   if (this.isLoading()) return;

      //   this.isLoading.set(true);
      //   this.isError.set(null);

      //   this.countryService.searchByCapital(query)
      //     .subscribe({
      //       next: (countries) => {
      //           this.isLoading.set(false);
      //           this.countries.set(countries);
      //         },
      //         error: (err) => {
      //           this.isLoading.set(false);
      //           this.countries.set([]);
      //           this.isError.set(err);
      //         }
      //     });
      // }
}

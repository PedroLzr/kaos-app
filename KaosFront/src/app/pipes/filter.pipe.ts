import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCountries'
})
export class FilterPipe implements PipeTransform {

  transform(array: any[], text: string = ''): any[] {

    if (text === ''){
      return array;
    }

    if (!array){
      return array;
    }

    text = text.toLowerCase();

    var array1 = array.filter(
      item => item.key.toLowerCase().includes ( text.charAt(0) )
    )

    var array2 = array1[0].countries.filter(
      item => 
        item.name_es.toLowerCase().includes( text )        
      );
      
      return [{key:text.charAt(0).toLocaleUpperCase(), countries: array2 }];
  }

}

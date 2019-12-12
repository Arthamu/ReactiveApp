export class Restaurants {
      private  URL: string;
     private   _id: string;
     private   address: string;
      private  address_line_2: string;
      private  name: string;
      private  outcode: string;
      private  postcode: string;
      private rating: number;
      private type_of_food: string;

	constructor($URL: string, id: string, $address: string, $address_line_2: string, $name: string, $outcode: string, $postcode: string, $rating: number, $type_of_food: string) {
		this.URL = $URL;
		this._id = id;
		this.address = $address;
		this.address_line_2 = $address_line_2;
		this.name = $name;
		this.outcode = $outcode;
		this.postcode = $postcode;
		this.rating = $rating;
		this.type_of_food = $type_of_food;
	}



}

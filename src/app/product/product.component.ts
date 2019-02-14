import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  
  //Variable Declarations
  products:any;
  isOpen:number=-1;
  newImageUrl:any;
  isNotOriginal:number=-1;

  constructor(private productservice : ProductService) {}

  //on load/init call api
  ngOnInit() {
	  this.productservice.viewProduct().subscribe((response) => {
	  		this.products = response; //data from response http://demo4126999.mockable.io/images
	  });  		
  }

  hideModal() {
  		this.isOpen=-1;
  		this.isNotOriginal=-1;
  }

  showModal(index) { //index = index of images 
  		this.isOpen=index;
  		this.newImageUrl=null //reset new image path if modal closed
  		this.isNotOriginal=-1;
  }

  deleteImage(i){
  		this.products[i].image_url=null
  }

  onSelectFile(event,i) { // called each time file input changes; index = index of images    
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.newImageUrl = event.target.result; //added to new image and changed image if selected
        this.products[i].image_url= event.target.result;
        this.isNotOriginal=i;
      }
    }
 }

 resetImage(i) {
 		this.productservice.viewProduct().subscribe((response) => {
  			this.products[i].image_url=response[i].image_url; //added to changed image
  		});
  		this.newImageUrl=null; //reset new image path to upload from new index
  		this.isOpen=-1;
  		this.isNotOriginal=-1
 }

}

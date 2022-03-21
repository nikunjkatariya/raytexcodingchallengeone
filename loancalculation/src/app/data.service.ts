import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private ht:HttpClient) { }

  getdata(){
    return this.ht.get("http://localhost:3000/loan/");
  }

  pushdata(data:any){
    return this.ht.put("http://localhost:3000/loan/"+data.id,data);
  }

  deletedata(id:any){
    return this.ht.delete("http://localhost:3000/loan/"+id);
  }
}

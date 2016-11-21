import { Meteor } from 'meteor/meteor';



Meteor.startup(() => {
  // code to run on server at startup
   var data = new Mongo.Collection("data");
  // if(data.find().count() == 0){
  //
  //   for(var i=0; i<10; i++){
  //     data.insert({
  //       Mid: "",
  //       Name: "",
  //       Owner: "",
  //       Date: "",
  //       RFV: "", //RFV = Reason For Visiting
  //       PVC: "",
  //       Lac: "",
  //       TP: "",
  //       Ket: "",
  //       Azo: "",
  //       Comments : ""
  //     });
  //   }
  // }
  // else{
  //   console.log("but this time its been added" + data.find().count());
  // }
});

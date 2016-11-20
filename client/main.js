import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';



Template.Home.events({

  'click #js-New-Button':function(event){


    console.log('Ayeee lmao you clicked on me');
    $('#modal-data-from').modal('show');

  }




});

var dataValues = [10,20,30,40,50,60,70,80,90];
var keyNames = ["PVC","Lac","TP","Ket","Azo","Pt","Glu","Ptt"];
Template.patientDataInput.helpers({
  name:function(){return keyNames},
  data:function(){return dataValues}
});


Template.patientDataInput.events({
  'submit .js-add-data':function(events){

    console.log("The form has been submitted");
    return false;
  }
});

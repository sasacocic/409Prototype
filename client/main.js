import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


var dataCollection = new Mongo.Collection("data");

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('Home', { to: "main" });
  this.render('patientDataInput',{ to:"modal"});
  this.render('', {to: "display"});
  this.render('Graphs',{to: 'graph'});
  this.render('dataValueGraph', {to: 'modalTwo'});
});

Router.route('/Search', function(){
  this.render('Home', { to: "main" });
  this.render('patientDataInput',{ to:"modal"});
  this.render('searchDisplay', {to:'display'});
  this.render('',{to: 'graph'});
});

function displayData(mid,date,reason){
  this.Mid = mid;
  this.Date = date;
  this.Reason = reason;
}
var displayDataArray = [];
Session.set('disData', displayDataArray);

Template.Home.events({
  'click #js-New-Button':function(event){
    $('#modal-data-from').modal('show');

  },
  'click #js-search-button':function(event){
    console.log('search button was pressed');
  },
  'keypress #js-search-enter':function(event){
    if(event.which == 13){//event is emmited every time a key is pressed. 13 is the enter key.
      let enteredMid = $('#js-search-enter').val();

      while(displayDataArray.length != 0){displayDataArray.pop();}
      var record = dataCollection.find({"Mid":enteredMid}).forEach(function(obj){
        displayDataArray.push(new displayData(obj.Mid,obj.Date,obj.RFV));
        console.log(obj);
      });


      Session.set('disData', displayDataArray);
      if(displayDataArray.length == 0){
        Router.go('/')
      }else{
        Router.go('/Search');
      }
    }
  }
});

var dataValues = [];
for(var qq=0; qq<101;qq++){
  dataValues.push(qq);
}
var keyNames = [{one:"PCV", two:"Lac"},{one: "TP",two:"Ket"},{one:"Azo",two:"Pt"},{one:"Glu",two:"Ptt"}];
Template.patientDataInput.helpers({
  name:function(){return keyNames},
  data:function(){return dataValues}
});


Template.dataValueGraph.helpers({
  names:function(){return keyNames}
});


Template.Graphs.events({

  'click #graphButton':function(event){
    $('#graph-data-modal').modal('show');
  }
});

Template.dataValueGraph.events({

  'submit #graph-data-modal':function(event,template){
    console.log(event.target.graphValue.value);//just printing what the user picked
    return false;
  }
});


Template.patientDataInput.events({
  'submit .js-add-data':function(event,template){
    var mid =  event.target.mid.value + "";
    var name = event.target.name.value + "";
    var date = event.target.date.value+ "";
    var owner = event.target.owner.value+ "";
    var rfv = event.target.RFV.value+ "";
    var pcv = event.target.PCV.value+ "";
    var lac = event.target.Lac.value+ "";
    var tp = event.target.TP.value+ "";
    var ket = event.target.Ket.value+ "";
    var azo = event.target.Azo.value+ "";
    var pt = event.target.Pt.value+ "";
    var glu = event.target.Glu.value+ "";
    var ptt = event.target.Ptt.value+ "";
    var comments = event.target.comments.value+ "";
    dataCollection.insert({
      Mid: mid,
      Name: name,
      Owner: owner,
      Date: date,
      RFV: rfv,
      PCV: pcv,
      Lac: lac,
      TP: tp,
      Ket: ket,
      Azo: azo,
      PT: pt,
      Glu: glu,
      Ptt: ptt,
      Comments: comments
    });
    template.find('form').reset();
    $('#modal-data-from').modal('hide');
    return false;
  }
});

Template.searchDisplay.helpers({
  dat : function(){return Session.get('disData')}
});

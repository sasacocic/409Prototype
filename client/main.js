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
  this.render('printing', {to: 'modalPrint'});
});

Router.route('/Search', function(){
  this.render('Home', { to: "main" });
  this.render('patientDataInput',{ to:"modal"});
  this.render('searchDisplay', {to:'display'});
  this.render('Graphs',{to: 'graph'});
  this.render('dataValueGraph', {to: 'modalTwo'});
  this.render('printing', {to: 'modalPrint'});
});

function displayData(mid,date,reason,id){
  this.Mid = mid;
  this.Date = date;
  this.Reason = reason;
  this.ID = id;
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
        console.log(obj._id);
        displayDataArray.push(new displayData(obj.Mid,obj.Date,obj.RFV,obj._id));
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

var PcvDataValues = [];
for(var qq=0; qq<100;qq++){
  PcvDataValues.push(qq);
}
var LacDataValues = [];
for(var qq=0; qq < 41; qq++){
  LacDataValues.push(qq);
}
var tpDataValues =[];
for(var qq=0; qq < 14; qq++){
  tpDataValues.push(qq);
}
var ketDataValues =[];
for(var qq=0; qq < 9; qq++){
  ketDataValues.push(qq);
}
var azoDataValues =[];
for(var qq=40; qq < 81; qq++){
  azoDataValues.push(qq);
}
var ptDataValues =[];
for(var qq=0; qq < 1000; qq++){
  ptDataValues.push(qq);
}
var gluDataValues =[];
for(var qq=0; qq < 1000; qq++){
  gluDataValues.push(qq);
}
var pttDataValues =[];
for(var qq=10; qq < 1000; qq++){
  pttDataValues.push(qq);
}

var keyNames = [{one:"PCV", two:"Lac", three:"TP", four:"Ket", five:"Azo", six:"PT", seven:"Glu", eight:"PTT"}];

Template.patientDataInput.helpers({
  name:function(){return keyNames},
  pcvData:function(){return PcvDataValues},
  lacData:function(){return LacDataValues},
  tpData:function(){return tpDataValues},
  ketData:function(){return ketDataValues},
  azoData:function(){return azoDataValues},
  ptData:function(){return ptDataValues},
  gluData:function(){return gluDataValues},
  pttData:function(){return pttDataValues}
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
    var pt = event.target.PT.value+ "";
    var glu = event.target.Glu.value+ "";
    var ptt = event.target.PTT.value+ "";
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
      PTT: ptt,
      Comments: comments
    });
    template.find('form').reset();
    $('#modal-data-from').modal('hide');
    return false;
  },
  'click #dismissData' : function(event,template){
    template.find('form').reset();
  },
  'click #print-button' :function(event,template){
    $('#printing-data-modal').modal('show');
  }
});

Template.printing.helpers({
  names:function(){return keyNames}
});

Template.searchDisplay.helpers({
  dat : function(){return Session.get('disData')}
});

Template.searchDisplay.events({

  'click .js-view': function(event,template){

    var tt = event.target;

    var record = dataCollection.findOne(tt.id);

    $('#midIn').val(record.Mid);
    $('#name').val(record.Name);
    $('#date').val(record.Date);
    $('#owner').val(record.Owner);
    $('#rfv').val(record.RFV);
    $('#Lac').val(record.Lac);
    $('#TP').val(record.TP);
    $('#Ket').val(record.Ket);
    $('#Azo').val(record.Azo);
    $('#PT').val(record.PT);
    $('#Glu').val(record.Glu);
    $('#PTT').val(record.PTT);
    $('#PCV').val(record.PCV);
    $('#commentsBox').val(record.Comments);
    $('#Comments').val(record.Comments);
    $('#modal-data-from').modal('show');
  }

});

# Iowa State Lloyd Veterinary Medical Center Project (COM S 409)

This project serves as a base prototype for an electronic medical records system for the Lloyd Veterinary Medical Center at Iowa State. The system is written in MeteorJS, and uses MongoDB as its backend. The project is currently hosted locally on the user's machine.
---

## Installation Instructions

* If you do not have MeteorJS installed, install it [here](https://www.meteor.com/install).
* Open up a bash terminal/console and type:
```bash
git clone https://github.com/sasacocic/409Prototype.git
```
* Install additional packages by running the following command: 
```bash 
meteor npm install --save babel-runtime
```
* If you're using a Windows machine, type ```Meteor.bat``` to run the software. If you're on a Mac, type ```Meteor``` to run it.

## How To Use The Software
1. Open a new tab in a browser and enter ```localhost:3000```. 
2. To create a new record, hit the ```NEW``` button, and enter your data. 
3. You can continue to create new records with the same or different MID values. 
4. To see all the records with the same MID, type a MID in the search box. 
5. To view data from an old record, simply click on the record to have it expand.
6. Click the ```graph``` button in the bottom left corner to select a data point to graph.

Team members: Sasa Cocic, Raj Krishnan, Derek Yu, and Miguel Peralta.

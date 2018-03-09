
'use strict';

///////////////////////////////////////////////////////////////////////
///////////////////      partner test db          ////////////////////
//////////////////////////////////////////////////////////////////////

const uuidv1 = require('uuid/v1');

const objStore =  [
  {
  firstname: 'Bill',
  lastname: 'Smith',
	image: 'https://randomuser.me/api/portraits/lego/0.jpg',
  addr1: "200 Main Street",
  addr2: "apt 100",
  city: "Charlotte",
  state: "NC",
  zip: "28211",
  github: {},
  competencies: ["functions", "test"],
  payments: {},
  digitalRep: {
    rating: 137,
    lastUpdated: Date.now()
  },
  workitems: {
    active: [],
    completed: [],
    archived: [],
    abandoned: [],
    escalations: []
  },
  cell: "+12128883333",
  isAuthenticated: true,
  isActive: true },
  {
  firstname: 'Will',
  lastname: 'Developer',
	image: 'https://randomuser.me/api/portraits/lego/0.jpg',
  addr1: "200 Main Street",
  addr2: "apt 100",
  city: "Charlotte",
  state: "NC",
  zip: "28211",
  github: {},
  competencies: ["design", "test"],
  payments: {},
  digitalRep: {
    rating: 137,
    lastUpdated: Date.now()
  },
  workitems: {
    active: [],
    completed: [],
    archived: [],
    abandoned: [],
    escalations: []
  },
  cell: "+12128883333",
  isAuthenticated: true,
  isActive: true },
  {
  firstname: 'Sally',
  lastname: 'Jones',
	image: 'https://randomuser.me/api/portraits/lego/0.jpg',
  addr1: "200 Main Street",
  addr2: "apt 100",
  city: "Charlotte",
  state: "NC",
  zip: "28211",
  github: {},
  competencies: ["javascript", "test"],
  payments: {},
  digitalRep: {
    rating: 137,
    lastUpdated: Date.now()
  },
  workitems: {
    active: [],
    completed: [],
    archived: [],
    abandoned: [],
    escalations: []
  },
  cell: "+12128883333",
  isAuthenticated: true,
  isActive: true },
  {
  firstname: 'Melissa',
  lastname: 'Jedi',
  image: 'https://randomuser.me/api/portraits/lego/0.jpg',
  addr1: "200 Main Street",
  addr2: "apt 100",
  city: "Charlotte",
  state: "NC",
  zip: "28211",
  github: {},
  competencies: ["java", "python", "test"],
  payments: {},
  digitalRep: {
    rating: 137,
    lastUpdated: Date.now()
  },
  workitems: {
    active: [],
    completed: [],
    archived: [],
    abandoned: [],
    escalations: []
  },
  cell: "+12128883333",
  isAuthenticated: true,
  isActive: true },


]

module.exports = objStore;

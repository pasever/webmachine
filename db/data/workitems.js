'use strict'; 

 ///////     Workitem Test Data     /////// 

 const objStore = [
  {
    "_id": "5aabec685249be1817c05b7a",
    "blockchain": {
      "date": "2018-03-16T16:10:16.490Z"
    },
    "itemId": "1",
    "repo": "reservations",
    "description": "create a reactjs login widget",
    "price": 75,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-01T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.490Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b7d",
    "blockchain": {
      "date": "2018-03-16T16:10:16.491Z"
    },
    "itemId": "4",
    "repo": "reservations",
    "description": "build and test an agent skill to post images to cloudinary",
    "price": 45,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-04T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.491Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b7c",
    "blockchain": {
      "id": "12345",
      "date": "2018-03-16T16:10:16.491Z"
    },
    "itemId": "3",
    "repo": "reservations",
    "description": "create an agent skill to capture credit card data",
    "price": 175,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.491Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b7e",
    "blockchain": {
      "date": "2018-03-16T16:10:16.491Z"
    },
    "itemId": "5",
    "repo": "reservations",
    "description": "create an agent to set up a shared video link",
    "price": 338,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-02T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.491Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b7b",
    "blockchain": {
      "date": "2018-03-16T16:10:16.491Z"
    },
    "itemId": "2",
    "repo": "reservations",
    "description": "create an agent to authenticate",
    "price": 225,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-02T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.491Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b7f",
    "blockchain": {
      "date": "2018-03-16T16:10:16.492Z"
    },
    "itemId": "6",
    "repo": "reservations",
    "description": "create an agent skill to return weather report based on location parameter",
    "price": 206,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-02T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.492Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b83",
    "blockchain": {
      "date": "2018-03-16T16:10:16.493Z"
    },
    "itemId": "4",
    "repo": "issues",
    "description": "a test",
    "price": 100,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.493Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b82",
    "blockchain": {
      "date": "2018-03-16T16:10:16.492Z"
    },
    "itemId": "3",
    "repo": "issues",
    "description": "a test",
    "price": 100,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.492Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b81",
    "blockchain": {
      "date": "2018-03-16T16:10:16.492Z"
    },
    "itemId": "2",
    "repo": "issues",
    "description": "another test",
    "price": 125,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.492Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b80",
    "blockchain": {
      "date": "2018-03-16T16:10:16.492Z"
    },
    "itemId": "1",
    "repo": "issues",
    "description": "test issue from issue repository",
    "price": 100,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-04-11T23:26:27.000Z",
    "PostDate": "2018-03-16T16:10:16.492Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "title": "purposely adding a long title to see how it looks on marketplace",
    "duration": "3"
  },
  {
    "_id": "5aabec685249be1817c05b84",
    "blockchain": {
      "date": "2018-03-16T16:10:16.493Z"
    },
    "itemId": "5",
    "repo": "issues",
    "description": "a test",
    "price": 100,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.493Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b86",
    "blockchain": {
      "date": "2018-03-16T16:10:16.493Z"
    },
    "itemId": "7",
    "repo": "issues",
    "description": "a test",
    "price": 100,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.493Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b85",
    "blockchain": {
      "date": "2018-03-16T16:10:16.493Z"
    },
    "itemId": "6",
    "repo": "issues",
    "description": "a test",
    "price": 100,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.493Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b87",
    "blockchain": {
      "date": "2018-03-16T16:10:16.494Z"
    },
    "itemId": "8",
    "repo": "issues",
    "description": "a test",
    "price": 200,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.494Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b88",
    "blockchain": {
      "date": "2018-03-16T16:10:16.494Z"
    },
    "itemId": "9",
    "repo": "issues",
    "description": "a test",
    "price": 200,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.494Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b89",
    "blockchain": {
      "date": "2018-03-16T16:10:16.494Z"
    },
    "itemId": "10",
    "repo": "issues",
    "description": "a test",
    "price": 200,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.494Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b8a",
    "blockchain": {
      "date": "2018-03-16T16:10:16.494Z"
    },
    "itemId": "11",
    "repo": "issues",
    "description": "a test",
    "price": 200,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.494Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b91",
    "blockchain": {
      "date": "2018-03-16T16:10:16.496Z"
    },
    "itemId": "18",
    "repo": "issues",
    "description": "a test",
    "price": 150,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.496Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b8f",
    "blockchain": {
      "date": "2018-03-16T16:10:16.495Z"
    },
    "itemId": "16",
    "repo": "issues",
    "description": "a test",
    "price": 150,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.495Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b8e",
    "blockchain": {
      "date": "2018-03-16T16:10:16.495Z"
    },
    "itemId": "15",
    "repo": "issues",
    "description": "a test",
    "price": 150,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.495Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b8c",
    "blockchain": {
      "date": "2018-03-16T16:10:16.495Z"
    },
    "itemId": "13",
    "repo": "issues",
    "description": "a test",
    "price": 150,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.495Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b8b",
    "blockchain": {
      "date": "2018-03-16T16:10:16.494Z"
    },
    "itemId": "12",
    "repo": "issues",
    "description": "a test",
    "price": 200,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.494Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b8d",
    "blockchain": {
      "date": "2018-03-16T16:10:16.495Z"
    },
    "itemId": "14",
    "repo": "issues",
    "description": "a test",
    "price": 150,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.495Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b92",
    "blockchain": {
      "date": "2018-03-16T16:10:16.496Z"
    },
    "itemId": "19",
    "repo": "issues",
    "description": "a test",
    "price": 150,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.496Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b95",
    "blockchain": {
      "date": "2018-03-16T16:10:16.497Z"
    },
    "itemId": "2",
    "repo": "retail",
    "description": "write a function to verify credit card information",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.497Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b96",
    "blockchain": {
      "date": "2018-03-16T16:10:16.497Z"
    },
    "itemId": "1",
    "repo": "test-a",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.497Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b90",
    "blockchain": {
      "date": "2018-03-16T16:10:16.496Z"
    },
    "itemId": "17",
    "repo": "issues",
    "description": "a test",
    "price": 150,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.496Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b97",
    "blockchain": {
      "date": "2018-03-16T16:10:16.497Z"
    },
    "itemId": "2",
    "repo": "test-a",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.497Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b94",
    "blockchain": {
      "date": "2018-03-16T16:10:16.496Z"
    },
    "itemId": "1",
    "repo": "retail",
    "description": "create a widget for capturing credit card information",
    "price": 175,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.496Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b93",
    "blockchain": {
      "date": "2018-03-16T16:10:16.496Z"
    },
    "itemId": "20",
    "repo": "issues",
    "description": "a test",
    "price": 150,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.496Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b98",
    "blockchain": {
      "date": "2018-03-16T16:10:16.497Z"
    },
    "itemId": "3",
    "repo": "test-a",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.497Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b99",
    "blockchain": {
      "date": "2018-03-16T16:10:16.497Z"
    },
    "itemId": "4",
    "repo": "test-a",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.497Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05ba1",
    "blockchain": {
      "date": "2018-03-16T16:10:16.499Z"
    },
    "itemId": "12",
    "repo": "test-a",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.499Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05ba0",
    "blockchain": {
      "date": "2018-03-16T16:10:16.499Z"
    },
    "itemId": "11",
    "repo": "test-a",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.499Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b9f",
    "blockchain": {
      "date": "2018-03-16T16:10:16.499Z"
    },
    "itemId": "10",
    "repo": "test-a",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-02T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.499Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b9c",
    "blockchain": {
      "date": "2018-03-16T16:10:16.498Z"
    },
    "itemId": "7",
    "repo": "test-a",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.498Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b9b",
    "blockchain": {
      "date": "2018-03-16T16:10:16.498Z"
    },
    "itemId": "6",
    "repo": "test-a",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.498Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b9a",
    "blockchain": {
      "date": "2018-03-16T16:10:16.498Z"
    },
    "itemId": "5",
    "repo": "test-a",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.498Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b9d",
    "blockchain": {
      "date": "2018-03-16T16:10:16.498Z"
    },
    "itemId": "8",
    "repo": "test-a",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-01T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.498Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05b9e",
    "blockchain": {
      "date": "2018-03-16T16:10:16.498Z"
    },
    "itemId": "9",
    "repo": "test-a",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-02T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.498Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05ba3",
    "blockchain": {
      "date": "2018-03-16T16:10:16.499Z"
    },
    "itemId": "14",
    "repo": "test-a",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.499Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05ba2",
    "blockchain": {
      "date": "2018-03-16T16:10:16.499Z"
    },
    "itemId": "13",
    "repo": "test-a",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-02T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.499Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05ba4",
    "blockchain": {
      "date": "2018-03-16T16:10:16.500Z"
    },
    "itemId": "15",
    "repo": "test-a",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.500Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05ba7",
    "blockchain": {
      "date": "2018-03-16T16:10:16.500Z"
    },
    "itemId": "3",
    "repo": "test-b",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.500Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05ba6",
    "blockchain": {
      "date": "2018-03-16T16:10:16.500Z"
    },
    "itemId": "2",
    "repo": "test-b",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.500Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05ba5",
    "blockchain": {
      "date": "2018-03-16T16:10:16.500Z"
    },
    "itemId": "1",
    "repo": "test-b",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-02T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.500Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05baa",
    "blockchain": {
      "date": "2018-03-16T16:10:16.501Z"
    },
    "itemId": "6",
    "repo": "test-b",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.501Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05ba9",
    "blockchain": {
      "date": "2018-03-16T16:10:16.501Z"
    },
    "itemId": "5",
    "repo": "test-b",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.501Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bab",
    "blockchain": {
      "date": "2018-03-16T16:10:16.501Z"
    },
    "itemId": "7",
    "repo": "test-b",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.501Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05ba8",
    "blockchain": {
      "date": "2018-03-16T16:10:16.501Z"
    },
    "itemId": "4",
    "repo": "test-b",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.501Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bac",
    "blockchain": {
      "date": "2018-03-16T16:10:16.502Z"
    },
    "itemId": "8",
    "repo": "test-b",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.502Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bad",
    "blockchain": {
      "date": "2018-03-16T16:10:16.502Z"
    },
    "itemId": "9",
    "repo": "test-b",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.502Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05baf",
    "blockchain": {
      "date": "2018-03-16T16:10:16.502Z"
    },
    "itemId": "11",
    "repo": "test-b",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.502Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bb0",
    "blockchain": {
      "date": "2018-03-16T16:10:16.503Z"
    },
    "itemId": "12",
    "repo": "test-b",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.503Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bae",
    "blockchain": {
      "date": "2018-03-16T16:10:16.502Z"
    },
    "itemId": "10",
    "repo": "test-b",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.502Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bb5",
    "blockchain": {
      "date": "2018-03-16T16:10:16.504Z"
    },
    "itemId": "2",
    "repo": "test-c",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.504Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bb4",
    "blockchain": {
      "date": "2018-03-16T16:10:16.504Z"
    },
    "itemId": "1",
    "repo": "test-c",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.504Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bb1",
    "blockchain": {
      "date": "2018-03-16T16:10:16.503Z"
    },
    "itemId": "13",
    "repo": "test-b",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.503Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bb2",
    "blockchain": {
      "date": "2018-03-16T16:10:16.503Z"
    },
    "itemId": "14",
    "repo": "test-b",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.503Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bb9",
    "blockchain": {
      "date": "2018-03-16T16:10:16.505Z"
    },
    "itemId": "6",
    "repo": "test-c",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.505Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bb7",
    "blockchain": {
      "date": "2018-03-16T16:10:16.504Z"
    },
    "itemId": "4",
    "repo": "test-c",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.504Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bb6",
    "blockchain": {
      "date": "2018-03-16T16:10:16.504Z"
    },
    "itemId": "3",
    "repo": "test-c",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.504Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bb8",
    "blockchain": {
      "date": "2018-03-16T16:10:16.505Z"
    },
    "itemId": "5",
    "repo": "test-c",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.505Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bbc",
    "blockchain": {
      "date": "2018-03-16T16:10:16.506Z"
    },
    "itemId": "9",
    "repo": "test-c",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.506Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bbb",
    "blockchain": {
      "date": "2018-03-16T16:10:16.505Z"
    },
    "itemId": "8",
    "repo": "test-c",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.505Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bc0",
    "blockchain": {
      "date": "2018-03-16T16:10:16.507Z"
    },
    "itemId": "13",
    "repo": "test-c",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.507Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bbe",
    "blockchain": {
      "date": "2018-03-16T16:10:16.507Z"
    },
    "itemId": "11",
    "repo": "test-c",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.507Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bbd",
    "blockchain": {
      "date": "2018-03-16T16:10:16.506Z"
    },
    "itemId": "10",
    "repo": "test-c",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.506Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bbf",
    "blockchain": {
      "date": "2018-03-16T16:10:16.507Z"
    },
    "itemId": "12",
    "repo": "test-c",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.507Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bb3",
    "blockchain": {
      "date": "2018-03-16T16:10:16.503Z"
    },
    "itemId": "15",
    "repo": "test-b",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.503Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bc2",
    "blockchain": {
      "date": "2018-03-16T16:10:16.508Z"
    },
    "itemId": "15",
    "repo": "test-c",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.508Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bc5",
    "blockchain": {
      "date": "2018-03-16T16:10:16.509Z"
    },
    "itemId": "3",
    "repo": "test-d",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.509Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bba",
    "blockchain": {
      "date": "2018-03-16T16:10:16.505Z"
    },
    "itemId": "7",
    "repo": "test-c",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.505Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bc3",
    "blockchain": {
      "date": "2018-03-16T16:10:16.508Z"
    },
    "itemId": "1",
    "repo": "test-d",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.508Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bc1",
    "blockchain": {
      "date": "2018-03-16T16:10:16.508Z"
    },
    "itemId": "14",
    "repo": "test-c",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.508Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bc4",
    "blockchain": {
      "date": "2018-03-16T16:10:16.509Z"
    },
    "itemId": "2",
    "repo": "test-d",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.509Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bc7",
    "blockchain": {
      "date": "2018-03-16T16:10:16.509Z"
    },
    "itemId": "5",
    "repo": "test-d",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.509Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bc6",
    "blockchain": {
      "date": "2018-03-16T16:10:16.509Z"
    },
    "itemId": "4",
    "repo": "test-d",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.509Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bcb",
    "blockchain": {
      "date": "2018-03-16T16:10:16.510Z"
    },
    "itemId": "9",
    "repo": "test-d",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.510Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bca",
    "blockchain": {
      "date": "2018-03-16T16:10:16.510Z"
    },
    "itemId": "8",
    "repo": "test-d",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.510Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bd0",
    "blockchain": {
      "date": "2018-03-16T16:10:16.512Z"
    },
    "itemId": "14",
    "repo": "test-d",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.512Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bcd",
    "blockchain": {
      "date": "2018-03-16T16:10:16.511Z"
    },
    "itemId": "11",
    "repo": "test-d",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.511Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bcf",
    "blockchain": {
      "date": "2018-03-16T16:10:16.512Z"
    },
    "itemId": "13",
    "repo": "test-d",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.512Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bc8",
    "blockchain": {
      "date": "2018-03-16T16:10:16.509Z"
    },
    "itemId": "6",
    "repo": "test-d",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.509Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bc9",
    "blockchain": {
      "date": "2018-03-16T16:10:16.510Z"
    },
    "itemId": "7",
    "repo": "test-d",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.510Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bcc",
    "blockchain": {
      "date": "2018-03-16T16:10:16.510Z"
    },
    "itemId": "10",
    "repo": "test-d",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.510Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bce",
    "blockchain": {
      "date": "2018-03-16T16:10:16.511Z"
    },
    "itemId": "12",
    "repo": "test-d",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.511Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bd1",
    "blockchain": {
      "date": "2018-03-16T16:10:16.512Z"
    },
    "itemId": "15",
    "repo": "test-d",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.512Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bd2",
    "blockchain": {
      "date": "2018-03-16T16:10:16.513Z"
    },
    "itemId": "1",
    "repo": "test-e",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.513Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bd3",
    "blockchain": {
      "date": "2018-03-16T16:10:16.513Z"
    },
    "itemId": "2",
    "repo": "test-e",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.513Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bd4",
    "blockchain": {
      "date": "2018-03-16T16:10:16.513Z"
    },
    "itemId": "3",
    "repo": "test-e",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.513Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bde",
    "blockchain": {
      "date": "2018-03-16T16:10:16.517Z"
    },
    "itemId": "13",
    "repo": "test-e",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.517Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05be8",
    "blockchain": {
      "date": "2018-03-16T16:10:16.519Z"
    },
    "itemId": "8",
    "repo": "test-f",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.519Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bf2",
    "blockchain": {
      "date": "2018-03-16T16:10:16.522Z"
    },
    "itemId": "3",
    "repo": "test-g",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.522Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bfc",
    "blockchain": {
      "date": "2018-03-16T16:10:16.525Z"
    },
    "itemId": "13",
    "repo": "test-g",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.525Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05c06",
    "blockchain": {
      "date": "2018-03-16T16:10:16.529Z"
    },
    "itemId": "8",
    "repo": "wholesale",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.529Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05c10",
    "blockchain": {
      "date": "2018-03-16T16:10:16.532Z"
    },
    "itemId": "9",
    "repo": "customer-service",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.532Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bda",
    "blockchain": {
      "date": "2018-03-16T16:10:16.516Z"
    },
    "itemId": "9",
    "repo": "test-e",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.516Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05be4",
    "blockchain": {
      "date": "2018-03-16T16:10:16.518Z"
    },
    "itemId": "4",
    "repo": "test-f",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.518Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bee",
    "blockchain": {
      "date": "2018-03-16T16:10:16.521Z"
    },
    "itemId": "14",
    "repo": "test-f",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.521Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bf8",
    "blockchain": {
      "date": "2018-03-16T16:10:16.524Z"
    },
    "itemId": "9",
    "repo": "test-g",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.524Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05c02",
    "blockchain": {
      "date": "2018-03-16T16:10:16.528Z"
    },
    "itemId": "4",
    "repo": "wholesale",
    "description": "write a function that performs X task",
    "price": 125,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.528Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05c0c",
    "blockchain": {
      "date": "2018-03-16T16:10:16.530Z"
    },
    "itemId": "5",
    "repo": "customer-service",
    "description": "write a function that performs X task",
    "price": 275,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.530Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bdc",
    "blockchain": {
      "date": "2018-03-16T16:10:16.516Z"
    },
    "itemId": "11",
    "repo": "test-e",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.516Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5ab80ae0e4f3c07bdda7a503",
    "blockchain": {
      "date": "2018-03-25T20:47:28.592Z"
    },
    "itemId": "5",
    "title": "write function that adds 2 numbers",
    "repo": "workitem-lab",
    "price": 5,
    "duration": "1",
    "dueDate": "2018-03-26T20:47:28.000Z",
    "description": "return the result; do not console.log.\n@jsdev17 I was edited from the marketplace...!",
    "stage": "open",
    "assignee": null,
    "PostDate": "2018-03-25T20:47:28.592Z",
    "id": "c5e82740-306b-11e8-a949-affe79972a1a",
    "__v": 0
  },
  {
    "_id": "5aabec685249be1817c05be5",
    "blockchain": {
      "date": "2018-03-16T16:10:16.519Z"
    },
    "itemId": "5",
    "repo": "test-f",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.519Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bd8",
    "blockchain": {
      "date": "2018-03-16T16:10:16.515Z"
    },
    "itemId": "7",
    "repo": "test-e",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.515Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bef",
    "blockchain": {
      "date": "2018-03-16T16:10:16.521Z"
    },
    "itemId": "15",
    "repo": "test-f",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.521Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05be2",
    "blockchain": {
      "date": "2018-03-16T16:10:16.518Z"
    },
    "itemId": "2",
    "repo": "test-f",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.518Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bf9",
    "blockchain": {
      "date": "2018-03-16T16:10:16.525Z"
    },
    "itemId": "10",
    "repo": "test-g",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.525Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bd9",
    "blockchain": {
      "date": "2018-03-16T16:10:16.515Z"
    },
    "itemId": "8",
    "repo": "test-e",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.515Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bec",
    "blockchain": {
      "date": "2018-03-16T16:10:16.520Z"
    },
    "itemId": "12",
    "repo": "test-f",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.520Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bdd",
    "blockchain": {
      "date": "2018-03-16T16:10:16.516Z"
    },
    "itemId": "12",
    "repo": "test-e",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.516Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05c03",
    "blockchain": {
      "date": "2018-03-16T16:10:16.528Z"
    },
    "itemId": "5",
    "repo": "wholesale",
    "description": "write a function that performs X task",
    "price": 275,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.528Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05be3",
    "blockchain": {
      "date": "2018-03-16T16:10:16.518Z"
    },
    "itemId": "3",
    "repo": "test-f",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.518Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bf6",
    "blockchain": {
      "date": "2018-03-16T16:10:16.524Z"
    },
    "itemId": "7",
    "repo": "test-g",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.524Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05be7",
    "blockchain": {
      "date": "2018-03-16T16:10:16.519Z"
    },
    "itemId": "7",
    "repo": "test-f",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.519Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05c0e",
    "blockchain": {
      "date": "2018-03-16T16:10:16.531Z"
    },
    "itemId": "7",
    "repo": "customer-service",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.531Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bed",
    "blockchain": {
      "date": "2018-03-16T16:10:16.520Z"
    },
    "itemId": "13",
    "repo": "test-f",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.520Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bd7",
    "blockchain": {
      "date": "2018-03-16T16:10:16.515Z"
    },
    "itemId": "6",
    "repo": "test-e",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.515Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05c00",
    "blockchain": {
      "date": "2018-03-16T16:10:16.526Z"
    },
    "itemId": "2",
    "repo": "wholesale",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.526Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bf1",
    "blockchain": {
      "date": "2018-03-16T16:10:16.521Z"
    },
    "itemId": "2",
    "repo": "test-g",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.521Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bf7",
    "blockchain": {
      "date": "2018-03-16T16:10:16.524Z"
    },
    "itemId": "8",
    "repo": "test-g",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.524Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05be1",
    "blockchain": {
      "date": "2018-03-16T16:10:16.518Z"
    },
    "itemId": "1",
    "repo": "test-f",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.518Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bfb",
    "blockchain": {
      "date": "2018-03-16T16:10:16.525Z"
    },
    "itemId": "12",
    "repo": "test-g",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.525Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bd5",
    "blockchain": {
      "date": "2018-03-16T16:10:16.514Z"
    },
    "itemId": "4",
    "repo": "test-e",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.514Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05c01",
    "blockchain": {
      "date": "2018-03-16T16:10:16.526Z"
    },
    "itemId": "3",
    "repo": "wholesale",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.526Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05c0a",
    "blockchain": {
      "date": "2018-03-16T16:10:16.530Z"
    },
    "itemId": "3",
    "repo": "customer-service",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.530Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bea",
    "blockchain": {
      "date": "2018-03-16T16:10:16.520Z"
    },
    "itemId": "10",
    "repo": "test-f",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.520Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05c05",
    "blockchain": {
      "date": "2018-03-16T16:10:16.528Z"
    },
    "itemId": "7",
    "repo": "wholesale",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.528Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bd6",
    "blockchain": {
      "date": "2018-03-16T16:10:16.514Z"
    },
    "itemId": "5",
    "repo": "test-e",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.514Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bdb",
    "blockchain": {
      "date": "2018-03-16T16:10:16.516Z"
    },
    "itemId": "10",
    "repo": "test-e",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.516Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bdf",
    "blockchain": {
      "date": "2018-03-16T16:10:16.517Z"
    },
    "itemId": "14",
    "repo": "test-e",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.517Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5ab8097ae4f3c07bdda7a501",
    "blockchain": {
      "date": "2018-03-25T20:41:30.041Z"
    },
    "itemId": "3",
    "title": "test",
    "repo": "workitem-lab",
    "price": 100,
    "duration": "7",
    "dueDate": "2018-04-01T20:41:30.000Z",
    "description": "running tests",
    "stage": "open",
    "assignee": null,
    "PostDate": "2018-03-25T20:41:30.041Z",
    "id": "c5e82740-306b-11e8-a949-affe79972a1a",
    "__v": 0
  },
  {
    "_id": "5aabec685249be1817c05c0b",
    "blockchain": {
      "date": "2018-03-16T16:10:16.530Z"
    },
    "itemId": "4",
    "repo": "customer-service",
    "description": "it replies with a single greeting.",
    "price": 750,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.530Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "title": "write a banter bot",
    "duration": 5
  },
  {
    "_id": "5aabec685249be1817c05bf5",
    "blockchain": {
      "date": "2018-03-16T16:10:16.524Z"
    },
    "itemId": "6",
    "repo": "test-g",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.524Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05c0f",
    "blockchain": {
      "date": "2018-03-16T16:10:16.531Z"
    },
    "itemId": "8",
    "repo": "customer-service",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.531Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05be0",
    "blockchain": {
      "date": "2018-03-16T16:10:16.517Z"
    },
    "itemId": "15",
    "repo": "test-e",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.517Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05be6",
    "blockchain": {
      "date": "2018-03-16T16:10:16.519Z"
    },
    "itemId": "6",
    "repo": "test-f",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.519Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05be9",
    "blockchain": {
      "date": "2018-03-16T16:10:16.520Z"
    },
    "itemId": "9",
    "repo": "test-f",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.520Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5ab809c6e4f3c07bdda7a502",
    "blockchain": {
      "date": "2018-03-25T20:42:46.406Z"
    },
    "itemId": "4",
    "title": "write function that adds 2 numbers",
    "repo": "workitem-lab",
    "price": 15,
    "duration": "1",
    "dueDate": "2018-04-10T18:05:13.000Z",
    "description": "return the result; do not console.log.\n@jsdev17 I was edited from the marketplace...!",
    "stage": "active",
    "assignee": "Daniel",
    "PostDate": "2018-03-25T20:42:46.406Z",
    "id": "c5e82740-306b-11e8-a949-affe79972a1a",
    "__v": 0
  },
  {
    "_id": "5aabec685249be1817c05bfe",
    "blockchain": {
      "date": "2018-03-16T16:10:16.526Z"
    },
    "itemId": "15",
    "repo": "test-g",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.526Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bf0",
    "blockchain": {
      "date": "2018-03-16T16:10:16.521Z"
    },
    "itemId": "1",
    "repo": "test-g",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.521Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bf3",
    "blockchain": {
      "date": "2018-03-16T16:10:16.522Z"
    },
    "itemId": "4",
    "repo": "test-g",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.522Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05c08",
    "blockchain": {
      "date": "2018-03-16T16:10:16.529Z"
    },
    "itemId": "1",
    "repo": "customer-service",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.529Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bfa",
    "blockchain": {
      "date": "2018-03-16T16:10:16.525Z"
    },
    "itemId": "11",
    "repo": "test-g",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.525Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bfd",
    "blockchain": {
      "date": "2018-03-16T16:10:16.526Z"
    },
    "itemId": "14",
    "repo": "test-g",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.526Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05c04",
    "blockchain": {
      "date": "2018-03-16T16:10:16.528Z"
    },
    "itemId": "6",
    "repo": "wholesale",
    "description": "write a function that performs X task",
    "price": 350,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.528Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05c07",
    "blockchain": {
      "date": "2018-03-16T16:10:16.529Z"
    },
    "itemId": "9",
    "repo": "wholesale",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.529Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05c0d",
    "blockchain": {
      "date": "2018-03-16T16:10:16.531Z"
    },
    "itemId": "6",
    "repo": "customer-service",
    "description": "write a function that performs X task",
    "price": 350,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.531Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5ab71fba98b8ae0998e1319f",
    "blockchain": {
      "date": "2018-03-25T04:04:10.940Z"
    },
    "itemId": "1",
    "title": "I have already left a comment",
    "repo": "workitem-lab",
    "price": 25,
    "duration": "5",
    "dueDate": "2018-04-17T00:37:58.000Z",
    "description": "if this works, it will be the first workitem posted from the marketplace",
    "stage": "open",
    "assignee": null,
    "PostDate": "2018-03-25T04:04:10.940Z",
    "id": "891a2820-2fe1-11e8-b405-f339075d5556",
    "__v": 0
  },
  {
    "_id": "5ab80906e4f3c07bdda7a500",
    "blockchain": {
      "date": "2018-03-25T20:39:34.085Z"
    },
    "itemId": "10",
    "title": "test",
    "repo": "customer-service",
    "price": 100,
    "duration": "7",
    "dueDate": "2018-04-01T20:39:34.000Z",
    "description": "running tests",
    "stage": "open",
    "assignee": null,
    "PostDate": "2018-03-25T20:39:34.085Z",
    "id": "c5e82740-306b-11e8-a949-affe79972a1a",
    "__v": 0
  },
  {
    "_id": "5aabec685249be1817c05beb",
    "blockchain": {
      "date": "2018-03-16T16:10:16.520Z"
    },
    "itemId": "11",
    "repo": "test-f",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "closed",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.520Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bf4",
    "blockchain": {
      "date": "2018-03-16T16:10:16.522Z"
    },
    "itemId": "5",
    "repo": "test-g",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.522Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05bff",
    "blockchain": {
      "date": "2018-03-16T16:10:16.526Z"
    },
    "itemId": "1",
    "repo": "wholesale",
    "description": "write a function that performs X task",
    "price": 320,
    "currency": "USD",
    "stage": "open",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.526Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5aabec685249be1817c05c09",
    "blockchain": {
      "date": "2018-03-16T16:10:16.529Z"
    },
    "itemId": "2",
    "repo": "customer-service",
    "description": "write a function that performs X task",
    "price": 250,
    "currency": "USD",
    "stage": "active",
    "assignee": "[DevName]",
    "dueDate": "2018-03-03T05:00:00.000Z",
    "PostDate": "2018-03-16T16:10:16.529Z",
    "id": "83e94060-2934-11e8-aa09-75cdfc4daa72",
    "__v": 0,
    "duration": 5,
    "title": "arbitrary test title"
  },
  {
    "_id": "5ab720e5645b840c0d0bae00",
    "blockchain": {
      "date": "2018-03-25T04:09:09.573Z"
    },
    "itemId": "2",
    "title": "tag someone",
    "repo": "workitem-lab",
    "price": 20,
    "duration": "2",
    "dueDate": "2018-03-27T04:09:09.000Z",
    "description": "share your excitement and tag someone from strategic machines to let them know the marketplace can now post AND edit workitems @jsdev17",
    "stage": "closed",
    "assignee": "Juan",
    "PostDate": "2018-03-25T04:09:09.573Z",
    "id": "dbf47be0-2fe1-11e8-ba23-c95be42ee108",
    "__v": 0
  },
  {
    "_id": "5ac6a584a55cf0651e28676d",
    "blockchain": {
      "date": "2018-04-05T22:39:00.917Z"
    },
    "itemId": "1",
    "title": "not an issue",
    "repo": "workitems",
    "price": 150,
    "duration": "5",
    "dueDate": "2018-04-10T22:39:00.000Z",
    "description": "this is __not an issue__, just a test from marketplace!",
    "stage": "open",
    "assignee": null,
    "PostDate": "2018-04-05T22:39:00.917Z",
    "id": "f80fb060-391e-11e8-ba89-b399ba97b2fd",
    "__v": 0
  },
  {
    "_id": "5aca5f7c354b486e6c5aa052",
    "blockchain": {
      "date": "2018-04-08T18:29:16.526Z"
    },
    "stage": "open",
    "assignee": null,
    "id": "8e7cd040-3b5a-11e8-9aa7-43e7b05c41b2",
    "itemId": "1",
    "title": "comment on this issue on github",
    "repo": "alpha-test",
    "price": 500,
    "duration": "7",
    "description": "this is an easy one!",
    "PostDate": "2018-04-08T18:29:16.526Z",
    "__v": 0,
    "dueDate": "2018-04-18T00:04:43.000Z"
  },
  {
    "_id": "5aca9d963ed9a0279fd11305",
    "blockchain": {
      "date": "2018-04-08T22:54:14.687Z"
    },
    "stage": "open",
    "assignee": null,
    "id": "9e062b90-3b7f-11e8-b24e-0d125469da4f",
    "itemId": "2",
    "title": "tag someone in the comments",
    "repo": "alpha-test",
    "price": 1000,
    "duration": "7",
    "description": "this is an easy one!",
    "PostDate": "2018-04-08T22:54:14.687Z",
    "__v": 0,
    "dueDate": "2018-04-15T23:37:42.000Z"
  },
  {
    "_id": "5ace7c9d080c829c4cdcb5a3",
    "blockchain": {
      "date": "2018-04-11T21:22:37.223Z"
    },
    "stage": "closed",
    "assignee": "Pat",
    "id": "a707dae0-3dcd-11e8-9541-97001d35a0d2",
    "itemId": "6",
    "title": "This is a very cool agent",
    "repo": "workitem-lab",
    "price": 10,
    "duration": "20",
    "description": "this is a very cool agent for the market",
    "PostDate": "2018-04-11T21:22:37.223Z",
    "__v": 0,
    "dueDate": "2018-05-01T21:26:49.000Z"
  }
]; 

 module.exports = objStore;
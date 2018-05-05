# Webmachine Flow with Data Access

To explain the webmachine flow including data access, first - we need to acknowledge we will be obtaining a User Id from AuthO.  This User Id will be referred to as *access_id*.  This *access_id* will connect an individual to the Networks they run (Client Document) and the Networks they are a member of.

Use of this *access_id* apropos data query will be as follows:

## Get Networks a person manages
> Client.find({ access_id: access_id }).then(resp => {  
> // The array of documents returned here will be every Document their *access_id* appears in the *access_id* field of the Client Document.  These are Networks they  
> // manage.  
> })

## Update a Client's Network
> Client.findOneAndUpdate({ access_id: access_id, name: org_name }, { upsert.....}) ....

## Get Networks a person is a member of
> Client.find({ members: access_id }).then(resp => {  
> // The array of documents returned here will be every Document their *access_id* appears in the members field.  These are Networks they are members of.   
> })

These queries should be run when the Dashboard component is mounted.  *Promise.all* will be used to signal the completion:

> let clientNetworks = getClientNetworks(*access_id*)  
> let memberNetworks = getMemberNetworks(*access_id*)  
> Promise.all([clientNetworks, memberNetworks]).then( ....// assign proper state values here )
  
      
## Beginning the flow  

We're brand new to Strategic Machines, so we check out the *WebMachine* home page.  After a little bit of research, we decide to create an account.  We go through the Sign Up process, verify a cell phone number, and now the *WebMachine* platform has our *access_id*, and we are redirected to the Dashboard.  We have no Networks or Member Profiles to manage, so we can only launch or join a Network.  We decide to look through Public networks.  We see **Best Buy** and decide to become a member.  We are directed to a Member profile page.  This takes our data, opens a connection to the **Best Buy** database, and stores it there, along with our *access_id*.  It also adds our *access_id* to the *members* array of **Best Buy's** *Client* document in the Strategic Machines' database.  So now, when we return to our Dashboard - we still have no Clients (Networks) to manage because our *access_id* doesn't match with any clients, but our member search will find our *access_id* in the *members* array of **Best Buy's** *Client* document.  So we **will** have an option to *Manage our Best Buy profile*.  So, we decide to update our information.  We click "Manage Profile" (or something of that nature), and we open a connection to *Best Buy's* database and retrieve the *Member* who shares our access_id.  The rest of this is basic CRUD functionality.  


We decide this is a great service, and think of ways Strategic Machines can add value to your own business.  So you log back in.  You still see your *Best Buy* member profile, you can still join other networks, but this time you decide to Launch a network of your own.  A *Client* document is created and the access_id and email fields are added, and you're directed to the Client (formerly Platform) maintenance pages.  This is where you add your organization information, database information, select the agents you want to use, and add your payment information.  Everything is complete, and you launch your network.  Awesome!  Other members begin joining, and their *access_id*'s are added to the *members* field of your document in Strategic Machine's database, but their profile information is being stored in yours.  

Now, back at the Dashboard, when we make those two queries, we're getting one document for each.

# Clearing the confusion up, Communicating with the platform

When a text comes into the platform, first - the Network it is going to is identified by their SMS (I believe which is provided to Strategic Machines, but in the event it's not, it *doesn't exactly matter*).  That Network is then identified as either **public** or **Private**.  If **public** - the message is sent through a Watson NLC and an Agent is identified to help.  If they are a **private** network, a search is done against the *Member* collection of the **Network's** database, to see if the SMS # that sent the message can, in fact, communicate with the Network.  

When looking at this separation of concerns and data, it doesn't matter how many Client's one *access_id* launches, it only matters if they have valid payment information.  Nor does it matter how many Networks an *access_id* launches (the only conflict is if an SMS number is *not* provided).  But, if the SMS number of a Network (Client) is *not* provided, they will be limited to one, but it is still irrelevant how many Networks they physically join.
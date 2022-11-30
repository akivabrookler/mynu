# mynu
    WELCOME TO MYNU!
    
1. Cloning
Unzip the tarball of this github repository as follows:
	~$ tar -xzvf (REPOSITORY TARBALL).tgz
2. Installation Process
	Run the following commands:
		~$ cd mynu/mynu
		~/mynu/mynu$ npm install
		~/mynu/mynu$ cd ../backend
		~mynu/backend$ npm install
    Note that the ~ preceding the $ could be any path, depending on where you unzipped the tarball. For simplicity’s sake, we will assume you ran this command while in the root directory. If you didn’t, just run the following commands from the directory you cloned this repository into. 
3. Launching Mynu
	From the project report, get the MongoDB url, and paste it into the .env file within the backend folder as the value of the ATLAS_URI variable.
			~$ cd mynu/backend
            ~/mynu/backend$ (edit .env)
    Navigate to mynu/backend and run the following command:
            ~$ cd mynu/backend
            ~/mynu/backend$ nodemon server
	If you encounter an error regarding port use on macOS, go to your System Preferences → Sharing→ Deselect AirDrop Receiver. Then try again. 
    From backend, run the following:
            ~/mynu/backend$ cd ../mynu
            ~/mynu/mynu$ npm start
	You should be taken to the Mynu webpage. 

You are all set up to use Mynu! Walkthroughs for usage are available below. 

4. Creating a Profile:
    a. Login and Profile are linked.
    b. If you have not yet logged in with Google, clicking either will redirect you to Login, which includes that crucial first step.
    c. Next you will be directed to Profile, where you have the option to change your username, and select your dietary preferences.
5. Sign In:
    a. For returning users, clicking the Login button will function in a similar manner.
    b. The dietary preferences and username can still be modified.
6. Searching Menu Items:
    You have two options:
        a. Filter based on your dietary preferences
        b. If you know what specific items you want, use the search bar at the top of the page to get straight there
    Click on the items of your choice to learn more about that menu offering.Click the like or dislike button to let other users know how you feel about an item.

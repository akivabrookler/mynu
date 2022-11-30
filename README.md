# Mynu
WELCOME TO MYNU!
    
## Cloning
Run the following command:
`~$ git clone https://github.com/akivabrookler/mynu.git`

## Package Installation
Run the following commands:\
		`~$ cd mynu/mynu`\
		`~/mynu/mynu$ npm install`\
		`~/mynu/mynu$ cd ../backend`\
		`~mynu/backend$ npm install`\
		\
Note that the ~ preceding the $ could be any path, depending on where you unzipped the tarball. For simplicity’s sake, we will assume you ran this command while in the root directory. If you didn’t, just run the following commands from the directory you cloned this repository into.

##  Launching Mynu
Set ATLAS_URI in mynu/backend/.env to the private URI needed to access your database.\

Set the api_url in mynu/mynu/src/config.json to the public API for your database. (Default is "http://localhost:5000/")
\
\
Navigate to the backend directory and start the server:\
            `~$ cd mynu/backend`\
            `~/mynu/backend$ nodemon server`\
\
If you encounter an error regarding port use on macOS, go to your System Preferences → Sharing→ Deselect AirDrop Receiver. Then try again.\
\
Navigate to the mynu (frontend) directory and start the client:\
From backend, run the following:\
            `~$ cd mynu`\
            `~/mynu/mynu$ npm start`\
	    \
You should be taken to the Mynu webpage. 

You are all set up to use Mynu! 

## Walkthrough
### Login
Click "Login" or "Profile" on the top bar of the page to login with google.\
\
You can still use Mynu without logging in, but logging in will give you added features:
1. Save your prefrences
2. Like and dislike Menu Items

### Profile
After you login, you can create or edit your profile at any time. Click on "Profile" on the top bar of the page, select your dietary preferences, and click submit. The website will then redirect you to the Menu Items page and show you the filtered list.

### Menu Items
Click "Menu Items" on the top bar of the page to access the Menu Items page.\
\
If you are logged in, the page will automatically load your saved dietary preferences and filter the Menu accordingly. You can also manually select dietary preferences or search the menu items by name.\
\
Click on any menu item to view it in more detail!

### Menu Item

After you click on a menu item, you will be directed to a new page to vieww it in more detail. Here you can see the full list of allergens, the dining hall that has it, and the number of likes and dislikes the item has. If you are logged in, you can like or dislike the item to let others know how you feel. 

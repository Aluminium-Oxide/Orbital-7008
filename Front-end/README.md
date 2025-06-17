# Poster and Video
https://drive.google.com/file/d/1_GbRf3iDdZBtwpxNa7ukA2HSkXlFQL72/view?usp=drive_link
https://drive.google.com/file/d/1OVfyo-aajo78tN2tveP9l6rk1ZIe862T/view?usp=drive_link

# Team Name: Mizar
- Members: Chen Jiayi and Zhang Yuening
# Level of Achievement:
Apollo 11 - We aim to develop a web application that enables students to navigate the CDE(College of Design and Engineering)

# Problem Motivation:
Navigating a big university campus could be tough and challenging for freshmen and students from other faculties. Many students find it easy to get lost when travelling from one building to another through linkways. which cause unnecessary waste of time, especially when students are rushing for lessons. CDE(College of Design and Engineering) is a large area where the builidings there are closely connected by corridors or linkways. Meanwhile, the 3rd floor of building A may also be the 5th floor of building B or the 1st floor of building C. To help students clarify the floor plans of each builidnings and  navigate through the college, we aim to develop this web application.

# Core features:
1. Interactive map:
- The main page of the website is a 2D map of CDE with buttons of buildings' names. Click the buttons and it will bring you to the layered floorplan of the particular building. 
- By clicking the detailed floor, you can access the floorplan of this floor.

2. Navigation: 
- The user will input their locations and their destinations, then the web page will use 2D map to show a path for the user.
- The 2D map of the whole CDE is the building base. If the location user is going is in different buildings(for example, E1 and E2), the map will first guide the user to the linkway between E1 and E2, and then show them the way in another builidng.
- E.g. If I need to go from E4-02-01 to LT7A, I need to go from E4 through E1 to EA. Then the 2D map of E4 will be shown to guide user to go to the connection between E4 and E1. Then 2D map of E1 will guide user from E4-E1 connection to E1-EA connection. With the last 3D map of EA to guide the user from E1-EA connection point to LT7A.

3. (Extra) Estimated time:
-Show the estimated time for travelling

4. Key points to take note:
- GPS will not be use as a form of locating as it has a significant error range indoors.
- To seperate the whole CDE by buildings, we can reduce the amount of things required to load.
- It's better to have a contingency solution if the path recommended is no longer avaliable (e.g. road under construction)
- The web page may be dislocated when open on phone.

# Project Scope: 
A CDE navigation platform using leaflet, enables students to check the floorplans of each buildings and find their way by entering their locations and destinations.
This project aims to develop an online website map tool for the College of Design and Engineering (CDE) at NUS. The tool contains several 2D maps that enable users to interact with to find their way around inside multiple connected buildings that have complicated layouts. Basically, users can enter where they are now and where they want to go, and the platform will show them the relevant building layout and the best route to get there, including how to move between different floors and buildings.

# Milestone 1 Deliverables
1. Frontend: During the first milestone, we focus on designing the user interface and exploring different features. We aim to create a simple, easy-to-use main page that includes a basic interactive map (see core features). To achieve this, we made a simple prototype with just one building (Block EA), with options to click on different floors to see different maps. We also spent a lot of time learning how to use a map software called Leaflet, which helps us load custom maps, manage different map layers, and plan for more advanced routing features in the future.

2. Import floorplan of EA building for prototyping the functions.
By testing the interactive map with just one building, we've built a flexible framework that we can expand later to include more buildings and map layers. The prototype shows how users can view floors and get ready to move between nearby sections. Although we haven't yet connected everything to a backend system or created routes between multiple buildings, this early work sets the foundation for a more detailed and flexible navigation system that considers the specific layout of the CDE area.

## Development Team
  * Adrienn Brinza | **mail:** a.brinza.2025@alumnos.urjc.es | **github:** aaddrii27-alt
  * Sofía Gómez García | **mail:** s.gomezga.2025@alumnos.urjc.es | **github:** sofiwagg
  * Eric Vela Pérez  | **mail:** e.velap.2025@alumnos.urjc.es | **github:** c4ndlee


## Summary
**RecordScratch** aims to be a web application designed to collect an archive of popular music throught the years in the format of **Albums**, each album contains **Songs**, and either of these can be **classified** following _Artist, Genre, Date of Release, etc._

The goal is to provide a curated list of albums across different genres with descriptions about the inspiration behind and information about the author, in order to nurture the user on music culture from a variety of perspectives and _sounds._


## Functionality

### Entities

* #### Main Entity | Albums 
  An Album consists of _7 attributes_:
  1. **Album Name:** The name of the album.
  2. **Album Cover:** An image of the album's cover art.
  3. **Description:** A description of the album's vision and inspirations, sometimes with details about the _making of_ and the _creative process_.
  4. **Tracklist:** The list of _songs_ contained in the album.
  5. **Lead Single:** A youtube videoplayer with the main single or most listened song on the album.
  6. **Genre:** The genre (or genres) the music on the album belongs to.
  7. **Author:** The author's name, photo and brief description.
  8. **Date of Release:** The _day, month and year_ the album was published on.

* #### Secondary Entity | Songs
  A Song consists of _4 attributes_:
  1. **Name:** The name of the song.
  2. **Runtime:** The duration of the song.
  3. **BPM:** The _Beats Per Minute_ (essentially the _rythm_) of the song.

### Images
* **Albums:** Albums will feature an image for the _Album Cover_ and _Author_, as well and sometimes images from the album's _Photo Shoot_ (if any) or related to the album or any of the songs in it.

### Search, filtering and categorization
The user can filter the search via the categories button next to the searchbar, where you can select music genre and date of release.

The data's categorization will be primarily organised as follows:

* Genre
  * Artist
    * Album
      * Song
    
## Practice 1  

### Home Page
![Home Page screenshot](home.png)

### Detail Page
![Detail Page screenshot](detail.png)

### Creation Page
![Creation Page screenshot](creation.png)

### Eric Vela Pérez
  * **Description:** I've created the index and home page, which includes the heading, footer, navigation bar and album grid. It also has a "Create New Element" button that links to the creation page. I made the album grid show the image in a vinyl record case style and also display the Title and Author of the album. At last, I've also added my 3 favorite albums to the grid.

  * **5 most important Commits:**
      * [Added title header](https://github.com/CodeURJC-FW-2026-27/webapp15/commit/9e7c2b8b1d768a6e071da477823f6faddea327db)
      * [Created navbar and added it to all pages](https://github.com/CodeURJC-FW-2026-27/webapp15/commit/05f83ece66ac5770e550efaddbd3bb3736be3981)
      * [Created album grid on home page](https://github.com/CodeURJC-FW-2026-27/webapp15/commit/5815b4f6def1eb4b74983e1597ed7a2580774f57)
      * [Made searchbar and filter button on Header and added it to all pages](https://github.com/CodeURJC-FW-2026-27/webapp15/commit/729c64cbc0903a604141e84ca50cbec62d8efc49)
      * [Created index landing page](https://github.com/CodeURJC-FW-2026-27/webapp15/commit/1099921e9c17a1626a6e9a281e7ee24546628cf6)
  * **Files I worked on:**
      *  [Index page](index.html)
      *  [Home page](home.html)
      *  [Detail page](detail_WPSIATWIN.html)
      *  [Creation page](detail.html)
      *  [Styles](styles.css)

### Sofía Gómez García
  * **Description:** I made the detail page template, along with the detail page that shows an album as an example whenever you click any album in the home page. The detail page Shows the title of the album, its cover, specifications about the genre, release date and author; the tracklist along with each song's runtime and bpm, and a button to delete and edit each one as well; a description of the album and what it is about, a video of the album's lead single, a button to go to creation page, another button to go to home page, a form to add a new song to the album, and the footer. I have also added three albums to the home page.

  * **5 most important Commits:**
      * [Created project files form template](https://github.com/CodeURJC-FW-2026-27/webapp15/commit/e50f708434dbf8fec9bc9afaf45f8052ef9ea885)
      * [Made changes in the distribution of detail page and added WPSIATWIN album](https://github.com/CodeURJC-FW-2026-27/webapp15/commit/9f6ee6275a4ebe57e665ae7bd1b34ac5e2aae294)
      * [Made the last changes in detail page and added albums to home](https://github.com/CodeURJC-FW-2026-27/webapp15/commit/9aa2c14bb8cec7df92b12ca10d322f09eb875161)
      * [Changed some details in detail pages](https://github.com/CodeURJC-FW-2026-27/webapp15/commit/d8ec57f6b8f8212f3472f20057e677a05f0a57e3)
      * [Added delete and edit buttons to each song in detail](https://github.com/CodeURJC-FW-2026-27/webapp15/commit/8f1bfc576a83cab56cf172eee48d8c085d560a08)
  * **Files I worked on:**
    *  [Detail Template page](detail.html)  [Home page](home.html)
    *  [Detail page](detail_WPSIATWIN.html)
    *  [Styles](styles.css)
    *  [Home page](home.html)
    *  [Creation page](detail.html)

### Adrienn Brinza
  * **Description:** I've made the creation page template, which includes a form with 8 different fields and 2 buttons: one labeled “Save” (which has no function) and   another labeled “Cancel” that redirects you to the home page. I've also added my 3 favorite albums to the home page, each with its cover art and respective genre.     
              
  * **5 most important Commits:**
      * [Introduction to all elements of the “Create” page](https://github.com/CodeURJC-FW-2026-27/webapp15/commit/10157cc7584c51a3aa768f4492c6ac65dbd135bb)
      * [Link the creation page to the main page](https://github.com/CodeURJC-FW-2026-27/webapp15/commit/4de6c414555b959466db30ab72a11ae406d77164)
      * [Start changing style of creation page](https://github.com/CodeURJC-FW-2026-27/webapp15/commit/b0f2e1acd03be4b422ec64154d70fc0e381da10b)
      * [Introduced my albums at home page](https://github.com/CodeURJC-FW-2026-27/webapp15/commit/4bf0fe2e8786c634d87f663c84bd76ed2f02fe9f)
      * [Last changes at form](https://github.com/CodeURJC-FW-2026-27/webapp15/commit/d4d4448b9954408ad2b2d29572e071724ecc0371)
  * **Files I worked on:**
    *  [Creation page](creation.html)
    *  [Home page](home.html)
    *  [Styles](styles.css)
    *  [Detail page](detail_WPSIATWIN.html)
    *  [Template Page](template.html)
 

# RecordScratch


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
  1. **Cover Art:** A image of the song's cover photo (or photos if multiple).
  2. **Runtime:** The duration of the song.
  3. **BPM:** The _Beats Per Minute_ (essentially the _rythm_) of the song.
  4. **Artists:** The author and (if any) featured artists' name, photo and brief description.

### Images
* **Albums:** Albums will feature an image for the _Album Cover_ and _Author_, as well and sometimes images from the album's _Photo Shoot_ (if any) or related to the album or any of the songs in it.
* **Songs:** Songs will feature an image (or images) for the _Cover Art_ and _Artists_.

### Search, filtering and categorization
Search queries may relate to the _Name of the Album_, _Name of the Author_, _Name of the Song_, _Name of the Genre_, _Date of Release_ or _BPM_, allowing the user to filter the search based on these preferences.

The data's categorization will be primarily organised as follows:

* Genre
  * Artist
    * Album
      * Song
### Participation in the workplace 
  * Adrienn Brinza
      * Description: I've created the detail page, which includes a form with 8 different fields and 2 buttons: one labeled “Save” (which has no function) and   another labeled “Cancel” that redirects you to the home page. I've also added my 3 favorite albums to the home page, each with its cover art and respective genre.       * Commits:
         *
         *
         *
         *
         *
      * Files:
         *  Creation page (creation.html)
         *  Home page (home.html)
         *  Styles (css)
         *  Template page (template.html)
         *  Detail (detail.html)
         
         
         


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
  1. **Album Cover:** An image of the album's cover art.
  2. **Description:** A description of the album's vision and inspirations, sometimes with details about the _making of_ and the _creative process_.
  3. **Tracklist:** The list of _songs_ contained in the album.
  4. **Lead Single:** A sample audio file of the _main single or most popular track_ of the album.
  5. **Genre:** The genre (or genres) the music on the album belongs to.
  6. **Author:** The author's name, photo and brief description.
  7. **Date of Release:** The _day, month and year_ the album was published on.

* #### Secondary Entity | Songs
  A Song consists of _3 attributes_:
  1. **Cover Art:** A image of the song's cover photo (or photos if multiple).
  1. **Runtime:** The duration of the song.
  2. **BPM:** The _Beats Per Minute_ (essentially the _rythm_) of the song.
  3. **Genre:** Alternatively provides the music genre the song belongs to since the same album can contain songs that belong to various genres.
  4. **Artists:** The author and (if any) featured artists' name, photo and brief description.

### Images
* **Albums:** Albums will feature an image for the _Album Cover_ and _Author_, as well and sometimes images from the album's _Photo Shoot_ (if any) or related to the album or any of the songs in it.
* **Songs:** Songs will feature an image (or images) for the _Cover Art_ and _Artists_.

### Search, filtering and categorization
Search queries may relate to the _Name of the Album_, _Name of the Author_, _Name of the Song_, _Name of the Genre_, _Date of Release_ or _BPM_, allowing the user to filter the search based on these preferences.

The data's categorization will be primarily organised as follows:

* Artist
  * Album
    * Song
      * Genre
      
_(It's possible that the Artist or the Album may be included in a Genre, attending to the main genre the artist releases music of)_

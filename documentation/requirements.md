# Requirements


Glossary
| Category     | Word        | Meaning                                                                                                 |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------- |
| **Model**    |             |                                                                                                         |
|              | Song        |                                                                                                         |
|              | Artist      |                                                                                                         |
|              | Melody      |                                                                                                         |
| **Database** |             |                                                                                                         |
|              | Item        | A song, artist or melody.                                                                               |
|              | Entry       | A database entry which includes a song, artist or melody as well as database-related information.       |
|              | Collection  | A collection of entries of a specific type.                                                             |
|              | History     | A collection of previous revision of entries of a specific type.                                        |
|              | Create      | Upload entry which is not tied to an ID that already exists in the database                             |
|              | Retrieve    |                                                                                                         |
|              | Delete      | Remove the data of an entry.                                                                            |
|              | Replace     | Completely change the data of an entry in one action.                                                   |
|              | Patch       | Change one part of an entry.                                                                            |
|              | Restore     | Replace an item with the item in a previous revision of the same ID.                                    |
|              | Recover     | Retrive an item from a previous revision of a certain ID.                                               |
|              | Drop        | Remove a revision from the history of an entry of a certain ID.                                         |
|              | Purge       | Drop all revisions and completeley remove an entry of a certain ID.                                     |
| **Roles**    |             |                                                                                                         |
|              | User        | A user of the system who can access public functions through API or GUI. Can be anonymous or logged in. |
|              | Admin       | A user of the system who can access all functions through API or GUI. Must be logged in.                |
| **GUI**      |             |                                                                                                         |
|              | Songbook    | The web page where a user can see all songs at a glance.                                                |
|              | Song page   | The web page where a user can see a specific song.                                                      |
|              | Artist page | The web page where a user can see a specific artist.                                                    |
|              | Melody page | The web page where a user can see a specific melody.                                                    |
|              | Editor      | The web page where a user can edit songs, melodies and artists.                                         |

## GUI

### Editors

#### Basics
| ID     | Requirement                                                                 | Priority | Status |
| ------ | --------------------------------------------------------------------------- | -------- | ------ |
| ED-A01 | A **user** can press a button to start writing a new song.                  | Must     |        |
| ED-A03 | A **user** can click a button to save all the changes made in the editor.   | Must     |        |
| ED-A02 | A **user** can click a button to cancel all the changes made in the editor. | Must     |        |

#### Metadata
| ID     | Requirement                                                                              | Priority | Status |
| ------ | ---------------------------------------------------------------------------------------- | -------- | ------ |
| ED-B02 | A **user** can edit the title of a song.                                                 | Must     |        |
| ED-B02 | A **user** can add to a list of alternative titles of a song.                            | Must     |        |
| ED-B02 | A **user** can set song as an original melody.                                           | Must     |        |
| ED-B02 | A **user** can set the melody of a song as a song with an original melody.               | Must     |        |
| ED-B02 | A **user** can automatically create an empty melody if the set melody doesn't exist.     | May      |        |
| ED-B03 | A **user** can see auto-completion for melodies.                                         | Must     |        |
| ED-A04 | A **user** can click a link of an melody to be brought to the corresponding melody page. | Must     |        |

#### Lyrics
| ID     | Requirement                                                                                                                | Priority | Status |
| ------ | -------------------------------------------------------------------------------------------------------------------------- | -------- | ------ |
| ED-A05 | A **user** can click a button to add a stanza to a song which opens a text-editable field.                                 | Must     |        |
| ED-A12 | A **user** can change the type of stanza to verse, chorus or instruction.                                                  | May      |        |
| ED-A05 | A **user** can write in the text-editable field.                                                                           | Must     |        |
| ED-A05 | A **user** can create a new line by pressing enter at the end of the line.                                                 | Must     |        |
| ED-A05 | A **user** can break a new line by pressing enter in the middle of a line.                                                 | Must     |        |
| ED-A05 | A **user** can create a new stanza by pressing enter on an empty line.                                                     | Must     |        |
| ED-A07 | A **user** can click a button to add a copy of a previously written chorus to a song.                                      | May      |        |
| ED-A08 | A **user** can update the previously written chorus and see the changes in the copy.                                       | May      |        |
| ED-A09 | A **user** can press a button to unlink a line from the previous chorus so that it does not copy from the previous chorus. | May      |        |
| ED-A10 | A **user** can click a button to add an line-instruction to a song.                                                        | May      |        |
| ED-A11 | A **user** can click a button to add an prefix-instruction to a song.                                                      | May      |        |
| ED-A12 | A **user** can click a button to add an inline-instruction to a song.                                                      | May      |        |
| ED-A12 | A **user** can click a button to open a simple editor.                                                                     | May      |        |
| ED-A12 | A **user** can paste a longer text into the simple editor and press a button to convert to a complex song object.          | May      |        |
| ED-A12 | A **user** can see the total number of syllables per line.                                                                 | May      |        |
| ED-A12 | A **user** can see the total number of syllables per line for the corresponding line in the melody.                        | May      |        |
| ED-A12 | A **user** can click a word and see a small menu showing the number of syllables in that word which they can edit.         | May      |        |

#### Melody Editor
| ID     | Requirement                                                 | Priority | Status |
| ------ | ----------------------------------------------------------- | -------- | ------ |
| ED-B01 | A **user** can press a button to start adding a new melody. | Must     |        |

### Profile
| ID     | Requirement                      | Priority | Status |
| ------ | -------------------------------- | -------- | ------ |
| PR-A01 | A **user** can *upload* an item. | Must     |        |


## API

### Database

#### User actions
| ID     | Requirement                                                                                                                          | Priority | Status |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------ | -------- | ------ |
| DB-A01 | A **user** can *upload* an item.                                                                                                     | Must     |        |
| DB-A02 | A **user** can *replace* an item with a new item of the same type.                                                                   | Must     |        |
| DB-A03 | A **user** can *patch* an item's field.                                                                                              | May      |        |
| DB-A04 | A **user** can *delete* an item.                                                                                                     | Must     |        |
| DB-A05 | A **user** can *retrieve* a single item by ID.                                                                                       | Must     |        |
| DB-A06 | A **user** can *retrieve* a collection of all items of a certain type.                                                               | Must     |        |
| DB-A07 | A **user** can *retrieve* a searched collection of all items of a certain type sorted by their result relevance in all their fields. | Must     |        |
| DB-A08 | A **user** can *retrieve* a collection of items of a certain type by supplying a list of IDs.                                        | Must     |        |
| DB-A09 | A **user** can *retrieve* a complete list of IDs for all items of a certain type.                                                    | Must     |        |
| DB-A10 | A **user** can *recover* a history of revisions for a given item ID.                                                                 | Must     |        |
| DB-A11 | A **user** can *recover* a revision for a given ID and revision number.                                                              | Must     |        |
| DB-A12 | A **user** can *restore* a revision for a given ID and revision number.                                                              | Must     |        |

#### Admin actions
| ID     | Requirement                                                                     | Priority | Status |
| ------ | ------------------------------------------------------------------------------- | -------- | ------ |
| DB-B01 | An **admin** can *drop* a revision of a certain ID for a given revision number. | Must     |        |
| DB-B02 | An **admin** can *drop* the complete history of a given entry ID.               | Must     |        |
| DB-B03 | An **admin** can *purge* an entry of a given entry ID.                          | Must     |        |

#### Options
| ID     | Requirement                                                                                                       | Priority | Status |
| ------ | ----------------------------------------------------------------------------------------------------------------- | -------- | ------ |
| DB-C01 | All **retreive** functions can be specified to return a result *filtered* by one or more of its primitive fields. | Must     |        |
| DB-C02 | All **retreive** functions can be specified to return a result *sorted* by one of its primitive fields.           | Must     |        |
| DB-C03 | All **retreive** functions can be specified to return a result *limited* to certain number of results.            | Must     |        |
| DB-C04 | All **retreive** functions can be specified to return a *paginated* result by page size and page number.          | Must     |        |

### Meta

#### API Info
| ID     | Requirement                                                                                                                                             | Priority | Status |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------ |
| ME-A01 | A **developer** can *retreive* a list of all available API functions and their path, HTTP method, description, parameter specification and permissions. | Must     |        |
| ME-A02 | A **developer** can *retreive* a filtered list of all available methods based on path, HTTP method or permissions.                                      | Must     |        |


# Notes
## Specific Functional Requirements

Are all the inputs to the system specified, including their source, accuracy, 
range of values, and frequency? Are all the outputs from the system specified, 
including their destination, accuracy, range of values, frequency, and format?

- Are all output formats specified for Web pages, reports, and so on?

- Are all the external hardware and software interfaces specified? 

- Are all the external communication interfaces specified, including handshaking, 
error-checking, and communication protocols? 

- Are all the tasks the user wants to perform specified? Is the data used in each 
task and the data resulting from each task specified? 

## Specific Nonfunctional (Quality) 
Requirements Is the expected response time, from the user's point of view, specified 
for all necessary operations? 

- Are other timing considerations specified, such as processing time, datatransfer 
rate, and system throughput? 

- Is the level of security specified? 

- Is the reliability specified, including the consequences of software failure, 
the vital information that needs to be protected from failure, and the strategy 
for error detection and recovery? 

- Are minimum machine memory and free disk space specified? 

- Is the maintainability of the system specified, including its ability to adapt 
to changes in specific functionality, changes in the operating environment, 
and changes in its interfaces with other software? 

- Is the definition of success included? Of failure?
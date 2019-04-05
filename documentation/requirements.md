# Requirements


Glossary
| Category     | Word       | Meaning                                                                                                 |
| ------------ | ---------- | ------------------------------------------------------------------------------------------------------- |
| **Model**    |            |                                                                                                         |
|              | Song       |                                                                                                         |
|              | Artist     |                                                                                                         |
|              | Melody     |                                                                                                         |
| **Database** |            |                                                                                                         |
|              | Item       | A song, artist or melody.                                                                               |
|              | Entry      | A database entry which includes a song, artist or melody as well as database-related information.       |
|              | Collection | A collection of entries of a specific type.                                                             |
|              | History    | A collection of previous revision of entries of a specific type.                                        |
|              | Create     | Upload entry which is not tied to an ID that already exists in the database                             |
|              | Retrieve   |                                                                                                         |
|              | Delete     | Remove the data of an entry.                                                                            |
|              | Replace    | Completely change the data of an entry in one action.                                                   |
|              | Patch      | Change one part of an entry.                                                                            |
|              | Restore    | Replace an item with the item in a previous revision of the same ID.                                    |
|              | Recover    | Retrive an item from a previous revision of a certain ID.                                               |
|              | Drop       | Remove a revision from the history of an entry of a certain ID.                                         |
|              | Purge      | Drop all revisions and completeley remove an entry of a certain ID.                                     |
| **Roles**    |            |                                                                                                         |
|              | User       | A user of the system who can access public functions through API or GUI. Can be anonymous or logged in. |
|              | Admin      | A user of the system who can access all functions through API or GUI. Must be logged in.                |

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
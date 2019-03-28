# Songbook
 
## Table of Contents
- [API](#API)
  - [v1](#v1)

## API

### v1

**Base Url**

`/api/v1`

**Api Info**

Get up to date api information in relation to subpath by calling `GET:{subpath}/api-info`.

The api information shows:
 - possible paths
 - methods (not yet implemented)

>**Example**
>
> Request:
>
> `GET: {baseUrl}/songs/api-info`
>
> Result:
> ```
> [
>     "/collection",
>     "/index",
>     "/action"
> ]
> ```

**Routes**

- songs
  - collection
  - index
  - actions
- artists
  - collection
  - index
  - actions
- melodies
  - collection
  - index
  - actions

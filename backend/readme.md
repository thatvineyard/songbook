# Songbook
 
## Table of Contents
- [API](#API)
  - [v1](#v1)

## API

### v1

**Base Url**

`/api/v1`

**Api Info**

Get up to date api information in relation to subpath by calling `GET:{base url}/api-info`.

Parameters:
 - **url** - Filter by url
 - **httpMethod** - Filter by http method (GET, POST, PUT etc...)
 - **options** - Options

The api information shows:
 - possible paths
 - methods (not yet implemented)

>**Example**
>
> Request:
>
> `GET: {base url}/api-info`
> ```
> Headers:
> Content-Type: application/json
>
> Body: 
> 
> {
>   "url": "/api/v1/songs",
>   "httpMethod": "GET",
>   "options": ["brief"]
> }
> ```
>
> Result:
> ```
> TODO
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

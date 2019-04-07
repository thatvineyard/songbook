# Songbook

Consitsts of two modules:

- Frontend
- Backend

## Installing

### Dependencies
| Command                    | Descriptions                                                             |
| -------------------------- | ------------------------------------------------------------------------ |
| `npm install`              | Install project-level dependencies (required for other install commands) |
| `npm run install-all`      | Install all dependencies                                                 |
| `npm run install-frontend` | Install frontend dependencies                                            |
| `npm run install-backend`  | Install backend dependencies                                             |

### Environments

Both modules require a bit of environment-managament to get them to work. 

They use the `.env[mode]` convention to separate from local builds and built images. Create dotenv files in each module's directory and populate them with the following settings:

#### Backend
|      |                             |
| ---- | --------------------------- |
| PORT | The port of the API service |

#### Frontend
|                  |                               |
| ---------------- | ----------------------------- |
| BASE_URL         | The base URL for the app.     |
| VUE_APP_TITLE    | Title of the web page         |
| VUE_APP_ROOT_API | The root URL for the backend. |


## Running

| Action           | Command           | Description                                             |
| ---------------- | ----------------- | ------------------------------------------------------- |
| Start            | `npm run start`   | Compiles once and runs                                  |
| Build            | `npm run build`   | Compiles but doesn't run                                |
| Development-mode | `npm run dev`     | Compiles and re-runs on any changes to relevant files.  |
| Release          | `npm run release` | Compile and build docker images, then push to registry. |

> Note: By adding `-backend` or `-frontend` to any of the run scripts it will run the script for that module.
> 
> For example if you want to run a backend that doesn't recompile and a frontend that recompiles, you can run `npm run start-frontend && npm run dev-backend`.

> Note: Because package.json can't make use of environment variables my local docker registry is used when configuring docker-actions. 
> 
> To change this go into each module's package.json and change the image tag for the release-command.
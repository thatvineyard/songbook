# Songbook

Consitsts of two modules:

- Frontend
- Backend

## Installing

|                            |                                                                         |
| -------------------------- | ----------------------------------------------------------------------- |
| `npm install`              | Install project-level dependencies (required for other install scripts) |
| `npm run install-all`      | Install all dependencies                                                |
| `npm run install-frontend` | Install frontend dependencies                                           |
| `npm run install-backend`  | Install backend dependencies                                            |

## Running

|                  |                   |                                                        |
| ---------------- | ----------------- | ------------------------------------------------------ |
| Start            | `npm run start`   | Compiles once and runs                                 |
| Build            | `npm run build`   | Compiles but doesn't run                               |
| Development-mode | `npm run dev`     | Compiles and re-runs on any changes to relevant files. |
| Release          | `npm run release` | Compile and build docker images                        |

> Note: By adding `-backend` or `-frontend` to any of the run scripts it will run the script for that module.
> 
> For example if you want to run a backend that doesn't recompile and a frontend that recompiles, you can run `npm run start-frontend && npm run dev-backend`.

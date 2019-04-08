import { EntryModel } from "../models/entry-model";
import { SongModel } from "../models/song-model";
import { Artist } from "../objects/artist";
import { Melody } from "../objects/melody";
import { Database } from './database';
import { Entry } from "./entry";
import { SongDatabaseHandler } from "./song-database-handler";

/**
 * This class is the main entrypoint for all database actions. 
 * It is mostly responsible for sending requests to the appropriate database handler 
 * as well as creating models of the entry that is returned. 
 * The data in the entry should already be modelled by the individual database handler.
 * 
 * 
 */
export class DatabaseHandler {
    private static _instance: DatabaseHandler;

    private songDatabase: SongDatabaseHandler;
    private melodyDatabase: Database<Melody>;
    private artistDatabase: Database<Artist>;

    private constructor() {
        this.songDatabase = SongDatabaseHandler.Instance;

        this.melodyDatabase = new Database<Melody>("melody");
        // this.melodyDatabase.logBrief();
        console.debug();

        this.artistDatabase = new Database<Artist>("aritst");
        this.postArtist("Carl", "Wangman");
        // this.artistDatabase.logBrief();
        console.debug();
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    // SONG
    public postSong(songModel: SongModel): EntryModel<SongModel> | null {
        let result: Entry<SongModel> = this.songDatabase.post(songModel);
        return this.entryToModel(result);
    }

    public putSong(
        id: string,
        songModel: SongModel
    ): EntryModel<SongModel> | null {
        let result: Entry<SongModel> = this.songDatabase.put(id, songModel);
        return this.entryToModel(result);
    }

    public patchSong(
        id: string,
        title?: string,
        artist?: string,
        melody?: string
    ): EntryModel<SongModel> | null {
        let reuslt = this.songDatabase.put(id, title, artist, melody);
        return this.entryToModel(result);
    }

    public deleteSong(id: string) {
        return this.songDatabase.delete(id);
    }

    public hasSong(id: string) {
        return this.songDatabase.has(id);
    }

    public getSong(id: string): EntryModel<SongModel> | null {
        let result: Entry<Song> = this.songDatabase.get(id) as Entry<Song>;
        return this.entryToModel(result);
    }

    public getSongs(): EntryModel<SongModel>[] | null {
        let result = this.songDatabase.getAll();
        return result.map((entry: Entry<Song>) => {
            return this.entryToModel(entry);
        });
    }

    public getSongsIndex() {
        return this.songDatabase.getIndex();
    }

    public recoverSongRevision(id: string, revision: number): EntryModel<SongModel> | null {
        return this.songDatabase.recoverRevision(id, revision);
    }

    public dropSongRevision(id: string, revision: number): void {
        return this.songDatabase.dropRevision(id, revision);
    }

    public recoverAllSongRevisions(id: string): EntryModel<SongModel>[] | null {
        let result = this.songDatabase.recoverAllRevisions(id);
        return result.map((entry: Entry<Song>) => {
            return this.entryToModel(entry);
        });
    }

    public purgeSong(id: string) {
        return this.songDatabase.purge(id);
    }

    private entryToModel<T extends Object>(entry: Entry<T>): EntryModel<T> {
        return new EntryModel<T>(entry.getId(), entry.type, entry.revision, entry.created, entry.lastModified, entry.entryData);
    }

    // ARTIST
    public postArtist(firstName: string, lastName: string) {
        let artist = new Artist(firstName, lastName);
        return this.artistDatabase.post(artist);
    }

    public deleteArtist(id: string) {
        return this.artistDatabase.delete(id);
    }

    public hasArtist(id: string): boolean {
        return this.artistDatabase.has(id);
    }

    public getArtist(id: string): Entry<Artist> | null {
        return this.artistDatabase.get(id);
    }

    public getArtists() {
        return this.artistDatabase.getAll();
    }

    public getArtistsIndex() {
        return this.artistDatabase.getIndex();
    }

    // MELODY
    public postMelody(title: string) {
        let melody = new Melody(title);
        return this.melodyDatabase.post(melody);
    }

    public deleteMelody(id: string) {
        return this.melodyDatabase.delete(id);
    }

    public hasMelody(id: string): boolean {
        return this.melodyDatabase.has(id);
    }

    public getMelody(id: string): Entry<Melody> | null {
        return this.melodyDatabase.get(id);
    }

    public getMelodies() {
        return this.melodyDatabase.getAll();
    }

    public getMelodiesIndex() {
        return this.melodyDatabase.getIndex();
    }
}

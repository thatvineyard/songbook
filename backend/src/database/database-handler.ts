import colors from "colors";
import { Artist } from "../models/artist";
import { Melody } from "../models/melody";
import { Song } from "../models/song";
import { Database } from './database';
import { Entry } from "./entry";
import { populateSongs } from "./populate";

export class DatabaseHandler {
    private static _instance: DatabaseHandler;

    private songDatabase: Database<Song>;
    private melodyDatabase: Database<Melody>;
    private artistDatabase: Database<Artist>;

    private constructor() {
        this.songDatabase = new Database<Song>("song");
        populateSongs(this, 10);
        this.songDatabase.logBrief();
        console.debug();

        this.melodyDatabase = new Database<Melody>("melody");
        this.melodyDatabase.logBrief();
        console.debug();

        this.artistDatabase = new Database<Artist>("aritst");
        this.postArtist("Carl", "Wangman");
        this.artistDatabase.logBrief();
        console.debug();
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    // SONG
    public postSong(title: string, artist: string, melody: string): string {
        let song = new Song(title, artist, melody);
        return this.songDatabase.post(song);
    }

    public putSong(
        id: string,
        title: string,
        artist: string,
        melody: string
    ): Entry<Song> | null {
        let song = new Song(title, artist, melody);
        this.songDatabase.saveRevision(id);
        return this.songDatabase.put(id, song);
    }

    public patchSong(
        id: string,
        title?: string,
        artist?: string,
        melody?: string
    ): Entry<Song> | null {
        let entry = this.songDatabase.get(id);
        if (entry) {
            let song: Song = entry.entryData as Song;
            this.songDatabase.saveRevision(id);
            if (title) {
                song.title = title;
            }
            if (artist) {
                song.artist = artist;
            }
            if (melody) {
                song.melody = melody;
            }
            return this.songDatabase.put(id, song);
        } else {
            return null;
        }
    }

    public deleteSong(id: string) {
        this.songDatabase.saveRevision(id);
        return this.songDatabase.delete(id);
    }

    public hasSong(id: string) {
        return this.songDatabase.has(id);
    }

    public getSong(id: string): Entry<Song> | null {
        return this.songDatabase.get(id);
    }

    public getSongs() {
        return this.songDatabase.getAll();
    }

    public getSongsIndex() {
        return this.songDatabase.getIndex();
    }

    public recoverSongRevision(id: string, revision: number) {
        return this.songDatabase.recoverRevision(id, revision);
    }

    public dropSongRevision(id: string, revision: number) {
        return this.songDatabase.dropRevision(id, revision);
    }

    public recoverAllSongRevisions(id: string) {
        return this.songDatabase.recoverAllRevisions(id);
    }

    public purgeSong(id: string) {
        return this.songDatabase.purge(id);
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

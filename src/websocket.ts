import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { uuid } from "./tools";
import * as tools from "./tools";
import { Board } from "./board";

interface Session {
    socketId: string;
    sessionCode: string;
}

export class RealtimeCommunication {
    playerId: string = "";
    session: Session | undefined = undefined;
    constructor(private socket: Socket<DefaultEventsMap, DefaultEventsMap>, private playerName: string) {
        this.socket.on('player_registered', this.setPlayerId);
        this.socket.on('session_created', this.setSession);
        this.socket.on('create_row', this.createRow);
        socket.emit('create_session', '');
    }
    
    private createRow(numberOfRows: number) {

    }

    private setSession(session: Session): void {
        this.session = session;
        this.registerPlayer()
    }

    private setPlayerId(playerId: uuid) {
        this.playerId = playerId;
    }

    private registerPlayer() {
        if (this.session == undefined) {
            return;
        }
        let payload = {
            sessionCode: this.session.sessionCode,
            playerName: this.playerName
        }
        this.socket.emit('register_player', JSON.stringify(payload));
    }
    
    sendBoard(board: Board) {
        if (this.session == undefined) {
            return;
        }
        let payload = {
            playerId: this.playerId,
            sessionCode: this.session.sessionCode,
            board: tools.convertToStringArray(board)
        };
        this.socket.emit('context', JSON.stringify(payload));
    }

    sendNewRow(numberOfRows: number) {
        if (this.session == undefined) {
            return;
        }
        let payload = {
            playerId: this.playerId,
            sessionCode: this.session.sessionCode,
            numberOfRows: numberOfRows
        }
        this.socket.emit('create_row', JSON.stringify(payload));
    }
}

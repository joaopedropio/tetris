import { Game } from "./game";
import { WebSocketUser } from "./user";
import { io } from "socket.io-client";
import { RealtimeCommunication } from "./websocket"

const socket = io('http://localhost:5000/input');

window.onload = () => {
    let [ctx, ok] = getContext();
    if (!ok) {
        return;
    }

    let rc = new RealtimeCommunication(socket, "joao");
    let user = new WebSocketUser(rc);
    document.addEventListener("keydown", createKeyPushIntance(user));
    let game = new Game(ctx as CanvasRenderingContext2D, user);
    setInterval(() => game.loop(), 50);
}

function getContext(): [CanvasRenderingContext2D | null, boolean] {
    let canvas = document.getElementById("gc") as HTMLCanvasElement;
    if (canvas == null) {
        return [null, false];
    }
    let context = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (context == null) {
        return [null, false];
    }
    return [context, true];
}

function createKeyPushIntance(controller: WebSocketUser) {
    return (evt: KeyboardEvent) => {
        controller.keyPush(evt);
    };
}

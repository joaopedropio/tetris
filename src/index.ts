import { Game } from "./game";
import { Bot } from "./bot"
import { SingleUser } from "./user";

window.onload = () => {
    let [ctx, ok] = getContext();
    if (!ok) {
        return;
    }

    let user = new Bot();
    let game = new Game(ctx as CanvasRenderingContext2D, user);
    setInterval(() => game.loop(), 1);
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

function createKeyPushIntance(controller: SingleUser) {
    return (evt: KeyboardEvent) => {
        controller.keyPush(evt);
    };
}
import { Game } from "./game";
import { SingleUser } from "./user";

window.onload = () => {
    let [ctx, ok] = getContext();
    if (!ok) {
        return;
    }

    let user = new SingleUser();
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

function createKeyPushIntance(controller: SingleUser) {
    return (evt: KeyboardEvent) => {
        controller.keyPush(evt);
    };
}
import { Game } from "./game.js";

window.onload = () => {
    let [ctx, ok] = getContext();
    if (!ok) {
        return;
    }

    let game = new Game(ctx as CanvasRenderingContext2D);
    document.addEventListener("keydown", game.keyPush)
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
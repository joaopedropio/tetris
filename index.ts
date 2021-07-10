window.onload = () => {
    let canvas = document.getElementById("gc") as HTMLCanvasElement;
    if (canvas == null) {
        return;
    }
    canvas
    let context = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (context == null) {
        return;
    }
    document.addEventListener("keydown", keyPush)
    setInterval(() => gameLoop(context), 1);
}
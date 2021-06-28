window.onload = () => {
    canvas = document.getElementById("gc");
    context = canvas.getContext("2d")
    document.addEventListener("keydown", keyPush)
    setInterval(() => gameLoop(context), 1);
}
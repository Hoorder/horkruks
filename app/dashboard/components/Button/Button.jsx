import style from "./Button.module.css";

const colors = {
    red: "#d93036",
    blue: "#692ae5",
    green: "#398e4a",
};

export function Button({
    type = "submit",
    children,
    onClick = null,
    background = "#171717",
    color = "#ffffff",
    fontSize = "1rem"
}) {
    const backgroundColor = colors[background] || background;

    return (
        <button
            style={{ backgroundColor, color, fontSize }}
            className={style.button}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

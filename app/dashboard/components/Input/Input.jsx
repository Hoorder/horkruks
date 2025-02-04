"use client";

import style from "./Input.module.css";

export function Input({
    disabled = false,
    type = "text",
    nameAndId,
    value,
    onChange,
    placeholder,
    label,
    width = "175px",
    fontWeight = "300",
}) {
    return (
        <>
            <div className={style.container}>
                <label
                    style={{ fontWeight: fontWeight }}
                    className={style.label}
                    htmlFor={nameAndId}
                >
                    {label}
                </label>

                <input
                    style={{ width: width }}
                    className={style.input}
                    type={type}
                    name={nameAndId}
                    id={nameAndId}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    min={0}
                    max={10}
                    disabled={disabled}
                />
            </div>
        </>
    );
}

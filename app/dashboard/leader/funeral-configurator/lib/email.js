"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendEmail = async (
    to,
    funeralLocality,
    funeralTime,
    funeralEnteryTime,
    funeralGroupUpTime,
    funeralDate
) => {
    const mailOptions = {
        from: `Horkruks <${process.env.EMAIL_USER}>`,
        to,
        subject: `Zostałeś przypisany do pogrzebu!`,
        html: `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Potwierdzenie obecności</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
            h2 {
                color: #333;
            }
            p {
                color: #555;
                font-size: 16px;
                line-height: 1.5;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin-top: 20px;
                font-size: 16px;
                color: white !important;
                background-color:rgb(0, 0, 0);
                text-decoration: none;
                border-radius: 5px;
            }
            .button:hover {
                background-color:rgb(58, 59, 59);
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #777;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Witam,</h2>
            <p>Chciałbym poinformować Cię o uroczystości pogrzebowej, która odbędzie się w miejscowości ${funeralLocality} dnia ${funeralDate}</p>
            <p>Zbiórka na firmie ${funeralGroupUpTime}</p>
            <p>Wniesienie ciała ${funeralEnteryTime}</p>
            <p>Msza pogrzebowa ${funeralTime}</p>
            <p>Proszę o potwierdzenie swojej obecności, klikając w poniższy przycisk:</p>
            <a href="http://192.168.227.13:3000/" class="button">Potwierdź obecność</a>
            <p>Dziękuję za Twoją odpowiedź.</p>
            <div class="footer">
                <p>Ten e-mail został wygenerowany automatycznie, prosimy na niego nie odpowiadać.</p>
            </div>
        </div>
    </body>
    </html>
    `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("E-mail wysłany:", info.messageId);
        return info;
    } catch (error) {
        console.error("Błąd podczas wysyłania e-maila:", error);
        throw error;
    }
};

export const sendTransportAddEmail = async (
    to,
    transportFrom,
    transportTo,
    orderingPhoneNumber
) => {
    const mailOptions = {
        from: `Horkruks <${process.env.EMAIL_USER}>`,
        to,
        subject: `Otrzymałeś nowe zlecenie przewozu!`,
        html: `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Potwierdzenie obecności</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
            h2 {
                color: #333;
            }
            p {
                color: #555;
                font-size: 16px;
                line-height: 1.5;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin-top: 20px;
                font-size: 16px;
                color: white !important;
                background-color:rgb(0, 0, 0);
                text-decoration: none;
                border-radius: 5px;
            }
            .button:hover {
                background-color:rgb(58, 59, 59);
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #777;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Witam,</h2>
            <p>Zostałeś przypisany do nowego zlecenia przewozu zwłok z ${transportFrom} do ${transportTo}</p>
            <p>Telefon do zleceniodawcy ${orderingPhoneNumber}</p>
            <p>Więcej informacji po kliknięciu w przycisk ponizej</p>
            <a href="http://192.168.227.13:3000/" class="button">Do systemu</a>
            <div class="footer">
                <p>Ten e-mail został wygenerowany automatycznie, prosimy na niego nie odpowiadać.</p>
            </div>
        </div>
    </body>
    </html>
    `,
    };

    try {
        const info = await transporter.sendMail(mailOptions); // Poprawiona linia
        console.log("E-mail wysłany:", info.messageId);
        return info;
    } catch (error) {
        console.error("Błąd podczas wysyłania e-maila:", error);
        throw error;
    }
};

// try {
//   const result = await sendEmail(
//       "praca.hoorder@o2.pl, kamilc405@gmail.com"
//   );
//   console.log("E-mail wysłany pomyślnie:", result);
// } catch (error) {
//   console.error("Błąd podczas wysyłania e-maila:", error);
// }

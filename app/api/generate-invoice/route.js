import PDFDocument from "pdfkit/js/pdfkit.standalone";
import fs from "fs";
import path from "path";

export async function POST(req) {
    try {
        const {
            coffinPrice = 0,
            funeralService = 0,
            bodyTransportPrice = 0,
            bodyPreparyPrice = 0,
            crossPrice = 0,
            musicalarrangementPrice = 0,
            flowersPrice = 0,
            totalAmount = 0,
            insurance = 0,
            nameAndSurnameOrderingPerson = "",
            cityAndHouseNumberOrderingPerson = "",
            postCodeAndLocalityOrderingPerson = "",
        } = await req.json();

        const VAT_RATE = 0.23; // 23% VAT
        const invoiceName = `faktura_${Date.now()}.pdf`;
        const filePath = path.join(
            process.cwd(),
            "public",
            "invoices",
            invoiceName
        );

        if (!fs.existsSync(path.dirname(filePath))) {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }

        const doc = new PDFDocument({ margin: 50, size: "A4" });
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);

        // 🔹 LOGO FIRMY
        doc.fontSize(25).text("F.P Hades", 50, 50, {
            align: "left",
            width: 200,
        });
        const currentYear = new Date().getFullYear();
        const currentDate = new Date().toLocaleDateString("pl-PL");

        doc.fontSize(12).text(`Faktura nr:       / ${currentYear}`, 430, 50, {
            align: "left",
            width: 200,
        });
        doc.fontSize(8).text(
            `Wystawiona dnia ${currentDate} w Blazowej.`,
            400,
            70,
            { align: "left", width: 200 }
        );

        // 🔹 DANE SPRZEDAWCY
        doc.fontSize(12)
            .text("Firma Pogrzebowa Hades", 50, 100)
            .text("ul. Przykladowa 123", 50, 115)
            .text("00-001 Warszawa", 50, 130)
            .text("NIP: 123-456-78-90", 50, 145);

        // 🔹 DANE NABYWCY
        doc.text(`${nameAndSurnameOrderingPerson}`, 400, 100, {
            align: "right",
        })
            .text(`ul. ${cityAndHouseNumberOrderingPerson}`, 400, 115, {
                align: "right",
            })
            .text(`${postCodeAndLocalityOrderingPerson}`, 400, 130, {
                align: "right",
            })
            .text("NIP:______________", 400, 145, { align: "right" });

        doc.moveTo(50, 170).lineTo(550, 170).stroke();

        doc.fontSize(18).text("Faktura VAT", 50, 190, { align: "center" });
        doc.moveDown(2);

        // 🔹 TABELA
        const startY = 230;
        const columnWidths = [180, 40, 40, 70, 40, 70, 70];

        // Nagłówki kolumn
        doc.fontSize(10)
            .text("Nazwa towaru lub uslugi", 50, startY, {
                width: columnWidths[0],
            })
            .text("Jm", 230, startY, {
                width: columnWidths[1],
                align: "center",
            })
            .text("Ilosc", 270, startY, {
                width: columnWidths[2],
                align: "center",
            })
            .text("Cena netto", 310, startY, {
                width: columnWidths[3],
                align: "right",
            })
            .text("VAT %", 380, startY, {
                width: columnWidths[4],
                align: "center",
            })
            .text("Kwota VAT", 420, startY, {
                width: columnWidths[5],
                align: "right",
            })
            .text("Wartosc brutto", 490, startY, {
                width: columnWidths[6],
                align: "right",
            });

        doc.moveTo(50, startY + 15)
            .lineTo(550, startY + 15)
            .stroke();

        const tableData = [
            { name: "Trumna", unit: "szt.", quantity: 1, price: coffinPrice },
            {
                name: "Obsluga pogrzebu",
                unit: "szt.",
                quantity: 1,
                price: funeralService,
            },
            {
                name: "Przewoz zwlok",
                unit: "szt.",
                quantity: 1,
                price: bodyTransportPrice,
            },
            {
                name: "Przygotowanie zwlok",
                unit: "szt.",
                quantity: 1,
                price: bodyPreparyPrice,
            },
            {
                name: "Krzyz z tabliczka",
                unit: "szt.",
                quantity: 1,
                price: crossPrice,
            },
            {
                name: "Oprawa muzyczna",
                unit: "szt.",
                quantity: 1,
                price: musicalarrangementPrice,
            },
            { name: "Wience", unit: "szt.", quantity: 1, price: flowersPrice },
        ];

        let positionY = startY + 25;
        tableData.forEach((item) => {
            const brutto = Number(item.price) || 0;
            const netto = brutto / (1 + VAT_RATE);
            const vatAmount = brutto - netto;

            doc.fontSize(10)
                .text(item.name, 50, positionY, { width: columnWidths[0] })
                .text(item.unit, 230, positionY, {
                    width: columnWidths[1],
                    align: "center",
                })
                .text(item.quantity.toString(), 270, positionY, {
                    width: columnWidths[2],
                    align: "center",
                })
                .text(netto.toFixed(2), 310, positionY, {
                    width: columnWidths[3],
                    align: "right",
                })
                .text("23%", 380, positionY, {
                    width: columnWidths[4],
                    align: "center",
                })
                .text(vatAmount.toFixed(2), 420, positionY, {
                    width: columnWidths[5],
                    align: "right",
                })
                .text(brutto.toFixed(2), 490, positionY, {
                    width: columnWidths[6],
                    align: "right",
                });

            positionY += 20;
        });

        // 🔹 SUMA KOŃCOWA
        doc.moveTo(50, positionY + 10)
            .lineTo(550, positionY + 10)
            .stroke();

        const funeralAllowance = 4000; // Zasiłek pogrzebowy

        const totalBrutto = tableData.reduce(
            (sum, item) => sum + Number(item.price),
            0
        );
        const totalNetto = totalBrutto / (1 + VAT_RATE);
        const totalVat = totalBrutto - totalNetto;

        const finalAmount =
            insurance === 1
                ? Math.max(totalBrutto - funeralAllowance, 0)
                : totalBrutto;
        const amountColumnWidth = 150;
        const pageWidth = 595;
        const rightMargin = 50;
        const amountColumnX = pageWidth - rightMargin - amountColumnWidth;

        doc.fontSize(12)
            .text("Kwota calkowita:", 50, positionY + 20, {
                width: 350,
                align: "right",
            })
            .text(
                `${totalBrutto.toFixed(2)} PLN`,
                amountColumnX,
                positionY + 20,
                { width: amountColumnWidth, align: "right" }
            );

        if (insurance === 1) {
            doc.text("Zasilek pogrzebowy:", 50, positionY + 40, {
                width: 350,
                align: "right",
            }).text(
                `- ${funeralAllowance.toFixed(2)} PLN`,
                amountColumnX,
                positionY + 40,
                { width: amountColumnWidth, align: "right" }
            );

            doc.font("Helvetica-Bold")
                .text("Razem do zaplaty:", 50, positionY + 60, {
                    width: 350,
                    align: "right",
                })
                .text(
                    `${finalAmount.toFixed(2)} PLN`,
                    amountColumnX,
                    positionY + 60,
                    { width: amountColumnWidth, align: "right" }
                );
        } else {
            doc.font("Helvetica-Bold")
                .text("Razem do zaplaty:", 50, positionY + 40, {
                    width: 350,
                    align: "right",
                })
                .text(
                    `${finalAmount.toFixed(2)} PLN`,
                    amountColumnX,
                    positionY + 40,
                    { width: amountColumnWidth, align: "right" }
                );
        }

        doc.moveDown(2);

        // 🔹 STOPKA Z PODPISAMI
        const footerY = 750;
        doc.font("Helvetica")
            .fontSize(10)
            .text("Podpis osoby odbierajacej fakture", 50, footerY)
            .text("Podpis osoby wystawiajacej fakture", 350, footerY);

        doc.moveTo(50, footerY + 40)
            .lineTo(250, footerY + 40)
            .stroke();
        doc.moveTo(350, footerY + 40)
            .lineTo(550, footerY + 40)
            .stroke();

        doc.end();

        await new Promise((resolve) => writeStream.on("finish", resolve));

        return Response.json({ success: true, invoiceName });
    } catch (error) {
        console.error(error);
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

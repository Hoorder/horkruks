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
            musicalArrangementPrice = 0,
            flowersPrice = 0,
            totalAmount = 0,
        } = await req.json();

        const invoiceName = `invoice_${Date.now()}.pdf`;
        const filePath = path.join(
            process.cwd(),
            "public",
            "invoices",
            invoiceName
        );

        if (!fs.existsSync(path.dirname(filePath))) {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }

        const doc = new PDFDocument({ margin: 50 });
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);

        // 🔹 LOGO FIRMY
        doc.fontSize(25).text("Horkrus", 50, 50, { align: "left", width: 200 });

        // 🔹 DANE SPRZEDAWCY
        doc.fontSize(12)
            .text("Firma Pogrzebowa Hades", 50, 100)
            .text("ul. Przykladowa 123", 50, 115)
            .text("00-001 Warszawa", 50, 130)
            .text("NIP: 123-456-78-90", 50, 145);

        // 🔹 DANE NABYWCY
        doc.text("Jan Kowalski", 400, 100, { align: "right" })
            .text("ul. Klienta 5", 400, 115, { align: "right" })
            .text("02-345 Kraków", 400, 130, { align: "right" })
            .text("NIP: 987-654-32-10", 400, 145, { align: "right" });

        doc.moveTo(50, 170).lineTo(550, 170).stroke();

        doc.fontSize(18).text("Faktura VAT", 50, 190, { align: "center" });
        doc.moveDown(2);

        // 🔹 TABELA
        const startY = 230;
        const columnWidths = [200, 100, 100];

        doc.fontSize(12)
            .text("Opis", 50, startY, { width: columnWidths[0] })
            .text("Cena (PLN)", 300, startY, {
                width: columnWidths[1],
                align: "right",
            })
            .text("Suma (PLN)", 420, startY, {
                width: columnWidths[2],
                align: "right",
            });

        doc.moveTo(50, startY + 15)
            .lineTo(550, startY + 15)
            .stroke();

        const tableData = [
            { name: "Trumna", price: coffinPrice },
            { name: "Obsluga pogrzebu", price: funeralService },
            { name: "Przewoz zwlok", price: bodyTransportPrice },
            { name: "Przygotowanie zwlok", price: bodyPreparyPrice },
            { name: "Krzyz z tabliczka", price: crossPrice },
            { name: "Oprawa muzyczna", price: musicalArrangementPrice },
            { name: "Wience", price: flowersPrice },
        ];

        let positionY = startY + 25;
        tableData.forEach((item) => {
            const price = Number(item.price) || 0; // 🔥 Konwersja na liczbę

            doc.fontSize(10)
                .text(item.name, 50, positionY, { width: columnWidths[0] })
                .text(price.toFixed(2), 300, positionY, {
                    width: columnWidths[1],
                    align: "right",
                })
                .text(price.toFixed(2), 420, positionY, {
                    width: columnWidths[2],
                    align: "right",
                });

            positionY += 20;
        });

        // 🔹 SUMA KOŃCOWA
        doc.moveTo(50, positionY + 10)
            .lineTo(550, positionY + 10)
            .stroke();

        doc.fontSize(12)
            .text("Laczna kwota do zaplaty:", 50, positionY + 20, {
                width: 350,
                align: "right",
            })
            .font("Helvetica-Bold")
            .text(
                `${Number(totalAmount).toFixed(2)} PLN`,
                420,
                positionY + 20,
                { width: columnWidths[2], align: "right" }
            );

        doc.moveDown(2);

        // 🔹 STOPKA
        doc.fontSize(10).text(
            `Data wystawienia: ${new Date().toLocaleDateString()}`,
            50,
            positionY + 50
        );

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

import pdfMake from 'pdfmake'
import pdfFonts from "pdfmake/build/vfs_fonts";
import Barcode from "react-barcode";
import htmlToPdfmake from "html-to-pdfmake";
import {useState} from "react";

// @ts-ignore
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const PrintComponent = ({random}: any) => {
    console.log("random", random)
    return <div id="print">
        <Barcode value={random}/>
        <h1>Trí đẹp trai nhất quả đất - {random}</h1>
    </div>
}

function App() {
    const download = () => {
        const printHtml: any = document.getElementById('print')?.innerHTML;
        const html = htmlToPdfmake(printHtml)
        console.log("html", html)
        // @ts-ignore
        pdfMake.createPdf({
            content: html
        }).download();
    }

    const [random, setRandom] = useState(Math.random().toString())

    return (
        <div className="App">
            <button onClick={() => {
                setRandom(Math.random().toString())
            }}>RANDOM
            </button>

            <button onClick={download}>download</button>
            <PrintComponent random={random}/>
        </div>
    );
}

export default App;



/*  
    "@types/pdfmake": "^0.2.2",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "html-to-pdfmake": "^2.4.11",
    "pdfmake": "^0.2.7",
    "react": "^18.2.0",
    "react-barcode": "^1.4.6",
		"@types/html-to-pdfmake": "^2.1.1",
*/

const btn = document.querySelector(".btn");
const input = document.querySelector(".input");
console.dir(input)
const generatePDF = async (name)=>{
    const {PDFDocument , rgb} = PDFLib;

    const exbytes = await fetch("./cert.pdf")
    .then((res) => {
        return res.arrayBuffer() 
    });

    const exfont = await fetch("./EduNSWACTCursive-VariableFont_wght.ttf").then((res)=>{
        return res.arrayBuffer()
    })

    const pdfDoc = await PDFDocument.load(exbytes);

    // pdfDoc.registerFontkit(fontkit);
    // const myFont = await pdfDoc.embedFont(exfont);

    const pages = pdfDoc.getPages();
    const firstPg = pages[0];


    firstPg.drawText(name, {
        x: 260,
        y: 310,
        size:40,
    })

    const uri = await pdfDoc.saveAsBase64({dataUri: true});

    document.querySelector("#mypdf").src = uri;
}


btn.addEventListener("click", ()=> {
    let name = input.value;
    console.log(name);
    generatePDF(name);
})
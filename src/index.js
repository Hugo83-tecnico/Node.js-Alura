import fs from 'fs';
import chalk from 'chalk';


function careError(error){
    throw new Error(chalk.red(error.code));
}

//usando https://regex101.com ( expressões regulares)

function extractLinks(texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const captura = [...texto.matchAll(regex)];
    const resultados = captura.map(captura =>({[captura[1]]: captura[2]}));

    return resultados.length !== 0 ? resultados : 'não há links no arquivo';
}

async function openFile(pathFile){
    const encoding = 'utf-8';
    try{
        const returnFile = await fs.promises.readFile(pathFile, encoding);
        return extractLinks(returnFile);
    }catch(err){
        careError(err);
    }
  
}


export default openFile;
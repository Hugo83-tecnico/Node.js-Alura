import chalk from "chalk";
import fs from 'fs';
import openFile from "./index.js";   
import listaValidada from "./http-validacao.js";


const caminho = process.argv;   // comando no cli (node src/cli.js ./texto.md)


async function printList(valida, result, identifier = ''){
    if(valida){
        console.log(
            chalk.yellow('list validate'),
            chalk.black.bgGreen(identifier),
            await listaValidada(result)
        )
    }else{
        console.log(
            chalk.yellow('list of links'),
            chalk.black.bgGreen(identifier),
            result
        )
    }
}

async function pickUpFile(arg){

    const caminho = arg[2];
    const valida = arg[3] === '--valida';

    if(fs.lstatSync(caminho).isFile()){
        const resultado = await openFile(arg[2]);
        printList(valida,resultado);

    }else if( fs.lstatSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async(nomeDeArquivo)=>{
            const lista = await openFile(`${caminho}/${nomeDeArquivo}`);
            printList(valida,lista, nomeDeArquivo);
        })
        
    }
    
}

pickUpFile(caminho)

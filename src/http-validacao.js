import chalk from "chalk";

function extraiLinks(arrLinks){
    return arrLinks.map((ObjectLink)=> Object.values(ObjectLink).join())
}

async function checkStatus(listaUrls){
    const arrStatus = await Promise
    .all(
         listaUrls.map(async(url)=>{

            try{
                const res = await fetch(url);
                return res.status;
            }catch(err){
                return handleError(err);
            }
        })
    )
    return arrStatus;
}

function handleError(error){
    if(error.cause.code === 'ENOTFOUND') {
        return 'link não encontrado';

    }else{
        return 'Algo deu errado';
    }
}

async function listaValidada(listaDeLinks){
    const links = extraiLinks(listaDeLinks);
    const status = await checkStatus(links);
   
    return listaDeLinks.map((objeto, indice)=>({
        ...objeto,
            status:status[indice]
    }))
}

export default listaValidada;
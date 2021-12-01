const fs = require('fs');
class Contenedor{
    constructor(pNameFile){
        this.nameFile=pNameFile;
        this.id=0
        this.array=[]
        this.init(this.nameFile);
        
    };

    init(file){
        let data; 
        try{
            data= fs.readFileSync(file,'utf-8')
            const arrayjson=JSON.parse(data)
            for(const item of arrayjson){
                this.insert(item)
            }
            fs.writeFileSync(file,JSON.stringify(this.array))

        }
        catch{
            this.array=[];
            this.id=0;
        }  
    }
    insert(item){
        item.id=++this.id;
        this.array.push(item)
    }
    async update(id,obj){
        const index = this.array.findIndex((objT) => objT.id ==id);
        obj.id = this.array(index).id
        this.array[index]=obj;
        let save =0;
        try {
            await fs.promises.writeFile(this.nameFile,JSON.stringify(this.array))
            save=1;
        }
        catch(error){
            this.array.pop();
            console.error(error)
        }
    }
    async save (objeto) {
        if(this.array.length==0){
            objeto.id=++this.id;
            let save=0;
            this.array.push(objeto)
            //console.log(JSON.stringify(this.array))
            try {
                await fs.promises.writeFile(this.nameFile,JSON.stringify(this.array))
                save=1;
            }
            catch(error){
                this.array.pop();
                console.error(error)
            }
            if(save==1){

                this.id++;

            }
            
        }
        else{
            let data;
            try {
                data = await fs.promises.readFile(this.nameFile,'utf-8')
            }
            catch(error){
                console.error(error)
            }
            if(data){
                this.array=JSON.parse(data);
            }

            let save=0;
            objeto.id=this.id;
            this.array.push(objeto);

            try {
                await fs.promises.writeFile(this.nameFile,JSON.stringify(this.array))
                save=1;
            }
            catch(error){
                this.array.pop();
                console.error(error)
            }
            if(save==1){
                this.id++;
            }
        }

        return this.id;
    };
    async getRandom() {
        
        let data;
        try {
            data = await fs.promises.readFile(this.nameFile,'utf-8')
        }
        catch(error){
            console.error(error)
        }
        if(data){
            const contentJSON=JSON.parse(data);
            const randomid=Math.floor(Math.random() * contentJSON.length) + 1;
            const content = JSON.parse(data).filter(function (el) {
                return el.id == randomid;
              });
            return content;   
        }

    }
    async getById(buscaid) {
        let data;
        try {
            data = await fs.promises.readFile(this.nameFile,'utf-8')
        }
        catch(error){
            console.error(error)
        }
        if(data){
            const content = JSON.parse(data).filter(function (el) {
                return el.id == buscaid
              });
            return content;   
        }

    }
    async getAll(){
        let data;
        try {
            data = await fs.promises.readFile(this.nameFile,'utf-8')
        }
        catch(error){
            console.error(error)
        }
        if(data){
            return JSON.parse(data);  
        }

    }
    async deleteById (buscaid) {
        let data;
        try {
            data = await fs.promises.readFile(this.nameFile,'utf-8')
        }
        catch(error){
            console.error(error)
        }
        if(data){
            const content = JSON.parse(data).filter(function (el) {
                return el.id != buscaid
              });
            this.array=content; 
            let write=0;

            try {
                await fs.promises.writeFile(this.nameFile,JSON.stringify(this.array))
                write=1;
            }
            catch(error){
                console.error(error)
            }
        }
        


    }
    
    async deleteAll(){

            //console.log(JSON.stringify(this.array))
            let write=0;

            try {
                await fs.promises.writeFile(this.nameFile,JSON.stringify([]))
                write=1;
            }
            catch(error){
                console.error(error)
            }
            if(write==1){
                this.array=[];
                this.id=0;
            }

        
    }


}

module.exports = Contenedor

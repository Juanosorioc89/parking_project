const mongoose = require ('mongoose');

const getConnetion = async ()=>{

    try{
       
       const url = 'mongodb+srv://user-iud:efGh7BK27USymCZJ@cluster0.5t1yt19.mongodb.net/parking_project?retryWrites=true&w=majority&appName=Cluster0'
                    
        await mongoose.connect(url);

        console.log('Conexión exitosa')

    }catch(error){
        console.log(error);


    }

}

module.exports= {
    getConnetion
}
const amqp = require('amqplib/callback_api'); 

//SENDER or PRODUCER
export const sender = (queueName , message) =>{
amqp.connect('amqp://localhost',(error,connection) => {
    if(error){
       throw error; 
    }
   
    connection.createChannel((error,channel)=> {
        if(error){
            throw error;
        }
       
        channel.assertQueue(queueName,{
            durable : false
        });

        channel.sendToQueue(queueName,Buffer.from(message));
        console.log("Message sent is :",message);

        setTimeout(()=>{
            connection.close();
        },1000)
    })
});
}


//RECEIVER or CONSUMER 
export const receiver = (queueName) => {
amqp.connect('amqp://localhost',(error,connection) => {
    if(error){
       throw error; 
    }
    
    connection.createChannel((error,channel)=> {
        if(error){
            throw error;
        }

        channel.assertQueue(queueName,{
           
            durable : false
        });

        console.log(queueName);

        channel.consume(queueName,(message)=>{
            const userDataString = message.content.toString();
            console.log("Received message :", userDataString);
            const userDataJson = JSON.parse(userDataString);
            console.log("Registered user Firstname : ", userDataJson.firstname);
            console.log("Registered user Lastname : ", userDataJson.lastname);
            console.log("Registered user EmailId : ", userDataJson.email)
        },{
            noAck : true  
        });

       
   
    });
});
}

receiver('userData');
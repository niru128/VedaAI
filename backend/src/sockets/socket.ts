import { Server } from "socket.io";

let io : Server;

export const initSocket = (server : any)=>{
    io = new Server(server,{
        cors : {
            origin : "*"
        }
    })
 
    io.on("connection" , (socket)=>{
        console.log("Socket connected successfully : ", socket.id );
    } )

}

export const getIo = ()=>{
    if(!io) console.log("Socket connection unsuccessful");
    return io;
}
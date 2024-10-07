import mongoose from "mongoose";



export async function Connect() {
     try {
    // console.log(process.env.MONGODB_URI);

        mongoose.connect(`${process.env.MONGODB_URI!}`)

        const connection = mongoose.connection
    connection.on("connected", () => {
      console.log("Database Connected Successfully");

       })

       connection.on("error", () => {
      console.log("Database connection failed ");


    })

  } catch (error: any) {
    console.log(error);

    throw new Error("Database Connection Failed ", error)

  }
}
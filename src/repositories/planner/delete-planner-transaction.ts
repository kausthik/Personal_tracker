// import mongoose from "mongoose";
// import { connectDB } from "@/src/lib/mongodb";
// import { Planner } from "@/src/models/planner.model";
// import { PlannerTask } from "@/src/models/plannertask.model";
// import { NextResponse } from "next/server";

// export async function DELETE(id){
//     await connectDB();
    
//     const session = await mongoose.startSession();
//     try{
//      session.startTransaction()
     
//      // transaction 1
//      await PlannerTask.deleteMany({
//        plannerId : id
//      }, {session})

//      // transaction 2
//      await Planner.deleteOne({
//        _id : id
//      }, {session})

//      // end transaction
//      await session.commitTransaction();
//      return NextResponse.json({message: 'delete successful'}, {status: 200});

//     }catch(error){
//        await session.abortTransaction();
//        return NextResponse.json({error : 'failed to delete'}, {status: 500});
//     } finally{
//        session.endSession();
//     }
// }

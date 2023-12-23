import mongoose, { connect } from 'mongoose';
import chalk from 'chalk';
import { dbURL } from './config.js';

const connectDb = async() => {
    try{
        const conn = mongoose.connect(dbURL);
        console.log(`${chalk.green.bold("Successfully connected ✔")} ${(await conn).connection.host}`)

    }catch(err){
        console.log(`${chalk.red.bold("NOT CONNECT TO THE DATABASE")}, ${err}`)
    }
}
export default connectDb;
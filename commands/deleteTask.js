// Importing packages and functions
import inquirer from "inquirer";
import Todos from '../schema/todoSchema.js'
import {connectDB, disconnectDB} from '../db/connectDB.js'
import ora from "ora";
import chalk from "chalk";


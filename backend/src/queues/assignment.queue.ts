import { Queue } from "bullmq";
import redis from "../config/redis.js";

export const assignmentQueue = new Queue("assignmentQueue", {
    connection: {
        url : process.env.REDIS_URL
    }
})
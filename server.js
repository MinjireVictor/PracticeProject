import express from 'express';
import cors from 'cors';
import knex from 'knex'
import bcrypt from 'bcrypt-nodejs'

import {handleRegister} from './controllers/register.js';
import {handleSignIn} from './controllers/Signin.js'
import {handleProfile} from './controllers/profile.js'
import {handleEntries} from './controllers/entries.js'

const db=knex({
	client:'pg',
	connection:{
		host:'127.0.0.1',
		user:'postgres',
		password:'annlynn12345',
		database:'postgres'

	}
})

const app = express();
app.use(cors())
app.use(express.json())


app.get('/', (req,res)=>{
    res.json({
    	detail:"success"
    })
})

app.post('/login',handleSignIn(db,bcrypt))
app.post('/register',(req,res)=>{
	handleRegister(req,res,db,bcrypt)
	}
)

// we can get the id using params
// getting the profile
app.get('/profile/:id',handleProfile(db))

app.put('/entries',handleEntries(db))


const PORT=process.env.PORT
app.listen(PORT, ()=>{
    console.log(PORT)
})
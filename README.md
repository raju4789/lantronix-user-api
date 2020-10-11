# lantronix-user-api


## Registration API

### Request :

____POST____    /user/register

____Content-Type____: application/json

{
   
    "username": "raju4789",

    "password":"mln1234",

    "email":"narasimha4789@gmail.com",

    "firstname": "Raju",

    "lastname": "MLN"
  
}

### Response :

{

    "message": "A verification mail has been sent to your registered mail." 
    
}

## Login API

### Request :

____POST____    /user/login

____Content-Type:____ application/json

{

    "username": "raju4789",

    "password":"mln1234"
  
}

### Response :

{

    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhanU0Nzg5IiwicGFzc3dvcmQiOiJtbG4xMjM0IiwiaWF0IjoxNjAyNDExNjQzLCJleHAiOjE2MDI0MTIyNDN9.NME0yYeuk3dvAsYXtLY9CIbBsXW2OCMk7hKT7wx3b30",

    "user": {

    "_id": "5f81b168fec67a5997e009de",

    "username": "raju4789",

    "email": "narasimha4789@gmail.com",

    "firstname": "Raju",

    "lastname": "MLN"

    }

}

## API Status

### Request  :

____GET____    /user/status

____Authorization:____ Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhanUiLCJwYXNzd29yZCI6Im1sbjEyMzQiLCJpYXQiOjE2MDIzMzA0OTQsImV4cCI6MTYwMjMzMDU1NH0.mJZtkyCivB_RvxVZKSF0DOKE7VlvBhA0uSIPMtqflPg

### Response :

{

    "message": "live long and prosper"

}



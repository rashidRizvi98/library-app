# Library App

This is an application to create Authors and books, 

### Back end
node js(v16.16.0) <br>
express <br> 
typescript(version 5.0.4) <br>
mongoose <br>
Mongodb <br>
jest, supertest(unit testing) <br><br>
to run mongodb as a docker container please run following command in a terminal



    sudo docker run -d -p 27017:27017 --name mongo-db -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:latest

### Front end
Reactjs <br>
Redux <br>
Bootstrap

to clone the code please run

        git clone https://github.com/rashidRizvi98/library-app.git

After cloning the code,
within each BE and FE applications root folder, please run following commands

        npm install
        npm start

BE will be available at available at http://localhost:4000

FE will be available at available at http://localhost:3000
# Solera Test Backend Developer

## Requirements
- Node 18
- Git
- npm

## Getting started

### Install
You can run the code locally using npm.

```sh
git clone https://github.com/WJCruz/wilder_cruz_solera.git
cd wilder_cruz_solera
npm run dev
```
Then using the postman collection in the repository you can do the necessary tests.

`http://localhost:3000/api/users` using the url in the GET method we get the list of all users.

`http://localhost:3000/api/users/1` using the url in the GET method we get the user with id 1.

`http://localhost:3000/api/user` using the url in the POST method we get the full name of the user according to his username and password. It is necessary to enter in the body in JSON format the username and password as shown below:

```
{
	"user": "admin",
	"password": "admin"
}
```

or

```
{
	"user": "admin2",
	"password": "admin2"
}
```


## License
MIT

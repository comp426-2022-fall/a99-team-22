# API Documentation
# Endpoints

### /login/
Create login page
```
curl http://localhost:5005/login/
```

### /auth/
Redirect to /user/info/:username/
```
curl http://localhost:5005/api/auth/
```

### /user/new/
Create new user
```
curl http:/localhost:5005/user/new -d "username=Fregley&password=123&email=fregs@duke.unc.edu&phone=na&location=Durham&relationship=single and ready to mingle&mood=wanting cheese touch &diet=vegan"
```
```json
{"message":"user Fregley created"}
```

### /user/info/:username/
Read user's profile according to username
```
curl http:/localhost:5005/user/info/Fregley
```
```json
{"id":3,"username":"Fregley","email":"fregs@duke.unc.edu","phone":"na","location":"Durham","relationship":"single and ready to mingle","mood":"wanting cheese touch ","diet":"vegan"}
```

### /user/info/update/:username/
Modify user's profile according to username and password


### /user/delete/
Delete user's profile according to username
```
curl http://localhost:5005/user/delete/
```
```json
{"changes": 1, "lastInsertRowid": 3 }
```

### /*/
Error 404
```json
{"message":"File not found (404)"}
```


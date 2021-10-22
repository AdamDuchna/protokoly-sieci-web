import pysftp
print("Do you wish to put or get?")
asked=input()
print("Pass the hostname...")
hostInput=input()
print("Pass the password...")
passwrd=input()
print("Pass the file path...")
path=input()

if asked == "put":
    with pysftp.Connection(hostInput, username='aduchna',password=passwrd) as sftp:
        sftp.put(path)  # upload file to public/ on remote
elif asked == "get":
    with pysftp.Connection(hostInput, username='aduchna',password=passwrd) as sftp:
        sftp.put(path)
else:
    print("ERR")

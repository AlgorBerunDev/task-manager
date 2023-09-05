Run commands

```
# If your OS unix system run this command
echo '127.0.0.1 mohirdev-docker.local' >> /etc/hosts

# If your OS Windows run this command
notepad C:\Windows\System32\drivers\etc\hosts
# And add the entry you want to the bottom of the file, in the format IP_ADDRESS DOMAIN_NAME. For example:
127.0.0.1 mohirdev-docker.local

docker-compose -f docker-compose.yml -f docker-compose.development.yml up --build
```

[Open browser and type http://mohirdev-docker.local/](http://mohirdev-docker.local/)

[Click for view Live in browser https://mohirdev.fibro.uz](mohirdev.fibro.uz)

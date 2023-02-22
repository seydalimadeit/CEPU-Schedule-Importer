# About Schedule importer

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/27ec401a-9525-48da-bc45-5cfe17e21888/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230221T215729Z&X-Amz-Expires=86400&X-Amz-Signature=515c5c87f15979b02c9b054915d259efbeb7c7c666b8b4dc8d63078e81be9d9c&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

СEPU(Crimean Engineering and Pedagogical University, name of University) Schedule importer is the app for students developed by me for handy classes schedule import to calendar.

It provides simple design with simple functionality. On main page we have searchable input, where you can put your group name.

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8a4eb03a-2a4d-47c4-a4c2-7331130d5737/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230221T215754Z&X-Amz-Expires=86400&X-Amz-Signature=b07835cd44775749c1243a0b923e3fbc6b550f5d17d70a9dfb43b875fa57b8aa&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

Then you have to press ‘import’ button to start magic happen.

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/80522db7-a761-4e05-a681-c48a5b6fb647/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230221T215807Z&X-Amz-Expires=86400&X-Amz-Signature=f1b3bd51d61d149ff959a03d317cc8eb8f0c235e4d8a673ca7b3d9fe4ca1aa1e&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

Log in using Google and you can see the result.

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4e22975d-7a9c-4a64-93d9-8a420e07968a/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230221T215817Z&X-Amz-Expires=86400&X-Amz-Signature=a1e8865e680ff0efcfc9e5fe2e4661d0d37ccd8b603b6b65f431208e0452a481&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

And you have your class schedule imported. Enjoy it!

## Tech-side

All the schedules are provided to students in .xls format. So, we have to parse it, and my app does it using backend written by me using Nest.js. And frontend have interface to manage all imported schedules for any faculty and group. And it looks like this, yep, that simple.

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/fcda5ee7-d598-490f-9e26-31104f55f2df/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230221T215833Z&X-Amz-Expires=86400&X-Amz-Signature=ef2ee6ad4f1e1eb04cfd1297d399b9b23ace263523646944236f35ddc721e7fd&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

And concrete schedule edit page looks like this.

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/fd24109b-8eeb-4a1e-ba48-27e67f5c04c8/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230221T215843Z&X-Amz-Expires=86400&X-Amz-Signature=08491ef65e43d894e6f508290e0df82fa59d52e3250f458edd1a3ccbeda7e4c0&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

That was my project.

**Tools i used:**

**Frontend:**

- Astro.js
- Vue.js
- Google analitycs
- Google one tap auth
- I18n

**Backend:**

- Nest.js
- Node.js
- PostgreSQL
- Docker (for postgreSQL)
- TypeORM

**DevOps:**

Dockerfile’s for frontend and backend

docker-compose.yml for easy deploy to everywhere

I know code is not perfect and we always have things to get done, be refactored, etc. But i was developing this project using all the skills that i have at the time. 

I learned something new like astro.js and dockerfile’s / docker-compose and i happy with that.

And, i have to finish tests :)
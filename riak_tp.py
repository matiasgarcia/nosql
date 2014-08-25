import sys
import riak

client = riak.RiakClient(host='127.0.0.1', pb_port=8087, protocol='pbc')

# Creating Buckets
post_bucket = client.bucket('Posts')
user_post_bucket = client.bucket('Users')

# Function
def leerPost(id):
    return post_bucket.get(id).data['body']
    
def crearPost(post_id, user_id, title, body):
    user = user_post_bucket.get(user_id)
    if user.data is None:
        user.data = {
                'user_id': user_id,
                'posts': []
            }
    
    user.data['posts'].append(post_id)
    
    post = post_bucket.new(post_id, data = {
            'post_id': post_id, 
            'user_id': user_id, 
            'title': title, 
            'body': body,
            'comments': []
        })
    
    user.store()    
    post.store()

#Comandos del programa

#Crear un Post (post_id, usuario, titulo, body)
if sys.argv[1] == "crearPost":
	crearPost(sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5])

#Leer un post(post_id)	
elif sys.argv[1] == "leerPost":
    print str(leerPost(sys.argv[2]))

#Borrar un post(post_id)
elif sys.argv[1] == "borrarPost":
    post_bucket.delete(sys.argv[2])
    
elif sys.argv[1] == "listarPosts":
    post_ids = user_post_bucket.get(sys.argv[2]).data['posts']
    for post_id in post_ids:
        print str(leerPost(post_id))

if sys.argv[1] == "agregarComentario":
    post = post_bucket.get(sys.argv[2])
    post.data['comments'].append(sys.argv[3])
    post.store()

if sys.argv[1] == "listarComentarios":
    comments = post_bucket.get(sys.argv[2]).data['comments']
    for comment in comments:
        print str(comment)